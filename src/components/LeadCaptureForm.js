import { useMemo, useState } from "react";
import { getContactApiUrl } from "../config";

const initial = { name: "", phone: "", service: "Bulk SMS Service", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.phone.trim()) errors.phone = "Phone is required.";
  if (!/^[\d\s+\-()]{7,}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!values.message.trim()) errors.message = "Please share your requirement.";
  return errors;
}

export default function LeadCaptureForm({ title = "Get a free demo", compact = false }) {
  const [values, setValues] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const errors = useMemo(() => validate(values), [values]);

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setServerError("");
    setSuccess("");

    if (Object.keys(errors).length > 0) return;

    setSaving(true);
    try {
      const res = await fetch(getContactApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: "",
          message: `Service: ${values.service}\n${values.message.trim()}`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(data.message || "Unable to submit now. Please try again.");
        return;
      }
      setValues(initial);
      setSubmitted(false);
      setSuccess("Thank you. Our Pune team will call you soon.");
    } catch {
      setServerError("Unable to connect right now. Please try again in a moment.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">
        Affordable pricing, no setup cost, and easy-to-use campaigns for small businesses in
        India.
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="lead-name">
            Name
          </label>
          <input
            id="lead-name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Your full name"
          />
          {submitted && errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="lead-phone">
            Phone
          </label>
          <input
            id="lead-phone"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="+91"
          />
          {submitted && errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="lead-service">
            Service
          </label>
          <select
            id="lead-service"
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option>Bulk SMS Service</option>
            <option>WhatsApp Marketing</option>
            <option>Website Development</option>
          </select>
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label className="block text-sm font-medium text-slate-700" htmlFor="lead-message">
            Requirement
          </label>
          <textarea
            id="lead-message"
            rows={compact ? 2 : 3}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Tell us about your business goals"
          />
          {submitted && errors.message && (
            <p className="mt-1 text-xs text-red-600">{errors.message}</p>
          )}
        </div>
        <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
          >
            {saving ? "Submitting..." : "Free Demo"}
          </button>
          <a
            href="/contact"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Contact Now
          </a>
        </div>
        {serverError && <p className="sm:col-span-2 text-sm text-red-600">{serverError}</p>}
        {success && <p className="sm:col-span-2 text-sm text-emerald-700">{success}</p>}
      </form>
    </section>
  );
}
