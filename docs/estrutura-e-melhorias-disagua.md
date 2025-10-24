# Estrutura e Melhorias - Aplicação Diságua

## 📁 Estrutura de Repositório Recomendada

```
disagua/
├── .github/
│   └── workflows/
│       ├── ci-backend.yml          # CI/CD do backend
│       ├── ci-frontend.yml         # CI/CD do frontend
│       └── build-desktop.yml       # Build do Electron
│
├── app/
│   ├── frontend/                   # Aplicação Electron + React
│   │   ├── electron/
│   │   │   ├── main.js            # Processo principal
│   │   │   ├── preload.js         # Script de preload
│   │   │   ├── icons/             # Ícones da aplicação
│   │   │   └── electron-builder.yml
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── layout/       # Shell, Navbar, Sidebar
│   │   │   │   ├── ui/           # Button, Card, Input, Select
│   │   │   │   ├── tour/         # Componentes de tour
│   │   │   │   ├── feedback/     # Toast, Alert, Modal
│   │   │   │   └── forms/        # Componentes de formulário
│   │   │   ├── pages/            # Páginas da aplicação
│   │   │   ├── context/          # Context API (Auth, etc)
│   │   │   ├── hooks/            # Custom hooks
│   │   │   ├── services/         # API calls
│   │   │   ├── utils/            # Utilitários
│   │   │   ├── styles/           # CSS global
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   ├── public/
│   │   ├── tests/
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── README.md
│   │
│   └── backend/                    # API NestJS
│       ├── src/
│       │   ├── auth/
│       │   ├── brands/
│       │   ├── stores/
│       │   ├── partners/
│       │   ├── receipts/
│       │   ├── reports/
│       │   ├── uploads/
│       │   ├── dashboard/
│       │   ├── common/           # Guards, decorators, pipes
│       │   └── main.ts
│       ├── prisma/
│       │   ├── schema.prisma
│       │   ├── migrations/
│       │   └── seed.ts
│       ├── test/
│       ├── docker-compose.yml    # Postgres + MinIO
│       ├── package.json
│       └── README.md
│
├── packages/                       # Monorepo com código compartilhado (opcional)
│   ├── shared-types/              # TypeScript interfaces compartilhadas
│   │   ├── src/
│   │   │   ├── entities/
│   │   │   ├── dto/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── shared-utils/              # Utilitários compartilhados
│       ├── src/
│       │   ├── formatters/       # currencyBRL, formatDate
│       │   ├── validators/       # validações comuns
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── docs/                          # Documentação
│   ├── api/                      # Documentação da API
│   ├── architecture/             # Diagramas e arquitetura
│   ├── user-guide/               # Manual do usuário
│   └── development/              # Guia de desenvolvimento
│
├── scripts/                       # Scripts de automação
│   ├── setup-dev.sh              # Setup ambiente de dev
│   ├── backup-db.sh              # Backup do banco
│   └── deploy.sh                 # Deploy
│
├── .gitignore
├── .editorconfig
├── .prettierrc
├── .eslintrc.js
├── docker-compose.yml             # Orquestração completa (opcional)
├── package.json                   # Root package.json (se usar monorepo)
├── pnpm-workspace.yaml            # Configuração do pnpm workspace
└── README.md                      # Documentação principal
```

---

## 🎯 Dependências Essenciais para UX

