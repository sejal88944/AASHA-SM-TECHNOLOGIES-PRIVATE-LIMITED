import React, { useEffect, useState, useRef } from 'react';
import {
  Activity,
  Search,
  Filter,
  Loader2,
  UserPlus,
  Pencil,
  Trash2,
  CheckSquare,
  FlaskConical,
  HelpCircle,
  ShieldCheck,
  FileText,
  Clock,
  Download,
  RefreshCw,
  FileDown
} from 'lucide-react';
import { adminApi } from '../../api/client';

/* ─── Action-type metadata ─────────────────────────────────────────── */
const ACTION_META = {
  CREATE_COLLEGE: { label: 'College Created', color: 'emerald', icon: ShieldCheck },
  UPDATE_COLLEGE: { label: 'College Updated', color: 'sky', icon: ShieldCheck },
  DELETE_COLLEGE: { label: 'College Deleted', color: 'red', icon: Trash2 },
  CREATE_FIELD: { label: 'Field Created', color: 'emerald', icon: TagsIcon },
  UPDATE_FIELD: { label: 'Field Updated', color: 'sky', icon: Pencil },
  DELETE_FIELD: { label: 'Field Deleted', color: 'red', icon: Trash2 },
  CREATE_TEST: { label: 'Test Created', color: 'emerald', icon: FlaskConical },
  UPDATE_TEST: { label: 'Test Updated', color: 'sky', icon: Pencil },
  DELETE_TEST: { label: 'Test Deleted', color: 'red', icon: Trash2 },
  CREATE_QUESTION: { label: 'Question Added', color: 'violet', icon: HelpCircle },
  UPDATE_QUESTION: { label: 'Question Updated', color: 'sky', icon: HelpCircle },
  DELETE_QUESTION: { label: 'Question Deleted', color: 'red', icon: HelpCircle },
  OVERRIDE_MARKS: { label: 'Marks Overridden', color: 'amber', icon: CheckSquare },
  REGISTER_STUDENT: { label: 'Student Registered', color: 'teal', icon: UserPlus },
  SUBMIT_TEST: { label: 'Test Submitted', color: 'indigo', icon: FileText },
};

/* Substitute for Tags icon */
function TagsIcon(props) { return <Filter {...props} />; }

const COLOR_CLASSES = {
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  sky: 'bg-sky-50 text-sky-700 border-sky-200',
  red: 'bg-red-50 text-red-600 border-red-200',
  violet: 'bg-violet-50 text-violet-700 border-violet-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  slate: 'bg-slate-50 text-slate-600 border-slate-200',
};

const TIMELINE_DOTS = {
  emerald: 'bg-emerald-400',
  sky: 'bg-sky-400',
  red: 'bg-red-400',
  violet: 'bg-violet-400',
  amber: 'bg-amber-400',
  teal: 'bg-teal-400',
  indigo: 'bg-indigo-400',
  slate: 'bg-slate-300',
};

/* ─── RGB colours for PDF rows ────────────────────────────────────── */
const PDF_ROW_COLORS = {
  emerald: [209, 250, 229],
  sky: [224, 242, 254],
  red: [254, 226, 226],
  violet: [237, 233, 254],
  amber: [254, 243, 199],
  teal: [204, 251, 241],
  indigo: [224, 231, 255],
  slate: [248, 250, 252],
};

