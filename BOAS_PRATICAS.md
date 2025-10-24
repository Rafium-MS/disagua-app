# 🎓 Guia de Boas Práticas - Claude Code

Como extrair o máximo do Claude Code no desenvolvimento do Diságua.

---

## 🎯 O que é Claude Code?

Claude Code é uma ferramenta de linha de comando que permite delegar tarefas de desenvolvimento para o Claude. Ele pode:
- Escrever código
- Refatorar
- Debugar
- Criar testes
- Documentar
- E muito mais!

---

## ✅ Anatomia de um Bom Prompt

### 1. Contexto Claro
```
❌ RUIM: "Adicione validação"
✅ BOM: "Adicione validação no formulário de cadastro de lojas em app/frontend/src/pages/LojasPage.jsx"
```

### 2. Objetivo Específico
```
❌ RUIM: "Melhore o código"
✅ BOM: "Refatore a função fetchData() para usar o hook useAsync e reduzir duplicação"
```

### 3. Requisitos Técnicos
```
❌ RUIM: "Crie um endpoint"
✅ BOM: "Crie endpoint POST /notifications que:
- Use NestJS
- Retorne 201 Created
- Valide com class-validator
- Filtre por orgId
- Inclua testes"
```

### 4. Exemplos Esperados
```
✅ Forneça exemplo de input/output:
"O endpoint deve receber:
{ title: 'Nova loja', message: '...', type: 'info' }

E retornar:
{ id: 'uuid', ...dados, createdAt: '2025-...' }"
```

---

## 🎨 Estrutura de Prompt Ideal

```markdown
[PAPEL] Você é um especialista em [tecnologia]

[CONTEXTO] 
Projeto: Diságua (React + NestJS + Prisma + Postgres)
Estado atual: [descreva]

[OBJETIVO]
Preciso [ação clara e específica]

[PASSOS]
1. [passo 1]
2. [passo 2]
3. [passo 3]

[REQUISITOS]
- Requisito técnico 1
- Requisito de qualidade 2
- Requisito de teste 3

[ARQUIVOS]
Criar/Modificar:
- path/to/file1.ts
- path/to/file2.tsx

[CÓDIGO EXEMPLO]
```typescript
// Exemplo do código esperado
```

[VALIDAÇÃO]
Após concluir:
- [ ] Código compila
- [ ] Testes passam
- [ ] Funcionalidade testada

[ENTREGA]
Me mostre:
1. Código criado
2. Testes executados
3. Screenshots se aplicável
```

---

## 💪 Técnicas Avançadas

### 1. Incremental Development

**Ao invés de:**
```
"Crie um sistema completo de notificações com backend, frontend, testes e docs"
```

**Faça em etapas:**
```
Prompt 1: "Crie o schema Prisma para notificações"
Prompt 2: "Crie o service com método createNotification"
Prompt 3: "Crie o controller com rotas REST"
Prompt 4: "Crie o frontend para exibir notificações"
Prompt 5: "Adicione testes E2E"
```

### 2. Context Injection

**Forneça contexto relevante:**
```
"Você está trabalhando no projeto Diságua que usa:
- Backend: NestJS 10 + Prisma 5 + PostgreSQL 15
- Frontend: React 18 + Tailwind CSS 3 + Vite 5
- Auth: JWT com roles (admin, operador, auditor)
- Storage: MinIO (S3-compatible)

Estrutura:
- app/backend/src/ → código backend
- app/frontend/src/ → código frontend

Convenções:
- Sempre filtrar por orgId (multi-tenant)
- Usar try-catch com logging
- DTOs para validação
- Testes para features novas"
```

### 3. Error Recovery

**Se o Claude errar:**
```
"O código anterior deu erro: [erro específico]

Possíveis causas:
1. [causa 1]
2. [causa 2]

Corrija considerando:
- [requisito que faltou]
- [detalhe de implementação]

Teste novamente após corrigir."
```

### 4. Iterative Refinement

**Primeira iteração:**
```
"Crie uma função de validação de CNPJ básica"
```

**Segunda iteração:**
```
"Melhore a função adicionando:
- Validação de dígitos verificadores
- Mensagens de erro descritivas
- Suporte a CNPJ formatado ou não
- Testes unitários"
```

---

## 🚫 Armadilhas Comuns

### 1. Prompts Vagos
```
❌ "Melhore a performance"
✅ "Otimize getDashboard() reduzindo queries de 15 para <5 usando $transaction"
```

### 2. Múltiplos Objetivos
```
❌ "Crie CRUD de produtos, adicione testes, documente API, refatore código antigo"
✅ Separe em 4 prompts diferentes
```

### 3. Falta de Validação
```
❌ Aceitar código sem testar
✅ Sempre validar: compilação, testes, comportamento
```

### 4. Não Fornecer Contexto
```
❌ "Adicione autenticação"
✅ "Adicione middleware JWT em app/backend usando strategy existente em src/auth/"
```

### 5. Ignorar Convenções
```
❌ Deixar Claude decidir estrutura
✅ "Siga o padrão existente: module.ts, controller.ts, service.ts em src/[entity]/"
```

---

## 🎯 Casos de Uso Ideais

### ✅ Quando Usar Claude Code:

1. **Código Boilerplate**
   - CRUDs repetitivos
   - Endpoints REST
   - DTOs e validações
   - Schemas Prisma

