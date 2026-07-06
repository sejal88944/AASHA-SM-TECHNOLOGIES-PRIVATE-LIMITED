import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../student/pages/Register';
import WaitingPage from '../student/pages/Waiting';
import AttemptPage from '../student/pages/Attempt';
import SubmittedPage from '../student/pages/Submitted';

// Deliberately NOT wrapped in the marketing site's WebsiteApp layout (no
// navbar/footer/chat-widget/popups) so the exam screen stays distraction-free.
const TestPortalStudentRoutes = () => (
  <Routes>
    <Route path=":testId" element={<RegisterPage />} />
    <Route path=":testId/waiting" element={<WaitingPage />} />
    <Route path=":testId/attempt" element={<AttemptPage />} />
    <Route path=":testId/submitted" element={<SubmittedPage />} />
  </Routes>
);

export default TestPortalStudentRoutes;
