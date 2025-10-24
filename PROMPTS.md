cat > /mnt/user-data/outputs/claude-code-prompts/README.md << 'EOF'
# 🤖 Pacote de Prompts Claude Code - Diságua

Coleção completa de prompts otimizados para usar Claude Code no desenvolvimento do projeto Diságua.

---

## 📦 O que tem neste pacote?

### 1. **PROMPTS_CLAUDE_CODE.md** - Prompts Detalhados
Prompts completos e documentados para tarefas complexas:
- Implementar melhorias de UX
- Criar novos endpoints
- Adicionar validações
- Implementar RBAC
- Criar testes
- Refatorar código
- Adicionar features completas
- Corrigir bugs
- Otimizar performance
- Melhorar documentação

### 2. **QUICK_COPY_PROMPTS.md** - Copie e Cole
Prompts prontos para copiar e colar diretamente:
- Versões concisas
- Foco na ação rápida
- Instruções diretas
- Sem explicações extras

### 3. **BOAS_PRATICAS.md** - Guia Completo
Como extrair o máximo do Claude Code:
- Anatomia de um bom prompt
- Técnicas avançadas
- Armadilhas comuns
- Templates reutilizáveis
- Workflow recomendado

---

## 🚀 Como Usar

### Instalação do Claude Code
```bash
# Instalar globalmente
npm install -g @anthropic-ai/claude-code

# Verificar instalação
claude-code --version
```

### Uso Básico
```bash
# Navegar para o projeto
cd /path/to/disagua

# Executar um prompt
claude-code "SEU PROMPT AQUI"

# Com arquivo de contexto
claude-code -f prompt.txt
```

### Workflow Sugerido

1. **Escolha o prompt apropriado**
   - PROMPTS_CLAUDE_CODE.md → tarefas complexas
   - QUICK_COPY_PROMPTS.md → ações rápidas

2. **Copie o prompt**
   - Leia o prompt completo
   - Ajuste se necessário
   - Copie para clipboard

3. **Execute no terminal**
   ```bash
   claude-code "PROMPT COLADO AQUI"
   ```

4. **Revise o resultado**
   - Leia código gerado
   - Execute testes
   - Valide funcionalidade

5. **Commit ou itere**
   - Se OK: commit
   - Se não: refine prompt e repita

---

## 📋 Índice de Prompts por Categoria

