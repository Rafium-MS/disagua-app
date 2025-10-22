import React from 'react'

export default function Select({ label, className = "", children, ...props }){
  return (
    <label className="block text-sm">
      <span className="text-slate-700 font-medium">{label}</span>
      <select {...props}
        className={`mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 ${className}`}
      >
        {children}
      </select>
    </label>
  )
}