2. **Refatoração**
   - Extrair hooks
   - Remover duplicação
   - Melhorar estrutura

3. **Testes**
   - Testes unitários
   - Testes E2E
   - Mocks e fixtures

4. **Documentação**
   - Swagger/OpenAPI
   - JSDoc/TSDoc
   - READMEs
   - Comentários

5. **Debugging**
   - Identificar bugs
   - Adicionar logs
   - Corrigir erros

### ❌ Quando NÃO Usar:

1. **Lógica de Negócio Crítica**
   - Cálculos financeiros
   - Regras de compliance
   - Segurança sensível

2. **Decisões Arquiteturais**
   - Escolha de frameworks
   - Estrutura de pastas
   - Padrões de projeto

3. **Code Review**
   - Análise de código existente
   - Aprovação de PRs
   - Validação de segurança

4. **Integração Complexa**
   - APIs de terceiros não documentadas
   - Sistemas legados sem docs
   - Protocolos proprietários

---

## 📊 Métricas de Sucesso

### Como saber se seu prompt foi bom:

✅ **Código funciona na primeira execução**
✅ **Seguiu todas as convenções**
✅ **Testes passam**
✅ **Documentação adequada**
✅ **Pouca/nenhuma modificação manual necessária**

### Como saber se deve refinar:

⚠️ **Múltiplas tentativas necessárias**
⚠️ **Código não compila**
⚠️ **Ignora requisitos**
⚠️ **Estilo inconsistente**
⚠️ **Faltam testes ou docs**

---

## 🎓 Templates por Tipo de Tarefa

### 🏗️ Criar Feature Nova

```
Crie [feature] completa em [caminho]

CONTEXTO:
[Descreva o sistema atual]

ARQUITETURA:
Backend: [estrutura esperada]
Frontend: [estrutura esperada]

FUNCIONALIDADES:
1. [func 1]
2. [func 2]

SCHEMA:
[Mostre schema Prisma]

VALIDAÇÕES:
[Liste regras de negócio]

TESTES:
[Descreva casos de teste]

DELIVERABLES:
- Código backend
- Código frontend
- Migrations
- Testes
- Docs
```

### 🔧 Refatorar Código

```
Refatore [arquivo/função] em [caminho]

PROBLEMA ATUAL:
[Descreva code smells]

OBJETIVO:
[Resultado esperado]

TÉCNICAS:
- [técnica 1: ex. Extract Method]
- [técnica 2: ex. Replace Temp with Query]

MANTENHA:
- [Funcionalidade atual]
- [API pública]

MELHORE:
- [Aspecto 1]
- [Aspecto 2]

VALIDAÇÃO:
- Testes existentes continuam passando
- Comportamento idêntico
```

### 🐛 Corrigir Bug

```
Corrija bug em [componente/função]

SINTOMA:
[Descreva o comportamento incorreto]

ESPERADO:
[Descreva comportamento correto]

REPRODUÇÃO:
1. [passo 1]
2. [passo 2]
3. [bug ocorre]

INVESTIGAÇÃO:
[Suspeitas iniciais]

CORREÇÃO:
[Abordagem sugerida]

VALIDAÇÃO:
- Bug não ocorre mais
- Casos relacionados testados
- Teste adicionado para evitar regressão
```

### ✅ Adicionar Testes

```
Crie testes para [funcionalidade]

CÓDIGO A TESTAR:
[Caminho do arquivo]

CASOS DE TESTE:
1. Happy path: [descrição]
2. Edge case: [descrição]
3. Error case: [descrição]

SETUP:
[Mocks necessários]

ASSERTIONS:
[O que validar]

COBERTURA:
- Linhas: >80%
- Branches: >75%
```

---

## 🚀 Workflow Recomendado

### 1. Planejamento (2 min)
- Defina o objetivo claramente
- Identifique arquivos envolvidos
- Liste requisitos

### 2. Prompt (3 min)
- Escreva prompt detalhado
- Inclua exemplos
- Especifique validações

### 3. Execução (1-10 min)
- Execute Claude Code
- Aguarde conclusão
- Leia output

### 4. Revisão (5 min)
- Revise código gerado
- Execute testes
- Valide funcionalidade

### 5. Iteração (se necessário)
- Identifique problemas
- Refine prompt
- Re-execute

### 6. Commit (2 min)
- Faça commit com mensagem descritiva
- Push se aprovado

**Tempo total: 13-22 min por tarefa**

---

## 📚 Recursos

### Documentação Oficial
- Claude Code: https://docs.claude.com/en/docs/claude-code
- API Reference: https://docs.anthropic.com

### Exemplos
- GitHub: https://github.com/anthropics/claude-code-examples
- Community: https://community.anthropic.com

### Troubleshooting
- FAQ: https://docs.claude.com/en/docs/faq
- Support: support@anthropic.com

---

## 💡 Dicas Finais

1. **Seja específico, não genérico**
2. **Forneça contexto, não presuma**
3. **Valide sempre, não confie cegamente**
4. **Itere quando necessário, não desista**
5. **Aprenda com prompts anteriores**
6. **Documente seus prompts bem-sucedidos**
7. **Compartilhe com o time**
8. **Mantenha segurança em mente**
9. **Revise código crítico manualmente**
10. **Celebre vitórias, aprenda com falhas**

---

**Bons códigos com Claude Code! 🚀🤖**
