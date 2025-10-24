# Melhorias de UX: Loading States e Mensagens de Erro

Este pacote contém melhorias significativas na experiência do usuário do Diságua App, focando em **loading states** e **mensagens de erro descritivas**.

## 📦 O que foi criado

### 1. Sistema de Notificações (Toast)

**Arquivos:**
- `components/ui/Toast.jsx` - Componente de notificação
- `context/ToastContext.jsx` - Contexto e hook para gerenciar toasts

**Funcionalidades:**
- 4 tipos de toast: success, error, warning, info
- Auto-dismiss configurável
- Animações suaves de entrada/saída
- Empilhamento de múltiplas notificações

**Uso:**
```jsx
import { useToast } from '../context/ToastContext';

function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success('Operação realizada com sucesso!');
  };

  const handleError = () => {
    toast.error('Erro ao processar requisição', 5000); // 5s duration
  };

  return <button onClick={handleSuccess}>Salvar</button>;
}
```

---

### 2. Componentes de Loading

**Arquivos:**
- `components/ui/Spinner.jsx`

**Componentes disponíveis:**
- `<Spinner />` - Spinner básico (tamanhos: sm, md, lg, xl)
- `<SpinnerOverlay />` - Loading em tela cheia
- `<InlineLoader />` - Loading inline com mensagem

**Uso:**
```jsx
import Spinner, { SpinnerOverlay, InlineLoader } from '../components/ui/Spinner';

// Spinner básico
<Spinner size="md" />

// Overlay de tela cheia
<SpinnerOverlay message="Processando dados..." />

// Inline em cards
<InlineLoader message="Carregando lojas..." />
```

---

### 3. Sistema de Alertas

**Arquivos:**
- `components/ui/Alert.jsx`

**Funcionalidades:**
- 4 variantes: error, warning, success, info
- Título e mensagem customizáveis
- Seção de detalhes técnicos expansível
- Botão de fechar opcional

**Uso:**
```jsx
import Alert from '../components/ui/Alert';

<Alert
  variant="error"
  title="Erro ao salvar"
  message="Não foi possível conectar ao servidor"
  details={{ code: 500, timestamp: new Date() }}
  onClose={() => setError(null)}
/>
```

---

### 4. Button Melhorado

**Arquivos:**
- `components/ui/ButtonImproved.jsx`

**Novos recursos:**
- Estado de loading integrado
- 7 variantes visuais
- Suporte a ícones (esquerda/direita)
- 3 tamanhos (sm, md, lg)
- Estados de disabled e loading

**Uso:**
```jsx
import Button from '../components/ui/ButtonImproved';

<Button
  variant="primary"
  size="md"
  loading={isLoading}
  onClick={handleSubmit}
  leftIcon={<SaveIcon />}
>
  Salvar
</Button>
```

**Variantes disponíveis:**
- `primary` - Azul (padrão)
- `secondary` - Cinza escuro
- `success` - Verde
- `danger` - Vermelho
- `subtle` - Cinza claro
- `ghost` - Transparente
- `outline` - Borda apenas

---

### 5. Hook useAsync

**Arquivos:**
- `hooks/useAsync.js`

**Funcionalidades:**
- Gerenciamento automático de estados (loading, error, data)
- Integração com sistema de toasts
- Callbacks de sucesso e erro
- Mensagens customizáveis

**Uso:**
```jsx
import { useAsync } from '../hooks/useAsync';

function MyComponent() {
  const {
    execute: saveData,
    loading,
    error,
    data
  } = useAsync(
    async (formData) => {
      return await api.save(formData);
    },
    {
      showSuccessToast: true,
      successMessage: 'Dados salvos!',
      showErrorToast: true,
      onSuccess: (result) => console.log('Sucesso:', result),
      onError: (error) => console.error('Erro:', error),
    }
  );

  return (
    <Button loading={loading} onClick={() => saveData(form)}>
      Salvar
    </Button>
  );
}
```

---

### 6. Sistema de Tratamento de Erros

**Arquivos:**
- `utils/errorHandler.js`

**Funcionalidades:**
- Classe `ApiError` customizada
- Tratamento padronizado de erros HTTP
- Mensagens descritivas por código de status
- Extração de erros de validação
- Helpers para tipos de erro

**Uso:**
```jsx
import { handleApiError, formatErrorMessage, isAuthError } from '../utils/errorHandler';

try {
  const response = await api.getData();
} catch (error) {
  handleApiError(error); // Lança ApiError padronizado
}

// Formatar erro para exibição
const { title, message, details } = formatErrorMessage(error);

// Verificar tipo de erro
if (isAuthError(error)) {
  redirectToLogin();
}
```

**Mensagens de erro por código:**
- 400: Requisição inválida
- 401: Sessão expirada
- 403: Sem permissão
- 404: Recurso não encontrado
- 409: Registro já existe
- 422: Dados inválidos (com detalhes)
- 429: Muitas requisições
- 500: Erro no servidor
- 502/503: Servidor indisponível

---

### 7. Animações CSS

**Arquivos:**
- `styles/animations.css`

**Animações incluídas:**
- `animate-slide-in-right` - Entrada pela direita
- `animate-fade-in` - Fade in suave
- `animate-pulse-slow` - Pulsação lenta
- `animate-shake` - Shake (para erros)
- `skeleton` - Loading skeleton

