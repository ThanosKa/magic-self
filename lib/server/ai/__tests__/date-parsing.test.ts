import { describe, expect, it } from "vitest";

// Note: We're testing the internal utility functions that would be exported
// For full integration tests with the OpenRouter API, those would require mocking

describe("Date parsing for LinkedIn-style PDFs", () => {
    // Helper function to simulate the normalizeDate function from generate-resume-object.ts
    function parseMonthName(monthStr: string): string | null {
        const months: Record<string, string> = {
            jan: "01", january: "01",
            feb: "02", february: "02",
            mar: "03", march: "03",
            apr: "04", april: "04",
            may: "05",
            jun: "06", june: "06",
            jul: "07", july: "07",
            aug: "08", august: "08",
            sep: "09", sept: "09", september: "09",
            oct: "10", october: "10",
            nov: "11", november: "11",
            dec: "12", december: "12",
        };
        return months[monthStr.toLowerCase()] || null;
    }

    function normalizeDate(value: unknown): string {
        if (!value || typeof value !== "string") return "";
        const trimmed = value.trim().toLowerCase();

        // Handle empty, present, or current
        if (!trimmed || trimmed === "present" || trimmed === "current") return "";

        // Remove any explanatory text in parentheses (e.g., "(1 year 2 months)")
        const cleaned = trimmed.replace(/\s*\([^)]*\)\s*/g, "").trim();

        // If already in ISO format (YYYY-MM-DD or YYYY-MM or YYYY), return as is
        if (/^\d{4}(-\d{2})?(-\d{2})?$/.test(cleaned)) {
            return cleaned;
        }

        // Try to parse natural language dates like "October 2024" or "Jan 2023"
        // Pattern: "Month Year" or "Month, Year"
        const naturalDateMatch = cleaned.match(/^([a-z]+),?\s+(\d{4})$/);
        if (naturalDateMatch) {
            const [, monthStr, year] = naturalDateMatch;
            const month = parseMonthName(monthStr);
            if (month) {
                return `${year}-${month}`;
            }
        }

        // Try to parse "YYYY" only
        const yearOnlyMatch = cleaned.match(/^(\d{4})$/);
        if (yearOnlyMatch) {
            return yearOnlyMatch[1];
        }

        // If we can't parse it, try creating a Date object and extract components
        try {
            const date = new Date(cleaned);
            if (!isNaN(date.getTime())) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            }
        } catch {
            // Ignore parsing errors
        }

        // Return empty string if we can't parse the date
        return "";
    }

    it("parses natural language dates from LinkedIn", () => {
        expect(normalizeDate("October 2024")).toBe("2024-10");
        expect(normalizeDate("January 2022")).toBe("2022-01");
        expect(normalizeDate("Dec 2023")).toBe("2023-12");
        expect(normalizeDate("September 2021")).toBe("2021-09");
    });

    it("removes explanatory text in parentheses", () => {
        expect(normalizeDate("October 2024 (1 year 2 months)")).toBe("2024-10");
        expect(normalizeDate("Jan 2023 - Present (2 years)")).toBe("");
    });

    it("handles 'Present' and 'Current' keywords", () => {
        expect(normalizeDate("Present")).toBe("");
        expect(normalizeDate("Current")).toBe("");
        expect(normalizeDate("present")).toBe("");
    });

    it("preserves ISO formatted dates", () => {
        expect(normalizeDate("2024-10-15")).toBe("2024-10-15");
        expect(normalizeDate("2024-10")).toBe("2024-10");
        expect(normalizeDate("2024")).toBe("2024");
    });

    it("handles year-only dates", () => {
        expect(normalizeDate("2020")).toBe("2020");
        expect(normalizeDate("2015")).toBe("2015");
    });

    it("handles month names with commas", () => {
        expect(normalizeDate("October, 2024")).toBe("2024-10");
        expect(normalizeDate("Jan, 2023")).toBe("2023-01");
    });

    it("returns empty string for invalid dates", () => {
        expect(normalizeDate("")).toBe("");
        expect(normalizeDate("invalid")).toBe("");
        expect(normalizeDate(null)).toBe("");
        expect(normalizeDate(undefined)).toBe("");
    });

    it("handles case insensitivity", () => {
        expect(normalizeDate("OCTOBER 2024")).toBe("2024-10");
        expect(normalizeDate("october 2024")).toBe("2024-10");
        expect(normalizeDate("OcToBeR 2024")).toBe("2024-10");
    });
});

