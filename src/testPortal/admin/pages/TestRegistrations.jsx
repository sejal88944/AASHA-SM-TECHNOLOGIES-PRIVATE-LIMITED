import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { adminApi } from '../../api/client';
import RegistrationsView from '../components/RegistrationsView';

const TestRegistrationsPage = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);

  useEffect(() => {
    adminApi.getTest(testId).then(setTest).catch(() => {});
  }, [testId]);

  return (
    <div className="tp-scope">
      <Link
        to="/aashasm-portal/test-portal"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={15} /> Back to Tests
      </Link>
      <RegistrationsView
        fixedTestId={testId}
        title={`${test?.title || 'Test'} — Registrations & Scoreboard`}
        subtitle="Sorted by marks (highest first) by default. Click a row for the full breakdown."
      />
    </div>
  );
};

export default TestRegistrationsPage;
