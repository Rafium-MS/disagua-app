import React from 'react'
export default function Stat({ label, value }){
  return (<div className="bg-white border rounded-xl p-4"><div className="text-slate-500 text-xs">{label}</div><div className="text-lg font-semibold">{value}</div></div>)
}
