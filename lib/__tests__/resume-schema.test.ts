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
});

