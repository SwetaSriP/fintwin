# FinTwin

FinTwin is an AI-powered personal finance digital twin, built as a pnpm + Turborepo monorepo.

## Phase 1

- `apps/web`: Next.js dashboard prototype
- `apps/api`: NestJS API foundation with Prisma schema and health endpoint
- `apps/intelligence`: reserved Python intelligence service boundary
- `packages/types`: shared domain contracts
- `packages/config`: shared environment/config conventions

## Run locally

```bash
pnpm install
pnpm dev
```

Web runs on `http://localhost:3000` and the API on `http://localhost:4000`.

## Phase 3 database workflow

Copy `.env.example` to `.env`, start PostgreSQL, then run:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

The demo user is `demo@fintwin.local`. Authentication is intentionally deferred; the API resolves this user centrally through `DEMO_USER_EMAIL`.

The dashboard now reads from `GET /api/dashboard` through TanStack Query. Money is persisted as Prisma `Decimal` and returned as JSON numbers at the current API boundary. Derived metrics such as net worth, category totals, savings rate, goals, payments, and financial health are calculated in NestJS.

AI and event-driven infrastructure remain intentionally deferred.
