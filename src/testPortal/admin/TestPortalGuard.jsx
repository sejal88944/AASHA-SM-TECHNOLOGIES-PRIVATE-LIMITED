import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "./useAdminAuth";

const TestPortalGuard = ({ children }) => {
  const { admin, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="tp-scope flex h-screen items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  if (!admin) {
    return (
      <Navigate
        to="/aashasm-portal/test-portal/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default TestPortalGuard;
