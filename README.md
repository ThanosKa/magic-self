# folio.sh

> Turn your LinkedIn/Resume PDF into a beautiful personal website in one click.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

## Features

- **One-click conversion** - Upload a PDF resume and get a live website instantly
- **AI-powered extraction** - Automatically extracts and structures your resume data
- **Custom usernames** - Get your own `folio.sh/yourname` URL
- **Live editing** - Edit your resume data directly on the preview
- **Dark/Light themes** - Professional monospace design with JetBrains Mono font
- **100% Open Source** - MIT licensed, self-hostable

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Authentication:** Clerk
- **AI:** OpenRouter (GPT-4o for resume extraction)
- **State Management:** TanStack React Query
- **Validation:** Zod

## Local Development Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Supabase account
- Clerk account
- OpenRouter API key

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/yourusername/folio-sh.git
cd folio-sh
\`\`\`

### 2. Install dependencies

\`\`\`bash
pnpm install
\`\`\`

### 3. Set up environment variables

Copy the example environment file:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in your credentials:

\`\`\`env

# Supabase

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Clerk

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# OpenRouter

OPENROUTER_API_KEY=your_openrouter_api_key

# App URL (for local dev)

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### 4. Set up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run the SQL migrations in order:

\`\`\`sql
-- Run scripts/001_create_resumes_table.sql
-- Run scripts/002_create_usernames_table.sql
\`\`\`

3. Create a Storage bucket:
   - Go to Storage in your Supabase dashboard
   - Create a new bucket called `resumes`
   - Set it to **public** for PDF access

4. Set up Row Level Security (RLS):

\`\`\`sql
-- Enable RLS on tables
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE usernames ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for server-side operations)
CREATE POLICY "Service role has full access to resumes"
ON resumes FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role has full access to usernames"
ON usernames FOR ALL
USING (true)
WITH CHECK (true);
\`\`\`

### 5. Set up Clerk

1. Create a new Clerk application at [clerk.com](https://clerk.com)
2. Configure sign-in options (Email/Password recommended)
3. Copy your API keys to `.env.local`
4. (Optional) Customize the Clerk appearance to match your theme

### 6. Set up OpenRouter

1. Create an account at [openrouter.ai](https://openrouter.ai)
2. Generate an API key
3. Add credits to your account
4. Copy the API key to `.env.local`

### 7. Run the development server

\`\`\`bash
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/
│ ├── [username]/ # Public profile pages
│ ├── api/ # API routes
│ │ ├── resume/ # Resume CRUD
│ │ ├── upload/ # PDF upload
│ │ └── username/ # Username management
│ ├── dashboard/ # User dashboard
│ ├── pdf/ # PDF processing page
│ ├── preview/ # Resume preview/edit
│ ├── sign-in/ # Clerk sign-in
│ ├── sign-up/ # Clerk sign-up
│ └── upload/ # Upload page
├── components/
│ ├── preview/ # Preview components
│ ├── resume/ # Resume display components
│ ├── ui/ # shadcn/ui components
│ └── upload/ # Upload components
├── lib/
│ ├── schemas/ # Zod schemas
│ ├── server/ # Server-only utilities
│ │ └── ai/ # AI generation
│ └── supabase/ # Supabase clients
├── scripts/ # SQL migrations
└── hooks/ # React hooks
\`\`\`

## Key Flows

### Upload Flow

1. User uploads PDF at `/upload`
2. PDF is stored in Supabase Storage
3. Redirect to `/pdf` for text extraction
4. Text extracted using `pdf-parse`
5. Redirect to `/preview` for AI transformation
6. OpenRouter extracts structured resume data
7. Username auto-generated from name
8. User can edit and publish

### Data Model

**resumes table:**

- `id` - UUID primary key
- `user_id` - Clerk user ID (unique)
- `status` - 'draft' | 'live'
- `file_name`, `file_url`, `file_size` - PDF metadata
- `file_content` - Extracted PDF text
- `resume_data` - Structured JSONB data

**usernames table:**

- `id` - UUID primary key
- `user_id` - Clerk user ID (unique)
- `username` - Unique URL slug

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add all environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/folio-sh)

### Environment Variables for Production

Make sure to update:

- `NEXT_PUBLIC_APP_URL` to your production domain
- Use production Clerk keys
- Enable Supabase connection pooling for better performance

## Contributing

Contributions are welcome! Please read our [Contributing Guide](/.github/CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [self.so](https://self.so)
- Built with [shadcn/ui](https://ui.shadcn.com)
- AI powered by [OpenRouter](https://openrouter.ai)
