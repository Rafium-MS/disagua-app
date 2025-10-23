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
4. Migrate + Generate + Seed:
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

### Multi-tenant e RLS
- Todas as entidades têm `orgId`.
- O guard JWT injeta `req.user.orgId`. Configure `app.current_org` via middleware ou em cada request quando usar **SQL cru**.
- Script base em `sql/rls_policies.sql`.

### Próximos passos
- Presigned upload para MinIO/S3 (service `files`).
- Guards por role (RBAC).
- Fechamento de período com `closedAt` e somatórios automáticos.
- OCR/validação assíncrona (BullMQ + Redis).
