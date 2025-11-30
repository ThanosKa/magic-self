import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui/spinner";

const RenderClient = dynamic(
  () =>
    import("@/components/render/render-client").then((mod) => ({
      default: mod.RenderClient,
    })),
  {
    loading: () => (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    ),
  }
);

export default async function RenderPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-up");
  }

  return (
    <main className="min-h-screen bg-background">
      <RenderClient />
    </main>
  );
}
