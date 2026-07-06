import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Pencil, Loader2, X, ListChecks } from 'lucide-react';
import { adminApi } from '../../api/client';
import { useAdminAuth } from '../useAdminAuth';

function emptyForm(defaultMarks = 1) {
  return {
    type: 'MCQ',
    text: '',
    marks: defaultMarks,
    options: [
      { text: '', isCorrect: true },
      { text: '', isCorrect: false },
    ],
    referenceAnswer: '',
  };
}

const TestQuestionsPage = () => {
  const { admin } = useAdminAuth();
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [testData, questionsData] = await Promise.all([
        adminApi.getTest(testId),
        adminApi.listQuestions(testId),
      ]);
      setTest(testData);
      setQuestions(questionsData.questions);
      setForm(emptyForm(testData.defaultMarksPerQuestion));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  const resetForm = () => {
    setForm(emptyForm(test?.defaultMarksPerQuestion));
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (q) => {
    setForm({
      type: q.type,
      text: q.text,
      marks: q.marks,
      options:
        q.type === 'MCQ'
          ? q.options.map((o) => ({ text: o.text, isCorrect: o.isCorrect }))
          : emptyForm().options,
      referenceAnswer: q.referenceAnswer || '',
    });
    setEditingId(q.id);
    setShowForm(true);
  };

  const updateOption = (idx, patch) => {
    setForm((f) => ({
      ...f,
      options: f.options.map((o, i) => (i === idx ? { ...o, ...patch } : o)),
    }));
  };

  const setCorrectOption = (idx) => {
    setForm((f) => ({
      ...f,
      options: f.options.map((o, i) => ({ ...o, isCorrect: i === idx })),
    }));
  };

  const addOption = () => setForm((f) => ({ ...f, options: [...f.options, { text: '', isCorrect: false }] }));
  const removeOption = (idx) =>
    setForm((f) => ({ ...f, options: f.options.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        type: form.type,
        text: form.text,
        marks: Number(form.marks),
        ...(form.type === 'MCQ'
          ? { options: form.options.filter((o) => o.text.trim()) }
          : { referenceAnswer: form.referenceAnswer }),
      };

      if (editingId) {
        await adminApi.updateQuestion(editingId, payload, admin?.email);
      } else {
        await adminApi.createQuestion(testId, payload, admin?.email);
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try {
      await adminApi.deleteQuestion(id, admin?.email);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="tp-scope p-8 text-center text-sm text-slate-400">Loading...</div>;

  return (
    <div className="tp-scope">
      <Link
        to="/aashasm-portal/test-portal"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={15} /> Back to Tests
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <ListChecks className="text-brand" size={24} /> {test?.title} — Question Bank
          </h1>
          <p className="text-sm text-slate-500">
            {questions.length} question(s) in the pool • {test?.questionsToServe} will be served per student
          </p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Cancel' : 'Add Question'}
        </button>
      </div>

      {error && <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex gap-2">
            {['MCQ', 'CODING'].map((t) => (
              <button
                type="button"
                key={t}
                disabled={Boolean(editingId)}
                onClick={() => setForm((f) => ({ ...f, type: t }))}
                className={`rounded-lg px-4 py-1.5 text-sm font-semibold ${
                  form.type === t ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600'
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {t === 'MCQ' ? 'Multiple Choice' : 'Coding'}
              </button>
            ))}
          </div>

          <label className="mb-1 block text-sm font-medium text-slate-700">
            {form.type === 'MCQ' ? 'Question Text' : 'Problem Statement'}
          </label>
          <textarea
            required
            rows={3}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
          />

          <label className="mb-1 block text-sm font-medium text-slate-700">Marks</label>
          <input
            type="number"
            min={0.5}
            step="0.5"
            required
            value={form.marks}
            onChange={(e) => setForm({ ...form, marks: e.target.value })}
            className="mb-4 w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
          />

          {form.type === 'MCQ' ? (
            <div className="mb-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Options (select the correct one)
              </label>
              <div className="space-y-2">
                {form.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct-option"
                      checked={opt.isCorrect}
                      onChange={() => setCorrectOption(idx)}
                      className="h-4 w-4 accent-orange-600"
                    />
                    <input
                      required
                      value={opt.text}
                      onChange={(e) => updateOption(idx, { text: e.target.value })}
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
                    />
                    {form.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(idx)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addOption}
                className="mt-2 text-sm font-medium text-brand hover:underline"
              >
                + Add another option
              </button>
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Reference / Model Answer
              </label>
              <textarea
                required
                rows={6}
                value={form.referenceAnswer}
                onChange={(e) => setForm({ ...form, referenceAnswer: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
                placeholder="The student's submitted code is compared to this using text similarity (>= 75% = correct). This is never sent to the student."
              />
            </div>
          )}

          <button
            disabled={saving}
            className="mt-5 flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {editingId ? 'Save Changes' : 'Add Question'}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {questions.map((q, idx) => (
          <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="mb-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                  Q{idx + 1} • {q.type} • {q.marks} marks
                </span>
                <p className="text-sm text-slate-800">{q.text}</p>
                {q.type === 'MCQ' && (
                  <ul className="mt-2 space-y-1 text-sm">
                    {q.options.map((o) => (
                      <li
                        key={o.id}
                        className={o.isCorrect ? 'font-semibold text-emerald-600' : 'text-slate-500'}
                      >
                        {o.isCorrect ? '✓ ' : '• '}
                        {o.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => startEdit(q)} className="text-slate-400 hover:text-brand">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(q.id)} className="text-slate-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {questions.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-400">
            No questions yet — add MCQ or Coding questions to build the pool.
          </div>
        )}
      </div>
    </div>
  );
};

export default TestQuestionsPage;