### Frontend - Adicionar ao `app/frontend/package.json`

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    
    // Tour e Onboarding
    "react-joyride": "^2.9.2",
    "driver.js": "^1.3.1",
    
    // Tooltips
    "@radix-ui/react-tooltip": "^1.1.5",
    "@floating-ui/react": "^0.26.28",
    
    // Feedback e Notificações
    "react-hot-toast": "^2.4.1",
    "sonner": "^1.7.0",
    
    // Formulários e Validação
    "react-hook-form": "^7.54.2",
    "zod": "^3.24.1",
    "@hookform/resolvers": "^3.9.1",
    
    // UI Components
    "clsx": "^2.1.1",
    "class-variance-authority": "^0.7.1",
    "tailwind-merge": "^2.7.0",
    "lucide-react": "^0.468.0",
    
    // Animações
    "framer-motion": "^11.15.0",
    
    // Utils
    "uuid": "^9.0.1",
    "date-fns": "^4.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "concurrently": "^9.0.1",
    "cross-env": "^7.0.3",
    "electron": "^38.4.0",
    "electron-builder": "^25.1.8",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "vite": "^7.1.12",
    "wait-on": "^8.0.2",
    
    // TypeScript
    "@types/node": "^22.10.2",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@types/uuid": "^10.0.0",
    "typescript": "^5.7.2",
    
    // Linting e Formatação
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.3",
    "eslint-plugin-react-hooks": "^5.0.0",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.11"
  }
}
```

### Backend - Verificar `app/backend/package.json`

As dependências do backend estão corretas. Adicionar apenas:

```json
{
  "dependencies": {
    // Adicionar para rate limiting
    "@nestjs/throttler": "^6.2.1",
    
    // Adicionar para logging estruturado
    "nest-winston": "^1.10.0",
    "winston": "^3.17.0",
    
    // Adicionar para validação avançada
    "class-validator": "^0.14.1",
    "class-transformer": "^0.5.1"
  }
}
```

---

## 🎨 Implementação de Funcionalidades

### 1. Sistema de Tour (Onboarding)

**Arquivo:** `app/frontend/src/components/tour/AppTour.jsx`

```jsx
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
```

**Uso no Shell:**

```jsx
// app/frontend/src/components/layout/Shell.jsx
import AppTour from '../tour/AppTour';

export default function Shell({ children }) {
  return (
    <>
      <AppTour />
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-6">
          {children}
        </main>
      </div>
    </>
  );
}
```

**Adicionar data-tour aos links:**

```jsx
// app/frontend/src/components/layout/Navbar.jsx
<NavItem to="/parceiros" data-tour="nav-parceiros">Parceiros</NavItem>
<NavItem to="/lojas" data-tour="nav-lojas">Lojas</NavItem>
```

---

### 2. Sistema de Tooltips

**Arquivo:** `app/frontend/src/components/ui/Tooltip.jsx`

```jsx
import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';

export default function Tooltip({ children, content, side = 'top', delayDuration = 200 }) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            className={clsx(
              'z-50 overflow-hidden rounded-lg bg-slate-900 px-3 py-2',
              'text-sm text-white shadow-lg',
              'animate-in fade-in-0 zoom-in-95',
              'data-[side=bottom]:slide-in-from-top-2',
              'data-[side=left]:slide-in-from-right-2',
              'data-[side=right]:slide-in-from-left-2',
              'data-[side=top]:slide-in-from-bottom-2'
            )}
            sideOffset={5}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-slate-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
```

**Uso:**

```jsx
import Tooltip from '../components/ui/Tooltip';

<Tooltip content="Adicionar novo parceiro">
  <Button>
    <PlusIcon />
  </Button>
</Tooltip>
```

---

### 3. Sistema de Notificações (Toast)

**Arquivo:** `app/frontend/src/components/feedback/Toaster.jsx`

```jsx
import { Toaster as Sonner } from 'sonner';

export default function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'rounded-lg shadow-lg',
          title: 'font-semibold',
          description: 'text-sm',
          success: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          error: 'bg-rose-50 text-rose-900 border-rose-200',
          warning: 'bg-amber-50 text-amber-900 border-amber-200',
          info: 'bg-blue-50 text-blue-900 border-blue-200',
        },
      }}
    />
  );
}
```

**Hook customizado:**

```jsx
// app/frontend/src/hooks/useToast.js
import { toast } from 'sonner';

export function useToast() {
  return {
    success: (message, description) => {
      toast.success(message, { description });
    },
    error: (message, description) => {
      toast.error(message, { description });
    },
    warning: (message, description) => {
      toast.warning(message, { description });
    },
    info: (message, description) => {
      toast.info(message, { description });
    },
    promise: (promise, messages) => {
      return toast.promise(promise, messages);
    },
  };
}
```

**Uso:**

```jsx
import { useToast } from '../hooks/useToast';

