import { useEffect, useMemo, useState } from "react";
import {
  CONTACT_EMAIL,
  getContactApiUrl,
  OFFICE_ADDRESS,
  OFFICE_MAPS_URL,
} from "../config";
import Seo from "../components/Seo";

const initial = { name: "", phone: "", email: "", message: "" };

function validate(values) {
  const errs = {};
  if (!values.name.trim()) errs.name = "Name is required.";
  if (!values.phone.trim()) errs.phone = "Phone is required.";
  else if (!/^[\d\s+\-()]{7,}$/.test(values.phone.trim()))
    errs.phone = "Enter a valid phone number.";
  if (!values.email.trim()) errs.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errs.email = "Enter a valid email address.";
  if (!values.message.trim()) errs.message = "Message is required.";
  else if (values.message.trim().length < 10)
    errs.message = "Please write at least 10 characters.";
  return errs;
}

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  const errors = useMemo(() => validate(values), [values]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console -- verify API target while developing
      console.log("Contact API URL:", getContactApiUrl());
    }
  }, []);

  const showError = (field) =>
    (touched[field] || submitted) && errors[field];

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setServerError(null);
    const v = validate(values);
    if (Object.keys(v).length > 0) return;

    const url = getContactApiUrl();

    setSaving(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          officeAddress: OFFICE_ADDRESS,
          mapsUrl: OFFICE_MAPS_URL,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(data.message || "Could not save. Try again later.");
        return;
      }
      setValues(initial);
      setTouched({});
      setSubmitted(false);
      alert(data.message || "Thank you! We will get back to you soon.");
    } catch {
      setServerError(
        "Could not reach the server. Is the API running (sejal-api on port 4000)?"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <Seo
        title="Contact SM Tech Solutions Pune | Bulk SMS & Website Leads"
        description="Contact SM Tech Solutions for bulk sms service india, whatsapp marketing india, and website development in Pune. Get a free demo today."
        canonicalPath="/contact"
      />
      <header className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Contact Our Pune Team</h1>
        <p className="mt-4 text-slate-600">
          Share a few details for bulk SMS, WhatsApp marketing, or website development. You can
          also email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-brand hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-12 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" noValidate>
        {serverError && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {serverError}
          </p>
        )}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          {showError("name") && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          {showError("phone") && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          {showError("email") && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          {showError("message") && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white shadow hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:opacity-60 sm:w-auto sm:px-8"
          >
            {saving ? "Sending..." : "Contact Now"}
          </button>
          <a
            href="/services"
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            View Services
          </a>
        </div>
      </form>
    </div>
  );
}
