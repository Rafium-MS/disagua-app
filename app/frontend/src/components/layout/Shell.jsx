import React from 'react'
import Navbar from './Navbar.jsx'
import AppTour from '../tour/AppTour';

export default function Shell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - esconde em mobile */}
        <aside className="hidden lg:block lg:w-64 bg-white border-r">
          <Sidebar />
        </aside>
        
        {/* Conteúdo principal */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      
      {/* Menu mobile */}
      <MobileMenu className="lg:hidden" />
    </div>
  );
}