# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Web application for creating and managing articles (記事制作をWEB上で実行できるアプリ). Built with Next.js 15 (App Router) + TypeScript + Tailwind CSS.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Architecture

- **Framework**: Next.js 15 with App Router (`src/app/`)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript, strict mode

### Key directories

- `src/app/` — App Router pages and layouts. Each folder is a route segment; `page.tsx` is the route entry, `layout.tsx` wraps child routes.
- `src/app/api/` — API Route Handlers (Next.js server functions, not a separate backend).
- `src/components/` — Shared UI components (create as needed).
- `src/lib/` — Utility functions and data access logic (create as needed).
- `public/` — Static assets served at `/`.

### Data layer

No database is configured yet. When adding persistence, update this section with the chosen ORM/client and migration commands.

### Routing conventions (App Router)

- `page.tsx` → renders the route UI
- `layout.tsx` → persistent shell around child routes
- `loading.tsx` → Suspense fallback
- `error.tsx` → error boundary
- `route.ts` in `src/app/api/` → API endpoints (`GET`, `POST`, etc. named exports)
