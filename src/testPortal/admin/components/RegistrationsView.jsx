import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileSpreadsheet, Search, X, Loader2, ClipboardList } from 'lucide-react';
import { adminApi } from '../../api/client';

const SORT_OPTIONS = [
  { value: 'marks_desc', label: 'Marks (high to low)' },
  { value: 'marks_asc', label: 'Marks (low to high)' },
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'registered_desc', label: 'Registered (newest)' },
  { value: 'registered_asc', label: 'Registered (oldest)' },
];

const emptyFilters = { name: '', prn: '', roll: '', minMarks: '', maxMarks: '', collegeId: '', testId: '' };

function statusPill(status) {
  const map = {
    IN_PROGRESS: 'bg-amber-50 text-amber-700 border-amber-200/50',
    SUBMITTED: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
    AUTO_SUBMITTED: 'bg-sky-50 text-sky-700 border-sky-200/50',
  };
  const label = { IN_PROGRESS: 'In Progress', SUBMITTED: 'Submitted', AUTO_SUBMITTED: 'Auto-submitted' };
  if (!status) return <span className="inline-flex items-center rounded-full border border-slate-100 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-500">Not started</span>;
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${map[status] || 'bg-slate-100'}`}>{label[status] || status}</span>;
}

const RegistrationsView = ({ fixedTestId, title, subtitle }) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [tests, setTests] = useState([]);
  const [filters, setFilters] = useState({ ...emptyFilters, testId: fixedTestId || '' });
  const [sort, setSort] = useState('marks_desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubColleges = adminApi.subscribeColleges(setColleges, () => {});
    const unsubTests = fixedTestId ? () => {} : adminApi.subscribeTests(setTests, () => {});
    return () => {
      unsubColleges();
      unsubTests();
    };
  }, [fixedTestId]);

  useEffect(() => {
    setLoading(true);
    setError('');
    const params = { ...filters, testId: fixedTestId || filters.testId, sort };
    const unsub = adminApi.subscribeRegistrations(
      params,
      (data) => {
        setStudents(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsub;
  }, [filters, sort, fixedTestId]);

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'College', 'Department', 'Class', 'Roll No.', 'PRN', 'Status', 'Marks', 'Max Marks', 'Registered At', 'Started At'];
    const rows = students.map(s => [
      s.name,
      s.email,
      s.college,
      s.department,
      s.className,
      s.rollNumber,
      s.prnNumber,
      s.attempt?.status || 'NOT_STARTED',
      s.attempt?.totalMarks != null ? s.attempt.totalMarks : '',
      s.attempt?.maxMarks != null ? s.attempt.maxMarks : '',
      s.registeredAt ? new Date(s.registeredAt).toLocaleString() : '',
      s.attempt?.startedAt ? new Date(s.attempt.startedAt).toLocaleString() : ''
    ]);
    
    const csvContent = [
      headers.join(','), 
      ...rows.map(e => e.map(val => `"${String(val ?? '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${String(title || 'registrations').replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleReset = () => {
    const cleared = { ...emptyFilters, testId: fixedTestId || '' };
    setFilters(cleared);
    setSort('marks_desc');
  };

  return (
    <div className="tp-scope space-y-6">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden !important;
          }
          .tp-scope, .tp-scope * {
            visibility: visible !important;
          }
          .tp-scope {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            background: white !important;
            color: black !important;
          }
          header, footer, nav, aside, .footer-section, .navbar-section, button, form, .flex, .mb-4, .sticky {
            display: none !important;
          }
          .overflow-x-auto {
            overflow: visible !important;
            border: none !important;
          }
          table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
          th, td {
            border: 1px solid #cbd5e1 !important;
            padding: 8px 10px !important;
            color: #0f172a !important;
          }
          tr {
            page-break-inside: avoid !important;
          }
        }
      `}} />

      {/* Title & Actions Navbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ClipboardList className="text-orange-500" size={24} /> {title}
          </h1>
          {subtitle && <p className="text-sm text-slate-500 font-medium mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            <FileSpreadsheet size={15} className="text-emerald-600" /> Export CSV
          </button>
          <button
            type="button"
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            <Download size={15} className="text-orange-500" /> Print/Save PDF
          </button>
        </div>
      </div>

      {/* Filters Form Dashboard Card */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/40 space-y-4 print:hidden"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Candidate Name">
            <input
              placeholder="Filter by name..."
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field label="PRN Number">
            <input
              placeholder="PRN code..."
              value={filters.prn}
              onChange={(e) => setFilters({ ...filters, prn: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field label="Roll number">
            <input
              placeholder="Class Roll No..."
              value={filters.roll}
              onChange={(e) => setFilters({ ...filters, roll: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field label="Sorting Parameters">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={inputCls}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Min Score">
            <input
              type="number"
              placeholder="0"
              value={filters.minMarks}
              onChange={(e) => setFilters({ ...filters, minMarks: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field label="Max Score">
            <input
              type="number"
              placeholder="100"
              value={filters.maxMarks}
              onChange={(e) => setFilters({ ...filters, maxMarks: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field label="College Filter">
            <select
              value={filters.collegeId}
              onChange={(e) => setFilters({ ...filters, collegeId: e.target.value })}
              className={inputCls}
            >
              <option value="">All colleges</option>
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          {!fixedTestId && (
            <Field label="Test Assessment Drive">
              <select
                value={filters.testId}
                onChange={(e) => setFilters({ ...filters, testId: e.target.value })}
                className={inputCls}
              >
                <option value="">All tests</option>
                {tests.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </Field>
          )}
        </div>

        {/* Buttons aligned bottom-right */}
        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 mt-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Auto-filtering active
          </span>
          
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X size={14} /> Reset Filters
          </button>
        </div>
      </form>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {/* Main Registrations List Data Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-100/30">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-400 font-medium flex items-center justify-center gap-2">
            <Loader2 className="animate-spin text-orange-500" size={18} />
            <span>Loading candidates...</span>
          </div>
        ) : students.length === 0 ? (
          <div className="p-12 text-center text-sm font-medium text-slate-400">
            No matching registrations found in this drive pool.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">College</th>
                  <th className="px-6 py-4">Roll No.</th>
                  <th className="px-6 py-4">PRN</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Marks</th>
                  <th className="px-6 py-4">Registered At</th>
                  <th className="px-6 py-4">Started At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => navigate(`/aashasm-portal/test-portal/students/${s.id}`)}
                    className="cursor-pointer hover:bg-orange-50/20 transition-colors border-t border-slate-100"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">{s.name}</td>
                    <td className="px-6 py-4 font-semibold text-slate-500">{s.college}</td>
                    <td className="px-6 py-4 text-slate-500">{s.rollNumber}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{s.prnNumber}</td>
                    <td className="px-6 py-4 text-center">{statusPill(s.attempt?.status)}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-900">
                      {s.attempt?.totalMarks != null ? `${s.attempt.totalMarks} / ${s.attempt.maxMarks}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                      {new Date(s.registeredAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                      {s.attempt?.startedAt ? new Date(s.attempt.startedAt).toLocaleString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 text-slate-800 placeholder-slate-400 font-medium";

const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
      {label}
    </label>
    {children}
  </div>
);

export default RegistrationsView;
