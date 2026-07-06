import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import TestPortalAdminRoutes from "./testPortal/routes/TestPortalAdminRoutes";
import TestPortalStudentRoutes from "./testPortal/routes/TestPortalStudentRoutes";
import "./styles/overflow-fix.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* More specific prefix must be registered before the general /aashasm-portal/* admin route. */}
        <Route
          path="/aashasm-portal/test-portal/*"
          element={<TestPortalAdminRoutes />}
        />
        <Route path="/aashasm-portal/*" element={<AdminRoutes />} />
        <Route path="/test/*" element={<TestPortalStudentRoutes />} />
        <Route path="/*" element={<WebsiteRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
