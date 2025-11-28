import { z } from "zod";

const ContactsSchema = z.object({
  website: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
});

const HeaderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  shortAbout: z.string().min(1, "Short description is required"),
  location: z.string().optional(),
  contacts: ContactsSchema.optional(),
  skills: z.array(z.string()).default([]),
});

const WorkExperienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  link: z.string().url().optional().or(z.literal("")),
  location: z.string().min(1, "Location is required"),
  contract: z.string().min(1, "Contract type is required"),
  title: z.string().min(1, "Job title is required"),
  start: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format"),
  end: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format")
    .nullable()
    .optional(),
  description: z.string().min(1, "Description is required"),
});

const EducationSchema = z.object({
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  start: z.string().regex(/^\d{4}$/, "Start year must be in YYYY format"),
  end: z.string().regex(/^\d{4}$/, "End year must be in YYYY format"),
});

export const ResumeDataSchema = z.object({
  header: HeaderSchema,
  summary: z.string().min(1, "Summary is required"),
  workExperience: z.array(WorkExperienceSchema).default([]),
  education: z.array(EducationSchema).default([]),
});

export type ResumeData = z.infer<typeof ResumeDataSchema>;
export type Contacts = z.infer<typeof ContactsSchema>;
export type Header = z.infer<typeof HeaderSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;

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
