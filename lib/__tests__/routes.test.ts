import { describe, expect, it } from "vitest";
import { isApiRoute, isProtectedRoute, isPublicRoute } from "../routes";

describe("route helpers", () => {
  describe("isProtectedRoute", () => {
    it("returns true for protected routes and their subpaths", () => {
      expect(isProtectedRoute("/upload")).toBe(true);
      expect(isProtectedRoute("/upload/step-2")).toBe(true);
    });

    it("returns false for non-protected routes", () => {
      expect(isProtectedRoute("/about")).toBe(false);
    });
  });

  describe("isApiRoute", () => {
    it("detects API routes by prefix", () => {
      expect(isApiRoute("/api/resume")).toBe(true);
      expect(isApiRoute("/api/username/check")).toBe(true);
    });

    it("returns false for non-API paths", () => {
      expect(isApiRoute("/username")).toBe(false);
    });
  });

  describe("isPublicRoute", () => {
    it("returns true for static public paths", () => {
      expect(isPublicRoute("/")).toBe(true);
      expect(isPublicRoute("/sign-in")).toBe(true);
    });

    it("returns true for dynamic username routes", () => {
      expect(isPublicRoute("/jane-doe")).toBe(true);
    });

    it("returns false for protected or nested routes", () => {
      expect(isPublicRoute("/upload")).toBe(false);
      expect(isPublicRoute("/settings/profile")).toBe(false);
    });
  });
});

