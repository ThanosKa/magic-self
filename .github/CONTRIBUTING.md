# Contributing to folio.sh

First off, thank you for considering contributing to folio.sh! It's people like you that make folio.sh such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible using our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

### Suggesting Features

Feature suggestions are tracked as GitHub issues. Create an issue using our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) and provide:

- A clear and descriptive title
- A detailed description of the proposed feature
- Explain why this feature would be useful
- List any alternatives you've considered

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies:** `pnpm install`
3. **Make your changes** following our code style
4. **Test your changes** locally
5. **Commit your changes** using conventional commits
6. **Push to your fork** and submit a pull request

## Development Setup

\`\`\`bash

# Clone your fork

git clone https://github.com/YOUR_USERNAME/folio-sh.git
cd folio-sh

# Install dependencies

pnpm install

# Copy environment variables

cp .env.example .env.local

# Start development server

pnpm dev
\`\`\`

## Code Style

### TypeScript

- Use TypeScript strict mode
- Prefer `type` over `interface` for object types
- Use Zod for runtime validation
- Export types from schema files using `z.infer<>`

### React/Next.js

- Prefer Server Components, use `'use client'` only when necessary
- Keep components small and focused (single responsibility)
- Use React Query for all async client-side state
- Colocate related files (page.tsx + components + utils)

### Styling

- Use Tailwind CSS for all styling
- Use the `cn()` helper for conditional classes
- Follow the existing design token system
- Prefer composition over complex conditional styles

### File Naming

- Use kebab-case for file names: `upload-form.tsx`
- Use PascalCase for component names: `UploadForm`
- Colocate tests with source files: `utils.test.ts`

### Commits

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add dark mode toggle to preview page`

## Project Structure

\`\`\`
├── app/ # Next.js App Router pages
├── components/ # React components
│ ├── ui/ # shadcn/ui components
│ └── [feature]/ # Feature-specific components
├── lib/ # Utilities and shared code
│ ├── schemas/ # Zod validation schemas
│ ├── server/ # Server-only code
│ └── supabase/ # Supabase clients
├── hooks/ # Custom React hooks
└── scripts/ # Database migrations
\`\`\`

## Testing

\`\`\`bash

# Run type checking

pnpm typecheck

# Run linting

pnpm lint

# Run all checks

pnpm check
\`\`\`

## Questions?

Feel free to open an issue with the `question` label or reach out on Twitter/X.

Thank you for contributing! 🎉
