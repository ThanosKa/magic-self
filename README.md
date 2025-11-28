<div align="center">
  
# folio.sh

### Transform your resume PDF into a beautiful personal website instantly

A professional portfolio site featuring AI-powered resume extraction and custom usernames — perfect for developers, designers, and job seekers.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

[Demo](https://folio.sh) · [Report Bug](https://github.com/yourusername/folio-sh/issues) · [Request Feature](https://github.com/yourusername/folio-sh/issues)

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Setup](#database-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

---

## About

**folio.sh** is an open-source platform that converts your resume PDF into a stunning, shareable personal website in seconds. Upload your resume, get a custom `folio.sh/yourname` URL, and showcase your professional experience with a clean, modern design.

Perfect for:

- Students and recent graduates building their online presence
- Job seekers who want a quick, professional portfolio
- Developers who need a personal landing page
- Designers looking to showcase their work

---

## Features

- **One-Click Conversion** — Upload a PDF and get a live website in seconds
- **AI-Powered Extraction** — Automatically structures your resume data using GPT-4o
- **Custom URLs** — Claim your own `folio.sh/yourname` subdomain
- **Live Editing** — Edit your information directly in the preview
- **Dual Themes** — Beautiful dark and light modes with JetBrains Mono font
- **Fully Responsive** — Works perfectly on mobile, tablet, and desktop
- **Secure & Private** — Your data is encrypted and stored securely
- **100% Open Source** — MIT licensed and self-hostable

---

## Demo

> Add a screenshot or GIF of your application here

```bash
# Quick preview of the upload flow
1. Upload PDF → 2. AI extracts data → 3. Edit & customize → 4. Publish live
```

Visit [folio.sh](https://folio.sh) to try it out!

---

## Built With

| Technology                                    | Purpose                            |
| --------------------------------------------- | ---------------------------------- |
| [Next.js 15](https://nextjs.org/)             | React framework with App Router    |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development              |
| [Tailwind CSS v4](https://tailwindcss.com/)   | Utility-first styling              |
| [shadcn/ui](https://ui.shadcn.com/)           | Accessible component library       |
| [Supabase](https://supabase.com/)             | PostgreSQL database & storage      |
| [Clerk](https://clerk.com/)                   | Authentication                     |
| [OpenRouter](https://openrouter.ai/)          | AI-powered resume parsing (GPT-4o) |
| [TanStack Query](https://tanstack.com/query)  | Server state management            |
| [Zod](https://zod.dev/)                       | Schema validation                  |

---

## Getting Started

Follow these steps to set up folio.sh locally.

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18 or higher
- **pnpm** (recommended) or npm
- **Git**

```bash
# Check your versions
node --version
pnpm --version
```

You'll also need accounts for:

- [Supabase](https://supabase.com) (free tier)
- [Clerk](https://clerk.com) (free tier)
- [OpenRouter](https://openrouter.ai) (pay-as-you-go)

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/folio-sh.git
cd folio-sh
```

2. **Install dependencies**

```bash
pnpm install
```

---

### Environment Setup

1. **Copy the example environment file**

```bash
# macOS/Linux
cp .env.example .env.local

# Windows (PowerShell)
Copy-Item .env.example .env.local
```

2. **Configure your environment variables**

Open `.env.local` and fill in your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DB_URL=postgresql://postgres:[password]@[host]:[port]/postgres

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# OpenRouter
OPENROUTER_API_KEY=sk-or-v1-xxxxx

# App URLs (for local dev)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

> **Tip:** Get your Supabase credentials from Project Settings → API

---

### Database Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run the SQL migrations**

```bash
psql "$SUPABASE_DB_URL" -f scripts/001_create_resumes_table.sql -f scripts/002_create_usernames_table.sql
```

Alternatively, copy the contents of each SQL file from `scripts/` and run them in the Supabase SQL editor.

3. **Create a Storage bucket (required for uploads)**

- In Supabase, go to **Storage** → **Create bucket**
- Name it `resumes`
- Set it to **Public** (the upload flow expects public access to the bucket)

4. **Configure Row Level Security (RLS)**

Run this SQL in the Supabase SQL editor:

```sql
-- Enable RLS on tables
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE usernames ENABLE ROW LEVEL SECURITY;

-- Service role policies (for server-side operations)
CREATE POLICY "Service role has full access to resumes"
ON resumes FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role has full access to usernames"
ON usernames FOR ALL
USING (true)
WITH CHECK (true);
```

5. **Start the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

---

## Usage

### Uploading a Resume

1. Sign up or log in at `/sign-up` or `/sign-in`
2. Click **Upload Resume** on the dashboard
3. Select your PDF file (LinkedIn export or resume)
4. Wait for AI to extract and structure your data
5. Review and edit your information in the preview
6. Claim your custom username (e.g., `folio.sh/johnsmith`)
7. Click **Publish** to make your site live

### Editing Your Profile

- Navigate to `/dashboard` to update your information
- Changes are saved automatically
- Switch between draft and live modes

---

## Project Structure

```
folio-sh/
├── app/
│   ├── [username]/          # Public profile pages
│   ├── api/                 # API routes
│   │   ├── resume/          # Resume CRUD operations
│   │   ├── upload/          # PDF upload handler
│   │   └── username/        # Username management
│   ├── dashboard/           # User dashboard
│   ├── pdf/                 # PDF text extraction
│   ├── preview/             # Resume preview & editor
│   ├── sign-in/             # Clerk authentication
│   ├── sign-up/             # Clerk registration
│   └── upload/              # Resume upload page
├── components/
│   ├── preview/             # Preview-specific components
│   ├── resume/              # Resume display components
│   ├── ui/                  # shadcn/ui components
│   └── upload/              # Upload flow components
├── lib/
│   ├── schemas/             # Zod validation schemas
│   ├── server/              # Server-only utilities
│   │   └── ai/              # AI generation logic
│   └── supabase/            # Supabase client configs
├── hooks/                   # Custom React hooks
├── scripts/                 # Database migration scripts
└── public/                  # Static assets
```

---

## Deployment

### Deploy to Vercel

The easiest way to deploy folio.sh is with Vercel:

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local`
4. Update `NEXT_PUBLIC_APP_URL` to your production domain
5. Deploy! 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/folio-sh)

### Production Checklist

- [ ] Update all environment variables for production
- [ ] Enable Supabase connection pooling
- [ ] Configure Clerk production instance
- [ ] Set up custom domain (optional)
- [ ] Enable error tracking (Sentry, etc.)

---

## Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on our code of conduct and development process.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## Acknowledgments

- Inspired by [self.so](https://self.so)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- AI powered by [OpenRouter](https://openrouter.ai)
- Font: [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

---

## Contact

Have questions or suggestions? Reach out!

- **GitHub Issues**: [Open an issue](https://github.com/yourusername/folio-sh/issues)
- **Discussions**: [Join the conversation](https://github.com/yourusername/folio-sh/discussions)
- **Twitter/X**: [@yourhandle](https://twitter.com/yourhandle)

---

<div align="center">

Made with care by developers, for developers

[Back to Top](#folioش)

</div>