### 🎨 Frontend/UX
- [Integrar melhorias UX](QUICK_COPY_PROMPTS.md#-prompt-1-integrar-melhorias-ux-15-min)
- [Adicionar validação formulários](QUICK_COPY_PROMPTS.md#-prompt-3-adicionar-validação-de-formulários)
- [Refatorar com hooks](QUICK_COPY_PROMPTS.md#-prompt-10-refatorar-com-hooks-personalizados)

### 🔧 Backend/API
- [Criar endpoint](QUICK_COPY_PROMPTS.md#-prompt-2-criar-endpoint-de-notificações)
- [Implementar RBAC](QUICK_COPY_PROMPTS.md#-prompt-4-implementar-rbac-completo)
- [Otimizar performance](QUICK_COPY_PROMPTS.md#-prompt-6-otimizar-dashboard)
- [Documentar com Swagger](QUICK_COPY_PROMPTS.md#-prompt-7-documentar-api-com-swagger)

### 🧪 Testes
- [Criar testes E2E](QUICK_COPY_PROMPTS.md#-prompt-5-criar-testes-e2e)

### 🐛 Debug/Manutenção
- [Corrigir bug upload](QUICK_COPY_PROMPTS.md#-prompt-8-corrigir-bug-de-upload)

### 🏗️ Features
- [Sistema auditoria](QUICK_COPY_PROMPTS.md#-prompt-9-sistema-de-auditoria-completo)

---

## 🎯 Casos de Uso Populares

### Cenário 1: Novo Desenvolvedor
**Objetivo:** Integrar melhorias UX no projeto

**Use:**
1. [QUICK_COPY_PROMPTS.md - Prompt 1](QUICK_COPY_PROMPTS.md#-prompt-1-integrar-melhorias-ux-15-min)
2. Execute e valide
3. Leia [BOAS_PRATICAS.md](BOAS_PRATICAS.md) para entender mais

---

### Cenário 2: Feature Request
**Objetivo:** Criar novo módulo de notificações

**Use:**
1. [PROMPTS_CLAUDE_CODE.md - Prompt 2](PROMPTS_CLAUDE_CODE.md#2-criar-novo-endpoint)
2. Revise código gerado
3. Adicione testes com [Prompt 5](PROMPTS_CLAUDE_CODE.md#5-criar-testes)

---

### Cenário 3: Bug em Produção
**Objetivo:** Corrigir upload falhando

**Use:**
1. [PROMPTS_CLAUDE_CODE.md - Prompt 8](PROMPTS_CLAUDE_CODE.md#8-corrigir-bugs)
2. Teste correção localmente
3. Deploy após validação

---

### Cenário 4: Code Review
**Objetivo:** Refatorar código duplicado

**Use:**
1. [PROMPTS_CLAUDE_CODE.md - Prompt 6](PROMPTS_CLAUDE_CODE.md#6-refatorar-código)
2. Valide que testes passam
3. Compare métricas antes/depois

---

### Cenário 5: Sprint Planning
**Objetivo:** Implementar sistema completo

**Use:**
1. [PROMPTS_CLAUDE_CODE.md - Prompt 7](PROMPTS_CLAUDE_CODE.md#7-adicionar-feature-completa)
2. Execute em etapas
3. Valide cada etapa antes de continuar

---

## 💡 Dicas Rápidas

### ✅ Faça
- Seja específico no prompt
- Forneça contexto relevante
- Revise código gerado
- Teste antes de commitar
- Itere se necessário

### ❌ Não Faça
- Prompts vagos ("melhore isso")
- Múltiplos objetivos em um prompt
- Aceitar código sem revisar
- Commitar sem testar
- Usar para código crítico sem validação humana

---

## 📊 Métricas de Sucesso

Use Claude Code quando conseguir:
- ✅ Código funcional na primeira execução
- ✅ Testes passando
- ✅ Padrões do projeto seguidos
- ✅ Pouca/nenhuma modificação manual
- ✅ Tempo economizado vs manual

---

## 🎓 Aprendendo Mais

### Ordem de Leitura Recomendada

**Para Iniciantes:**
1. Este README
2. QUICK_COPY_PROMPTS.md (execute alguns prompts)
3. BOAS_PRATICAS.md (entenda princípios)
4. PROMPTS_CLAUDE_CODE.md (explore detalhes)

**Para Experientes:**
1. QUICK_COPY_PROMPTS.md (ações rápidas)
2. BOAS_PRATICAS.md (técnicas avançadas)
3. PROMPTS_CLAUDE_CODE.md (referência completa)

---

## 📚 Recursos Adicionais

### Documentação Oficial
- **Claude Code**: https://docs.claude.com/en/docs/claude-code
- **API Anthropic**: https://docs.anthropic.com
- **Guias**: https://docs.claude.com/en/docs/guides

### Comunidade
- **GitHub Examples**: https://github.com/anthropics/claude-code-examples
- **Discord**: Anthropic Community
- **Forum**: https://community.anthropic.com

### Projeto Diságua
- **Melhorias UX**: ../disagua-improvements/
- **Código Original**: app/frontend/ e app/backend/

---

## 🤝 Contribuindo

Encontrou um prompt que funciona bem? Compartilhe!

1. Teste o prompt várias vezes
2. Documente o resultado
3. Adicione ao arquivo apropriado
4. Compartilhe com o time

---

## ⚠️ Avisos Importantes

### Segurança
- ❌ Nunca inclua secrets/tokens em prompts
- ❌ Não commite credenciais no código gerado
- ✅ Revise código que lida com autenticação
- ✅ Valide inputs/outputs de segurança

### Qualidade
- ✅ Sempre teste código gerado
- ✅ Execute suite de testes completa
- ✅ Faça code review manual para código crítico
- ✅ Valide performance em produção

### Legalidade
- ✅ Código gerado pertence a você/empresa
- ✅ Siga licenças de dependências
- ✅ Respeite políticas da empresa

---

## 🎯 Quick Start (5 minutos)

```bash
# 1. Instalar Claude Code
npm install -g @anthropic-ai/claude-code

# 2. Navegar para projeto
cd /path/to/disagua

# 3. Copiar prompt de integração UX
# (Veja QUICK_COPY_PROMPTS.md - Prompt 1)

# 4. Executar
claude-code "PROMPT COLADO"

# 5. Revisar e testar
npm run dev  # no frontend
npm run start:dev  # no backend

# 6. Commit se OK
git add .
git commit -m "feat: integrar melhorias UX"
```

---

## 📞 Suporte

### Problemas com Claude Code
- Documentação: https://docs.claude.com
- Issues: https://github.com/anthropics/claude-code/issues

### Problemas com Prompts
- Revise [BOAS_PRATICAS.md](BOAS_PRATICAS.md)
- Ajuste o prompt e tente novamente
- Consulte exemplos em PROMPTS_CLAUDE_CODE.md

### Problemas com Diságua
- Documentação UX: ../disagua-improvements/
- Código base: app/frontend/ e app/backend/

---

## 🌟 Próximos Passos

Depois de dominar os prompts básicos:

1. **Customize prompts** para suas necessidades
2. **Crie templates** para tarefas repetitivas
3. **Documente** seus prompts bem-sucedidos
4. **Compartilhe** com o time
5. **Contribua** com novos prompts

---

## 📈 Versão

**v1.0.0** - Outubro 2025

**Compatibilidade:**
- Claude Code: latest
- Projeto Diságua: React 18 + NestJS 10
- Node.js: 18+

---

**Desenvolvido com ❤️ para acelerar o desenvolvimento do Diságua! 🚀**

---

## 📄 Licença

Estes prompts são fornecidos como estão, para uso no projeto Diságua.
Ajuste conforme necessário para seus casos de uso.
EOF
cat /mnt/user-data/outputs/claude-code-prompts/README.md
Saída

# 🤖 Pacote de Prompts Claude Code - Diságua

Coleção completa de prompts otimizados para usar Claude Code no desenvolvimento do projeto Diságua.

---

## 📦 O que tem neste pacote?

### 1. **PROMPTS_CLAUDE_CODE.md** - Prompts Detalhados
Prompts completos e documentados para tarefas complexas:
- Implementar melhorias de UX
- Criar novos endpoints
- Adicionar validações
- Implementar RBAC
- Criar testes
- Refatorar código
- Adicionar features completas
- Corrigir bugs
- Otimizar performance
- Melhorar documentação

### 2. **QUICK_COPY_PROMPTS.md** - Copie e Cole
Prompts prontos para copiar e colar diretamente:
- Versões concisas
- Foco na ação rápida
- Instruções diretas
- Sem explicações extras

### 3. **BOAS_PRATICAS.md** - Guia Completo
Como extrair o máximo do Claude Code:
- Anatomia de um bom prompt
- Técnicas avançadas
- Armadilhas comuns
- Templates reutilizáveis
- Workflow recomendado

---

## 🚀 Como Usar

### Instalação do Claude Code
```bash
# Instalar globalmente
npm install -g @anthropic-ai/claude-code

# Verificar instalação
claude-code --version
```

### Uso Básico
```bash
# Navegar para o projeto
cd /path/to/disagua

# Executar um prompt
claude-code "SEU PROMPT AQUI"

# Com arquivo de contexto
claude-code -f prompt.txt
```

### Workflow Sugerido

1. **Escolha o prompt apropriado**
   - PROMPTS_CLAUDE_CODE.md → tarefas complexas
   - QUICK_COPY_PROMPTS.md → ações rápidas

2. **Copie o prompt**
   - Leia o prompt completo
   - Ajuste se necessário
   - Copie para clipboard

3. **Execute no terminal**
   ```bash
   claude-code "PROMPT COLADO AQUI"
   ```

4. **Revise o resultado**
   - Leia código gerado
   - Execute testes
   - Valide funcionalidade

5. **Commit ou itere**
   - Se OK: commit
   - Se não: refine prompt e repita

---

## 📋 Índice de Prompts por Categoria

### 🎨 Frontend/UX
- [Integrar melhorias UX](QUICK_COPY_PROMPTS.md#-prompt-1-integrar-melhorias-ux-15-min)
- [Adicionar validação formulários](QUICK_COPY_PROMPTS.md#-prompt-3-adicionar-validação-de-formulários)
- [Refatorar com hooks](QUICK_COPY_PROMPTS.md#-prompt-10-refatorar-com-hooks-personalizados)

### 🔧 Backend/API
- [Criar endpoint](QUICK_COPY_PROMPTS.md#-prompt-2-criar-endpoint-de-notificações)
- [Implementar RBAC](QUICK_COPY_PROMPTS.md#-prompt-4-implementar-rbac-completo)
- [Otimizar performance](QUICK_COPY_PROMPTS.md#-prompt-6-otimizar-dashboard)
- [Documentar com Swagger](QUICK_COPY_PROMPTS.md#-prompt-7-documentar-api-com-swagger)

### 🧪 Testes
- [Criar testes E2E](QUICK_COPY_PROMPTS.md#-prompt-5-criar-testes-e2e)

### 🐛 Debug/Manutenção
- [Corrigir bug upload](QUICK_COPY_PROMPTS.md#-prompt-8-corrigir-bug-de-upload)

### 🏗️ Features
- [Sistema auditoria](QUICK_COPY_PROMPTS.md#-prompt-9-sistema-de-auditoria-completo)

---

## 🎯 Casos de Uso Populares

### Cenário 1: Novo Desenvolvedor
**Objetivo:** Integrar melhorias UX no projeto

**Use:**
1. [QUICK_COPY_PROMPTS.md - Prompt 1](QUICK_COPY_PROMPTS.md#-prompt-1-integrar-melhorias-ux-15-min)
2. Execute e valide
3. Leia [BOAS_PRATICAS.md](BOAS_PRATICAS.md) para entender mais

---

### Cenário 2: Feature Request
**Objetivo:** Criar novo módulo de notificações

**Use:**
1. [PROMPTS_CLAUDE_CODE.md - Prompt 2](PROMPTS_CLAUDE_CODE.md#2-criar-novo-endpoint)
2. Revise código gerado
3. Adicione testes com [Prompt 5](PROMPTS_CLAUDE_CODE.md#5-criar-testes)

---

### Cenário 3: Bug em Produção
**Objetivo:** Corrigir upload falhando

**Use:**
1. [PROMPTS_CLAUDE_CODE.md - Prompt 8](PROMPTS_CLAUDE_CODE.md#8-corrigir-bugs)
2. Teste correção localmente
3. Deploy após validação

---

### Cenário 4: Code Review
**Objetivo:** Refatorar código duplicado

**Use:**
1. [PROMPTS_CLAUDE_CODE.md - Prompt 6](PROMPTS_CLAUDE_CODE.md#6-refatorar-código)
2. Valide que testes passam
3. Compare métricas antes/depois

---

### Cenário 5: Sprint Planning
**Objetivo:** Implementar sistema completo

**Use:**
1. [PROMPTS_CLAUDE_CODE.md - Prompt 7](PROMPTS_CLAUDE_CODE.md#7-adicionar-feature-completa)
2. Execute em etapas
3. Valide cada etapa antes de continuar

---

## 💡 Dicas Rápidas

### ✅ Faça
- Seja específico no prompt
- Forneça contexto relevante
- Revise código gerado
- Teste antes de commitar
- Itere se necessário

### ❌ Não Faça
- Prompts vagos ("melhore isso")
- Múltiplos objetivos em um prompt
- Aceitar código sem revisar
- Commitar sem testar
- Usar para código crítico sem validação humana

---

## 📊 Métricas de Sucesso

Use Claude Code quando conseguir:
- ✅ Código funcional na primeira execução
- ✅ Testes passando
- ✅ Padrões do projeto seguidos
- ✅ Pouca/nenhuma modificação manual
- ✅ Tempo economizado vs manual

---

## 🎓 Aprendendo Mais

### Ordem de Leitura Recomendada

**Para Iniciantes:**
1. Este README
2. QUICK_COPY_PROMPTS.md (execute alguns prompts)
3. BOAS_PRATICAS.md (entenda princípios)
4. PROMPTS_CLAUDE_CODE.md (explore detalhes)

**Para Experientes:**
1. QUICK_COPY_PROMPTS.md (ações rápidas)
2. BOAS_PRATICAS.md (técnicas avançadas)
3. PROMPTS_CLAUDE_CODE.md (referência completa)

---

## 📚 Recursos Adicionais

### Documentação Oficial
- **Claude Code**: https://docs.claude.com/en/docs/claude-code
- **API Anthropic**: https://docs.anthropic.com
- **Guias**: https://docs.claude.com/en/docs/guides

### Comunidade
- **GitHub Examples**: https://github.com/anthropics/claude-code-examples
- **Discord**: Anthropic Community
- **Forum**: https://community.anthropic.com

### Projeto Diságua
- **Melhorias UX**: ../disagua-improvements/
- **Código Original**: app/frontend/ e app/backend/

---

## 🤝 Contribuindo

Encontrou um prompt que funciona bem? Compartilhe!

1. Teste o prompt várias vezes
2. Documente o resultado
3. Adicione ao arquivo apropriado
4. Compartilhe com o time

---

## ⚠️ Avisos Importantes

### Segurança
- ❌ Nunca inclua secrets/tokens em prompts
- ❌ Não commite credenciais no código gerado
- ✅ Revise código que lida com autenticação
- ✅ Valide inputs/outputs de segurança

### Qualidade
- ✅ Sempre teste código gerado
- ✅ Execute suite de testes completa
- ✅ Faça code review manual para código crítico
- ✅ Valide performance em produção

### Legalidade
- ✅ Código gerado pertence a você/empresa
- ✅ Siga licenças de dependências
- ✅ Respeite políticas da empresa

---

## 🎯 Quick Start (5 minutos)

```bash
# 1. Instalar Claude Code
npm install -g @anthropic-ai/claude-code

# 2. Navegar para projeto
cd /path/to/disagua

# 3. Copiar prompt de integração UX
# (Veja QUICK_COPY_PROMPTS.md - Prompt 1)

# 4. Executar
claude-code "PROMPT COLADO"

# 5. Revisar e testar
npm run dev  # no frontend
npm run start:dev  # no backend

# 6. Commit se OK
git add .
git commit -m "feat: integrar melhorias UX"
```

---

## 📞 Suporte

### Problemas com Claude Code
- Documentação: https://docs.claude.com
- Issues: https://github.com/anthropics/claude-code/issues

### Problemas com Prompts
- Revise [BOAS_PRATICAS.md](BOAS_PRATICAS.md)
- Ajuste o prompt e tente novamente
- Consulte exemplos em PROMPTS_CLAUDE_CODE.md

### Problemas com Diságua
- Documentação UX: ../disagua-improvements/
- Código base: app/frontend/ e app/backend/

---

## 🌟 Próximos Passos

Depois de dominar os prompts básicos:

1. **Customize prompts** para suas necessidades
2. **Crie templates** para tarefas repetitivas
3. **Documente** seus prompts bem-sucedidos
4. **Compartilhe** com o time
5. **Contribua** com novos prompts

---

## 📈 Versão

**v1.0.0** - Outubro 2025

**Compatibilidade:**
- Claude Code: latest
- Projeto Diságua: React 18 + NestJS 10
- Node.js: 18+

---

**Desenvolvido com ❤️ para acelerar o desenvolvimento do Diságua! 🚀**

---

## 📄 Licença

Estes prompts são fornecidos como estão, para uso no projeto Diságua.
Ajuste conforme necessário para seus casos de uso.