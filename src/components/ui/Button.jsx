import React from 'react';

export default function Button({ children, variant = 'primary', ...props }) {
  const cls = {
    primary: 'bg-sky-600 hover:bg-sky-700 text-white',
    outline: 'border border-sky-600 text-sky-700 hover:bg-sky-50',
    ghost: 'text-sky-700 hover:bg-sky-50'
  }[variant];
  return (
    <button className={`px-3 py-2 rounded-md text-sm ${cls}`} {...props}>
      {children}
    </button>
  );
}