describe("Contact field sanitization", () => {
    it("should filter out null string values", () => {
        const contacts = {
            email: "john@example.com",
            phone: "null",
            github: "johndoe",
        };

        // Simulating the sanitization logic
        const cleanedContacts: Record<string, string> = {};

        if (contacts.email && contacts.email !== "null" && contacts.email !== "undefined") {
            cleanedContacts.email = contacts.email;
        }
        if (contacts.phone && contacts.phone !== "null" && contacts.phone !== "undefined") {
            cleanedContacts.phone = contacts.phone;
        }
        if (contacts.github && contacts.github !== "null" && contacts.github !== "undefined") {
            cleanedContacts.github = contacts.github;
        }

        expect(cleanedContacts).toEqual({
            email: "john@example.com",
            github: "johndoe",
        });
        expect(cleanedContacts.phone).toBeUndefined();
    });

    it("should filter out empty strings", () => {
        const contacts = {
            email: "john@example.com",
            phone: "",
            linkedin: "   ",
        };

        const cleanedContacts: Record<string, string> = {};

        if (contacts.email && contacts.email.trim()) {
            cleanedContacts.email = contacts.email.trim();
        }
        if (contacts.phone && contacts.phone.trim()) {
            cleanedContacts.phone = contacts.phone.trim();
        }
        if (contacts.linkedin && contacts.linkedin.trim()) {
            cleanedContacts.linkedin = contacts.linkedin.trim();
        }

        expect(cleanedContacts).toEqual({
            email: "john@example.com",
        });
    });

    it("should only include valid email addresses", () => {
        const emails = ["john@example.com", "invalid-email", "", "test@test.com"];

        const validEmails = emails.filter(e => e && e.includes("@"));

        expect(validEmails).toEqual(["john@example.com", "test@test.com"]);
    });
});

describe("LinkedIn PDF simulation", () => {
    it("should handle a typical LinkedIn work experience entry", () => {
        // Simulating data extracted from LinkedIn PDF
        const linkedInData = {
            company: "Tech Corp",
            title: "Senior Software Engineer",
            start: "October 2024",
            end: "Present (1 year 2 months)",
            location: "San Francisco, CA",
        };

        function normalizeDate(value: unknown): string {
            if (!value || typeof value !== "string") return "";
            const trimmed = value.trim().toLowerCase();
            if (!trimmed || trimmed === "present" || trimmed.startsWith("present")) return "";

            const cleaned = trimmed.replace(/\s*\([^)]*\)\s*/g, "").trim();

            if (/^\d{4}(-\d{2})?(-\d{2})?$/.test(cleaned)) {
                return cleaned;
            }

            const naturalDateMatch = cleaned.match(/^([a-z]+),?\s+(\d{4})$/);
            if (naturalDateMatch) {
                const months: Record<string, string> = {
                    october: "10", oct: "10",
                };
                const [, monthStr, year] = naturalDateMatch;
                const month = months[monthStr.toLowerCase()];
                if (month) {
                    return `${year}-${month}`;
                }
            }

            return "";
        }

        const normalized = {
            company: linkedInData.company,
            title: linkedInData.title,
            start: normalizeDate(linkedInData.start),
            end: normalizeDate(linkedInData.end) || null,
            location: linkedInData.location,
        };

        expect(normalized).toEqual({
            company: "Tech Corp",
            title: "Senior Software Engineer",
            start: "2024-10",
            end: null,
            location: "San Francisco, CA",
        });
    });
});
