import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Shell from './components/layout/Shell.jsx';
import HomePage from './pages/HomePage.jsx';
import ParceirosPage from './pages/ParceirosPage.jsx';
import LojasPage from './pages/LojasPage.jsx';
import ConectarPage from './pages/ConectarPage.jsx';
import ComprovantesPage from './pages/ComprovantesPage.jsx';
import RelatoriosPage from './pages/RelatoriosPage.jsx';
import GerenciarLojasPage from './pages/GerenciarLojasPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { useAuth } from './context/AuthContext.jsx';
import Toaster from './components/feedback/Toaster';
import ErrorBoundary from './components/ErrorBoundary';

function ProtectedLayout(){
  const { isAuthenticated } = useAuth();
  if(!isAuthenticated){
    return <Navigate to="/login" replace />;
  }
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

export default function App(){
  return (
        <ErrorBoundary>

    <Toaster />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/parceiros" element={<ParceirosPage />} />
        <Route path="/lojas" element={<LojasPage />} />
        <Route path="/lojas/gerenciar" element={<GerenciarLojasPage />} />
        <Route path="/conectar" element={<ConectarPage />} />
        <Route path="/comprovantes" element={<ComprovantesPage />} />
        <Route path="/relatorios" element={<RelatoriosPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
        </ErrorBoundary>
  );
}
