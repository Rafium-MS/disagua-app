import { House, Users, Link2, ListChecks, HandCoins, UserCog, Store, Tag } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Dashboard', icon: House },
  { to: '/contatos', label: 'Contatos', icon: Users },
  { to: '/marcas', label: 'Marcas', icon: Tag },
  { to: '/lojas', label: 'Lojas', icon: Store },
  { to: '/conectar', label: 'Conectar', icon: Link2 },
  { to: '/tarefas', label: 'Tarefas', icon: ListChecks },
  { to: '/vendas', label: 'Vendas', icon: HandCoins },
  { to: '/usuarios', label: 'Usuários', icon: UserCog }
]

export default function Sidebar() {
  return (
    <div className="p-3 space-y-1">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
              isActive ? 'bg-zinc-100 dark:bg-zinc-800 font-medium' : ''
            }`
          }
        >
          <Icon size={18} />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  )
}
