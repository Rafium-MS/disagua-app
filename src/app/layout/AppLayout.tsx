import { Outlet, NavLink } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <div className="h-screen grid grid-cols-[260px_1fr] grid-rows-[auto_1fr_auto]">
      <aside className="row-span-3 border-r bg-white dark:bg-zinc-900">
        <Sidebar />
      </aside>
      <header className="px-4 py-2 border-b flex items-center gap-4 bg-white dark:bg-zinc-900">
        <NavLink to="/" className="font-semibold">
          Disagua
        </NavLink>
        <nav className="flex gap-3 text-sm">
          <NavLink to="/contatos">Contatos</NavLink>
          <NavLink to="/marcas">Marcas</NavLink>
          <NavLink to="/lojas">Lojas</NavLink>
          <NavLink to="/conectar">Conectar</NavLink>
          <NavLink to="/tarefas">Tarefas</NavLink>
          <NavLink to="/vendas">Vendas</NavLink>
          <NavLink to="/usuarios">Usuários</NavLink>
        </nav>
      </header>
      <main className="p-4 overflow-y-auto">
        <Outlet />
      </main>
      <footer className="p-3 text-xs text-center border-t">© Disagua</footer>
    </div>
  )
}
