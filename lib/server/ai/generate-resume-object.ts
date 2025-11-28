import { ResumeDataSchema, type ResumeData } from "@/lib/schemas/resume";
import { logger } from "@/lib/server/logger";

const SYSTEM_PROMPT = `You are a professional resume parser. Extract structured resume data from the provided text content.

Guidelines:
- If the resume lacks an 'about' or 'summary' section, generate one based on the person's experience and skills
- Generate up to 10 skills inferred from work experience and education
- For social media usernames (twitter, github), extract only the username without spaces or @ symbols
- LinkedIn and website URLs should be complete URLs
- Dates should be in YYYY-MM-DD format for work experience start/end
- Education years should be in YYYY format
- Project dates should be in YYYY-MM format (e.g., "2024-03" for March 2024)
- If contract type is unclear, default to "Full-time"
- If location is missing, use "Remote" or extract from context
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
      "website": "string (optional)",
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
    "location": "string",
    "contract": "string",
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
    "end": "YYYY"
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

function normalizeDate(value: unknown): string {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim().toLowerCase();

  if (!trimmed || trimmed === "present" || trimmed === "current") return "";

  return trimmed;
}

function sanitizeResumeData(data: unknown): unknown {
  if (!data || typeof data !== "object") return data;

  const resume = data as Record<string, unknown>;

  return {
    header: (() => {
      const header = resume.header as Record<string, unknown>;
      if (!header || typeof header !== "object") return {};

      const contacts = header.contacts as Record<string, unknown> | undefined;

      return {
        name: typeof header.name === "string" ? header.name.trim() : "",
        shortAbout:
          typeof header.shortAbout === "string" ? header.shortAbout.trim() : "",
        location:
          typeof header.location === "string" ? header.location.trim() : "",
        contacts: {
          email:
            typeof contacts?.email === "string" ? contacts.email.trim() : "",
          phone:
            typeof contacts?.phone === "string" ? contacts.phone.trim() : "",
          twitter:
            typeof contacts?.twitter === "string"
              ? contacts.twitter.trim()
              : "",
          linkedin:
            typeof contacts?.linkedin === "string"
              ? normalizeUrl(contacts.linkedin, "linkedin")
              : "",
          github:
            typeof contacts?.github === "string"
              ? normalizeUrl(contacts.github, "github")
              : "",
          website:
            typeof contacts?.website === "string"
              ? normalizeUrl(contacts.website, "website")
              : "",
        },
        skills: Array.isArray(header.skills)
          ? header.skills
            .filter((s): s is string => typeof s === "string")
            .map((s) => s.trim())
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
          location: typeof job.location === "string" ? job.location.trim() : "",
          contract:
            typeof job.contract === "string"
              ? job.contract.trim()
              : "Full-time",
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
          "X-Title": "folio.sh Resume Parser",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
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
