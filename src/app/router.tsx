import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Dashboard from '@/pages/Dashboard'
import Contatos from '@/pages/Contatos'
import Marcas from '@/pages/Marcas'
import Lojas from '@/pages/Lojas'
import Conectar from '@/pages/Conectar'
import Tarefas from '@/pages/Tarefas'
import Vendas from '@/pages/Vendas'
import Usuarios from '@/pages/Usuarios'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'contatos', element: <Contatos /> },
      { path: 'marcas', element: <Marcas /> },
      { path: 'lojas', element: <Lojas /> },
      { path: 'conectar', element: <Conectar /> },
      { path: 'tarefas', element: <Tarefas /> },
      { path: 'vendas', element: <Vendas /> },
      { path: 'usuarios', element: <Usuarios /> }
    ]
  }
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
