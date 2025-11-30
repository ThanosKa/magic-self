# How It Works

A technical deep-dive into Magic Self's architecture, covering the complete flow from PDF upload to live website generation.

## Table of Contents

- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [File Storage](#file-storage)
- [Resume States](#resume-states)
- [Complete Flow](#complete-flow)
- [API Routes](#api-routes)
- [Code Examples](#code-examples)

---

## System Architecture

Magic Self uses a modern serverless architecture built on:

- **Frontend**: Next.js 16 App Router (React 19, TypeScript)
- **Authentication**: Clerk
- **Database**: Supabase PostgreSQL
- **File Storage**: Supabase Storage (S3-compatible)
- **AI Processing**: Grok 4.1 Fast via OpenRouter

### High-Level Flow

```
User Uploads PDF → Supabase Storage → AI Extraction → PostgreSQL → Live Website
```

---

## Database Schema

### Resumes Table

Stores all resume data with draft/live states:

```sql
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  status resume_status DEFAULT 'draft',  -- 'draft' | 'live'
  file_name TEXT,
  file_url TEXT,
  file_size INTEGER,
  file_content TEXT,                      -- Extracted PDF text
  resume_data JSONB,                      -- Structured resume data
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Usernames Table

Maps custom usernames to user IDs for `magic-self.dev/username` URLs:

```sql
CREATE TABLE usernames (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_usernames_username ON usernames(username);
```

---

## File Storage

### Bucket Structure

All PDFs are stored in the `resumes` bucket with user-specific paths:

```
resumes/
  └── {user_id}/
      └── {timestamp}-{filename}.pdf
```

Example: `resumes/user_abc123/1701234567890-resume.pdf`

### Storage Operations

**Upload Flow** ([upload/route.ts](file:///Users/thaka/Desktop/Cursor/magic-self/app/api/upload/route.ts)):

```typescript
// 1. Delete old file if exists
if (existingResume?.file_url) {
  const oldPath = existingResume.file_url.split("/").slice(-2).join("/");
  await supabase.storage.from("resumes").remove([oldPath]);
}

// 2. Upload new file
const fileName = `${user.id}/${timestamp}-${file.name}`;
await supabase.storage.from("resumes").upload(fileName, buffer, {
  contentType: "application/pdf",
  upsert: true,
});

// 3. Get public URL
const { data: urlData } = supabase.storage
  .from("resumes")
  .getPublicUrl(fileName);
```

**File Deletion** ([supabase-actions.ts](file:///Users/thaka/Desktop/Cursor/magic-self/lib/server/supabase-actions.ts#L212-L250)):

```typescript
export async function deleteUserFile(fileUrl: string | null) {
  if (!fileUrl) return;
  
  const url = new URL(fileUrl);
  const pathParts = url.pathname.split("/");
  const bucketIndex = pathParts.indexOf("resumes");
  const filePath = pathParts.slice(bucketIndex + 1).join("/");
  
  await supabase.storage.from("resumes").remove([filePath]);
}
```

---

## Resume States

Resumes exist in two states controlled by the `status` enum:

### Draft State

- **Default state** when a resume is first created
- Not publicly visible
- User can edit and preview
- Allows experimentation without publishing

### Live State

- Resume is published and publicly accessible
- Visible at `magic-self.dev/{username}`
- SEO-optimized with Open Graph tags
- Indexed by search engines

### State Transitions

**Draft → Live** ([resume/route.ts](file:///Users/thaka/Desktop/Cursor/magic-self/app/api/resume/route.ts#L66-L97)):

```typescript
// PATCH /api/resume
const resume = await storeResume(user.id, { status: "live" });
```

**Public Access Control** ([app/[username]/page.tsx](file:///Users/thaka/Desktop/Cursor/magic-self/app/[username]/page.tsx#L76-L80)):

```typescript
const resume = await getResume(userId);

// Only show if resume exists AND is live
if (!resume?.resume_data || resume.status !== "live") {
  notFound();
}
```

---

## Complete Flow

### 1. Upload PDF

**Route**: `POST /api/upload`

```typescript
// User uploads PDF file
const formData = new FormData();
formData.append("file", pdfFile);

const response = await fetch("/api/upload", {
  method: "POST",
  body: formData,
});

// Response:
{
  success: true,
  fileUrl: "https://...supabase.co/storage/v1/object/public/resumes/...",
  fileName: "resume.pdf",
  fileSize: 123456
}
```

Database state after upload:

```typescript
{
  user_id: "user_abc123",
  status: "draft",
  file_name: "resume.pdf",
  file_url: "https://...supabase.co/.../resume.pdf",
  file_size: 123456,
  file_content: null,      // Not extracted yet
  resume_data: null        // Not generated yet
}
```

### 2. Generate Website

**Route**: `POST /api/generate`

This triggers a multi-step process:

#### Step 2a: PDF Text Extraction

```typescript
// Extract text from PDF using pdf-ts
const fileContent = await scrapePdfContent(resume.file_url);

// Store extracted text
await storeResume(userId, { fileContent });
```

#### Step 2b: AI Resume Parsing

```typescript
// Send to Grok 4.1 Fast via OpenRouter
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "x-ai/grok-4.1-fast:free",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Parse this resume: ${fileContent}` }
    ],
    response_format: { type: "json_object" },
  }),
});

const resumeData = await response.json();
```

The AI extracts structured data:

```typescript
{
  header: {
    name: "John Doe",
    shortAbout: "Software Engineer",
    location: "San Francisco, CA",
    contacts: {
      email: "john@example.com",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe"
    },
    skills: ["JavaScript", "TypeScript", "React", "Node.js"]
  },
  summary: "Experienced software engineer...",
  workExperience: [...],
  projects: [...],
  education: [...]
}
```

#### Step 2c: Username Assignment

```typescript
// Auto-generate username from name or assign random one
const username = await ensureUsername(userId);

// Store in usernames table
await createUsernameLookup({ userId, username });
```

Database state after generation:

```typescript
{
  user_id: "user_abc123",
  status: "draft",              // Still in draft
  file_name: "resume.pdf",
  file_url: "https://...",
  file_size: 123456,
  file_content: "John Doe\nSoftware Engineer\n...",
  resume_data: { /* structured data */ }
}
```

### 3. Edit & Preview

Users can edit their resume in the preview interface:

**Route**: `PUT /api/resume`

```typescript
// Update resume data
await fetch("/api/resume", {
  method: "PUT",
  body: JSON.stringify({
    resumeData: updatedResumeData,
  }),
});
```

All edits are validated with Zod schemas before saving.

### 4. Publish to Live

**Route**: `PATCH /api/resume`

```typescript
// Set status to live
await fetch("/api/resume", {
  method: "PATCH",
  body: JSON.stringify({ status: "live" }),
});
```

Database state after publishing:

```typescript
{
  user_id: "user_abc123",
  status: "live",              // Now public!
  // ... rest of data unchanged
}
```

### 5. Public Access

Once live, the resume is accessible at:

```
https://magic-self.dev/{username}
```

The public page:

1. Looks up `user_id` from `usernames` table
2. Fetches resume from `resumes` table
3. Checks `status === "live"`
4. Renders resume with SEO metadata

---

## API Routes

### Upload

**POST** `/api/upload`

Uploads PDF to Supabase storage.

- **Auth**: Required (Clerk)
- **Input**: `multipart/form-data` with `file` field
- **Validation**: PDF only, max 10MB
- **Returns**: `{ fileUrl, fileName, fileSize }`

### Generate

**POST** `/api/generate`

Extracts text and generates structured resume data.

- **Auth**: Required (Clerk)
- **Prerequisites**: Must have uploaded file
- **Process**: PDF extraction → AI parsing → username assignment
- **Returns**: `{ resume, username, usedFallback }`

### Resume Operations

**GET** `/api/resume`

Fetches user's resume data.

- **Auth**: Required (Clerk)
- **Returns**: `{ resume }`

**PUT** `/api/resume`

Updates resume data (content changes).

- **Auth**: Required (Clerk)
- **Input**: `{ resumeData?, fileName?, fileUrl?, ... }`
- **Validation**: Zod schema validation
- **Returns**: `{ resume }`

**PATCH** `/api/resume`

Updates resume status (draft/live).

- **Auth**: Required (Clerk)
- **Input**: `{ status: "draft" | "live" }`
- **Returns**: `{ resume }`

### Username Management

**POST** `/api/username/check`

Checks username availability.

- **Auth**: Required
- **Input**: `{ username }`
- **Returns**: `{ available, reason? }`

**PUT** `/api/username`

Claims or updates username.

- **Auth**: Required
- **Input**: `{ username }`
- **Returns**: `{ username }`

---

## Code Examples

### Storing Resume Data

```typescript
import { storeResume } from "@/lib/server/supabase-actions";

// Create or update resume
const resume = await storeResume(userId, {
  fileName: "resume.pdf",
  fileUrl: "https://...",
  fileSize: 123456,
  fileContent: extractedText,
  resumeData: parsedData,
  status: "draft",
});
```

### Checking Resume Status

```typescript
import { getResume } from "@/lib/server/supabase-actions";

const resume = await getResume(userId);

if (resume?.status === "live") {
  // Resume is published
} else {
  // Resume is in draft or doesn't exist
}
```

### Username Operations

```typescript
import {
  checkUsernameAvailability,
  updateUsername,
  getUserIdByUsername,
} from "@/lib/server/supabase-actions";

// Check availability
const { available, reason } = await checkUsernameAvailability("johndoe");

// Claim username
if (available) {
  await updateUsername(userId, "johndoe");
}

// Lookup user by username
const userId = await getUserIdByUsername("johndoe");
```

### User Data Cleanup (Webhook)

When a user deletes their account via Clerk:

```typescript
import { deleteUserData } from "@/lib/server/supabase-actions";

// Delete all user data (triggered by Clerk webhook)
await deleteUserData(userId);

// This removes:
// 1. PDF file from storage bucket
// 2. Resume record from database
// 3. Username mapping
```

---

## Security

### Row Level Security (RLS)

All database operations use the Supabase service role with RLS enabled:

```sql
-- Service role has full access
CREATE POLICY "Service role has full access to resumes"
  ON resumes FOR ALL
  USING (true)
  WITH CHECK (true);

-- Public read for usernames (lookup)
CREATE POLICY "Public can read usernames"
  ON usernames FOR SELECT
  USING (true);
```

Authentication is handled at the **application level** via Clerk, not database policies.

### File Access

- Storage bucket is **public** for read access
- Upload/delete requires authentication
- File paths include user ID for isolation

---

## Performance Optimizations

1. **Lazy image loading** on landing page components
2. **Index on username** for fast lookups
3. **JSONB storage** for flexible resume data
4. **Edge functions** via Vercel for low latency
5. **Caching** via React Query on client

---

## Summary

Magic Self transforms a PDF into a live website through this flow:

1. **Upload** → PDF stored in Supabase bucket
2. **Extract** → PDF text extracted with pdf-ts
3. **Parse** → Grok AI structures the data
4. **Draft** → User edits and previews
5. **Publish** → Status changes to "live"
6. **Share** → Available at `magic-self.dev/{username}`

All data is stored in PostgreSQL with file storage in Supabase, enabling fast, scalable resume hosting with complete user control over their data.
