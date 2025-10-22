import React from 'react'

export default function Card({ title, actions, children }){
  return (
    <div className="bg-white shadow-sm rounded-2xl border border-slate-200">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">{title}</h2>
        <div className="flex gap-2">{actions}</div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
