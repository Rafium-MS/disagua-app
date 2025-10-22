import React from 'react'
import { NavLink } from 'react-router-dom'

function NavItem({ to, children }){
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive ? "bg-white/10" : "hover:bg-white/10"
        }`
      }
      end
    >
      {children}
    </NavLink>
  )
}

export default function Navbar(){
  return (
    <nav className="sticky top-0 z-30 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap gap-2 items-center">
        <span className="font-semibold tracking-wide mr-4">Disagua</span>
        <NavItem to="/">Início</NavItem>
        <NavItem to="/parceiros">Parceiros</NavItem>
        <NavItem to="/lojas">Lojas</NavItem>
        <NavItem to="/conectar">Conectar</NavItem>
        <NavItem to="/comprovantes">Comprovantes</NavItem>
        <NavItem to="/relatorios">Relatórios</NavItem>
      </div>
    </nav>
  )
}