function MyComponent() {
  const toast = useToast();
  
  const handleSave = async () => {
    try {
      await api.save(data);
      toast.success('Salvo com sucesso!', 'Os dados foram salvos corretamente.');
    } catch (error) {
      toast.error('Erro ao salvar', error.message);
    }
  };
}
```

**Adicionar ao App:**

```jsx
// app/frontend/src/App.jsx
import Toaster from './components/feedback/Toaster';

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* rotas */}
      </Routes>
    </>
  );
}
```

---

### 4. Responsividade

**Atualizar Tailwind Config:**

```js
// app/frontend/tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
```

**Layout Responsivo:**

```jsx
// app/frontend/src/components/layout/Shell.jsx
export default function Shell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - esconde em mobile */}
        <aside className="hidden lg:block lg:w-64 bg-white border-r">
          <Sidebar />
        </aside>
        
        {/* Conteúdo principal */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      
      {/* Menu mobile */}
      <MobileMenu className="lg:hidden" />
    </div>
  );
}
```

**Tabelas Responsivas:**

```jsx
// app/frontend/src/components/ui/ResponsiveTable.jsx
export default function ResponsiveTable({ columns, data }) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          {/* ... */}
        </table>
      </div>
      
      {/* Mobile - Cards */}
      <div className="md:hidden space-y-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between py-2 border-b last:border-0">
                <span className="font-medium text-slate-600">{col.label}:</span>
                <span className="text-slate-900">{item[col.key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
```

---

### 5. Validação de Formulários

**Arquivo:** `app/frontend/src/components/forms/FormField.jsx`

```jsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { clsx } from 'clsx';

export default function FormField({ 
  name, 
  label, 
  type = 'text',
  placeholder,
  required = false,
  ...props 
}) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={clsx(
          'w-full rounded-lg border px-3 py-2 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent',
          error 
            ? 'border-rose-300 bg-rose-50' 
            : 'border-slate-300 bg-white'
        )}
        {...register(name)}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-rose-600 flex items-center gap-1">
          <span>⚠️</span>
          {error.message}
        </p>
      )}
    </div>
  );
}
```

**Uso com React Hook Form + Zod:**

```jsx
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormField from '../components/forms/FormField';

const schema = z.object({
  parceiro: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().regex(/^\d{10,11}$/, 'Telefone inválido'),
});

function PartnerForm() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      parceiro: '',
      email: '',
      telefone: '',
    },
  });

  const onSubmit = async (data) => {
    // handle submit
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <FormField name="parceiro" label="Nome do Parceiro" required />
        <FormField name="email" label="Email" type="email" required />
        <FormField name="telefone" label="Telefone" required />
        
        <Button type="submit">Salvar</Button>
      </form>
    </FormProvider>
  );
}
```

---

### 6. Loading States

**Arquivo:** `app/frontend/src/components/ui/Spinner.jsx`

```jsx
export default function Spinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          'animate-spin rounded-full border-2 border-slate-200 border-t-slate-900',
          sizeClasses[size]
        )}
      />
    </div>
  );
}
```

**Skeleton Loading:**

```jsx
// app/frontend/src/components/ui/Skeleton.jsx
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-md bg-slate-200',
        className
      )}
      {...props}
    />
  );
}

