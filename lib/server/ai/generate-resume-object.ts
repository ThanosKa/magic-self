import { generateObject } from "ai";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { ResumeDataSchema, type ResumeData } from "@/lib/schemas/resume";
import { aiLogger } from "@/lib/server/logger";

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
- Be thorough but concise in descriptions`;

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
    aiLogger.info("Starting resume generation from PDF content");
    aiLogger.debug({ contentLength: pdfContent.length }, "PDF content stats");

    const model = openrouter("openai/gpt-4o");

    const { object } = await generateObject({
      model,
      schema: ResumeDataSchema,
      system: SYSTEM_PROMPT,
      prompt: `Parse the following resume text and extract structured data:\n\n${pdfContent}`,
    });

    aiLogger.info("Successfully generated resume object");

    return {
      success: true,
      data: object,
      usedFallback: false,
    };
  } catch (error) {
    aiLogger.error(
      { error: error instanceof Error ? error.message : "Unknown error" },
      "Failed to generate resume object"
    );

    // Return fallback instead of throwing
    return {
      success: false,
      data: FALLBACK_RESUME,
      usedFallback: true,
      error: error instanceof Error ? error.message : "Failed to parse resume",
    };
  }
}
