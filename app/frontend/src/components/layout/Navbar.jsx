import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../ui/Button.jsx';

function NavItem({ to, children }){
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive ? 'bg-white/10' : 'hover:bg-white/10'
        }`
      }
      end
    >
      {children}
    </NavLink>
  );
}

export default function Navbar(){
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-30 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-semibold tracking-wide mr-4">Diságua</span>
          <NavItem to="/">Início</NavItem>
          <NavItem to="/parceiros">Parceiros</NavItem>
          <NavItem to="/lojas">Lojas</NavItem>
          <NavItem to="/conectar">Conectar</NavItem>
          <NavItem to="/comprovantes">Comprovantes</NavItem>
          <NavItem to="/relatorios">Relatórios</NavItem>
        </div>
        {user && (
          <div className="flex items-center gap-3 text-sm">
            <div className="text-xs leading-tight text-right text-slate-200">
              <div className="font-medium text-white">{user.email}</div>
              <div className="uppercase tracking-wide text-[0.65rem] text-white/70">{user.role}</div>
            </div>
            <Button variant="subtle" onClick={logout}>
              Sair
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
