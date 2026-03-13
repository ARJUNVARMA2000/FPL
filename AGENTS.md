# AGENTS.md

## Cursor Cloud specific instructions

This is a React + TypeScript + Vite application — a deployment manager UI for data replication pipelines (PostgreSQL to Snowflake).

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Vite dev server | `npm run dev` | 5173 | Frontend only; no backend |

### Standard commands

- **Lint**: `npm run lint` (ESLint)
- **Build**: `npm run build` (tsc + vite build)
- **Dev server**: `npm run dev` (Vite, port 5173)
- **Preview prod build**: `npm run preview`

### Non-obvious notes

- The project uses Vite 8 with React 19 and TypeScript 5.9.
- No backend or database is needed — the app is entirely client-side with mock data in `src/data.ts`.
- To expose the dev server on all interfaces (needed for cloud agent browser testing): `npm run dev -- --host 0.0.0.0`.
