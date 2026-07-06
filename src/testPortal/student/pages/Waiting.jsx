import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ShieldAlert, Clock, ListChecks, PlayCircle } from 'lucide-react';
import { studentApi, studentSession } from '../../api/client';
import { StatusMessage } from './Register';

const WaitingPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState('');

  const session = studentSession.get(testId);

  useEffect(() => {
    if (!session.token) {
      navigate(`/test/${testId}`, { replace: true });
      return;
    }

    (async () => {
      try {
        const testData = await studentApi.getTest(testId);
        setTest(testData);

        // If an attempt already exists (started earlier, tab was closed,
        // etc.) skip straight back into it instead of showing "Start" again.
        try {
          await studentApi.getAttempt(session.studentId, session.token);
          navigate(`/test/${testId}/attempt`, { replace: true });
          return;
        } catch {
          // No attempt yet — this is the expected case, stay on this screen.
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  const handleStart = async () => {
    setStarting(true);
    setError('');
    try {
      await studentApi.startAttempt(session.studentId, session.token);
      navigate(`/test/${testId}/attempt`);
    } catch (err) {
      setError(err.message);
      setStarting(false);
    }
  };

  if (loading) {
    return <div className="tp-scope flex min-h-screen items-center justify-center text-slate-400">Loading...</div>;
  }

  if (!test?.isActive) {
    return <StatusMessage title="Test Not Available" message="This test is not currently active." />;
  }

  return (
    <div className="tp-scope flex min-h-screen flex-col items-center justify-start sm:justify-center bg-slate-50 px-4 py-6 sm:py-10">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
        <h1 className="mb-1 text-xl sm:text-2xl font-bold text-slate-900">{test.title}</h1>
        <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-slate-500">{test.college?.name}</p>

        <div className="mb-4 sm:mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-50 p-3 sm:p-4">
            <Clock className="mb-1 text-brand" size={18} />
            <div className="text-base sm:text-lg font-bold text-slate-900">{test.durationMinutes} min</div>
            <div className="text-[10px] sm:text-xs text-slate-500">Total duration</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 sm:p-4">
            <ListChecks className="mb-1 text-brand" size={18} />
            <div className="text-base sm:text-lg font-bold text-slate-900">MCQ + Coding</div>
            <div className="text-[10px] sm:text-xs text-slate-500">Question types</div>
          </div>
        </div>

        <div className="mb-4 sm:mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs sm:text-sm text-amber-800">
          <div className="mb-1.5 flex items-center gap-2 font-semibold">
            <ShieldAlert size={16} /> Before you begin
          </div>
          <ul className="list-disc pl-5 space-y-1.5 text-left leading-relaxed">
            <li>Once started, the timer cannot be paused and runs continuously until time is up.</li>
            <li>If you close this tab, reopening it will resume the test with the time remaining — it will not restart.</li>
            <li>The test auto-submits the moment your time runs out, saving whatever you've answered so far.</li>
            <li>Copying question text and using developer tools is discouraged and blocked where possible.</li>
          </ul>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-700">{error}</div>}

        <button
          onClick={handleStart}
          disabled={starting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm sm:text-base font-bold text-white hover:opacity-90 disabled:opacity-60 cursor-pointer transition-opacity"
        >
          {starting ? <Loader2 size={18} className="animate-spin" /> : <PlayCircle size={18} />}
          {starting ? 'Starting...' : 'Start Test'}
        </button>
      </div>
    </div>
  );
};

export default WaitingPage;
