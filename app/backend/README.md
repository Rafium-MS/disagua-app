# Disagua Backend (NestJS + Prisma + Postgres + MinIO)

## 🚀 Como rodar
1. Copie `.env.example` para `.env` e ajuste as variáveis.
2. Suba infra local:
   ```bash
   docker compose up -d
   ```
3. Instale dependências:
   ```bash
   npm i
   ```
4. Prisma:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npm run seed
   ```
5. Inicie a API:
   ```bash
   npm run start:dev
   ```

### Login inicial
- **orgId**: `00000000-0000-0000-0000-000000000001`
- **email**: `admin@disagua.local`
- **senha**: `admin123`

### Rotas principais
- `POST /auth/login`
- `GET/POST /brands`
- `GET/POST /stores`
- `GET/POST /partners`
- `GET /partner-stores` `POST /partner-stores/:partnerId/:storeId` `DELETE /partner-stores/:id`
- `POST /reports/periods` `GET /reports`
- `POST /receipts` `GET /receipts` `PATCH /receipts/:id`

#### Uploads (S3/MinIO)
- `POST /uploads/presign` → body: `{ filename, contentType, uf?, municipio?, partnerId?, storeId?, y?, m? }`  
  Responde `{ url, key, publicUrl }`. Faça **PUT** do arquivo direto para `url` com `Content-Type` correto.

#### Dashboard
- `GET /dashboard?y=YYYY&m=MM` → agrega: `receiptsByStatus`, `entriesByBrand`, `entriesByUF`, `coverage`.

### Multi-tenant e RLS
- Todas as entidades possuem `orgId`.
- Configure políticas de RLS conforme `sql/rls_policies.sql` (opcional).

### Próximos passos
- RBAC por rota (admin/operador/auditor) com decorators.
- Fechamento de período (`closedAt`) + validações para emissão de NF.
- OCR/thumbnail dos comprovantes (BullMQ + Redis).
