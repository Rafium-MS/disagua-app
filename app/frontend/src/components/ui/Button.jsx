import React from 'react';

const STYLES = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium',
  subtle: 'bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg text-sm',
};

export default function Button({ children, variant = 'primary', className = '', disabled = false, ...props }){
  const style = STYLES[variant] || STYLES.primary;
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : '';
  return (
    <button
      {...props}
      disabled={disabled}
      className={`${style} ${disabledClasses} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
