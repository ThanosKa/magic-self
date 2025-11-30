import { describe, expect, it, vi, beforeEach } from "vitest";
import { DELETE } from "../route";

type AuthReturn = Awaited<ReturnType<typeof import("@clerk/nextjs/server").auth>>;
type ClerkClientReturn = Awaited<ReturnType<typeof import("@clerk/nextjs/server").clerkClient>>;

vi.mock("@clerk/nextjs/server", () => ({
    auth: vi.fn(),
    clerkClient: vi.fn(),
}));

vi.mock("@/lib/server/supabase-actions", () => ({
    deleteUserData: vi.fn(),
}));

vi.mock("@/lib/server/logger", () => ({
    logger: {
        info: vi.fn(),
        error: vi.fn(),
    },
}));

describe("DELETE /api/user/delete", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return 401 if user is not authenticated", async () => {
        const { auth } = await import("@clerk/nextjs/server");
        vi.mocked(auth).mockResolvedValue({ userId: null } as AuthReturn);

        const response = await DELETE();
        const data = await response.json();

        expect(response.status).toBe(401);
        expect(data.error).toBe("Unauthorized");
    });

    it("should successfully delete user account and data", async () => {
        const mockUserId = "user_123";
        const { auth, clerkClient } = await import("@clerk/nextjs/server");
        const { deleteUserData } = await import("@/lib/server/supabase-actions");

        vi.mocked(auth).mockResolvedValue({ userId: mockUserId } as AuthReturn);

        const mockDeleteUser = vi.fn().mockResolvedValue(undefined);
        vi.mocked(clerkClient).mockResolvedValue({
            users: { deleteUser: mockDeleteUser },
        } as unknown as ClerkClientReturn);

        vi.mocked(deleteUserData).mockResolvedValue(undefined);

        const response = await DELETE();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.message).toBe("Account deleted successfully");
        expect(deleteUserData).toHaveBeenCalledWith(mockUserId);
        expect(mockDeleteUser).toHaveBeenCalledWith(mockUserId);
    });

    it("should return 500 if deleteUserData fails", async () => {
        const mockUserId = "user_123";
        const { auth } = await import("@clerk/nextjs/server");
        const { deleteUserData } = await import("@/lib/server/supabase-actions");

        vi.mocked(auth).mockResolvedValue({ userId: mockUserId } as AuthReturn);

        const mockError = new Error("Database error");
        vi.mocked(deleteUserData).mockRejectedValue(mockError);

        const response = await DELETE();
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.error).toBe("Failed to delete account");
        expect(data.details).toBe("Database error");
    });

    it("should return 500 if Clerk deletion fails", async () => {
        const mockUserId = "user_123";
        const { auth, clerkClient } = await import("@clerk/nextjs/server");
        const { deleteUserData } = await import("@/lib/server/supabase-actions");

        vi.mocked(auth).mockResolvedValue({ userId: mockUserId } as AuthReturn);

        vi.mocked(deleteUserData).mockResolvedValue(undefined);

        const mockError = new Error("Clerk API error");
        const mockDeleteUser = vi.fn().mockRejectedValue(mockError);
        vi.mocked(clerkClient).mockResolvedValue({
            users: { deleteUser: mockDeleteUser },
        } as unknown as ClerkClientReturn);

        const response = await DELETE();
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.error).toBe("Failed to delete account");
        expect(data.details).toBe("Clerk API error");
    });
});
