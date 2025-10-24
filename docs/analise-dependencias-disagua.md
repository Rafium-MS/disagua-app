# Análise e Correção de Dependências - Diságua

## 📊 Status Atual das Dependências

### ✅ Backend - Dependências OK

O backend está bem estruturado com:
- NestJS 10.x
- Prisma (ORM)
- PostgreSQL
- MinIO (S3-compatible storage)
- JWT para autenticação
- bcrypt para hash de senhas

**Nenhuma alteração crítica necessária no backend.**

---

### ⚠️ Frontend - Dependências a Adicionar

#### Dependências Atuais (Básicas)
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0",
  "uuid": "^9.0.1"
}
```

#### Faltam Dependências Para:
1. **Tour/Onboarding** - nenhuma lib instalada
2. **Tooltips** - nenhuma lib instalada
3. **Notificações/Toast** - nenhuma lib instalada
4. **Validação de Formulários** - nenhuma lib instalada
5. **Animações** - nenhuma lib instalada
6. **Ícones** - nenhuma lib instalada

---

## 🚀 Comandos de Instalação

### Instalar TODAS as dependências recomendadas de uma vez:

```bash
cd app/frontend

# Dependências de produção
npm install \
  react-joyride \
  @radix-ui/react-tooltip \
  @floating-ui/react \
  sonner \
  react-hook-form \
  zod \
  @hookform/resolvers \
  clsx \
  class-variance-authority \
  tailwind-merge \
  lucide-react \
  framer-motion \
  date-fns

# Dependências de desenvolvimento
npm install -D \
  @types/node \
  @types/react \
  @types/react-dom \
  @types/uuid \
  typescript \
  eslint \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  prettier \
  prettier-plugin-tailwindcss \
  electron-builder \
  @tailwindcss/forms \
  vitest \
  @vitest/ui
```

---

## 📦 Instalação Modular (Passo a Passo)

Se preferir instalar aos poucos:

### 1️⃣ Tour e Onboarding

```bash
cd app/frontend
npm install react-joyride
```

**Uso:**
```jsx
import Joyride from 'react-joyride';
```

**Alternativa:** `driver.js` (mais leve)
```bash
npm install driver.js
```

---

### 2️⃣ Tooltips

```bash
npm install @radix-ui/react-tooltip @floating-ui/react
```

**Uso:**
```jsx
import * as Tooltip from '@radix-ui/react-tooltip';
```

**Alternativa:** `react-tooltip`
```bash
npm install react-tooltip
```

---

### 3️⃣ Notificações/Toast

```bash
npm install sonner
```

**Uso:**
```jsx
import { toast } from 'sonner';
toast.success('Salvo com sucesso!');
```

**Alternativas:**
- `react-hot-toast` - mais simples
- `react-toastify` - mais configurável

```bash
# Se preferir react-hot-toast
npm install react-hot-toast
```

---

### 4️⃣ Formulários e Validação

```bash
npm install react-hook-form zod @hookform/resolvers
```

**Uso:**
```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
```

---

### 5️⃣ Utilitários CSS

```bash
npm install clsx class-variance-authority tailwind-merge
```

**Uso:**
```jsx
import { clsx } from 'clsx';
import { cn } from './utils'; // cn = twMerge + clsx
```

---

### 6️⃣ Ícones

```bash
npm install lucide-react
```

**Uso:**
```jsx
import { User, Check, AlertCircle } from 'lucide-react';
```

**Alternativas:**
- `react-icons` - mais ícones
- `heroicons` - ícones do Tailwind

---

### 7️⃣ Animações

```bash
npm install framer-motion
```

**Uso:**
```jsx
import { motion } from 'framer-motion';
```

---

### 8️⃣ Datas

```bash
npm install date-fns
```

**Uso:**
```jsx
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
```

---

### 9️⃣ TypeScript (Opcional mas Recomendado)

```bash
npm install -D typescript @types/node @types/react @types/react-dom @types/uuid
```

Criar arquivo `tsconfig.json` na raiz do frontend.

---

### 🔟 Linting e Formatação

```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks prettier prettier-plugin-tailwindcss
```

Criar `.eslintrc.js`:
```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

