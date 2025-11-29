import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  noStore();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://magic-self.dev";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/upload`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const supabase = await createClient();
    const { data: usernames } = await supabase
      .from("usernames")
      .select("username, updated_at")
      .limit(50000);

    const resumeRoutes: MetadataRoute.Sitemap =
      usernames?.map((user) => ({
        url: `${baseUrl}/${user.username}`,
        lastModified: new Date(user.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })) || [];

    return [...staticRoutes, ...resumeRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
