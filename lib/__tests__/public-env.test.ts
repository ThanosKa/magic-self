import { describe, expect, it } from "vitest";
import { findPublicEnvProblems } from "../public-env";

const complete = {
  NEXT_PUBLIC_APP_URL: "https://magic-self.dev",
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_x",
  NEXT_PUBLIC_SUPABASE_URL: "https://x.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon",
};

describe("findPublicEnvProblems", () => {
  it("accepts a complete https env", () => {
    expect(findPublicEnvProblems(complete)).toEqual([]);
  });

  it("names every missing value", () => {
    expect(findPublicEnvProblems({})).toEqual([
      "NEXT_PUBLIC_APP_URL is missing",
      "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing",
      "NEXT_PUBLIC_SUPABASE_URL is missing",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing",
    ]);
  });

  it("refuses an app url that is not https", () => {
    expect(
      findPublicEnvProblems({
        ...complete,
        NEXT_PUBLIC_APP_URL: "http://localhost:3000",
      })
    ).toEqual([
      "NEXT_PUBLIC_APP_URL must start with https:// (got http://localhost:3000)",
    ]);
  });
});
