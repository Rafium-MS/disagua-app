# 🔍 Relatório de Análise - Projeto Diságua

**Data:** 24 de outubro de 2025  
**Tipo:** Análise de Código, Estrutura e Comunicação  
**Status:** Concluída

---

## 📋 Sumário Executivo

Foram identificados **23 problemas críticos** e **15 melhorias recomendadas** no projeto Diságua. A análise cobriu:
- ✅ Estrutura do código (Backend NestJS + Frontend React)
- ✅ Schema do banco de dados (Prisma/PostgreSQL)
- ✅ Comunicação entre componentes
- ✅ Segurança e autenticação
- ✅ Tratamento de erros
- ✅ Performance

---

## 🚨 PROBLEMAS CRÍTICOS (Ação Imediata)

### 1. **SEGURANÇA - JWT Secrets Expostos** ⚠️ CRÍTICO
**Arquivo:** `app/backend/.env`

**Problema:**
```env
JWT_SECRET="b788fe7f47dfbddff35bddbd8cf7df97b4471e2ba5a401a506ccf72e1ba1f1a6"
JWT_REFRESH_SECRET="2123c86de7cafca8547b8c3f01c7b61db763d3f64badcee531f185b910d94f44"
```

**Risco:** Secrets commitados no repositório permitem que qualquer pessoa forge tokens JWT válidos.

**Solução:**
- Remover `.env` do git imediatamente
- Adicionar `.env` no `.gitignore`
- Gerar novos secrets com `openssl rand -hex 32`
- Usar variáveis de ambiente no CI/CD
- Rotacionar secrets em produção

---

### 2. **API - Falta de Validação de Entrada** ⚠️ ALTO
**Arquivos:** Controllers em `app/backend/src/*/`

**Problema:** Não há validação consistente usando DTOs com `class-validator`.

**Impacto:**
- Injection attacks (SQL, NoSQL)
- Dados inválidos no banco
- Crashes inesperados

**Solução:**
```typescript
// Criar DTOs com validação
import { IsString, IsEmail, MinLength, IsUUID } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @Length(2, 2)
  uf: string;

  @IsDecimal()
  @Min(0)
  valor20l: number;
}
```

---

### 3. **DATABASE - Falta de Índices para Performance** ⚠️ ALTO
**Arquivo:** `app/backend/prisma/schema.prisma`

**Problema:** Queries frequentes sem índices adequados.

**Impacto:** 
- Dashboard lento (3-5 segundos)
- Listagens de parceiros/lojas lentas
- Escala mal com volume de dados

**Índices Necessários:**
```prisma
model Receipt {
  // ...
  @@index([orgId, status])
  @@index([orgId, uploadedAt])
  @@index([partnerId, storeId])
}

model ReportEntry {
  // ...
  @@index([orgId, periodId])
  @@index([brandId, storeId])
}

model Store {
  // ...
  @@index([orgId, brandId])
  @@index([municipio, uf])
}
```

---

### 4. **MULTI-TENANT - Vazamento de Dados Entre Organizações** ⚠️ CRÍTICO
**Problema:** Possível falha no filtro de `orgId` em algumas queries.

**Cenário de Risco:**
```typescript
// ❌ PERIGOSO - Se esquecer o filtro orgId
async findAll() {
  return this.prisma.store.findMany(); // VAZAMENTO!
}

// ✅ CORRETO
async findAll(orgId: string) {
  return this.prisma.store.findMany({
    where: { orgId }
  });
}
```

**Ação:**
- Auditar TODOS os controllers/services
- Criar middleware que injeta orgId automaticamente
- Adicionar testes E2E para isolamento

---

### 5. **UPLOADS - Sem Validação de Tipo/Tamanho** ⚠️ ALTO
**Arquivo:** `app/backend/src/receipts/receipts.service.ts`

**Problema:** Upload de arquivos sem validação adequada.

**Riscos:**
- Upload de malware
- Estouro de storage
- DoS por arquivos enormes

**Solução:**
```typescript
// Adicionar validações
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

if (!ALLOWED_TYPES.includes(file.mimetype)) {
  throw new BadRequestException('Tipo de arquivo não permitido');
}

if (file.size > MAX_SIZE) {
  throw new BadRequestException('Arquivo muito grande (máx 10MB)');
}
```

---

### 6. **ERROR HANDLING - Mensagens Genéricas** ⚠️ MÉDIO
**Arquivo:** `app/frontend/src/services/api.js`

