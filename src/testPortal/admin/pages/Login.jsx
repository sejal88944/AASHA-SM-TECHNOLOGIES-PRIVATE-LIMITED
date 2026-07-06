import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Loader2,
  AlertCircle,
  WifiOff,
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react";
import { useAdminAuth } from "../useAdminAuth";

const TestPortalLoginPage = () => {
  const { login, connectionError } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      const dest = location.state?.from?.pathname || "/aashasm-portal/test-portal";
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="tp-scope"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "stretch",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        background: "#f8fafc",
      }}
    >
      {/* ── Left Panel ───────────────────────────────────────────── */}
      <div
        style={{
          flex: "0 0 48%",
          display: "none",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "56px 52px",
          background: "linear-gradient(160deg, #0f172a 0%, #1a2744 55%, #0f172a 100%)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
        className="lg-panel"
      >
        {/* Glow orbs */}
        <div style={{
          position: "absolute", top: "-100px", right: "-100px",
          width: "380px", height: "380px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(234,88,12,0.22) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", left: "-80px",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(234,88,12,0.04) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        {/* All content — centered block */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "340px" }}>

          {/* Logo — centered */}
          <div style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "20px",
            padding: "14px 24px",
            marginBottom: "36px",
            backdropFilter: "blur(8px)",
          }}>
            <img src="/ASM Logo.jpeg" alt="ASM Logo"
              style={{ height: "48px", objectFit: "contain", display: "block" }} />
          </div>

          {/* Admin Portal badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            border: "1px solid rgba(234,88,12,0.45)", borderRadius: "999px",
            padding: "5px 16px", marginBottom: "22px",
            background: "rgba(234,88,12,0.12)"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f97316", display: "inline-block" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#fdba74", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Admin Portal
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: "28px", fontWeight: 800, color: "#ffffff",
            lineHeight: 1.3, marginBottom: "14px", letterSpacing: "-0.02em",
          }}>
            <span style={{ whiteSpace: "nowrap" }}>
              Internship <span style={{ color: "#f97316" }}>Assessment</span>
            </span>
            <br />
            Test Platform
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.7, marginBottom: "36px" }}>
            Manage test drives, track candidates, and oversee results — all from one dashboard.
          </p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", textAlign: "left" }}>
            {[
              "Real-time candidate tracking",
              "Multi-college test management",
              "Automated scoring & grading",
              "Complete audit trail & activity logs",
            ].map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "22px", height: "22px", borderRadius: "50%",
                  background: "rgba(234,88,12,0.18)", border: "1px solid rgba(234,88,12,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f97316", display: "block" }} />
                </div>
                <span style={{ fontSize: "13px", color: "#cbd5e1" }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Bottom copyright */}
          <p style={{ marginTop: "44px", fontSize: "11.5px", color: "#475569" }}>
            © {new Date().getFullYear()} AASHA-SM Technologies
          </p>
        </div>
      </div>

      {/* ── Right Panel: Form ─────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        background: "#ffffff",
        minHeight: "100vh",
      }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>

          {/* Mobile logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "36px" }}
            className="mobile-logo">
            <img src="/ASM Logo.jpeg" alt="ASM Logo"
              style={{ height: "44px", objectFit: "contain" }} />
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{
              fontSize: "26px", fontWeight: 800, color: "#0f172a",
              letterSpacing: "-0.02em", marginBottom: "6px"
            }}>
              Sign in
            </h2>
            <p style={{ fontSize: "14px", color: "#64748b" }}>
              Enter your credentials to access the admin dashboard.
            </p>
          </div>

          {/* Alerts */}
          {connectionError && (
            <div style={{
              display: "flex", alignItems: "flex-start", gap: "10px",
              background: "#fffbeb", border: "1px solid #fcd34d",
              borderRadius: "12px", padding: "12px 14px",
              marginBottom: "20px"
            }}>
              <WifiOff size={15} style={{ color: "#d97706", flexShrink: 0, marginTop: "1px" }} />
              <span style={{ fontSize: "13px", color: "#92400e" }}>{connectionError}</span>
            </div>
          )}
          {error && (
            <div style={{
              display: "flex", alignItems: "flex-start", gap: "10px",
              background: "#fef2f2", border: "1px solid #fecaca",
              borderRadius: "12px", padding: "12px 14px",
              marginBottom: "20px"
            }}>
              <AlertCircle size={15} style={{ color: "#ef4444", flexShrink: 0, marginTop: "1px" }} />
              <span style={{ fontSize: "13px", color: "#b91c1c" }}>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Email */}
            <div>
              <label style={{
                display: "block", fontSize: "13px", fontWeight: 600,
                color: "#374151", marginBottom: "6px"
              }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{
                  position: "absolute", left: "14px", top: "50%",
                  transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none"
                }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aashasm.com"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    padding: "12px 14px 12px 40px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "14px", color: "#0f172a",
                    background: "#f8fafc",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ea580c";
                    e.target.style.boxShadow = "0 0 0 3px rgba(234,88,12,0.1)";
                    e.target.style.background = "#fff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "#f8fafc";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: "block", fontSize: "13px", fontWeight: 600,
                color: "#374151", marginBottom: "6px"
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{
                  position: "absolute", left: "14px", top: "50%",
                  transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none"
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    padding: "12px 44px 12px 40px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "14px", color: "#0f172a",
                    background: "#f8fafc",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ea580c";
                    e.target.style.boxShadow = "0 0 0 3px rgba(234,88,12,0.1)";
                    e.target.style.background = "#fff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "#f8fafc";
                  }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(v => !v)}
                  style={{
                    position: "absolute", right: "12px", top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "#94a3b8", padding: "2px", display: "flex"
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "12px",
                border: "none",
                background: loading
                  ? "#f97316"
                  : "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.75 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "opacity 0.2s, transform 0.1s",
                boxShadow: "0 4px 14px rgba(234,88,12,0.35)",
                fontFamily: "inherit",
                marginTop: "4px",
              }}
              onMouseEnter={(e) => { if (!loading) e.target.style.opacity = "0.92"; }}
              onMouseLeave={(e) => { if (!loading) e.target.style.opacity = "1"; }}
            >
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Signing in…</>
                : "Sign In →"
              }
            </button>
          </form>

          {/* Divider + note */}
          <div style={{
            marginTop: "28px", paddingTop: "24px",
            borderTop: "1px solid #f1f5f9",
            textAlign: "center"
          }}>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>
              Authorised personnel only ·{" "}
              <span style={{ color: "#64748b", fontWeight: 600 }}>AASHA-SM Technologies</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Responsive styles ─────────────────────────────────────── */}
      <style>{`
        @media (min-width: 1024px) {
          .lg-panel { display: flex !important; }
          .mobile-logo { display: none !important; }
        }
        @media (max-width: 1023px) {
          .lg-panel { display: none !important; }
          .mobile-logo { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default TestPortalLoginPage;
