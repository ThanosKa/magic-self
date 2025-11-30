import { ResumeDataSchema, type ResumeData } from "@/lib/schemas/resume";
import { logger } from "@/lib/server/logger";

const SYSTEM_PROMPT = `You are a professional resume parser. Extract structured resume data from the provided text content.

CRITICAL - Extraction Philosophy:
- EXTRACT existing content from the resume as your PRIMARY task
- Only GENERATE content when it is genuinely missing from the source
- Do NOT invent or create information that isn't present

Guidelines:
- EXTRACT skills directly from the resume. If no skills are explicitly listed, then infer up to 10 skills from work experience and education
- If the resume lacks an 'about' or 'summary' section, you may generate one based on the person's actual experience and skills
- For social media usernames (twitter, github), extract only the username without spaces or @ symbols
- LinkedIn and GitHub URLs should be complete URLs
- EXTRACT job location from each position. If not present, OMIT it entirely
- EXTRACT GPA/score from education if present (e.g., "3.8 GPA", "First Class Honours")
- IMPORTANT: For dates, use YYYY-MM-DD format when full date is available, YYYY-MM when only month/year, or YYYY when only year
- DO NOT include explanatory text like "(1 year 2 months)" in dates
- If a field is not present in the resume, OMIT it entirely rather than using empty strings
- Education years should be in YYYY format
- Project dates should be in YYYY-MM format (e.g., "2024-03" for March 2024)
- If contract type is unclear, OMIT it entirely
- Be thorough but concise in descriptions
- Look for personal projects, side projects, open source contributions, or portfolio items
- Extract project technologies/tech stack as an array
- Extract project highlights or key achievements as an array
- Return ONLY valid JSON matching this structure:
{
  "header": {
    "name": "string",
    "shortAbout": "string",
    "location": "string (optional)",
    "contacts": {
      "email": "string (optional)",
      "phone": "string (optional)",
      "twitter": "string (optional)",
      "linkedin": "string (optional)",
      "github": "string (optional)"
    },
    "skills": ["string"]
  },
  "summary": "string",
  "workExperience": [{
    "company": "string",
    "link": "string (optional)",
    "location": "string (optional)",
    "contract": "string (optional)",
    "title": "string",
    "start": "YYYY-MM-DD",
    "end": "YYYY-MM-DD or null",
    "description": "string"
  }],
  "projects": [{
    "name": "string",
    "description": "string",
    "link": "string (optional)",
    "technologies": ["string"],
    "date": "YYYY-MM (optional)",
    "highlights": ["string"]
  }],
  "education": [{
    "school": "string",
    "degree": "string",
    "start": "YYYY",
    "end": "YYYY",
    "score": "string (optional)"
  }]
}`;

const FALLBACK_RESUME: ResumeData = {
  header: {
    name: "Your Name",
    shortAbout: "Professional with experience in their field",
    location: "Location",
    contacts: {
      email: "email@example.com",
    },
    skills: ["Skill 1", "Skill 2", "Skill 3"],
  },
  summary:
    "A dedicated professional with a track record of success. Please update this section with your actual summary.",
  workExperience: [
    {
      company: "Company Name",
      link: "",
      location: "Location",
      contract: "Full-time",
      title: "Job Title",
      start: "2020-01-01",
      end: null,
      description: "Please update with your actual work experience.",
    },
  ],
  projects: [
    {
      name: "Sample Project",
      description: "Please update with your actual projects.",
      link: "",
      technologies: ["Technology 1", "Technology 2"],
      date: "",
      highlights: [],
    },
  ],
  education: [
    {
      school: "University Name",
      degree: "Degree",
      start: "2016",
      end: "2020",
    },
  ],
};

export interface GenerateResumeResult {
  success: boolean;
  data: ResumeData;
  usedFallback: boolean;
  error?: string;
}

