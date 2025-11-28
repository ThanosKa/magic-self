# folio.sh - AI Agent Documentation

## Project Overview

folio.sh is a web application that converts PDF resumes into beautiful personal websites.

**Core Flow:** Upload PDF → Extract Text → AI Transformation → Live Website

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

## Key Flows

### Upload Flow
1. `/upload` - User uploads PDF
2. `/pdf` - Text extraction with pdf-parse
3. `/preview` - AI generates structured data, username created
4. User edits and publishes

### Data Model

**resumes table:**
\`\`\`sql
- id: uuid (PK)
- user_id: text (unique, Clerk ID)
- status: 'draft' | 'live'
- file_name, file_url, file_size: PDF metadata
- file_content: text (extracted PDF text)
- resume_data: jsonb (structured resume)
- created_at, updated_at: timestamps
\`\`\`

**usernames table:**
\`\`\`sql
- id: uuid (PK)
- user_id: text (unique, Clerk ID)
- username: text (unique, URL slug)
- created_at: timestamp
\`\`\`

## Important Files

| Path | Purpose |
|------|---------|
| `lib/schemas/resume.ts` | Zod schemas for resume data |
| `lib/server/supabase-actions.ts` | Database CRUD operations |
| `lib/server/ai/generate-resume-object.ts` | AI extraction logic |
| `lib/config.ts` | App constants and settings |
| `middleware.ts` | Clerk auth + route protection |

## API Routes

| Route | Methods | Purpose |
|-------|---------|---------|
| `/api/upload` | POST | Upload PDF to storage |
| `/api/resume` | GET, PUT, PATCH | Resume CRUD |
| `/api/username` | GET, PUT | Username management |
| `/api/username/check` | GET | Check availability |

## Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `OPENROUTER_API_KEY`

## Common Patterns

### Server-side Auth
\`\`\`typescript
import { auth } from "@clerk/nextjs/server"
const { userId } = await auth()
if (!userId) redirect("/sign-in")
\`\`\`

### Supabase Client (Server)
\`\`\`typescript
import { createClient } from "@/lib/supabase/server"
const supabase = await createClient()
\`\`\`

### Validation
\`\`\`typescript
import { ResumeDataSchema } from "@/lib/schemas/resume"
const result = ResumeDataSchema.safeParse(data)
