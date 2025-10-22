import React from 'react';

export default function Stat({ label, value, hint }) {
  return (
    <div className="p-4 rounded-md border bg-white">
      <div className="text-2xl font-semibold text-slate-800">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
      {hint && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
    </div>
  );
}

