# FinTwin Phase 1 Architecture

The web app owns presentation and consumes shared contracts from `packages/types`. The API owns business logic, validation, persistence, and deterministic financial calculations. The dashboard aggregate is served by `GET /api/dashboard`; the frontend uses TanStack Query for loading, error, and refresh states. The intelligence service is a separate future boundary for Python workloads.

Phase 3 persists source data with Prisma/PostgreSQL and derives dashboard values in `DashboardService`. Financial money fields use Prisma `Decimal`; the current JSON boundary converts them to numbers for the typed frontend. The single demo user is resolved by `DEMO_USER_EMAIL` until authentication replaces that strategy.

## Deferred boundaries

- Redis and BullMQ: background jobs and cache after the first persisted workflows.
- Kafka: domain events after transaction and account contracts are stable.
- pgvector/RAG: document intelligence after document ingestion has a defined security model.
- Kubernetes/Terraform: deployment automation after local container behavior is proven.

The LLM layer will explain or invoke deterministic tools; it will not be the source of financial calculations.
