import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://folio.sh";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/api/",
                "/dashboard",
                "/preview",
                "/pdf",
                "/sign-in",
                "/sign-up",
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
