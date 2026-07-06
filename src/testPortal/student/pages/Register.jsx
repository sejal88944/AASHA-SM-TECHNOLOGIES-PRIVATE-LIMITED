import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, AlertCircle, GraduationCap, RotateCcw, ArrowRight, ChevronDown } from "lucide-react";
import { studentApi, studentSession } from "../../api/client";

const emptyForm = {
  name: "",
  email: "",
  collegeId: "",
  department: "",
  className: "",
  rollNumber: "",
  prnNumber: "",
  interestedFieldIds: [],
};

const RegisterPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [fields, setFields] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showResume, setShowResume] = useState(false);
  const [resumeForm, setResumeForm] = useState({ email: "", prnNumber: "" });
  const [resumeError, setResumeError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const existing = studentSession.get(testId);
    if (existing.token && existing.studentId) {
      navigate(`/test/${testId}/waiting`, { replace: true });
      return;
    }

    Promise.all([
      studentApi.getTest(testId),
      studentApi.listColleges(),
      studentApi.listFields(),
    ])
      .then(([testData, collegesData, fieldsData]) => {
        setTest(testData);
        const allowedColleges = (testData.collegeIds && testData.collegeIds.length > 0)
          ? collegesData.filter((c) => testData.collegeIds.includes(c.id))
          : collegesData;
        setColleges(allowedColleges);
        if (allowedColleges.length === 1) {
          setForm(f => ({ ...f, collegeId: allowedColleges[0].id }));
        }
        setFields(fieldsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  const toggleField = (id) => {
    setForm((f) => ({
      ...f,
      interestedFieldIds: f.interestedFieldIds.includes(id)
        ? f.interestedFieldIds.filter((x) => x !== id)
        : [...f.interestedFieldIds, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.interestedFieldIds.length === 0) {
      setError("Please select at least one field of interest.");
      return;
    }
    setSaving(true);
    try {
      const { studentId, token } = await studentApi.register(testId, form);
      studentSession.save(testId, { studentId, token });
      navigate(`/test/${testId}/waiting`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleResume = async (e) => {
    e.preventDefault();
    setResumeError("");
    try {
      const { studentId, token } = await studentApi.resume(testId, resumeForm);
      studentSession.save(testId, { studentId, token });
      navigate(`/test/${testId}/waiting`);
    } catch (err) {
      setResumeError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="tp-scope flex min-h-screen items-center justify-center bg-slate-50 text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin text-orange-500" size={20} />
          <span>Loading assessment details...</span>
        </div>
      </div>
    );
  }

  if (error && !test) {
    return (
      <div className="tp-scope flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertCircle size={18} /> {error}
        </div>
      </div>
    );
  }

  if (!test?.isActive) {
    return (
      <StatusMessage
        title="Test Drive Inactive"
        message="This assessment drive is not currently active. Please contact your college placement coordinator or placement drive administrator."
      />
    );
  }

  return (
    <div className="tp-scope min-h-screen bg-slate-50 px-3 py-8 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header Title Section */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100/70 text-orange-600 shadow-sm">
            <GraduationCap size={28} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{test.title}</h1>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            College: <strong className="text-slate-800 font-semibold">{test.college?.name || 'Open Pool'}</strong> • Duration: <strong className="text-slate-800 font-semibold">{test.durationMinutes} minutes</strong>
          </p>
        </div>

        {!test.registrationOpen ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 text-center text-sm font-medium text-amber-800 shadow-sm">
            Registration for this test is currently closed. If you already
            registered, you can resume your session below.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-slate-100 bg-white p-5 sm:p-10 shadow-xl shadow-slate-100"
          >
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-semibold text-red-700">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {/* Row 1: Personal Info */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name">
                <input
                  required
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                />
              </Field>

              <Field label="Email Address">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </div>

            {/* Row 2: College Info */}
            <Field label="College">
              <select
                required
                value={form.collegeId}
                onChange={(e) =>
                  setForm({ ...form, collegeId: e.target.value })
                }
                className={inputCls}
              >
                <option value="">Select your college...</option>
                {colleges.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>

            {/* Row 3: Class & Roll Numbers */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="col-span-2 sm:col-span-2">
                <Field label="Department">
                  <input
                    required
                    placeholder="e.g. Computer Science"
                    value={form.department}
                    onChange={(e) =>
                      setForm({ ...form, department: e.target.value })
                    }
                    className={inputCls}
                  />
                </Field>
              </div>
              <div className="col-span-2 sm:col-span-2">
                <Field label="Class / Batch">
                  <input
                    required
                    placeholder="e.g. TY B.Tech"
                    value={form.className}
                    onChange={(e) =>
                      setForm({ ...form, className: e.target.value })
                    }
                    className={inputCls}
                  />
                </Field>
              </div>
              <div className="col-span-2 sm:col-span-2">
                <Field label="Roll Number">
                  <input
                    required
                    placeholder="Class Roll No"
                    value={form.rollNumber}
                    onChange={(e) =>
                      setForm({ ...form, rollNumber: e.target.value })
                    }
                    className={inputCls}
                  />
                </Field>
              </div>
              <div className="col-span-2 sm:col-span-2">
                <Field label="PRN / Register No">
                  <input
                    required
                    placeholder="PRN number"
                    value={form.prnNumber}
                    onChange={(e) =>
                      setForm({ ...form, prnNumber: e.target.value })
                    }
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>

            {/* Fields of Interest Dropdown */}
            <Field label="Fields of Interest (select all that apply)">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex min-h-[46px] w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-left text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 cursor-pointer"
                >
                  <div className="flex flex-wrap gap-1.5 overflow-hidden">
                    {form.interestedFieldIds.length === 0 ? (
                      <span className="text-slate-400 font-medium">Select fields of interest...</span>
                    ) : (
                      fields
                        .filter((f) => form.interestedFieldIds.includes(f.id))
                        .map((f) => (
                          <span
                            key={f.id}
                            className="inline-flex items-center gap-1 rounded-lg bg-orange-50 px-2.5 py-0.5 text-xs font-bold text-orange-700 border border-orange-200/50"
                          >
                            {f.name}
                          </span>
                        ))
                    )}
                  </div>
                  <span className="text-slate-400 ml-2">
                    <ChevronDown size={18} className={`transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 right-0 z-30 mt-2 max-h-60 overflow-y-auto rounded-xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-100/80">
                    <div className="space-y-1">
                      {fields.map((f) => {
                        const isChecked = form.interestedFieldIds.includes(f.id);
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => toggleField(f.id)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                              isChecked
                                ? "bg-orange-50/50 text-orange-700"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="h-4 w-4 rounded accent-orange-600 cursor-pointer"
                            />
                            <span>{f.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </Field>

            {/* Submit Button */}
            <button
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-all duration-200 hover:opacity-95 hover:shadow-xl hover:shadow-orange-600/25 active:scale-[0.99] disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              <span>Register & Start Test</span>
              {!saving && <ArrowRight size={16} />}
            </button>
          </form>
        )}

        {/* Resume Option Toggle */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowResume((v) => !v)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-orange-600 transition-colors"
          >
            <RotateCcw size={15} />
            <span>Already registered? Resume your attempt</span>
          </button>
        </div>

        {/* Resume Form */}
        {showResume && (
          <form
            onSubmit={handleResume}
            className="mt-4 space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-100"
          >
            {resumeError && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-700">
                {resumeError}
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Email Address">
                <input
                  type="email"
                  required
                  placeholder="Enter registered email"
                  value={resumeForm.email}
                  onChange={(e) =>
                    setResumeForm({ ...resumeForm, email: e.target.value })
                  }
                  className={inputCls}
                />
              </Field>
              <Field label="PRN Number">
                <input
                  required
                  placeholder="Enter PRN number"
                  value={resumeForm.prnNumber}
                  onChange={(e) =>
                    setResumeForm({ ...resumeForm, prnNumber: e.target.value })
                  }
                  className={inputCls}
                />
              </Field>
            </div>
            <button className="w-full flex items-center justify-center rounded-xl bg-slate-900 py-3 text-sm font-bold text-white shadow-md shadow-slate-900/15 hover:bg-slate-800 transition-colors">
              Resume Attempt
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 text-slate-800 placeholder-slate-400 font-medium";

const Field = ({ label, children }) => (
  <div>
    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
      {label}
    </label>
    {children}
  </div>
);

export const StatusMessage = ({ title, message }) => (
  <div className="tp-scope flex min-h-screen items-center justify-center bg-slate-50 px-4">
    <div className="max-w-md rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-lg shadow-slate-100">
      <h1 className="mb-2 text-xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
      <p className="text-sm text-slate-500 font-medium">{message}</p>
    </div>
  </div>
);

export default RegisterPage;
