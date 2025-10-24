import React from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useLocalStorage } from '../hooks/useLocalStorage';

const steps = [
  {
    target: 'body',
    content: 'Bem-vindo ao Diságua! Vamos fazer um tour rápido pela aplicação.',
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="nav-parceiros"]',
    content: 'Aqui você gerencia todos os parceiros cadastrados.',
  },
  {
    target: '[data-tour="nav-lojas"]',
    content: 'Visualize e gerencie as lojas por marca.',
  },
  {
    target: '[data-tour="nav-conectar"]',
    content: 'Conecte parceiros às lojas para controlar entregas.',
  },
  {
    target: '[data-tour="nav-comprovantes"]',
    content: 'Faça upload e valide comprovantes de entrega.',
  },
  {
    target: '[data-tour="nav-relatorios"]',
    content: 'Gere relatórios detalhados por período.',
  },
];

export default function AppTour({ run = false, onClose }) {
  const [tourCompleted, setTourCompleted] = useLocalStorage('tour-completed', false);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setTourCompleted(true);
      if (onClose) onClose();
    }
  };

  if (tourCompleted && !run) return null;

  return (
    <Joyride
      steps={steps}
      run={run || !tourCompleted}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#0f172a',
          textColor: '#334155',
          zIndex: 10000,
        },
      }}
      locale={{
        back: 'Voltar',
        close: 'Fechar',
        last: 'Concluir',
        next: 'Próximo',
        skip: 'Pular tour',
      }}
    />
  );
}