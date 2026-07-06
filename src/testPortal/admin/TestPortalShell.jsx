import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Tags,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Shield,
  Activity,
  Settings,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  UserCog,
} from "lucide-react";
import { useAdminAuth } from "./useAdminAuth";
import { adminApi } from "../api/client";

const NAV_ITEMS = [
  {
    to: "/aashasm-portal/test-portal",
    label: "Tests",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/aashasm-portal/test-portal/colleges",
    label: "Colleges",
    icon: Building2,
  },
  {
    to: "/aashasm-portal/test-portal/fields",
    label: "Interested Fields",
    icon: Tags,
  },
  {
    to: "/aashasm-portal/test-portal/registrations",
    label: "All Registrations",
    icon: ClipboardList,
  },
  {
    to: "/aashasm-portal/test-portal/activity-logs",
    label: "Activity Logs",
    icon: Activity,
  },
];

// Master-only nav items (injected conditionally)
const MASTER_NAV_ITEMS = [
  {
    to: "/aashasm-portal/test-portal/admins",
    label: "Admin Users",
    icon: UserCog,
  },
];

/* ─── Change Credentials Modal ─────────────────────────────────────── */
const ChangeCredentialsModal = ({ adminEmail, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState(adminEmail || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    if (!currentPassword) {
      setError("Please enter your current password to confirm changes.");
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (!newPassword && newEmail === adminEmail) {
      setError("No changes detected. Update email or password to save.");
      return;
    }

    setSaving(true);
    try {
      await adminApi.updateAdminCredentials({
        currentPassword,
        newEmail: newEmail !== adminEmail ? newEmail : null,
        newPassword: newPassword || null,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to update credentials.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <KeyRound size={15} className="text-orange-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Change Credentials</h2>
              <p className="text-[11px] text-slate-400">Update your admin email or password</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {success ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 size={28} className="text-emerald-500" />
              </div>
              <p className="text-base font-bold text-slate-800">Credentials Updated!</p>
              <p className="text-sm text-slate-500">Your changes have been saved. Please use the new credentials next time you log in.</p>
              <button
                onClick={onClose}
                className="mt-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 cursor-pointer transition-opacity"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
                  <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-500" />
                  {error}
                </div>
              )}

              {/* Current Password — always required */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Current Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 font-medium outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                  <button type="button" tabIndex={-1} onClick={() => setShowCurrent(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                    {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="h-px bg-slate-100" />
              <p className="text-[11px] text-slate-400 font-medium -mt-1">Leave a field unchanged to keep its current value.</p>

              {/* New Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  New Email Address
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 font-medium outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
                />
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 font-medium outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                  <button type="button" tabIndex={-1} onClick={() => setShowNew(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                    {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              {newPassword && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 font-medium outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60 cursor-pointer transition-opacity"
                >
                  {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Shell ────────────────────────────────────────────────────────── */
const TestPortalShell = () => {
  const { admin, logout, isMaster } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/aashasm-portal/test-portal/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `flex items-center rounded-xl py-3 transition-all duration-200 !no-underline hover:!no-underline ${
      collapsed ? "justify-center px-0 w-12 h-12 mx-auto" : "gap-3 px-4 justify-start"
    } ${
      isActive
        ? "bg-orange-50/80 text-orange-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  return (
    <div className="tp-scope flex h-screen bg-slate-50 text-slate-800">
      {/* Sidebar */}
      <aside
        className={`${
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        } fixed inset-y-0 left-0 z-30 bg-white border-r border-slate-200 p-5 flex flex-col justify-between transition-all duration-300 ease-in-out lg:static lg:flex ${
          collapsed ? "lg:w-20 lg:px-3" : "lg:w-64"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center justify-between relative">
            <div className={`w-full overflow-hidden flex items-center justify-center bg-white ${collapsed ? "h-10" : "h-16"} transition-all duration-300`}>
              <img
                src="/ASM Logo.jpeg"
                alt="ASM Logo"
                className={`${collapsed ? "w-16 h-16" : "w-48 h-48"} object-contain transition-all duration-300 shrink-0`}
              />
            </div>
            {!collapsed && (
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden absolute top-2 right-0 z-10"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
            {!collapsed ? (
              <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Management
              </div>
            ) : (
              <div className="h-px bg-slate-100 my-4 mx-2" />
            )}
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
            {isMaster && (
              <>
                {!collapsed && (
                  <div className="px-3 pt-3 pb-1 text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                    Master Only
                  </div>
                )}
                {MASTER_NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={linkClass}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon size={18} className="shrink-0 text-orange-500" />
                    {!collapsed && <span className="text-orange-600 font-bold">{item.label}</span>}
                  </NavLink>
                ))}
              </>
            )}
          </nav>
        </div>

        {/* User Card & Actions */}
        <div className="border-t border-slate-100 pt-4 mt-6 space-y-2">
          {/* User email */}
          {!collapsed ? (
            <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl">
              <div className="bg-slate-200 p-1.5 rounded-lg text-slate-500 shrink-0">
                <Shield size={16} />
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-bold text-slate-700 truncate">{admin?.email}</p>
                <span className="text-[10px] text-emerald-600 font-semibold">Administrator</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-2 bg-slate-50 rounded-xl w-12 mx-auto cursor-help" title={admin?.email}>
              <Shield size={16} className="text-slate-500" />
            </div>
          )}

          {/* Change Credentials button */}
          {!collapsed ? (
            <button
              onClick={() => setShowCredentialsModal(true)}
              className="w-full box-border flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-transparent py-2 text-xs font-bold text-slate-500 transition-all duration-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 cursor-pointer"
            >
              <Settings size={13} /> Change Credentials
            </button>
          ) : (
            <button
              onClick={() => setShowCredentialsModal(true)}
              className="w-12 h-10 mx-auto flex items-center justify-center rounded-xl border border-slate-200 bg-transparent text-slate-500 transition-all duration-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 cursor-pointer"
              title="Change Credentials"
            >
              <Settings size={15} />
            </button>
          )}

          {/* Logout */}
          {!collapsed ? (
            <button
              onClick={handleLogout}
              className="w-full box-border flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-transparent py-2.5 text-xs font-bold text-slate-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 cursor-pointer"
            >
              <LogOut size={14} /> Logout
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl border border-slate-200 bg-transparent text-slate-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 cursor-pointer"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer" onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>
            <button
              className="hidden lg:block rounded-lg p-2 text-slate-600 hover:bg-slate-100 cursor-pointer"
              onClick={() => setCollapsed(v => !v)}
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Admin Dashboard</span>
              <span className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                <Activity size={12} className="text-emerald-500 animate-pulse" />
                <span>Live Mode</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            Logged in as: <strong className="text-slate-700 font-bold">{admin?.email}</strong>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Change Credentials Modal */}
      {showCredentialsModal && (
        <ChangeCredentialsModal
          adminEmail={admin?.email}
          onClose={() => setShowCredentialsModal(false)}
        />
      )}
    </div>
  );
};

export default TestPortalShell;
