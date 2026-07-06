import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { studentSession } from '../../api/client';

const SubmittedPage = () => {
  const { testId } = useParams();

  // The attempt is finalized server-side; nothing left to protect locally.
  useEffect(() => {
    studentSession.clear(testId);
  }, [testId]);

  return (
    <div className="tp-scope flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={28} />
        </div>
        <h1 className="mb-2 text-xl font-bold text-slate-900">Test Submitted</h1>
        <p className="mb-6 text-sm text-slate-500">
          Your responses have been recorded. The placement team will review results and reach out with next
          steps. Thank you for your time!
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-1.5 w-full rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/15 hover:opacity-90 cursor-pointer transition-opacity"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default SubmittedPage;
