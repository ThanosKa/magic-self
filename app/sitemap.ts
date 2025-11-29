import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Allow dynamic generation from database
  noStore();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://folio.sh";

  // Static routes
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
    // Fetch public resume usernames from database
    const supabase = await createClient();
    const { data: usernames } = await supabase
      .from("usernames")
      .select("username, updated_at")
      .limit(50000); // Sitemap limit

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
    // Return static routes only if database query fails
    return staticRoutes;
  }
}
