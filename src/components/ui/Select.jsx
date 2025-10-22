import React from 'react';

export default function Select({ label, options = [], ...props }) {
  return (
    <label className="block text-sm">
      {label && <span className="block mb-1 text-slate-700">{label}</span>}
      <select
        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-sky-500"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </label>
  );
}

