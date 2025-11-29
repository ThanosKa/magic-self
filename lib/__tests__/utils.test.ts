import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  absoluteUrl,
  cn,
  formatDate,
  formatDateRange,
  getShortMonth,
  getYear,
  slugify,
  truncateText,
} from "../utils";

describe("cn", () => {
  it("merges class names while removing duplicates", () => {
    const result = cn("text-sm", undefined, "font-bold", "text-sm");
    expect(result.split(" ").sort()).toEqual(["font-bold", "text-sm"].sort());
  });
});

describe("absoluteUrl", () => {
  const originalEnv = process.env.NEXT_PUBLIC_APP_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_APP_URL = "https://magic-self.dev";
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_APP_URL = originalEnv;
  });

  it("uses NEXT_PUBLIC_APP_URL when provided", () => {
    expect(absoluteUrl("/test")).toBe("https://magic-self.dev/test");
  });

  it("falls back to localhost when env var missing", () => {
    process.env.NEXT_PUBLIC_APP_URL = "";
    expect(absoluteUrl("/test")).toBe("http://localhost:3000/test");
  });
});

describe("formatDate helpers", () => {
  it("formats a date to short month and year", () => {
    expect(formatDate("2024-01-15")).toBe("Jan 2024");
  });

  it("slugifies arbitrary text", () => {
    expect(slugify("Hello World!! 2024")).toBe("hello-world-2024");
  });

  it("extracts the year from multiple formats", () => {
    expect(getYear("2022")).toBe("2022");
    expect(getYear("2024-05-01")).toBe("2024");
    expect(getYear("")).toBe("");
  });

  it("extracts the short month when available", () => {
    expect(getShortMonth("2024-05-01")).toBe("May");
    expect(getShortMonth("2024")).toBe("");
  });

  it("formats date ranges and handles open end dates", () => {
    expect(formatDateRange("2020-01-01", "2022-12-01")).toBe(
      "Jan 2020 - Dec 2022"
    );
    expect(formatDateRange("2020-01-01")).toBe("Jan 2020 - Present");
  });
});

describe("truncateText", () => {
  it("returns the original text when within limit", () => {
    expect(truncateText("hello", 10)).toBe("hello");
  });

  it("truncates text and appends ellipsis when exceeding limit", () => {
    expect(truncateText("abcdefghijklmnop", 10)).toBe("abcdefg...");
  });
});
