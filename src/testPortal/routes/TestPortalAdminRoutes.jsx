import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from '../admin/AdminAuthContext';
import TestPortalGuard from '../admin/TestPortalGuard';
import TestPortalShell from '../admin/TestPortalShell';
import LoginPage from '../admin/pages/Login';
import TestsPage from '../admin/pages/Tests';
import CollegesPage from '../admin/pages/Colleges';
import FieldsPage from '../admin/pages/Fields';
import TestQuestionsPage from '../admin/pages/TestQuestions';
import TestRegistrationsPage from '../admin/pages/TestRegistrations';
import AllRegistrationsPage from '../admin/pages/AllRegistrations';
import StudentDetailPage from '../admin/pages/StudentDetail';
import ActivityLogsPage from '../admin/pages/ActivityLogs';
import AdminsPage from '../admin/pages/AdminsPage';

const TestPortalAdminRoutes = () => (
  <AdminAuthProvider>
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <TestPortalGuard>
            <TestPortalShell />
          </TestPortalGuard>
        }
      >
        <Route index element={<TestsPage />} />
        <Route path="colleges" element={<CollegesPage />} />
        <Route path="fields" element={<FieldsPage />} />
        <Route path="registrations" element={<AllRegistrationsPage />} />
        <Route path="tests/:testId/questions" element={<TestQuestionsPage />} />
        <Route path="tests/:testId/registrations" element={<TestRegistrationsPage />} />
        <Route path="students/:studentId" element={<StudentDetailPage />} />
        <Route path="activity-logs" element={<ActivityLogsPage />} />
        <Route path="admins" element={<AdminsPage />} />
      </Route>
    </Routes>
  </AdminAuthProvider>
);

export default TestPortalAdminRoutes;
