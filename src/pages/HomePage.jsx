import React from 'react';
import Card from '../components/ui/Card.jsx';
import Stat from '../components/ui/Stat.jsx';

export default function HomePage() {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Stat label="Parceiros ativos" value={18} />
        <Stat label="Lojas conectadas" value={42} />
        <Stat label="Comprovantes / dia" value={127} />
      </div>
      <Card title="Bem-vindo">
        <p className="text-sm text-slate-700">
          Use o menu acima para navegar entre os módulos do sistema.
        </p>
      </Card>
    </div>
  );
}