---

## 🚀 Como Integrar

### Passo 1: Copiar Arquivos

Copie todos os arquivos criados para o seu projeto:

```bash
frontend/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Toast.jsx
│   │       ├── Spinner.jsx
│   │       ├── Alert.jsx
│   │       └── ButtonImproved.jsx
│   ├── context/
│   │   └── ToastContext.jsx
│   ├── hooks/
│   │   └── useAsync.js
│   ├── utils/
│   │   └── errorHandler.js
│   └── styles/
│       └── animations.css
```

### Passo 2: Configurar ToastProvider

No arquivo principal (`App.jsx` ou `main.jsx`):

```jsx
import { ToastProvider } from './context/ToastContext';
import './styles/animations.css';

function App() {
  return (
    <ToastProvider>
      {/* Resto da aplicação */}
    </ToastProvider>
  );
}
```

### Passo 3: Atualizar Componentes Existentes

Substitua os componentes antigos pelos novos. Exemplo:

**Antes:**
```jsx
import Button from '../components/ui/Button';

<Button onClick={handleSave} disabled={loading}>
  {loading ? 'Salvando...' : 'Salvar'}
</Button>
```

**Depois:**
```jsx
import Button from '../components/ui/ButtonImproved';

<Button onClick={handleSave} loading={loading}>
  Salvar
</Button>
```

### Passo 4: Usar useAsync em Requisições

**Antes:**
```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

async function handleSubmit() {
  setLoading(true);
  setError('');
  try {
    await api.create(data);
    alert('Criado com sucesso!');
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}
```

**Depois:**
```jsx
const { execute: handleSubmit, loading } = useAsync(
  async () => await api.create(data),
  {
    showSuccessToast: true,
    successMessage: 'Criado com sucesso!',
  }
);
```

---

## 📋 Checklist de Migração

Para cada página do projeto:

- [ ] Substituir `Button` por `ButtonImproved`
- [ ] Adicionar `loading` prop nos botões
- [ ] Substituir `alert()` por `toast.success()` ou `toast.error()`
- [ ] Usar `<Alert>` para exibir erros ao invés de `<p className="text-rose-600">`
- [ ] Implementar `useAsync` para requisições assíncronas
- [ ] Adicionar `<InlineLoader>` durante carregamento de listas
- [ ] Usar `handleApiError` para tratamento de erros da API
- [ ] Adicionar estados de disabled em inputs durante loading
- [ ] Validar formulários antes de submeter
- [ ] Mostrar feedback visual em todas as ações do usuário

---

## 🎨 Exemplo Completo

Veja o arquivo `pages/LojasPageImproved.jsx` para um exemplo completo de implementação com:

✅ Loading states em todos os botões
✅ Toasts de sucesso e erro
✅ Alerts descritivos com detalhes técnicos
✅ Validação de formulários
✅ Estados de loading durante fetch
✅ Feedback visual em todas as interações
✅ Tratamento robusto de erros

---

## 🔧 Customização

### Mudar cores dos toasts

Edite as constantes em `Toast.jsx`:

```jsx
const STYLES = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  // ...
};
```

### Mudar duração padrão dos toasts

Em `ToastContext.jsx`:

```jsx
const addToast = useCallback((message, type = 'info', duration = 5000) => {
  // Alterado de 4000 para 5000ms
});
```

### Adicionar nova variante de Button

Em `ButtonImproved.jsx`:

```jsx
const VARIANTS = {
  // ...
  custom: 'bg-purple-600 hover:bg-purple-700 text-white',
};
```

---

## 📊 Benefícios

### Antes ❌
- Alerts nativos (`alert()`) interrompem o fluxo
- Loading state manual e inconsistente
- Mensagens de erro genéricas
- Sem feedback visual em ações
- Tratamento de erro duplicado

### Depois ✅
- Toasts não-obstrutivos e elegantes
- Loading states automáticos
- Mensagens de erro descritivas e úteis
- Feedback visual em todas as interações
- Tratamento de erro centralizado e consistente

---

## 🐛 Troubleshooting

**Toast não aparece:**
- Verifique se `<ToastProvider>` está envolvendo a aplicação
- Importe o CSS de animações

**Botão não mostra loading:**
- Use `ButtonImproved` ao invés de `Button`
- Passe a prop `loading={true}`

**Erros não estão formatados:**
- Use `handleApiError()` nas requisições
- Ou `formatErrorMessage()` para exibição

---

## 📚 Próximos Passos

Depois de implementar estas melhorias, considere:

1. Adicionar loading skeletons para listas longas
2. Implementar confirmação de ações destrutivas
3. Adicionar undo/redo para ações críticas
4. Criar logs de ações do usuário
5. Adicionar testes automatizados

---

## 💡 Dicas

- Use `toast.info()` para informações neutras
- Use `toast.warning()` para avisos que não bloqueiam
- Use `toast.error()` apenas para erros reais
- Sempre forneça uma ação clara quando há erro
- Mantenha mensagens curtas (máx. 100 caracteres)
- Use a seção de detalhes para informações técnicas
- Teste loading states com conexão lenta (DevTools)

---

## 👥 Suporte

Se tiver dúvidas sobre a implementação, consulte:
- `LojasPageImproved.jsx` - Exemplo completo
- Comentários nos arquivos de código
- Esta documentação
