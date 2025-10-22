import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Shell from './components/layout/Shell.jsx';
import HomePage from './pages/HomePage.jsx';
import ParceirosPage from './pages/ParceirosPage.jsx';
import LojasPage from './pages/LojasPage.jsx';
import ConectarPage from './pages/ConectarPage.jsx';
import ComprovantesPage from './pages/ComprovantesPage.jsx';
import RelatoriosPage from './pages/RelatoriosPage.jsx';

function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/parceiros" element={<ParceirosPage />} />
        <Route path="/lojas" element={<LojasPage />} />
        <Route path="/conectar" element={<ConectarPage />} />
        <Route path="/comprovantes" element={<ComprovantesPage />} />
        <Route path="/relatorios" element={<RelatoriosPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}

export default App;

