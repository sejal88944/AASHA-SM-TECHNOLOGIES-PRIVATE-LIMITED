import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, User, Calendar, Clock, Award, Check, X, FileText, BookOpen, Loader2 } from 'lucide-react';
import { adminApi } from '../../api/client';
import { useAdminAuth } from '../useAdminAuth';

const StudentDetailPage = () => {
  const { admin } = useAdminAuth();
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .getStudent(studentId)
      .then(setStudent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [studentId]);

  const handleOverride = async (questionId, isCorrect, marksAwarded) => {
    try {
      await adminApi.overrideStudentMarks(studentId, questionId, isCorrect, marksAwarded, admin?.email);
      const updated = await adminApi.getStudent(studentId);
      setStudent(updated);
    } catch (err) {
      alert("Failed to override marks: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="tp-scope p-12 text-center text-sm text-slate-400 font-medium flex items-center justify-center gap-2">
        <Loader2 className="animate-spin text-orange-500" size={18} />
        <span>Loading student details...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="tp-scope rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-700 max-w-4xl mx-auto mt-6">
        {error}
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="tp-scope max-w-5xl space-y-6">
      {/* Back Button Link */}
      <Link
        onClick={() => window.history.back()}
        className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm hover:shadow"
      >
        <ArrowLeft size={14} /> Back
      </Link>

      {/* Main Student Header Info Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xl shadow-slate-100/40">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 shadow-sm border border-orange-100">
              <User size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{student.name}</h1>
              <p className="text-sm font-medium text-slate-500">{student.email}</p>
            </div>
          </div>
          
          {student.attempt && (
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-3 rounded-2xl pr-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
                <Award size={22} className="text-orange-500" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-950">
                  {student.attempt.totalMarks ?? '-'} <span className="text-slate-400 font-medium text-xs">/ {student.attempt.maxMarks ?? '-'}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase">
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${
                    student.attempt.status === 'SUBMITTED' || student.attempt.status === 'AUTO_SUBMITTED'
                      ? 'bg-emerald-500'
                      : 'bg-blue-500'
                  }`} />
                  <span className={
                    student.attempt.status === 'SUBMITTED' || student.attempt.status === 'AUTO_SUBMITTED'
                      ? 'text-emerald-700'
                      : 'text-blue-700'
                  }>{student.attempt.status}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-4">
          <DetailBlock label="College" value={student.college} />
          <DetailBlock label="Department" value={student.department} />
          <DetailBlock label="Class" value={student.className} />
          <DetailBlock label="Roll No." value={student.rollNumber} />
          <DetailBlock label="PRN Number" value={student.prnNumber} />
          <DetailBlock label="Assessment Test" value={student.testTitle} />
          <DetailBlock label="Registered At" value={new Date(student.registeredAt).toLocaleString()} />
          <DetailBlock 
            label="Started Test At" 
            value={student.attempt?.startedAt ? new Date(student.attempt.startedAt).toLocaleString() : 'Not started'} 
          />
          
          <div className="col-span-2 sm:col-span-4 border-t border-slate-100 pt-4 mt-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Interested Fields</span>
            <div className="flex flex-wrap gap-1.5">
              {student.interestedFields.length === 0 ? (
                <span className="text-slate-500 font-medium text-sm">-</span>
              ) : (
                student.interestedFields.map((field, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-lg bg-orange-50/65 px-2.5 py-1 text-xs font-bold text-orange-700 border border-orange-200/30"
                  >
                    {field}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Header */}
      <div className="pt-2">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="text-orange-500" size={18} /> Candidate Response Breakdown
        </h2>
      </div>

      {/* Question Breakdown List */}
      <div className="space-y-4">
        {student.breakdown.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm font-medium text-slate-400">
            This student has not started the test yet.
          </div>
        )}
        {student.breakdown.map((q, idx) => (
          <div key={q.questionId} className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText size={13} />
                Q{idx + 1} • {q.type} • {q.marks} marks
              </span>
              {q.isCorrect ? (
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-600 shadow-sm">
                  <CheckCircle2 size={14} /> Correct (+{q.marksAwarded})
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-bold text-red-500 shadow-sm">
                  <XCircle size={14} /> Incorrect (0)
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-slate-800 tracking-tight leading-relaxed">{q.text}</p>

            {q.type === 'MCQ' ? (
              <div className="space-y-2 text-sm max-w-2xl">
                {q.options.map((o) => {
                  const isSelected = o.id === q.selectedOptionId;
                  let optionCls = "flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-slate-600 font-medium bg-white";
                  if (o.isCorrect) {
                    optionCls = "flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/40 text-emerald-700 font-semibold";
                  } else if (isSelected) {
                    optionCls = "flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/40 text-red-700 font-semibold";
                  }
                  return (
                    <div key={o.id} className={optionCls}>
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300">
                        {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-slate-900" />}
                      </div>
                      <span className="flex-1">{o.text}</span>
                      {o.isCorrect && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                          Correct Option
                        </span>
                      )}
                      {!o.isCorrect && isSelected && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-red-100 text-red-800 px-2 py-0.5 rounded">
                          Student Choice
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Student's Code Answer</div>
                  <pre className="whitespace-pre-wrap rounded-xl bg-slate-950 p-4 text-xs font-mono text-slate-100 leading-relaxed max-h-60 overflow-y-auto shadow-inner">
                    {q.codeAnswer || '(empty)'}
                  </pre>
                </div>
                <div className="space-y-1.5">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Reference Answer Key</div>
                  <pre className="whitespace-pre-wrap rounded-xl bg-slate-950 p-4 text-xs font-mono text-slate-100 leading-relaxed max-h-60 overflow-y-auto shadow-inner">
                    {q.referenceAnswer}
                  </pre>
                </div>
                <div className="sm:col-span-2 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
                  <span>Similarity auto-grading threshold is <strong className="text-slate-800">75%</strong></span>
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-slate-700 font-bold">
                    Score match: {(q.similarityScore * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            )}
            
            {student.attempt && (
              <div className="mt-4 border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Manual Grader Override:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOverride(q.questionId, true, q.marks)}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                      q.isCorrect 
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-800'
                    }`}
                  >
                    <Check size={14} /> Correct (+{q.marks})
                  </button>
                  <button
                    onClick={() => handleOverride(q.questionId, false, 0)}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                      !q.isCorrect 
                        ? 'bg-red-500 text-white shadow-md shadow-red-600/10' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-800'
                    }`}
                  >
                    <X size={14} /> Incorrect (+0)
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailBlock = ({ label, value }) => (
  <div className="space-y-0.5">
    <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</dt>
    <dd className="text-sm font-semibold text-slate-800">{value || '-'}</dd>
  </div>
);

export default StudentDetailPage;
