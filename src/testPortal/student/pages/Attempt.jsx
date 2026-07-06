import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, ShieldAlert, Send } from "lucide-react";
import { studentApi, studentSession } from "../../api/client";
import Timer from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import useCopyProtection from "../hooks/useCopyProtection";

const RESYNC_INTERVAL_MS = 20000;
const SAVE_DEBOUNCE_MS = 600;

const AttemptPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const session = studentSession.get(testId);

  const [attempt, setAttempt] = useState(null);
  const [syncToken, setSyncToken] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [savingIds, setSavingIds] = useState({});

  const [tabEscapes, setTabEscapes] = useState(0);
  const [fullscreenEscapes, setFullscreenEscapes] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const saveTimers = useRef({});
  const pending = useRef({});

  useCopyProtection(true, () =>
    setWarning(
      "Developer tools / view-source shortcuts are disabled during the test.",
    ),
  );

  const goToSubmitted = useCallback(() => {
    navigate(`/test/${testId}/submitted`, { replace: true });
  }, [navigate, testId]);

  useEffect(() => {
    if (!session.token) {
      navigate(`/test/${testId}`, { replace: true });
      return;
    }

    (async () => {
      try {
        let data;
        try {
          data = await studentApi.getAttempt(session.studentId, session.token);
        } catch (err) {
          if (err.status === 404) {
            data = await studentApi.startAttempt(
              session.studentId,
              session.token,
            );
          } else {
            throw err;
          }
        }

        if (data.status !== "IN_PROGRESS") {
          goToSubmitted();
          return;
        }
        setAttempt(data);
        setTabEscapes(data.tabEscapesCount || 0);
        setFullscreenEscapes(data.fullscreenViolations || 0);
        setSyncToken((t) => t + 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  useEffect(() => {
    if (!attempt || attempt.status !== 'IN_PROGRESS') return undefined;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabEscapes(prev => {
          const next = prev + 1;
          setWarning(`WARNING: Tab switch / window blur detected! (Total violations: ${next})`);
          studentApi.saveAnswer(session.studentId, 'meta', session.token, {
            tabEscapesCount: next
          }).catch(() => {});
          return next;
        });
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenEscapes(prev => {
          const next = prev + 1;
          setWarning(`WARNING: Fullscreen mode exited! Please return to fullscreen. (Total violations: ${next})`);
          studentApi.saveAnswer(session.studentId, 'meta', session.token, {
            fullscreenViolations: next
          }).catch(() => {});
          return next;
        });
      }
    };

    // Attempt to prompt candidate to enter fullscreen
    const requestFS = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };
    requestFS();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('blur', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('blur', handleVisibilityChange);
    };
  }, [attempt, session.studentId, session.token]);

  // Periodic server resync: catches server-side auto-submit (e.g. time ran
  // out while this tab was backgrounded) and keeps the countdown accurate.
  useEffect(() => {
    if (!attempt) return undefined;
    const interval = setInterval(async () => {
      try {
        const data = await studentApi.getAttempt(
          session.studentId,
          session.token,
        );
        if (data.status !== "IN_PROGRESS") {
          goToSubmitted();
          return;
        }
        setAttempt((prev) =>
          prev ? { ...prev, remainingSeconds: data.remainingSeconds } : prev,
        );
        setSyncToken((t) => t + 1);
      } catch {
        // transient network hiccup — local timer keeps running, we'll retry.
      }
    }, RESYNC_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Boolean(attempt)]);

  // Warn before an accidental tab close/refresh while the test is live.
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const flushPending = async () => {
    const ids = Object.keys(pending.current);
    await Promise.all(
      ids.map(async (id) => {
        clearTimeout(saveTimers.current[id]);
        const payload = pending.current[id];
        delete pending.current[id];
        try {
          await studentApi.saveAnswer(
            session.studentId,
            id,
            session.token,
            payload,
          );
        } catch {
          // best-effort on flush — submit still proceeds below.
        }
      }),
    );
  };

  const scheduleSave = (attemptQuestionId, payload) => {
    pending.current[attemptQuestionId] = payload;
    setSavingIds((m) => ({ ...m, [attemptQuestionId]: true }));
    clearTimeout(saveTimers.current[attemptQuestionId]);
    saveTimers.current[attemptQuestionId] = setTimeout(async () => {
      try {
        await studentApi.saveAnswer(
          session.studentId,
          attemptQuestionId,
          session.token,
          payload,
        );
        delete pending.current[attemptQuestionId];
      } catch (err) {
        setError(err.message);
      } finally {
        setSavingIds((m) => ({ ...m, [attemptQuestionId]: false }));
      }
    }, SAVE_DEBOUNCE_MS);
  };

  const updateLocal = (id, patch) => {
    setAttempt((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, ...patch } : q,
      ),
    }));
  };

  const handleSelectOption = (question, optionId) => {
    updateLocal(question.id, { selectedOptionId: optionId });
    scheduleSave(question.id, { selectedOptionId: optionId });
  };

  const handleCodeChange = (question, value) => {
    updateLocal(question.id, { codeAnswer: value });
    scheduleSave(question.id, { codeAnswer: value });
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await flushPending();
      await studentApi.submitAttempt(session.studentId, session.token);
    } finally {
      goToSubmitted();
    }
  };

  const handleExpire = useCallback(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="tp-scope flex min-h-screen items-center justify-center text-slate-400">
        Loading your test...
      </div>
    );
  }
  if (error && !attempt) {
    return (
      <div className="tp-scope flex min-h-screen items-center justify-center p-6">
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }
  if (!attempt) return null;

  const answeredCount = attempt.questions.filter(
    (q) =>
      (q.type === "MCQ" && q.selectedOptionId) ||
      (q.type === "CODING" && q.codeAnswer?.trim()),
  ).length;

  return (
    <div className="tp-scope min-h-screen bg-slate-50 pb-28">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-3.5 py-2.5 shadow-sm sm:px-8 sm:py-3.5">
        <div>
          <div className="text-xs sm:text-sm font-bold text-slate-800">
            Test in progress
          </div>
          <div className="text-[10px] sm:text-xs text-slate-400">
            {answeredCount} / {attempt.questions.length} answered
          </div>
        </div>
        <Timer
          key={syncToken}
          remainingSeconds={attempt.remainingSeconds}
          onExpire={handleExpire}
        />
      </div>

      {warning && (
        <div className="mx-3.5 mt-3.5 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs sm:text-sm text-amber-800 sm:mx-8 sm:mt-4 sm:px-4">
          <ShieldAlert size={15} /> {warning}
        </div>
      )}
      {error && (
        <div className="mx-3.5 mt-3.5 rounded-lg bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-700 sm:mx-8 sm:mt-4 sm:px-4">
          {error}
        </div>
      )}

      <div className="mx-auto max-w-3xl space-y-3.5 p-3.5 sm:p-8 sm:space-y-4">
        {attempt.questions.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={idx}
            saving={Boolean(savingIds[q.id])}
            onSelectOption={(optionId) => handleSelectOption(q, optionId)}
            onCodeChange={(value) => handleCodeChange(q, value)}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white p-3.5 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-10 sm:p-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 w-full">
          <p className="hidden text-xs text-slate-400 sm:block">
            Your answers are saved automatically as you go.
          </p>
          <button
            onClick={() => setShowSubmitModal(true)}
            disabled={submitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-brand py-3 px-6 text-sm sm:text-base font-bold text-white hover:opacity-90 disabled:opacity-60 cursor-pointer transition-opacity"
          >
            {submitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            {submitting ? "Submitting..." : "Submit Test"}
          </button>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl text-center space-y-4 animate-fade-in">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <Send size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Submit Assessment?</h3>
              <p className="mt-2 text-sm text-slate-500 font-medium">
                Are you sure you want to submit the test now? You will not be able to change your answers after this.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors animate-fade-in"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitModal(false);
                  handleSubmit();
                }}
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/15 hover:opacity-90 disabled:opacity-60 transition-opacity"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttemptPage;