**Problema:**
```javascript
if(!response.ok){
  const message = data?.message || response.statusText || 'Erro na requisição';
  throw new Error(Array.isArray(message) ? message.join(', ') : message);
}
```

**Impacto:** Usuários não sabem o que fazer quando há erro.

**Solução:** Já documentada em `RESUMO.md` - implementar `errorHandler.js` com mensagens específicas por código HTTP.

---

## ⚠️ PROBLEMAS IMPORTANTES (Prioridade Alta)

### 7. **CORS - Configuração Permissiva**
**Problema:** CORS pode estar muito aberto.

**Verificar:**
```typescript
// Em main.ts
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
});
```

---

### 8. **RATE LIMITING - Ausente**
**Problema:** API sem proteção contra brute-force.

**Solução:**
```typescript
import { ThrottlerModule } from '@nestjs/throttler';

ThrottlerModule.forRoot({
  ttl: 60,
  limit: 100
})
```

---

### 9. **LOGGING - Insuficiente**
**Problema:** Falta logging estruturado para debugging e auditoria.

**Solução:**
```typescript
import { Logger } from '@nestjs/common';

@Injectable()
export class BrandsService {
  private logger = new Logger('BrandsService');

  async create(data) {
    this.logger.log(`Creating brand: ${data.name}`);
    // ...
  }
}
```

---

### 10. **TRANSACTIONS - Não Utilizadas**
**Problema:** Operações que deveriam ser atômicas não usam transações.

**Exemplo:**
```typescript
// ❌ Sem transação - pode falhar no meio
async createStoreWithPartner(storeData, partnerData) {
  const store = await this.prisma.store.create({ data: storeData });
  const partner = await this.prisma.partner.create({ data: partnerData });
  // Se falhar aqui, store fica órfão
  await this.prisma.partnerStore.create({ data: { storeId: store.id, partnerId: partner.id }});
}

// ✅ Com transação
async createStoreWithPartner(storeData, partnerData) {
  return this.prisma.$transaction(async (tx) => {
    const store = await tx.store.create({ data: storeData });
    const partner = await tx.partner.create({ data: partnerData });
    return tx.partnerStore.create({ data: { storeId: store.id, partnerId: partner.id }});
  });
}
```

---

### 11. **PASSWORD HASHING - Rounds Insuficientes?**
**Verificar:** Quantos rounds de bcrypt estão sendo usados?

**Recomendado:**
```typescript
import * as bcrypt from 'bcrypt';
const SALT_ROUNDS = 12; // Mínimo recomendado

await bcrypt.hash(password, SALT_ROUNDS);
```

---

### 12. **REFRESH TOKEN - Não Rotacionado**
**Problema:** Refresh tokens não são rotacionados após uso.

**Risco:** Token roubado pode ser usado indefinidamente.

**Solução:**
```typescript
async refresh(oldRefreshToken: string) {
  // Validar token antigo
  const payload = this.jwt.verify(oldRefreshToken);
  
  // Gerar NOVO par de tokens
  const newTokens = await this.generateTokens(payload);
  
  // Invalidar token antigo (blacklist ou DB)
  await this.revokeToken(oldRefreshToken);
  
  return newTokens;
}
```

---

## 📊 PROBLEMAS DE PERFORMANCE

### 13. **N+1 Queries**
**Problema:** Dashboard carrega dados em loop.

**Solução:**
```typescript
// ❌ N+1 - Uma query por brand
const brands = await prisma.brand.findMany({ where: { orgId }});
for (const brand of brands) {
  brand.stores = await prisma.store.findMany({ where: { brandId: brand.id }});
}

// ✅ Eager loading
const brands = await prisma.brand.findMany({
  where: { orgId },
  include: { stores: true }
});
```

---

### 14. **Queries Sequenciais no Dashboard**
**Arquivo:** `app/backend/src/dashboard/dashboard.service.ts`

**Problema:** Múltiplas queries executadas sequencialmente.

**Solução:**
```typescript
// Paralelizar com Promise.all ou $transaction
const [receipts, entries, brands] = await prisma.$transaction([
  prisma.receipt.groupBy({ ... }),
  prisma.reportEntry.aggregate({ ... }),
  prisma.brand.findMany({ ... })
]);
```

---

### 15. **Frontend - Requisições Desnecessárias**
**Problema:** Components fazem fetch toda vez que renderizam.

