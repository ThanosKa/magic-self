import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  noStore();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://magic-self.dev";

  const blogSlugs = [
    "how-to-convert-linkedin-pdf-to-website",
    "free-portfolio-website-builders",
    "linkedin-profile-vs-personal-website",
    "how-to-create-personal-website-for-free",
    "ai-resume-builder-free",
    "how-to-export-linkedin-profile-to-pdf",
    "resume-website-vs-linkedin-profile",
    "best-free-portfolio-websites-for-developers",
    "how-to-make-resume-stand-out-to-recruiters",
    "personal-website-for-job-seekers",
    "open-source-resume-builder",
    "resume-to-website-converter-guide",
    "developer-portfolio-website-guide",
    "student-portfolio-website-free",
    "ai-portfolio-generator",
  ];

  const audiences = [
    "developers",
    "designers",
    "students",
    "job-seekers",
    "engineers",
    "product-managers",
    "marketers",
    "data-scientists",
    "ux-designers",
    "freelancers",
  ];

  const roles = [
    "software-engineer",
    "product-manager",
    "ux-designer",
    "data-scientist",
    "frontend-developer",
    "backend-developer",
    "full-stack-developer",
    "marketing-manager",
    "graphic-designer",
    "project-manager",
    "devops-engineer",
    "mobile-developer",
    "machine-learning-engineer",
    "business-analyst",
    "content-writer",
  ];

  const vsPages = ["linkedin", "about-me", "carrd", "read-cv", "notion"];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/vs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/for`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/examples`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...audiences.map((audience) => ({
      url: `${baseUrl}/for/${audience}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...roles.map((role) => ({
      url: `${baseUrl}/examples/${role}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...vsPages.map((competitor) => ({
      url: `${baseUrl}/vs/${competitor}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
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
