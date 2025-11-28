# AI Agent Guide

Instructions below are for AI assistants. Keep responses concise and aligned with the `.cursor` canonical files.

## Project Overview

folio.sh - A web application that converts PDF resumes into beautiful personal websites.

**Core Flow:** Upload PDF → Extract Text → AI Transformation → Live Website

## Repo Map

- Next.js 15 App Router. Landing UI in `components/landing`; resume components in `components/resume`; preview/editor pieces in `components/preview`; shared primitives in `components/ui`; server logic in `lib/server`; types/schemas in `lib/schemas`.

## Runbook

- Install: `pnpm install`

- Dev: `pnpm dev`

- Build: `pnpm build`

- Lint: `pnpm lint`

- Type check (no emit): `pnpm tsc --noEmit`

- Format: `pnpm format`

- Start (after build): `pnpm start`

## Behavior Rules

- Prefer pnpm; avoid destructive git commands and respect existing changes.

- Default to server components; gate browser-only logic to avoid hydration drift.

- Keep UI in the neutral Radix/Tailwind style; avoid new dependencies without approval.

- Provide manual verification steps when relevant; skip adding tests unless asked.

- Always validate data with Zod schemas; never trust client-side input.

## Agent Permissions

- **AGENTS MUST NEVER run the server or libraries without explicit permission from the user.**

- Do not execute `pnpm dev`, `npm run dev`, or any server startup commands unless specifically requested.

- Only install dependencies when explicitly asked or when required for code changes you're implementing.

- Ask for permission before running any long-running processes, build commands, or external services.

- Never expose Supabase service role keys or other secrets in responses.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Auth:** Clerk
- **AI:** OpenRouter (via AI SDK)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **State:** TanStack React Query
- **Validation:** Zod

## Code Style & Stack

- See `.cursor/rules/code-style.mdc` for full coding conventions (imports, TS/React patterns, formatting).

## References

- Canonical files: `.cursor/rules/general.mdc` (behavior) and `.cursor/rules/code-style.mdc` (coding/stack).

- For planning requests, refer to this AGENTS.md guide.
