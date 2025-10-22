import React from 'react';
import Navbar from './Navbar.jsx';

export default function Shell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main className="mx-auto max-w-7xl p-4">{children}</main>
    </div>
  );
}