Criar `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

### 1️⃣1️⃣ Electron Builder

```bash
npm install -D electron-builder
```

Já está no projeto, mas verificar se está atualizado.

---

### 1️⃣2️⃣ Tailwind Plugins

```bash
npm install -D @tailwindcss/forms @tailwindcss/container-queries
```

Atualizar `tailwind.config.js`:
```javascript
export default {
  // ...
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
```

---

### 1️⃣3️⃣ Testes (Opcional)

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom
```

---

## 🔍 Verificação de Dependências

### Verificar versões instaladas:

```bash
cd app/frontend
npm list --depth=0
```

### Verificar dependências desatualizadas:

```bash
npm outdated
```

### Atualizar dependências:

```bash
# Atualizar todas as dependências para versões compatíveis
npm update

# Atualizar para versões LATEST (cuidado!)
npm install -g npm-check-updates
ncu -u
npm install
```

---

## 📋 Package.json Completo Recomendado

```json
{
  "name": "disagua-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
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
    "format": "prettier --write \"src/**/*.{js,jsx,json,css}\""
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "uuid": "^9.0.1",
    
    "react-joyride": "^2.9.2",
    "@radix-ui/react-tooltip": "^1.1.5",
    "@floating-ui/react": "^0.26.28",
    "sonner": "^1.7.0",
    "react-hook-form": "^7.54.2",
    "zod": "^3.24.1",
    "@hookform/resolvers": "^3.9.1",
    "clsx": "^2.1.1",
    "class-variance-authority": "^0.7.1",
    "tailwind-merge": "^2.7.0",
    "lucide-react": "^0.468.0",
    "framer-motion": "^11.15.0",
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
    
    "@types/node": "^22.10.2",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@types/uuid": "^10.0.0",
    "typescript": "^5.7.2",
    
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.3",
    "eslint-plugin-react-hooks": "^5.0.0",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.11",
    
    "@tailwindcss/forms": "^0.5.9",
    "@tailwindcss/container-queries": "^0.1.1",
    
    "vitest": "^3.0.6",
    "@vitest/ui": "^3.0.6",
    "@testing-library/react": "^16.1.0",
    "@testing-library/jest-dom": "^6.6.3"
  }
}
```

---

## 🎯 Priorização de Instalação

### 🔥 **Crítico (instalar AGORA)**

1. **Sonner** (notificações) - essencial para feedback ao usuário
2. **React Hook Form + Zod** - validação de formulários
3. **Lucide React** - ícones
4. **clsx + tailwind-merge** - utilitários CSS

```bash
npm install sonner react-hook-form zod @hookform/resolvers lucide-react clsx tailwind-merge
```

### ⚡ **Importante (instalar logo)**

5. **React Joyride** - tour/onboarding
6. **@radix-ui/react-tooltip** - tooltips
7. **date-fns** - manipulação de datas

```bash
npm install react-joyride @radix-ui/react-tooltip date-fns
```

### ✨ **Nice to have (instalar depois)**

8. **Framer Motion** - animações
9. **TypeScript** - type safety
10. **Prettier/ESLint** - code quality

```bash
npm install framer-motion
npm install -D typescript @types/node @types/react @types/react-dom
npm install -D eslint prettier
```

---

## 🛠️ Utilidades Adicionais

### Helper para className (cn)

Criar arquivo `app/frontend/src/lib/utils.js`:

```javascript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

**Uso:**
```jsx
import { cn } from '@/lib/utils';

<div className={cn(
  'base-classes',
  condition && 'conditional-classes',
  'more-classes'
)}>
```

---

### Custom Hook useLocalStorage

Criar arquivo `app/frontend/src/hooks/useLocalStorage.js`:

```javascript
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

---

### Custom Hook useDebounce

Criar arquivo `app/frontend/src/hooks/useDebounce.js`:

```javascript
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

---

## 🔄 Atualizando Componentes Existentes

### Adicionar tooltips aos botões:

**Antes:**
```jsx
<Button onClick={handleAdd}>Adicionar</Button>
```

**Depois:**
```jsx
import Tooltip from './components/ui/Tooltip';

<Tooltip content="Adicionar novo parceiro">
  <Button onClick={handleAdd}>Adicionar</Button>
</Tooltip>
```

---

### Adicionar notificações nas ações:

**Antes:**
```jsx
const handleSave = async () => {
  try {
    await api.save(data);
    // sem feedback
  } catch (error) {
    console.error(error);
  }
};
```

**Depois:**
```jsx
import { toast } from 'sonner';

const handleSave = async () => {
  try {
    await api.save(data);
    toast.success('Salvo com sucesso!');
  } catch (error) {
    toast.error('Erro ao salvar', { description: error.message });
  }
};
```

---

### Adicionar validação nos formulários:

**Antes:**
```jsx
<input 
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

**Depois:**
```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres'),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});

<input {...register('name')} />
{errors.name && <span>{errors.name.message}</span>}
```

---

## 🎨 Melhorias Visuais com Ícones

Substituir emojis por ícones do Lucide:

**Antes:**
```jsx
<span>✅</span>
<span>❌</span>
<span>⚠️</span>
```

**Depois:**
```jsx
import { Check, X, AlertCircle } from 'lucide-react';

<Check className="text-emerald-500" />
<X className="text-rose-500" />
<AlertCircle className="text-amber-500" />
```

---

## 📝 Checklist de Instalação

- [ ] Instalar dependências críticas (sonner, react-hook-form, zod, lucide)
- [ ] Instalar dependências importantes (joyride, tooltip, date-fns)
- [ ] Instalar utilitários CSS (clsx, tailwind-merge)
- [ ] Configurar TypeScript (opcional)
- [ ] Configurar ESLint e Prettier
- [ ] Adicionar plugins do Tailwind
- [ ] Criar helpers (cn, useLocalStorage, useDebounce)
- [ ] Adicionar Toaster ao App
- [ ] Implementar AppTour
- [ ] Criar componente Tooltip
- [ ] Atualizar formulários com validação
- [ ] Adicionar ícones nos componentes
- [ ] Testar build de produção

---

## 🚨 Problemas Comuns

### Erro: "Cannot find module 'X'"

**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de versão do Node

**Solução:** Usar Node 18+
```bash
node --version  # Verificar versão
nvm use 18      # Se usar nvm
```

### Erro no Electron

**Solução:** Rebuild do Electron
```bash
npm rebuild electron
```

### Erro no Vite

**Solução:** Limpar cache
```bash
rm -rf node_modules/.vite
npm run dev
```

---

## 🎉 Conclusão

Após instalar todas as dependências recomendadas, sua aplicação terá:

✅ Sistema de tour/onboarding profissional
✅ Tooltips interativos
✅ Notificações toast elegantes
✅ Validação robusta de formulários
✅ Ícones modernos
✅ Animações suaves
✅ Utilitários CSS otimizados
✅ Code quality com ESLint/Prettier

**Comando único para instalar TUDO:**

```bash
cd app/frontend && npm install react-joyride @radix-ui/react-tooltip @floating-ui/react sonner react-hook-form zod @hookform/resolvers clsx class-variance-authority tailwind-merge lucide-react framer-motion date-fns && npm install -D @types/node @types/react @types/react-dom @types/uuid typescript eslint eslint-plugin-react eslint-plugin-react-hooks prettier prettier-plugin-tailwindcss electron-builder @tailwindcss/forms vitest @vitest/ui
```

Use o **Claude Code** para implementar os componentes e integrar todas essas bibliotecas! 🚀
