import React from 'react';

export default function Input({ label, helperText, ...props }) {
  return (
    <label className="block text-sm">
      {label && <span className="block mb-1 text-slate-700">{label}</span>}
      <input
        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-sky-500"
        {...props}
      />
      {helperText && (
        <span className="mt-1 block text-xs text-slate-500">{helperText}</span>
      )}
    </label>
  );
}