function normalizeUrl(
  value: unknown,
  type: "linkedin" | "github" | "website" | "company"
): string {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (type === "linkedin") {
    const username = trimmed.replace(/^@/, "").replace(/\//g, "");
    return `https://linkedin.com/in/${username}`;
  }

  if (type === "github") {
    const username = trimmed.replace(/^@/, "").replace(/\//g, "");
    return `https://github.com/${username}`;
  }

  if (type === "company") {
    return `https://${trimmed}`;
  }

  if (type === "website") {
    if (!trimmed.includes(".")) return "";
    return `https://${trimmed}`;
  }

  return "";
}

function parseMonthName(monthStr: string): string | null {
  const months: Record<string, string> = {
    jan: "01",
    january: "01",
    feb: "02",
    february: "02",
    mar: "03",
    march: "03",
    apr: "04",
    april: "04",
    may: "05",
    jun: "06",
    june: "06",
    jul: "07",
    july: "07",
    aug: "08",
    august: "08",
    sep: "09",
    sept: "09",
    september: "09",
    oct: "10",
    october: "10",
    nov: "11",
    november: "11",
    dec: "12",
    december: "12",
  };
  return months[monthStr.toLowerCase()] || null;
}

function normalizeDate(value: unknown): string {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim().toLowerCase();

  if (!trimmed || trimmed === "present" || trimmed === "current") return "";

  const cleaned = trimmed.replace(/\s*\([^)]*\)\s*/g, "").trim();

  if (/^\d{4}(-\d{2})?(-\d{2})?$/.test(cleaned)) {
    return cleaned;
  }

  const naturalDateMatch = cleaned.match(/^([a-z]+),?\s+(\d{4})$/);
  if (naturalDateMatch) {
    const [, monthStr, year] = naturalDateMatch;
    const month = parseMonthName(monthStr);
    if (month) {
      return `${year}-${month}`;
    }
  }

  const yearOnlyMatch = cleaned.match(/^(\d{4})$/);
  if (yearOnlyMatch) {
    return yearOnlyMatch[1];
  }

  try {
    const date = new Date(cleaned);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  } catch { }

  return "";
}

function sanitizeResumeData(data: unknown): unknown {
  if (!data || typeof data !== "object") return data;

  const resume = data as Record<string, unknown>;

  return {
    header: (() => {
      const header = resume.header as Record<string, unknown>;
      if (!header || typeof header !== "object") return {};

      const contacts = header.contacts as Record<string, unknown> | undefined;

      const cleanedContacts: Record<string, string> = {};

      if (contacts?.email && typeof contacts.email === "string") {
        const email = contacts.email.trim();
        if (email && email.includes("@")) cleanedContacts.email = email;
      }
      if (contacts?.phone && typeof contacts.phone === "string") {
        const phone = contacts.phone.trim();
        if (phone && phone !== "null" && phone !== "undefined")
          cleanedContacts.phone = phone;
      }
      if (contacts?.twitter && typeof contacts.twitter === "string") {
        const twitter = contacts.twitter.trim();
        if (twitter && twitter !== "null" && twitter !== "undefined")
          cleanedContacts.twitter = twitter;
      }
      if (contacts?.linkedin && typeof contacts.linkedin === "string") {
        const linkedin = normalizeUrl(contacts.linkedin, "linkedin");
        if (linkedin) cleanedContacts.linkedin = linkedin;
      }
      if (contacts?.github && typeof contacts.github === "string") {
        const github = normalizeUrl(contacts.github, "github");
        if (github) cleanedContacts.github = github;
      }

      return {
        name: typeof header.name === "string" ? header.name.trim() : "",
        shortAbout:
          typeof header.shortAbout === "string" ? header.shortAbout.trim() : "",
        location:
          typeof header.location === "string" && header.location.trim()
            ? header.location.trim()
            : undefined,
        contacts:
          Object.keys(cleanedContacts).length > 0 ? cleanedContacts : undefined,
        skills: Array.isArray(header.skills)
          ? header.skills
            .filter((s): s is string => typeof s === "string")
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
          : [],
      };
    })(),
    summary: typeof resume.summary === "string" ? resume.summary.trim() : "",
    workExperience: (() => {
      if (!Array.isArray(resume.workExperience)) return [];

      return resume.workExperience
        .filter(
          (item): item is Record<string, unknown> => typeof item === "object"
        )
        .map((job) => ({
          company: typeof job.company === "string" ? job.company.trim() : "",
          link:
            typeof job.link === "string"
              ? normalizeUrl(job.link, "company")
              : "",
          location: typeof job.location === "string" ? job.location.trim() : undefined,
          contract:
            typeof job.contract === "string"
              ? job.contract.trim()
              : undefined,
          title: typeof job.title === "string" ? job.title.trim() : "",
          start: normalizeDate(job.start),
          end: normalizeDate(job.end) || null,
          description:
            typeof job.description === "string" ? job.description.trim() : "",
        }));
    })(),
    projects: (() => {
      if (!Array.isArray(resume.projects)) return [];

      return resume.projects
        .filter(
          (item): item is Record<string, unknown> => typeof item === "object"
        )
        .map((project) => ({
          name: typeof project.name === "string" ? project.name.trim() : "",
          description:
            typeof project.description === "string"
              ? project.description.trim()
              : "",
          link:
            typeof project.link === "string"
              ? normalizeUrl(project.link, "website")
              : "",
          technologies: Array.isArray(project.technologies)
            ? project.technologies
              .filter((t): t is string => typeof t === "string")
              .map((t) => t.trim())
            : [],
          date: typeof project.date === "string" ? project.date.trim() : "",
          highlights: Array.isArray(project.highlights)
            ? project.highlights
              .filter((h): h is string => typeof h === "string")
              .map((h) => h.trim())
            : [],
        }));
    })(),
    education: (() => {
      if (!Array.isArray(resume.education)) return [];

      return resume.education
        .filter(
          (item): item is Record<string, unknown> => typeof item === "object"
        )
        .map((edu) => ({
          school: typeof edu.school === "string" ? edu.school.trim() : "",
          degree: typeof edu.degree === "string" ? edu.degree.trim() : "",
          start: typeof edu.start === "string" ? edu.start.trim() : "",
          end: typeof edu.end === "string" ? edu.end.trim() : "",
        }));
    })(),
  };
}

export async function generateResumeObject(
  pdfContent: string
): Promise<GenerateResumeResult> {
  try {
    logger.info("Starting resume generation from PDF content");
    logger.debug({ contentLength: pdfContent.length }, "PDF content stats");

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is not configured");
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": appUrl,
          "X-Title": "magic-self.dev Resume Parser",
        },
        body: JSON.stringify({
          model: "x-ai/grok-4.1-fast:free",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: `Parse the following resume text and extract structured data:\n\n${pdfContent}`,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.3,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(
        { status: response.status, error: errorText },
        "OpenRouter API error"
      );
      throw new Error(
        `OpenRouter API error: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in OpenRouter response");
    }

    let parsedData: unknown;
    try {
      parsedData = JSON.parse(content);
    } catch (parseError) {
      logger.error(
        {
          error:
            parseError instanceof Error ? parseError.message : "Unknown error",
        },
        "Failed to parse JSON response"
      );
      throw new Error("Invalid JSON response from AI");
    }

    const sanitizedData = sanitizeResumeData(parsedData);
    const validationResult = ResumeDataSchema.safeParse(sanitizedData);

    if (!validationResult.success) {
      logger.error(
        { errors: validationResult.error.flatten() },
        "Resume data validation failed"
      );
      throw new Error("Resume data does not match schema");
    }

    logger.info("Successfully generated resume object");

    return {
      success: true,
      data: validationResult.data,
      usedFallback: false,
    };
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : "Unknown error" },
      "Failed to generate resume object"
    );

    return {
      success: false,
      data: FALLBACK_RESUME,
      usedFallback: true,
      error: error instanceof Error ? error.message : "Failed to parse resume",
    };
  }
}
