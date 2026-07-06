import React, { useEffect, useState } from 'react';
import {
  Users,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  ShieldCheck,
  ShieldOff,
  Loader2,
  AlertCircle,
  X,
  Crown,
  CheckCircle2,
} from 'lucide-react';
import { adminApi } from '../../api/client';
import { useAdminAuth } from '../useAdminAuth';

/* ── helpers ─────────────────────────────────────────────────── */
const initials = (email = '') => email[0]?.toUpperCase() ?? '?';

const formatDate = (ts) => {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

/* ── Add Admin Modal ─────────────────────────────────────────── */
const AddAdminModal = ({ onClose, onCreated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('New admin password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await adminApi.createSubAdmin(email.trim(), password);
      setSuccess(true);
      onCreated?.();
    } catch (err) {
      setError(err.message || 'Failed to create admin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Plus size={15} className="text-orange-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Add Admin</h2>
              <p className="text-[11px] text-slate-400">Create a new sub-admin account</p>
            </div>
          </div>
          <button onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 cursor-pointer transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="px-5 py-5">
          {success ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 size={24} className="text-emerald-500" />
              </div>
              <p className="text-sm font-bold text-slate-800">Admin Created!</p>
              <p className="text-xs text-slate-500">The admin account is now active.</p>
              <button onClick={onClose}
                className="mt-1 rounded-xl bg-brand px-6 py-2 text-sm font-bold text-white hover:opacity-90 cursor-pointer">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleCreate} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                  <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-500" />
                  {error}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sub.admin@aashasm.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 font-medium outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'} required value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 font-medium outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                  <button type="button" tabIndex={-1} onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={onClose}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60 cursor-pointer transition-opacity">
                  {loading ? <><Loader2 size={13} className="animate-spin" /> Creating…</> : 'Create Admin'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Admin Row ───────────────────────────────────────────────── */
const AdminRow = ({ a, onToggle, onDelete, currentAdminId }) => {
  const [showPass, setShowPass] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleToggle = async () => {
    if (a.isMaster) return;
    setToggling(true);
    try { await onToggle(a.id, !a.isActive); }
    finally { setToggling(false); }
  };

  const handleDelete = async () => {
    if (a.isMaster) return;
    if (!window.confirm(`Delete admin "${a.email}"? This cannot be undone.`)) return;
    setDeleting(true);
    try { await onDelete(a.id); }
    finally { setDeleting(false); }
  };

  const isSelf = a.id === currentAdminId;

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
      {/* Avatar + Email */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0 ${a.isMaster ? 'bg-orange-500' : 'bg-slate-600'}`}>
            {initials(a.email)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{a.email}</p>
            {isSelf && <span className="text-[10px] text-blue-500 font-semibold">You</span>}
          </div>
        </div>
      </td>

      {/* Password */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-slate-700 tracking-wider">
            {showPass ? (a.plainPassword || '—') : '••••••••'}
          </span>
          {a.plainPassword && (
            <button onClick={() => setShowPass(v => !v)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors p-0.5">
              {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          )}
        </div>
      </td>

      {/* Role */}
      <td className="px-5 py-4">
        {a.isMaster ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-bold text-orange-600 border border-orange-200">
            <Crown size={10} /> Master
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
            Admin
          </span>
        )}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        {a.isMaster ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 border border-emerald-200">
            <CheckCircle2 size={10} /> Always Active
          </span>
        ) : (
          <button
            onClick={handleToggle}
            disabled={toggling || isSelf}
            title={isSelf ? "Cannot deactivate your own account" : undefined}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold border transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
              a.isActive
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
            }`}
          >
            {toggling
              ? <Loader2 size={10} className="animate-spin" />
              : a.isActive
                ? <><ShieldCheck size={10} /> Active</>
                : <><ShieldOff size={10} /> Inactive</>
            }
          </button>
        )}
      </td>

      {/* Created */}
      <td className="px-5 py-4 text-xs text-slate-500">{formatDate(a.createdAt)}</td>

      {/* Actions */}
      <td className="px-5 py-4">
        {!a.isMaster && !isSelf && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 cursor-pointer transition-all disabled:opacity-60"
            title="Delete admin"
          >
            {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
          </button>
        )}
      </td>
    </tr>
  );
};

/* ── Page ────────────────────────────────────────────────────── */
const AdminsPage = () => {
  const { admin, isMaster } = useAdminAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (!isMaster) return;
    const unsub = adminApi.subscribeAdmins(
      (data) => { setAdmins(data); setLoading(false); },
      (err) => { setError(err.message); setLoading(false); }
    );
    return () => unsub();
  }, [isMaster]);

  const handleToggle = async (uid, isActive) => {
    try {
      await adminApi.toggleAdminStatus(uid, isActive);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (uid) => {
    try {
      await adminApi.deleteSubAdmin(uid);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isMaster) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <ShieldOff size={40} className="text-slate-300" />
        <p className="text-lg font-bold text-slate-500">Access Denied</p>
        <p className="text-sm text-slate-400">Only the master administrator can view this page.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-extrabold text-slate-900">
            <Users size={22} className="text-brand" />
            Admin Users
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage administrator accounts. Only you (master admin) can see this page.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 cursor-pointer transition-opacity shadow-sm"
        >
          <Plus size={15} /> Add Admin
        </button>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-500" />
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Admins', value: admins.length, color: 'text-slate-700', bg: 'bg-slate-50' },
          { label: 'Active', value: admins.filter(a => a.isActive !== false).length, color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'Inactive', value: admins.filter(a => a.isActive === false).length, color: 'text-red-600', bg: 'bg-red-50' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl ${s.bg} border border-slate-100 px-5 py-4`}>
            <p className="text-xs font-semibold text-slate-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-slate-400">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm font-medium">Loading admins…</span>
          </div>
        ) : admins.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <Users size={32} className="text-slate-200" />
            <p className="text-sm text-slate-400 font-medium">No admins found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Admin', 'Password', 'Role', 'Status', 'Created', ''].map(h => (
                    <th key={h} className="px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {admins.map(a => (
                  <AdminRow
                    key={a.id}
                    a={a}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    currentAdminId={admin?.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddAdminModal
          onClose={() => setShowAddModal(false)}
          onCreated={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default AdminsPage;
