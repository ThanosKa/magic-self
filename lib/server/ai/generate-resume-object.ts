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
- If contract type is unclear, default to "Full-time"
- If location is missing, use "Remote" or extract from context
- Be thorough but concise in descriptions
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

    const validationResult = ResumeDataSchema.safeParse(parsedData);

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
