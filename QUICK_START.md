# Guia Rápido de Implementação - 15 Minutos

## 🚀 Setup Inicial (5 minutos)

### 1. Copiar arquivos para o projeto

```bash
# A partir da raiz do frontend
cp -r disagua-improvements/frontend/src/* src/
```

### 2. Adicionar ToastProvider no App

**Em `src/main.jsx` ou `src/App.jsx`:**

```jsx
import { ToastProvider } from './context/ToastContext';
import './styles/animations.css';

// ... outros imports

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          {/* resto da app */}
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}
```

---

## ✅ Migração Página por Página (10 minutos)

### Exemplo 1: LoginPage com Loading e Toast

**Antes:**
```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

async function onSubmit(e) {
  e.preventDefault();
  setError('');
  setLoading(true);
  try {
    await login(form);
  } catch (err) {
    setError(err.message || 'Erro ao autenticar');
  } finally {
    setLoading(false);
  }
}

return (
  <>
    {error && <p className="text-rose-600">{error}</p>}
    <button disabled={loading}>
      {loading ? 'Entrando...' : 'Entrar'}
    </button>
  </>
);
```

**Depois:**
```jsx
import Button from '../components/ui/ButtonImproved';
import { useAsync } from '../hooks/useAsync';

const { execute: handleLogin, loading } = useAsync(
  async () => await login(form),
  {
    showSuccessToast: false, // não precisa toast no login
    errorMessage: 'Não foi possível autenticar. Verifique suas credenciais.',
  }
);

async function onSubmit(e) {
  e.preventDefault();
  await handleLogin();
}

return (
  <Button type="submit" loading={loading}>
    Entrar
  </Button>
);
```

---

### Exemplo 2: Criar Parceiro com Feedback

**Antes:**
```jsx
async function onSubmit(e) {
  e.preventDefault();
  setError('');
  try {
    const created = await createPartner(form);
    setPartners(prev => [created, ...prev]);
    setForm({ /* limpar */ });
    alert('Parceiro criado!');
  } catch (err) {
    setError(err.message);
  }
}
```

**Depois:**
```jsx
import { useToast } from '../context/ToastContext';
import { useAsync } from '../hooks/useAsync';

const toast = useToast();

const { execute: handleCreate, loading } = useAsync(
  async (data) => {
    const created = await createPartner(data);
    setPartners(prev => [created, ...prev]);
    setForm({ /* limpar */ });
  },
  {
    showSuccessToast: true,
    successMessage: 'Parceiro cadastrado com sucesso!',
  }
);

async function onSubmit(e) {
  e.preventDefault();
  await handleCreate(form);
}
```

---

### Exemplo 3: Página com Loading Inicial

**Antes:**
```jsx
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);

useEffect(() => {
  async function fetchData() {
    setLoading(true);
    try {
      const result = await api.getData();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);

return (
  <>
    {loading && <p>Carregando...</p>}
    {!loading && data.length === 0 && <p>Nenhum dado</p>}
    {!loading && data.map(item => <div key={item.id}>{item.name}</div>)}
  </>
);
```

**Depois:**
```jsx
import { InlineLoader } from '../components/ui/Spinner';
import { useAsync } from '../hooks/useAsync';

const [data, setData] = useState([]);

const { execute: loadData, loading } = useAsync(
  async () => {
    const result = await api.getData();
    setData(result);
  },
  { showErrorToast: true }
);

useEffect(() => {
  loadData();
}, []);

if (loading && data.length === 0) {
  return <InlineLoader message="Carregando dados..." />;
}

return (
  <>
    {data.length === 0 ? (
      <p className="text-slate-500">Nenhum dado encontrado</p>
    ) : (
      data.map(item => <div key={item.id}>{item.name}</div>)
    )}
  </>
);
```

---

### Exemplo 4: Ação Destrutiva com Confirmação

