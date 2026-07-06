import React, { useCallback, useEffect, useState } from "react";
import { adminApi } from "../api/client";
import { AdminAuthContext } from "./adminAuthContextInstance";

import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase/auth";

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState("");

  const refresh = useCallback(async () => {
    try {
      const me = await adminApi.me();
      setAdmin(me);
      setConnectionError("");
    } catch (err) {
      setAdmin(null);
      if (err.status === 0 || err.status >= 500) {
        setConnectionError(err.message);
      } else {
        setConnectionError("");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const me = await adminApi.me();
          setAdmin(me);
          setConnectionError("");
        } catch (err) {
          setAdmin(null);
        }
      } else {
        setAdmin(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const me = await adminApi.login(email, password);
    setAdmin(me);
    setConnectionError("");
    return me;
  };

  const logout = async () => {
    await adminApi.logout().catch(() => {});
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        connectionError,
        login,
        logout,
        refresh,
        isMaster: admin?.isMaster === true,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
