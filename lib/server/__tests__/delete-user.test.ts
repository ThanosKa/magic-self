import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock config - must be before imports
vi.mock("@/lib/config", () => ({
    FORBIDDEN_USERNAMES: ["admin", "api"],
    MAX_USERNAME_LENGTH: 30,
    MIN_USERNAME_LENGTH: 3,
}));

// Mock logger
vi.mock("@/lib/server/logger", () => ({
    logger: {
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        debug: vi.fn(),
    },
}));

// Create mock Supabase client using vi.hoisted
const mockSupabaseClient = vi.hoisted(() => ({
    from: vi.fn(),
    storage: {
        from: vi.fn(),
    },
}));

// Mock the Supabase admin client  
vi.mock("@/lib/supabase/admin", () => ({
    createAdminClient: vi.fn(() => mockSupabaseClient),
}));

// Import after mocks are set up
import { deleteUserData, deleteUserFile } from "../supabase-actions";

describe("deleteUserFile", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should do nothing if fileUrl is null", async () => {
        await deleteUserFile(null);
    });

    it("should extract file path and delete from storage", async () => {
        const mockRemove = vi.fn().mockResolvedValue({ error: null });
        mockSupabaseClient.storage.from = vi.fn().mockReturnValue({
            remove: mockRemove,
        });

        const fileUrl =
            "https://project-id.supabase.co/storage/v1/object/public/resumes/user123/resume.pdf";

        await deleteUserFile(fileUrl);

        expect(mockSupabaseClient.storage.from).toHaveBeenCalledWith("resumes");
        expect(mockRemove).toHaveBeenCalledWith(["user123/resume.pdf"]);
    });

    it("should throw error if storage deletion fails", async () => {
        const mockError = { message: "Storage error" };
        const mockRemove = vi.fn().mockResolvedValue({ error: mockError });
        mockSupabaseClient.storage.from = vi.fn().mockReturnValue({
            remove: mockRemove,
        });

        const fileUrl =
            "https://project-id.supabase.co/storage/v1/object/public/resumes/user123/resume.pdf";

        await expect(deleteUserFile(fileUrl)).rejects.toThrow();
    });

    it("should handle invalid URL format gracefully", async () => {
        mockSupabaseClient.storage.from = vi.fn();

        const fileUrl = "https://example.com/invalid/path";

        // Should not throw, just warn and return
        await deleteUserFile(fileUrl);

        expect(mockSupabaseClient.storage.from).not.toHaveBeenCalled();
    });
});

describe("deleteUserData", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should delete resume, username, and file for user with all data", async () => {
        const userId = "user123";
        const mockResume = {
            id: "resume-id",
            user_id: userId,
            file_url:
                "https://project-id.supabase.co/storage/v1/object/public/resumes/user123/resume.pdf",
            file_name: "resume.pdf",
            resume_data: {},
            status: "live",
        };

        const mockDelete = vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: null }),
        });

        const mockSelect = vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: mockResume, error: null }),
            }),
        });

        const mockRemove = vi.fn().mockResolvedValue({ error: null });

        mockSupabaseClient.from = vi.fn((table: string) => {
            if (table === "resumes") {
                return {
                    select: mockSelect,
                    delete: mockDelete,
                };
            }
            return {
                delete: mockDelete,
            };
        });

        mockSupabaseClient.storage.from = vi.fn().mockReturnValue({
            remove: mockRemove,
        });

        await deleteUserData(userId);

        // Verify resume deletion
        expect(mockSupabaseClient.from).toHaveBeenCalledWith("resumes");
        expect(mockDelete).toHaveBeenCalled();

        // Verify username deletion
        expect(mockSupabaseClient.from).toHaveBeenCalledWith("usernames");

        // Verify file deletion
        expect(mockSupabaseClient.storage.from).toHaveBeenCalledWith("resumes");
        expect(mockRemove).toHaveBeenCalledWith(["user123/resume.pdf"]);
    });

    it("should handle user with no file uploaded", async () => {
        const userId = "user123";
        const mockResume = {
            id: "resume-id",
            user_id: userId,
            file_url: null,
            file_name: null,
            resume_data: null,
            status: "draft",
        };

        const mockDelete = vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: null }),
        });

        const mockSelect = vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: mockResume, error: null }),
            }),
        });

        mockSupabaseClient.from = vi.fn((table: string) => {
            if (table === "resumes") {
                return {
                    select: mockSelect,
                    delete: mockDelete,
                };
            }
            return {
                delete: mockDelete,
            };
        });

        await deleteUserData(userId);

        // Verify storage was not called since no file exists
        expect(mockSupabaseClient.storage.from).not.toHaveBeenCalled();

        // Verify deletions still happened
        expect(mockDelete).toHaveBeenCalled();
    });

    it("should throw error if resume deletion fails", async () => {
        const userId = "user123";
        const mockError = { message: "Database error", code: "ERROR" };

        const mockDelete = vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: mockError }),
        });

        const mockSelect = vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: null, error: null }),
            }),
        });

        mockSupabaseClient.from = vi.fn(() => ({
            select: mockSelect,
            delete: mockDelete,
        }));

        await expect(deleteUserData(userId)).rejects.toThrow();
    });

    it("should throw error if username deletion fails", async () => {
        const userId = "user123";

        const mockSelect = vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: null, error: null }),
            }),
        });

        let callCount = 0;
        const mockDelete = vi.fn().mockImplementation(() => {
            callCount++;
            return {
                eq: vi.fn().mockResolvedValue({
                    error: callCount === 1 ? null : { message: "Username delete failed" },
                }),
            };
        });

        mockSupabaseClient.from = vi.fn(() => ({
            select: mockSelect,
            delete: mockDelete,
        }));

        await expect(deleteUserData(userId)).rejects.toThrow();
    });
});