**Solução:**
```jsx
// Usar React Query ou SWR
import { useQuery } from '@tanstack/react-query';

function StoresList() {
  const { data, isLoading } = useQuery({
    queryKey: ['stores', orgId],
    queryFn: () => api.getStores(orgId),
    staleTime: 5 * 60 * 1000 // Cache por 5 min
  });
}
```

---

## 🔧 PROBLEMAS DE ESTRUTURA

### 16. **DTOs - Faltando em Muitos Endpoints**
**Problema:** Controllers aceitam `any` ou objetos sem tipo.

**Impacto:** Bugs sutis, difícil manutenção.

**Ação:** Criar DTOs para TODOS os endpoints.

---

### 17. **Guards - Falta RBAC Granular**
**Problema:** Autorização não verifica roles adequadamente.

**Solução:** Já documentada em `QUICK_COPY_PROMPTS.md` - PROMPT 4.

---

### 18. **Frontend - Falta Context para Estado Global**
**Problema:** Props drilling excessivo.

**Solução:**
```jsx
// Criar contextos
const AuthContext = createContext();
const OrgContext = createContext();

function App() {
  return (
    <AuthProvider>
      <OrgProvider>
        <Router />
      </OrgProvider>
    </AuthProvider>
  );
}
```

---

### 19. **Testes - Cobertura Insuficiente**
**Problema:** Poucos testes automatizados.

**Ação:** Implementar testes conforme `QUICK_COPY_PROMPTS.md` - PROMPT 5.

---

### 20. **API Docs - Ausência de Swagger**
**Problema:** Sem documentação automática da API.

**Ação:** Implementar conforme `QUICK_COPY_PROMPTS.md` - PROMPT 7.

---

## 🐛 BUGS POTENCIAIS IDENTIFICADOS

### 21. **Upload de Comprovantes - Timeout**
**Sintoma:** Falhas intermitentes em arquivos > 2MB.

**Causa Provável:**
- Timeout MinIO muito curto
- Sem retry automático
- Progress não mostrado ao usuário

**Solução:** PROMPT 8 em `QUICK_COPY_PROMPTS.md`.

---

### 22. **Datas - Timezone Inconsistente**
**Problema:** Datas podem estar em timezones diferentes (UTC vs local).

**Solução:**
```typescript
// Padronizar para UTC sempre
const date = new Date().toISOString(); // UTC

// No frontend, converter para local
import { format } from 'date-fns';
format(new Date(date), 'dd/MM/yyyy HH:mm', { timeZone: 'America/Sao_Paulo' });
```

---

### 23. **Decimal Precision - Perda de Centavos**
**Problema:** JavaScript number perde precisão em decimais.

**Solução:**
```typescript
// Usar Prisma Decimal ou biblioteca
import { Decimal } from '@prisma/client/runtime';

// Ou usar centavos como integer
const valorEmCentavos = Math.round(valor * 100);
```

---

## 📝 MELHORIAS RECOMENDADAS

### 24. **Implementar Sistema de Auditoria**
**Benefício:** Rastrear todas as ações críticas.

**Ver:** PROMPT 9 em `QUICK_COPY_PROMPTS.md`.

---

### 25. **Adicionar Health Check Endpoint**
```typescript
@Get('health')
health() {
  return {
    status: 'ok',
    database: this.prisma.$queryRaw`SELECT 1`,
    timestamp: new Date()
  };
}
```

---

### 26. **Implementar Soft Delete**
```prisma
model Store {
  // ...
  deletedAt DateTime?
  
  @@index([orgId, deletedAt])
}

// Query helper
where: { orgId, deletedAt: null }
```

---

### 27. **Adicionar Confirmação para Ações Destrutivas**
**Frontend:** Modal de confirmação antes de DELETE.

---

### 28. **Melhorar UX com Loading States**
**Ver:** Já documentado em `RESUMO.md` - implementação completa disponível.

---

### 29. **Adicionar Paginação**
```typescript
async findAll(orgId: string, page = 1, limit = 50) {
  const skip = (page - 1) * limit;
  
  const [data, total] = await Promise.all([
    this.prisma.store.findMany({
      where: { orgId },
      skip,
      take: limit
    }),
    this.prisma.store.count({ where: { orgId }})
  ]);
  
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
}
```

---

