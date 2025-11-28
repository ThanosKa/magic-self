import { auth } from "@clerk/nextjs/server";
import { TopMenu } from "@/components/landing/top-menu";
import { Footer } from "@/components/landing/footer";
import { Hero1 } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { FAQ } from "@/components/landing/faq";

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopMenu userId={userId} />

      <main className="flex-1">
        <Hero1 />
        <Features />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