export function TableSkeleton({ rows = 5, columns = 6 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} className="h-8 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
```

---

### 7. Error Boundaries

**Arquivo:** `app/frontend/src/components/ErrorBoundary.jsx`

```jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="text-rose-500 text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Ops! Algo deu errado
            </h1>
            <p className="text-slate-600 mb-4">
              Ocorreu um erro inesperado. Por favor, recarregue a página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Uso no App:**

```jsx
// app/frontend/src/App.jsx
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* rotas */}
      </Routes>
    </ErrorBoundary>
  );
}
```

---

## 🚀 Scripts Úteis

**Atualizar `app/frontend/package.json`:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "electron:dev": "cross-env BROWSER=none concurrently \"vite\" \"wait-on http://localhost:5173 && electron .\"",
    "electron:build": "npm run build && electron-builder",
    "electron:build:win": "npm run build && electron-builder --win",
    "electron:build:mac": "npm run build && electron-builder --mac",
    "electron:build:linux": "npm run build && electron-builder --linux",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint . --ext js,jsx",
    "lint:fix": "eslint . --ext js,jsx --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,json,css}\"",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 🎯 Checklist de Implementação

### Fase 1: Estrutura Base ✅
- [x] Estrutura de pastas definida
- [x] Separação frontend/backend
- [x] Sistema de rotas

### Fase 2: UX Essencial
- [ ] Instalar dependências de tour e tooltips
- [ ] Implementar AppTour com react-joyride
- [ ] Adicionar Tooltip component com Radix UI
- [ ] Configurar sistema de notificações (Sonner)
- [ ] Criar componentes de feedback (Success, Error, Warning)

### Fase 3: Responsividade
- [ ] Configurar breakpoints customizados no Tailwind
- [ ] Implementar menu mobile
- [ ] Criar componentes responsivos (ResponsiveTable)
- [ ] Testar em diferentes resoluções

### Fase 4: Formulários e Validação
- [ ] Configurar React Hook Form + Zod
- [ ] Criar FormField component
- [ ] Implementar validações em todos os formulários
- [ ] Adicionar feedback visual de erros

### Fase 5: Loading e Estados
- [ ] Implementar Spinner component
- [ ] Criar Skeleton loaders
- [ ] Adicionar Error Boundary
- [ ] Implementar estados de loading em todas as requisições

### Fase 6: Testes e Polimento
- [ ] Testar fluxo completo de usuário
- [ ] Validar acessibilidade (keyboard navigation)
- [ ] Otimizar performance
- [ ] Documentar componentes

---

## 📚 Próximos Passos Recomendados

1. **Implementar o sistema de tour** primeiro - é o que mais impacta na experiência inicial
2. **Adicionar tooltips** nos botões e ações importantes
3. **Configurar notificações** para feedback imediato ao usuário
4. **Melhorar responsividade** das tabelas e formulários
5. **Adicionar validações** em todos os formulários com feedback visual

---

## 💡 Dicas de Desenvolvimento

### Use Claude Code para:
- Implementar componentes complexos
- Refatorar código existente
- Corrigir bugs e erros
- Adicionar testes automatizados

### Comando útil para iniciar desenvolvimento:
```bash
# Terminal 1 - Backend
cd app/backend
npm run start:dev

# Terminal 2 - Frontend (Electron)
cd app/frontend
npm run electron:dev
```

### Para builds de produção:
```bash
cd app/frontend
npm run electron:build:win  # Windows
npm run electron:build:mac  # macOS
npm run electron:build:linux # Linux
```

---

## 🔧 Configurações Adicionais

### TypeScript (Recomendado)

Se quiser migrar para TypeScript:

```bash
cd app/frontend
npm install -D typescript @types/react @types/react-dom
```

Criar `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 📖 Recursos de Aprendizado

- **React Joyride**: https://docs.react-joyride.com/
- **Radix UI**: https://www.radix-ui.com/primitives
- **Sonner**: https://sonner.emilkowal.ski/
- **React Hook Form**: https://react-hook-form.com/
- **Zod**: https://zod.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Electron**: https://www.electronjs.org/docs

---

## 🎉 Conclusão

Esta estrutura fornece uma base sólida para uma aplicação desktop multiusuário profissional, com:

✅ Organização clara do código
✅ Separação de responsabilidades
✅ UX moderna com tour, tooltips e feedback
✅ Responsividade completa
✅ Validação robusta de formulários
✅ Tratamento de erros adequado
✅ Fácil manutenção e escalabilidade

Use o Claude Code para implementar estas melhorias de forma iterativa e eficiente!