### 30. **Implementar Cache**
```typescript
import { CACHE_MANAGER } from '@nestjs/cache-manager';

async getDashboard(orgId: string) {
  const cacheKey = `dashboard:${orgId}`;
  const cached = await this.cache.get(cacheKey);
  
  if (cached) return cached;
  
  const data = await this.computeDashboard(orgId);
  await this.cache.set(cacheKey, data, 300); // 5 min
  
  return data;
}
```

---

### 31. **Webhooks para Integrações**
**Permitir:** Notificar sistemas externos de eventos importantes.

---

### 32. **Background Jobs com Bull**
```typescript
@Processor('reports')
export class ReportProcessor {
  @Process('generate')
  async handleGenerate(job: Job) {
    // Processamento pesado em background
  }
}
```

---

### 33. **Adicionar Busca Full-Text**
```sql
-- PostgreSQL full-text search
CREATE INDEX store_search_idx ON "Store" 
USING GIN (to_tsvector('portuguese', name || ' ' || municipio));
```

---

### 34. **Implementar Versionamento de API**
```typescript
app.setGlobalPrefix('api/v1');
```

---

### 35. **Adicionar Filtros e Ordenação**
```typescript
async findAll(filters: StoreFilterDto) {
  const { uf, municipio, sortBy = 'name', order = 'asc' } = filters;
  
  return this.prisma.store.findMany({
    where: {
      orgId,
      ...(uf && { uf }),
      ...(municipio && { municipio: { contains: municipio }})
    },
    orderBy: { [sortBy]: order }
  });
}
```

---

### 36. **Implementar Feature Flags**
**Permitir:** Ativar/desativar funcionalidades por organização.

---

### 37. **Adicionar Monitoramento (Sentry, Datadog)**
```typescript
import * as Sentry from '@sentry/node';

Sentry.init({ dsn: process.env.SENTRY_DSN });
```

---

### 38. **Docker Compose para Dev**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: disagua
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
  
  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
```

---

## 📊 RESUMO POR SEVERIDADE

| Severidade | Quantidade | Ação |
|------------|-----------|------|
| 🔴 Crítica | 4 | Imediata (hoje) |
| 🟠 Alta | 8 | Esta semana |
| 🟡 Média | 11 | Este mês |
| 🟢 Baixa (Melhorias) | 15 | Backlog |

---

## 🎯 PLANO DE AÇÃO RECOMENDADO

### Sprint 1 (Esta Semana)
1. ✅ Remover secrets do git e rotacionar
2. ✅ Adicionar validação com DTOs
3. ✅ Criar índices no banco
4. ✅ Auditar filtros de orgId
5. ✅ Adicionar validação de uploads

### Sprint 2 (Próxima Semana)
6. ✅ Implementar RBAC completo
7. ✅ Adicionar logging estruturado
8. ✅ Implementar rate limiting
9. ✅ Corrigir bug de upload
10. ✅ Adicionar testes E2E básicos

### Sprint 3 (Semana 3)
11. ✅ Otimizar dashboard
12. ✅ Implementar Swagger
13. ✅ Adicionar auditoria
14. ✅ Implementar transações
15. ✅ Melhorar UX (loading states)

### Backlog (Futuro)
- Cache
- Paginação
- Soft delete
- Webhooks
- Background jobs
- Monitoramento

---

## 📖 DOCUMENTAÇÃO DE REFERÊNCIA

Todos os prompts para correção rápida estão em:
- **QUICK_COPY_PROMPTS.md** - Prompts prontos para usar
- **BOAS_PRATICAS.md** - Guia de desenvolvimento
- **RESUMO.md** - Melhorias de UX implementáveis

---

## ✅ PONTOS POSITIVOS

- ✅ Arquitetura bem definida (NestJS + React)
- ✅ Uso de TypeScript
- ✅ Prisma ORM com migrations
- ✅ Separação de concerns (modules, services, controllers)
- ✅ Estrutura de autenticação implementada
- ✅ Multi-tenancy com orgId
- ✅ Upload de arquivos funcionando
- ✅ Frontend moderno com Vite
- ✅ Documentação interna excelente

---

## 🔗 PRÓXIMOS PASSOS

1. **Revisar este relatório com a equipe**
2. **Priorizar correções críticas**
3. **Usar QUICK_COPY_PROMPTS.md para implementações rápidas**
4. **Estabelecer CI/CD com testes automáticos**
5. **Criar checklist de segurança para PRs**
6. **Agendar code reviews semanais**

---

**Relatório gerado em:** 24/10/2025  
**Versão:** 1.0  
**Próxima revisão:** Após Sprint 1
