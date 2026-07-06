import React from 'react';

/**
 * Small labeled on/off switch used for the Active/Inactive and Registration
 * Open/Closed controls throughout the Test Portal admin panel.
 */
const StatusToggle = ({ checked, onChange, onLabel = 'Active', offLabel = 'Inactive', disabled }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
        checked
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-slate-200 bg-slate-100 text-slate-500'
      }`}
    >
      <span
        className={`h-4 w-8 rounded-full transition relative ${checked ? 'bg-emerald-500' : 'bg-slate-300'}`}
      >
        <span
          className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition ${
            checked ? 'left-4' : 'left-0.5'
          }`}
        />
      </span>
      {checked ? onLabel : offLabel}
    </button>
  );
};

export default StatusToggle;