```jsx
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/ButtonImproved';

const toast = useToast();

async function handleDelete(id) {
  const confirmed = confirm('Tem certeza que deseja excluir?');
  if (!confirmed) return;

  try {
    await api.delete(id);
    toast.success('Registro excluído com sucesso!');
    // atualizar lista
  } catch (error) {
    toast.error('Não foi possível excluir o registro.');
  }
}

return (
  <Button 
    variant="danger" 
    size="sm"
    onClick={() => handleDelete(item.id)}
  >
    Excluir
  </Button>
);
```

---

### Exemplo 5: Múltiplos Toasts

```jsx
import { useToast } from '../context/ToastContext';

const toast = useToast();

async function processMultiple() {
  toast.info('Iniciando processamento...');
  
  try {
    await step1();
    toast.success('Etapa 1 concluída');
    
    await step2();
    toast.success('Etapa 2 concluída');
    
    toast.success('Processamento completo!', 6000);
  } catch (error) {
    toast.error('Erro no processamento');
  }
}
```

---

### Exemplo 6: Alert com Detalhes Técnicos

```jsx
import Alert from '../components/ui/Alert';
import { formatErrorMessage } from '../utils/errorHandler';

const [error, setError] = useState(null);

// No catch
catch (err) {
  setError(formatErrorMessage(err));
}

// No render
{error && (
  <Alert
    variant="error"
    title={error.title}
    message={error.message}
    details={error.details}
    onClose={() => setError(null)}
  />
)}
```

---

## 🎯 Padrões de Uso

### Toast: Quando Usar Cada Tipo

```jsx
// ✅ SUCCESS - Ação completada com sucesso
toast.success('Marca cadastrada!');
toast.success('Arquivo enviado!');
toast.success('Dados salvos!');

// ℹ️ INFO - Informação neutra
toast.info('Processamento iniciado...');
toast.info('5 registros encontrados');

// ⚠️ WARNING - Aviso não-crítico
toast.warning('Alguns campos estão vazios');
toast.warning('Essa ação não pode ser desfeita');

// ❌ ERROR - Erro que precisa atenção
toast.error('Não foi possível salvar');
toast.error('Sessão expirada');
```

### Loading States: Melhores Práticas

```jsx
// ✅ BOM: Loading específico
<Button loading={savingData}>Salvar Dados</Button>
<Button loading={deletingItem}>Excluir</Button>

// ❌ RUIM: Loading genérico
<Button loading={loading}>Ação</Button>

// ✅ BOM: Desabilitar inputs durante loading
<Input disabled={loading} />
<Select disabled={loading} />

// ✅ BOM: Loading inline para listas
{loading ? (
  <InlineLoader message="Carregando lojas..." />
) : (
  <Lista items={data} />
)}
```

---

## 🔥 Atalhos Úteis

### Substituição Rápida em Todo o Projeto

**VSCode Find & Replace (Ctrl/Cmd + Shift + H):**

1. Substituir imports de Button:
   - Buscar: `from '../components/ui/Button'`
   - Substituir: `from '../components/ui/ButtonImproved'`

2. Substituir alerts:
   - Buscar: `alert\('(.+?)'\)`
   - Substituir: `toast.success('$1')`

3. Substituir mensagens de erro:
   - Buscar: `<p className="text-.*?rose.*?">(.+?)</p>`
   - Substituir: `<Alert variant="error" message="$1" />`

---

## 📋 Checklist Final

Após implementar, verifique:

- [ ] `<ToastProvider>` está envolvendo a app
- [ ] CSS de animações está importado
- [ ] Todos os buttons usam `ButtonImproved`
- [ ] Nenhum `alert()` nativo restante
- [ ] Requisições usam `useAsync` ou tratamento de erro adequado
- [ ] Loading states em todos os botões de ação
- [ ] Feedback visual em todas as interações
- [ ] Mensagens de erro são descritivas
- [ ] Formulários validam antes de submeter
- [ ] Estados de disabled durante operações

---

## 🎉 Pronto!

Agora seu app tem:
- ✅ Loading states profissionais
- ✅ Feedback visual consistente
- ✅ Mensagens de erro descritivas
- ✅ Experiência de usuário muito melhor

**Próximo passo:** Teste todas as funcionalidades e ajuste mensagens conforme necessário!