function ActionBadge({ action }) {
  const meta = ACTION_META[action] || { label: action, color: 'slate', icon: Activity };
  const Icon = meta.icon;
  const cls = COLOR_CLASSES[meta.color] || COLOR_CLASSES.slate;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-bold ${cls}`}>
      <Icon size={10} />
      {meta.label}
    </span>
  );
}

function formatDate(ts) {
  if (!ts) return '—';
  let d;
  if (ts.toDate) d = ts.toDate();
  else if (ts.seconds) d = new Date(ts.seconds * 1000);
  else d = new Date(ts);
  return d.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true
  });
}

function formatDateShort(ts) {
  if (!ts) return '—';
  let d;
  if (ts.toDate) d = ts.toDate();
  else if (ts.seconds) d = new Date(ts.seconds * 1000);
  else d = new Date(ts);
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatTime(ts) {
  if (!ts) return '—';
  let d;
  if (ts.toDate) d = ts.toDate();
  else if (ts.seconds) d = new Date(ts.seconds * 1000);
  else d = new Date(ts);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
}

const ALL_ACTION_TYPES = Object.keys(ACTION_META);

/* ─── Main Page Component ─────────────────────────────────────────── */
const ActivityLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterAction, setFilterAction] = useState('ALL');
  const [newCount, setNewCount] = useState(0);
  const [pdfExporting, setPdfExporting] = useState(false);
  const prevLen = useRef(0);

  useEffect(() => {
    setLoading(true);
    const unsub = adminApi.subscribeActivityLogs(
      (data) => {
        setLogs(data);
        if (prevLen.current > 0 && data.length > prevLen.current) {
          setNewCount(n => n + (data.length - prevLen.current));
        }
        prevLen.current = data.length;
        setLoading(false);
      },
      (err) => {
        setError(err.message || 'Failed to load activity logs.');
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  /* Derived filtered list */
  const filtered = logs.filter(log => {
    const matchesAction = filterAction === 'ALL' || log.action === filterAction;
    const q = search.toLowerCase();
    const matchesSearch = !q ||
      (log.details || '').toLowerCase().includes(q) ||
      (log.action || '').toLowerCase().includes(q) ||
      (log.userEmail || '').toLowerCase().includes(q);
    return matchesAction && matchesSearch;
  });

  /* ── Export CSV ─────────────────────────────────────────────────── */
  const handleExportCSV = () => {
    const rows = [['Date & Time', 'Action', 'Details', 'Admin User']];
    filtered.forEach(log => {
      rows.push([formatDate(log.timestamp), log.action, log.details || '', log.userEmail || '']);
    });
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-logs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ── Export PDF ─────────────────────────────────────────────────── */
  const handleExportPDF = async () => {
    setPdfExporting(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');

      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const pageW = doc.internal.pageSize.getWidth();
      const now = new Date();

      /* ── Header banner ── */
      doc.setFillColor(234, 88, 12); // orange-600
      doc.rect(0, 0, pageW, 22, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text('AASHA-SM Test Portal', 14, 10);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(254, 215, 170); // orange-200
      doc.text('Activity & Audit Logs — Official Report', 14, 16.5);

      /* Report meta (right side) */
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      const metaRight = pageW - 14;
      doc.text(`Generated: ${now.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}`, metaRight, 10, { align: 'right' });
      doc.text(`Total Events: ${filtered.length}  |  Filter: ${filterAction === 'ALL' ? 'All Actions' : (ACTION_META[filterAction]?.label || filterAction)}`, metaRight, 16.5, { align: 'right' });

      /* ── Thin accent line ── */
      doc.setDrawColor(234, 88, 12);
      doc.setLineWidth(0.4);
      doc.line(0, 22, pageW, 22);

      /* ── Summary stats row ── */
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(`Search filter: "${search || 'none'}"   |   Showing ${filtered.length} of ${logs.length} total events`, 14, 29);

      /* ── Build table rows with colour coding ── */
      const tableBody = filtered.map(log => {
        const meta = ACTION_META[log.action] || { color: 'slate', label: log.action };
        return {
          rowData: [
            formatDateShort(log.timestamp),
            formatTime(log.timestamp),
            meta.label,
            log.details || '—',
            log.userEmail || 'System / Candidate'
          ],
          color: PDF_ROW_COLORS[meta.color] || PDF_ROW_COLORS.slate,
          actionColor: meta.color
        };
      });

      /* ── Action label text colours for PDF ── */
      const PDF_TEXT_COLORS = {
        emerald: [6, 95, 70],
        sky: [3, 105, 161],
        red: [185, 28, 28],
        violet: [109, 40, 217],
        amber: [146, 64, 14],
        teal: [17, 94, 89],
        indigo: [67, 56, 202],
        slate: [71, 85, 105],
      };

      autoTable(doc, {
        startY: 33,
        head: [['Date', 'Time', 'Action', 'Details', 'Admin User']],
        body: tableBody.map(r => r.rowData),
        styles: {
          fontSize: 8,
          cellPadding: { top: 3.5, bottom: 3.5, left: 4, right: 4 },
          valign: 'middle',
          overflow: 'linebreak',
          textColor: [30, 41, 59],
          lineColor: [226, 232, 240],
          lineWidth: 0.15,
        },
        headStyles: {
          fillColor: [15, 23, 42],       // slate-900
          textColor: [248, 250, 252],    // slate-50
          fontStyle: 'bold',
          fontSize: 8.5,
          cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
        },
        columnStyles: {
          0: { cellWidth: 24, fontStyle: 'bold' },
          1: { cellWidth: 24, textColor: [100, 116, 139] },
          2: { cellWidth: 36 },
          3: { cellWidth: 'auto' },
          4: { cellWidth: 44, textColor: [100, 116, 139] },
        },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        didParseCell: (data) => {
          if (data.section === 'body' && data.column.index === 2) {
            const rowInfo = tableBody[data.row.index];
            if (rowInfo) {
              const bg = rowInfo.color;
              const txt = PDF_TEXT_COLORS[rowInfo.actionColor] || [71, 85, 105];
              data.cell.styles.fillColor = bg;
              data.cell.styles.textColor = txt;
              data.cell.styles.fontStyle = 'bold';
            }
          }
        },
        didDrawPage: (data) => {
          /* Footer on every page */
          const pageCount = doc.internal.getNumberOfPages();
          const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
          doc.setFontSize(7.5);
          doc.setTextColor(148, 163, 184);
          doc.text(
            `AASHA-SM Test Portal — Activity Logs Report  |  Page ${currentPage} of ${pageCount}`,
            pageW / 2,
            doc.internal.pageSize.getHeight() - 6,
            { align: 'center' }
          );
          /* Orange bottom border */
          doc.setDrawColor(234, 88, 12);
          doc.setLineWidth(0.5);
          doc.line(0, doc.internal.pageSize.getHeight() - 3, pageW, doc.internal.pageSize.getHeight() - 3);
        },
        margin: { top: 33, bottom: 12, left: 14, right: 14 },
        tableLineColor: [226, 232, 240],
        tableLineWidth: 0.15,
      });

      const filename = `AASHA-SM_Activity-Logs_${now.toISOString().slice(0, 10)}.pdf`;
      doc.save(filename);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF export failed. Please try again.');
    } finally {
      setPdfExporting(false);
    }
  };

  return (
    <div className="tp-scope max-w-6xl space-y-6">
      {/* ── Page Header ───────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Activity className="text-brand" size={24} />
            Activity &amp; Audit Logs
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Real-time log of every change made across the portal — who did what and when.
          </p>
        </div>

        {/* Live indicator + export buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live · {logs.length} events
          </div>

          {/* CSV Export */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
          >
            <Download size={13} /> Export CSV
          </button>

          {/* PDF Export */}
          <button
            onClick={handleExportPDF}
            disabled={pdfExporting || filtered.length === 0}
            className="flex items-center gap-1.5 rounded-xl border border-orange-300 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700 hover:bg-orange-100 transition-colors cursor-pointer shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pdfExporting
              ? <><Loader2 size={13} className="animate-spin" /> Generating…</>
              : <><FileDown size={13} /> Export PDF</>
            }
          </button>
        </div>
      </div>

      {/* ── Filters Bar ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setNewCount(0); }}
            placeholder="Search logs by detail, action, or user…"
            className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 text-slate-800 placeholder-slate-400 font-medium shadow-sm"
          />
        </div>

        {/* Action Type Filter */}
        <div className="relative">
          <Filter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={filterAction}
            onChange={e => setFilterAction(e.target.value)}
            className="appearance-none rounded-xl border border-slate-200 bg-white pl-8 pr-8 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 shadow-sm cursor-pointer"
          >
            <option value="ALL">All Actions</option>
            {ALL_ACTION_TYPES.map(a => (
              <option key={a} value={a}>{ACTION_META[a]?.label || a}</option>
            ))}
          </select>
        </div>
      </div>

      {/* New logs notification */}
      {newCount > 0 && (
        <button
          onClick={() => setNewCount(0)}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 py-2.5 text-sm font-bold text-orange-600 hover:bg-orange-100 transition-colors cursor-pointer"
        >
          <RefreshCw size={14} className="animate-spin" />
          {newCount} new event{newCount > 1 ? 's' : ''} — click to dismiss
        </button>
      )}

      {/* ── Logs Table / Timeline ────────────────── */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-100/40 overflow-hidden">
        {/* Stats row */}
        <div className="border-b border-slate-100 px-6 py-3 bg-slate-50/60 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {filtered.length} of {logs.length} events
          </span>
          {(search || filterAction !== 'ALL') && (
            <button
              onClick={() => { setSearch(''); setFilterAction('ALL'); }}
              className="text-[11px] font-bold text-orange-500 hover:text-orange-700 cursor-pointer"
            >
              Clear Filters ×
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-20 text-sm text-slate-400">
            <Loader2 size={18} className="animate-spin text-orange-500" />
            Loading audit trail…
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="p-6 text-center text-sm font-semibold text-red-600 bg-red-50">{error}</div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Activity size={28} className="text-slate-300" />
            </div>
            <p className="text-sm font-semibold text-slate-400">No activity logs found.</p>
            <p className="text-xs text-slate-300">Events will appear here as changes are made to the portal.</p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-white">
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 w-44">
                    <span className="flex items-center gap-1.5"><Clock size={11} />Date &amp; Time</span>
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 w-44">
                    Action
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Details
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 w-40">
                    Admin User
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((log, idx) => {
                  const meta = ACTION_META[log.action] || { color: 'slate' };
                  const dotClass = TIMELINE_DOTS[meta.color] || TIMELINE_DOTS.slate;
                  return (
                    <tr
                      key={log.id || idx}
                      className="hover:bg-slate-50/60 transition-colors duration-100 group"
                    >
                      {/* Timestamp */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`} />
                          <div>
                            <p className="text-xs font-bold text-slate-600">{formatDateShort(log.timestamp)}</p>
                            <p className="text-[11px] text-slate-400 font-medium">{formatTime(log.timestamp)}</p>
                          </div>
                        </div>
                      </td>

                      {/* Action Badge */}
                      <td className="px-5 py-3.5">
                        <ActionBadge action={log.action} />
                      </td>

                      {/* Details */}
                      <td className="px-5 py-3.5">
                        <p className="text-sm text-slate-700 font-medium leading-snug max-w-lg">
                          {log.details || <span className="text-slate-300 italic">No description</span>}
                        </p>
                      </td>

                      {/* User */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          {log.userEmail && log.userEmail !== 'System' ? (
                            <>
                              <span className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-600 uppercase shrink-0">
                                {log.userEmail[0]}
                              </span>
                              <span className="text-xs text-slate-700 font-semibold truncate max-w-[130px]" title={log.userEmail}>
                                {log.userEmail}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase shrink-0">
                                S
                              </span>
                              <span className="text-xs text-slate-400 italic" title="System Action or Candidate Attempt">
                                System / Candidate
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogsPage;
