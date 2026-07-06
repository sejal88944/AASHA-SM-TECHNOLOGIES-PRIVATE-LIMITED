import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Loader2, ClipboardList, Trophy, AlertTriangle, Link2, X, Edit, CheckCircle2, ChevronDown } from 'lucide-react';
import { adminApi } from '../../api/client';
import { useAdminAuth } from '../useAdminAuth';
import StatusToggle from '../components/StatusToggle';

const emptyForm = {
  title: '',
  collegeIds: [],
  durationMinutes: 30,
  questionsToServe: 10,
  defaultMarksPerQuestion: 1,
};

const TestsPage = () => {
  const { admin } = useAdminAuth();
  const [tests, setTests] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editingTest, setEditingTest] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const [collegesDropdownOpen, setCollegesDropdownOpen] = useState(false);
  const [editCollegesDropdownOpen, setEditCollegesDropdownOpen] = useState(false);
  const collegesDropdownRef = useRef(null);
  const editCollegesDropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (collegesDropdownRef.current && !collegesDropdownRef.current.contains(e.target)) {
        setCollegesDropdownOpen(false);
      }
      if (editCollegesDropdownRef.current && !editCollegesDropdownRef.current.contains(e.target)) {
        setEditCollegesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');

    const unsubTests = adminApi.subscribeTests(
      (data) => {
        setTests(data);
        setLoading(false);
      },
      (err) => setError(err.message)
    );

    const unsubColleges = adminApi.subscribeColleges(
      (data) => setColleges(data),
      (err) => setError(err.message)
    );

    return () => {
      unsubTests();
      unsubColleges();
    };
  }, []);

  const toggleCollege = (collegeId) => {
    setForm((prev) => {
      const ids = prev.collegeIds || [];
      if (ids.includes(collegeId)) {
        return { ...prev, collegeIds: ids.filter((id) => id !== collegeId) };
      } else {
        return { ...prev, collegeIds: [...ids, collegeId] };
      }
    });
  };

  const toggleEditCollege = (collegeId) => {
    setEditingTest((prev) => {
      if (!prev) return prev;
      const ids = prev.collegeIds || [];
      if (ids.includes(collegeId)) {
        return { ...prev, collegeIds: ids.filter((id) => id !== collegeId) };
      } else {
        return { ...prev, collegeIds: [...ids, collegeId] };
      }
    });
  };


  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.collegeIds || form.collegeIds.length === 0) {
      setError('Please select at least one college.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await adminApi.createTest({
        ...form,
        durationMinutes: Number(form.durationMinutes),
        questionsToServe: Number(form.questionsToServe),
        defaultMarksPerQuestion: Number(form.defaultMarksPerQuestion),
      }, admin?.email);
      setForm(emptyForm);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const patchTest = async (test, data) => {
    setTests((prev) => prev.map((t) => (t.id === test.id ? { ...t, ...data } : t)));
    try {
      await adminApi.updateTest(test.id, data, admin?.email);
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (test) => {
    setEditingTest({
      id: test.id,
      title: test.title,
      collegeIds: test.collegeIds || (test.collegeId ? [test.collegeId] : []),
      durationMinutes: test.durationMinutes,
      questionsToServe: test.questionsToServe,
      defaultMarksPerQuestion: test.defaultMarksPerQuestion,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingTest.collegeIds || editingTest.collegeIds.length === 0) {
      setError('Please select at least one college.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await adminApi.updateTest(editingTest.id, {
        title: editingTest.title,
        collegeIds: editingTest.collegeIds,
        durationMinutes: Number(editingTest.durationMinutes),
        questionsToServe: Number(editingTest.questionsToServe),
        defaultMarksPerQuestion: Number(editingTest.defaultMarksPerQuestion),
      }, admin?.email);
      setEditingTest(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const copyStudentLink = (testId) => {
    const url = `${window.location.origin}/test/${testId}`;
    navigator.clipboard?.writeText(url);
    setToastMsg('Link copied to clipboard!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="tp-scope">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <Trophy className="text-brand" size={24} /> Tests
          </h1>
          <p className="text-sm text-slate-500">
            Create a test drive for a college, then toggle it Active/Inactive and open/close registration.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Cancel' : 'New Test'}
        </button>
      </div>


      {error && <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="mb-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Test Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
              placeholder="e.g. XYZ College Internship Screening 2026"
            />
          </div>

          <div className="relative z-20" ref={collegesDropdownRef}>
            <label className="mb-1 block text-sm font-medium text-slate-700">Colleges (select all that apply)</label>
            <button
              type="button"
              onClick={() => setCollegesDropdownOpen((o) => !o)}
              className="flex min-h-[38px] w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100 cursor-pointer"
            >
              <div className="flex flex-wrap gap-1">
                {!form.collegeIds || form.collegeIds.length === 0 ? (
                   <span className="text-slate-400">Select colleges...</span>
                ) : (
                  colleges
                    .filter((c) => form.collegeIds.includes(c.id))
                    .map((c) => (
                      <span
                        key={c.id}
                        className="inline-flex items-center gap-1 rounded bg-orange-50 px-2 py-0.5 text-xs font-bold text-orange-700 border border-orange-200/50"
                      >
                        {c.name}
                      </span>
                    ))
                )}
              </div>
              <ChevronDown size={16} className={`text-slate-400 transform transition-transform duration-200 ${collegesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {collegesDropdownOpen && (
              <div className="absolute left-0 right-0 z-30 mt-1 max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                {colleges.length === 0 ? (
                  <div className="px-3 py-2 text-xs text-slate-400 font-medium">No colleges available. Add colleges first.</div>
                ) : (
                  colleges.map((c) => {
                    const isChecked = (form.collegeIds || []).includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleCollege(c.id)}
                        className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-xs font-bold transition-colors cursor-pointer ${
                          isChecked ? "bg-orange-50 text-orange-700" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          className="h-3.5 w-3.5 rounded accent-orange-600 cursor-pointer"
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Duration (minutes)</label>
            <input
              type="number"
              min={1}
              required
              value={form.durationMinutes}
              onChange={(e) => setForm({ ...form, durationMinutes: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Questions served per student
            </label>
            <input
              type="number"
              min={1}
              required
              value={form.questionsToServe}
              onChange={(e) => setForm({ ...form, questionsToServe: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
            />
            <p className="mt-1 text-xs text-slate-400">e.g. 25 questions picked randomly out of a pool of 50.</p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Default marks / question</label>
            <input
              type="number"
              min={0.5}
              step="0.5"
              required
              value={form.defaultMarksPerQuestion}
              onChange={(e) => setForm({ ...form, defaultMarksPerQuestion: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
            />
            <p className="mt-1 text-xs text-slate-400">
              Pre-fills new questions in the bank; each question's marks can still be edited individually.
            </p>
          </div>

          <div className="sm:col-span-2">
            <button
              disabled={saving}
              className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              Create Test
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="p-8 text-center text-sm text-slate-400">Loading...</div>
      ) : tests.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-400">
          No tests created yet.
        </div>
      ) : (
        <div className="space-y-4">
          {tests.map((test) => {
            const poolShort = test.questionCount < test.questionsToServe;
            return (
              <div key={test.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/30 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">{test.title}</h3>
                    
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-slate-400 mt-1.5">
                      <span className="text-slate-600">{test.college?.name || 'Unassigned College'}</span>
                      <span className="inline-block h-1 w-1 rounded-full bg-slate-300" />
                      <span>{test.durationMinutes} min</span>
                      <span className="inline-block h-1 w-1 rounded-full bg-slate-300" />
                      <span className="text-orange-600 font-bold">{test.registeredCount || 0} registered</span>
                    </div>

                    <div className="pt-1">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        poolShort ? 'bg-amber-50 text-amber-700 border border-amber-200/50' : 'bg-slate-50 text-slate-600 border border-slate-200/30'
                      }`}>
                        {poolShort ? <AlertTriangle size={13} /> : <CheckCircle2 size={13} className="text-emerald-500" />}
                        <span>Question pool: {test.questionCount || 0} / {test.questionsToServe || 0} served</span>
                        {poolShort && <span className="ml-1 font-medium">— need {test.questionsToServe - test.questionCount} more</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <StatusToggle
                      checked={test.isActive}
                      onChange={(val) => patchTest(test, { isActive: val })}
                      onLabel="Active"
                      offLabel="Inactive"
                    />
                    <StatusToggle
                      checked={test.registrationOpen}
                      onChange={(val) => patchTest(test, { registrationOpen: val })}
                      onLabel="Registration Open"
                      offLabel="Registration Closed"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4 print:hidden">
                  <Link
                    to={`/aashasm-portal/test-portal/tests/${test.id}/questions`}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <ClipboardList size={15} /> Manage Questions
                  </Link>
                  
                  <Link
                    to={`/aashasm-portal/test-portal/tests/${test.id}/registrations`}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <Trophy size={15} /> Registrations & Scoreboard
                  </Link>
                  
                  <button
                    onClick={() => copyStudentLink(test.id)}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
                  >
                    <Link2 size={15} /> Copy Student Link
                  </button>
                  
                  <button
                    onClick={() => startEdit(test)}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
                  >
                    <Edit size={15} /> Edit Test
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Test Modal */}
      {editingTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-100 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit className="text-orange-500" size={18} /> Edit Test Configuration
              </h3>
              <button
                type="button"
                onClick={() => setEditingTest(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Test Title</label>
                <input
                  required
                  value={editingTest.title}
                  onChange={(e) => setEditingTest({ ...editingTest, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
                  placeholder="e.g. XYZ College Internship Screening 2026"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative z-20 sm:col-span-2" ref={editCollegesDropdownRef}>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Colleges (select all that apply)</label>
                  <button
                    type="button"
                    onClick={() => setEditCollegesDropdownOpen((o) => !o)}
                    className="flex min-h-[38px] w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100 cursor-pointer"
                  >
                    <div className="flex flex-wrap gap-1">
                      {!editingTest.collegeIds || editingTest.collegeIds.length === 0 ? (
                        <span className="text-slate-400">Select colleges...</span>
                      ) : (
                        colleges
                          .filter((c) => editingTest.collegeIds.includes(c.id))
                          .map((c) => (
                            <span
                              key={c.id}
                              className="inline-flex items-center gap-1 rounded bg-orange-50 px-2 py-0.5 text-xs font-bold text-orange-700 border border-orange-200/50"
                            >
                              {c.name}
                            </span>
                          ))
                      )}
                    </div>
                    <ChevronDown size={16} className={`text-slate-400 transform transition-transform duration-200 ${editCollegesDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {editCollegesDropdownOpen && (
                    <div className="absolute left-0 right-0 z-30 mt-1 max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                      {colleges.length === 0 ? (
                        <div className="px-3 py-2 text-xs text-slate-400 font-medium">No colleges available. Add colleges first.</div>
                      ) : (
                        colleges.map((c) => {
                          const isChecked = (editingTest.collegeIds || []).includes(c.id);
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => toggleEditCollege(c.id)}
                              className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-xs font-bold transition-colors cursor-pointer ${
                                isChecked ? "bg-orange-50 text-orange-700" : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                readOnly
                                className="h-3.5 w-3.5 rounded accent-orange-600 cursor-pointer"
                              />
                              <span>{c.name}</span>
                            </button>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Duration (minutes)</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={editingTest.durationMinutes}
                    onChange={(e) => setEditingTest({ ...editingTest, durationMinutes: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Questions served
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={editingTest.questionsToServe}
                    onChange={(e) => setEditingTest({ ...editingTest, questionsToServe: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Default marks</label>
                  <input
                    type="number"
                    min={0.5}
                    step="0.5"
                    required
                    value={editingTest.defaultMarksPerQuestion}
                    onChange={(e) => setEditingTest({ ...editingTest, defaultMarksPerQuestion: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingTest(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 transition-opacity"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom bottom-right Toast notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-950/20 animate-fade-in-up">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};

export default TestsPage;
