import { describe, expect, it } from "vitest";
import { validateResumeData } from "../schemas/resume";

const baseHeader = {
  name: "Jane Doe",
  shortAbout: "Builder",
  location: "Remote",
  contacts: {
    email: "jane@example.com",
  },
  skills: ["TypeScript"],
};

describe("validateResumeData", () => {
  it("accepts valid resume data", () => {
    const result = validateResumeData({
      header: baseHeader,
      summary: "Seasoned engineer",
      workExperience: [
        {
          company: "Acme",
          title: "Engineer",
          start: "2020-01-01",
          end: "2022-01-01",
          description: "Built things",
        },
      ],
      projects: [
        {
          name: "Folio",
          description: "Resume to website",
          technologies: ["Next.js"],
        },
      ],
      education: [
        {
          school: "State University",
          degree: "BS",
          start: "2015",
          end: "2019",
        },
      ],
    });

    expect(result).toMatchObject({ success: true });
  });

  it("applies defaults for optional sections", () => {
    const result = validateResumeData({
      header: { name: "Jane Doe" },
    });

    expect(result).toMatchObject({ success: true });
    if (result.success) {
      expect(result.data.header).toMatchObject({
        name: "Jane Doe",
        shortAbout: "",
        skills: [],
      });
      expect(result.data.summary).toBe("");
      expect(result.data.workExperience).toEqual([]);
      expect(result.data.projects).toEqual([]);
      expect(result.data.education).toEqual([]);
    }
  });

  it("fails validation when required fields are invalid", () => {
    const result = validateResumeData({
      header: { name: "" },
    });

    expect(result.success).toBe(false);
    expect(result).toHaveProperty("error");
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Name is required");
    }
  });

  it("accepts resume with undefined contacts", () => {
    const result = validateResumeData({
      header: {
        name: "John Doe",
        shortAbout: "Developer",
        skills: ["JavaScript"],
      },
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.header.contacts).toBeUndefined();
    }
  });

  it("accepts resume with partial contacts", () => {
    const result = validateResumeData({
      header: {
        name: "John Doe",
        shortAbout: "Developer",
        contacts: {
          email: "john@example.com",
        },
        skills: ["JavaScript"],
      },
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.header.contacts).toMatchObject({
        email: "john@example.com",
      });
      expect(result.data.header.contacts?.phone).toBeUndefined();
      expect(result.data.header.contacts?.github).toBeUndefined();
    }
  });

  it("accepts work experience with null end date (current job)", () => {
    const result = validateResumeData({
      header: baseHeader,
      workExperience: [
        {
          company: "Current Co",
          title: "Senior Engineer",
          start: "2023-01",
          end: null,
          description: "Current role",
        },
      ],
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.workExperience[0].end).toBeNull();
    }
  });

  it("accepts dates in various formats", () => {
    const result = validateResumeData({
      header: baseHeader,
      workExperience: [
        {
          company: "Company A",
          title: "Engineer",
          start: "2024-10", // YYYY-MM format
          end: null,
          description: "Role",
        },
      ],
      education: [
        {
          school: "University",
          degree: "BS",
          start: "2015", // YYYY format
          end: "2019",
        },
      ],
    });

    expect(result.success).toBe(true);
  });
  it("accepts work experience without location or contract", () => {
    const result = validateResumeData({
      header: baseHeader,
      workExperience: [
        {
          company: "Startup",
          title: "Founder",
          start: "2024-01",
          end: null,
          description: "Building",
          // location and contract omitted
        },
      ],
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.workExperience[0].location).toBeUndefined();
      expect(result.data.workExperience[0].contract).toBeUndefined();
    }
  });
});
