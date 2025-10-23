import React from 'react'
export default function Button({ children, variant='primary', className='', ...props }){
  const styles={primary:'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium',danger:'bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium',subtle:'bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg text-sm'}
  return <button {...props} className={`${styles[variant]} ${className}`}>{children}</button>
}
