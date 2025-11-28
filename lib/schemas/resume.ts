import { z } from "zod";

const ContactsSchema = z.object({
  website: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

const HeaderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  shortAbout: z.string().default(""),
  location: z.string().optional(),
  contacts: ContactsSchema.optional(),
  skills: z.array(z.string()).default([]),
});

const WorkExperienceSchema = z.object({
  company: z.string().default(""),
  link: z.string().optional(),
  location: z.string().default(""),
  contract: z.string().default("Full-time"),
  title: z.string().default(""),
  start: z.string().default(""),
  end: z.string().nullable().optional(),
  description: z.string().default(""),
});

const EducationSchema = z.object({
  school: z.string().default(""),
  degree: z.string().default(""),
  start: z.string().default(""),
  end: z.string().default(""),
});

const ProjectSchema = z.object({
  name: z.string().default(""),
  description: z.string().default(""),
  link: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  date: z.string().optional(),
  highlights: z.array(z.string()).default([]),
});

export const ResumeDataSchema = z.object({
  header: HeaderSchema,
  summary: z.string().default(""),
  workExperience: z.array(WorkExperienceSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  education: z.array(EducationSchema).default([]),
});

export type ResumeData = z.infer<typeof ResumeDataSchema>;
export type Contacts = z.infer<typeof ContactsSchema>;
export type Header = z.infer<typeof HeaderSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Project = z.infer<typeof ProjectSchema>;

// Full resume type including database fields
export interface Resume {
  id: string;
  userId: string;
  status: "draft" | "live";
  fileName: string | null;
  fileUrl: string | null;
  fileSize: number | null;
  fileContent: string | null;
  resumeData: ResumeData | null;
  createdAt: string;
  updatedAt: string;
}

// Validation helper
export function validateResumeData(
  data: unknown
): { success: true; data: ResumeData } | { success: false; error: z.ZodError } {
  const result = ResumeDataSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
