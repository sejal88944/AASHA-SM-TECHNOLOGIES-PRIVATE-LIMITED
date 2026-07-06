import React, { useEffect, useState } from 'react';
import { Plus, Loader2, Building2, Trash2 } from 'lucide-react';
import { adminApi } from '../../api/client';
import { useAdminAuth } from '../useAdminAuth';
import StatusToggle from '../components/StatusToggle';

const CollegesPage = () => {
  const { admin } = useAdminAuth();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [collegeToDelete, setCollegeToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError('');
    const unsub = adminApi.subscribeColleges(
      (data) => {
        setColleges(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError('');
    try {
      await adminApi.createCollege({ name: name.trim() }, admin?.email);
      setName('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (college) => {
    setColleges((prev) => prev.map((c) => (c.id === college.id ? { ...c, isActive: !c.isActive } : c)));
    try {
      await adminApi.updateCollege(college.id, { isActive: !college.isActive }, admin?.email);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="tp-scope max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Building2 className="text-brand" size={24} /> Colleges
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          A college must exist here before a test drive can be created for it.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Side: Create College Card */}
        <div className="w-full md:w-80 shrink-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/40 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Add New College</h3>
          
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. DY Patil Institute"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 text-slate-800 placeholder-slate-400 font-medium"
            />
            
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-brand py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-600/15 hover:opacity-90 disabled:opacity-60 transition-opacity cursor-pointer"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              Add College
            </button>
          </form>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Right Side: Colleges Data Table Card */}
        <div className="flex-1 w-full rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-100/40 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-sm text-slate-400 font-medium flex items-center justify-center gap-2">
              <Loader2 className="animate-spin text-orange-500" size={18} />
              <span>Loading colleges...</span>
            </div>
          ) : colleges.length === 0 ? (
            <div className="p-12 text-center text-sm font-medium text-slate-400">
              No colleges added yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">College Name</th>
                    <th className="px-6 py-4 text-center">Active Tests</th>
                    <th className="px-6 py-4 text-center">Registered Candidates</th>
                    <th className="px-6 py-4 text-right">Status / Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {colleges.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/40 transition-colors border-t border-slate-100">
                      <td className="px-6 py-4 font-bold text-slate-800">{c.name}</td>
                      <td className="px-6 py-4 text-center font-semibold text-slate-500">
                        {c._count?.tests ?? 0}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-slate-500">
                        {c._count?.students ?? 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <StatusToggle checked={c.isActive} onChange={() => toggleActive(c)} />
                          <button
                            type="button"
                            onClick={() => setCollegeToDelete(c)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete College"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Styled Deletion Confirmation Modal Overlay */}
      {collegeToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl text-center space-y-4 animate-fade-in animate-scale-up">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Delete College?</h3>
              <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed">
                Are you sure you want to delete <strong className="text-slate-800">"{collegeToDelete.name}"</strong>? This will remove it from candidate registration drives. This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCollegeToDelete(null)}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const targetId = collegeToDelete.id;
                  setCollegeToDelete(null);
                  try {
                    await adminApi.deleteCollege(targetId, admin?.email);
                  } catch (err) {
                    setError(err.message);
                  }
                }}
                className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/15 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegesPage;
