import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/logo.svg';

const linkBase =
  'px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100';

export default function Navbar() {
  const navLink = ({ isActive }) =>
    `${linkBase} ${isActive ? 'bg-slate-200 font-medium' : ''}`;

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-3">
        <div className="flex items-center gap-2 mr-2">
          <img src={logo} alt="Diságua" width="28" height="28" />
          <span className="text-slate-800 font-semibold">Diságua</span>
        </div>
        <nav className="flex gap-1">
          <NavLink to="/" className={navLink} end>
            Início
          </NavLink>
          <NavLink to="/parceiros" className={navLink}>
            Parceiros
          </NavLink>
          <NavLink to="/lojas" className={navLink}>
            Lojas
          </NavLink>
          <NavLink to="/conectar" className={navLink}>
            Conectar
          </NavLink>
          <NavLink to="/comprovantes" className={navLink}>
            Comprovantes
          </NavLink>
          <NavLink to="/relatorios" className={navLink}>
            Relatórios
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
