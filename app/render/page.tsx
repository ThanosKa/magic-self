import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { RenderClient } from "@/components/render/render-client";

export default async function RenderPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    return (
        <main className="min-h-screen bg-background">
            <RenderClient />
        </main>
    );
}
