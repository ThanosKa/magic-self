import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://magic-self.dev";

    const disallowedPaths = [
        "/api/",
        "/dashboard",
        "/preview",
        "/render",
        "/pdf",
        "/sign-up",
    ];

    return {
        rules: [
            // All crawlers — allow site, block private app routes
            {
                userAgent: "*",
                allow: "/",
                disallow: disallowedPaths,
            },
            // Explicitly allow all AI search bots (citation sources)
            { userAgent: "GPTBot", allow: "/" },
            { userAgent: "ChatGPT-User", allow: "/" },
            { userAgent: "PerplexityBot", allow: "/" },
            { userAgent: "ClaudeBot", allow: "/" },
            { userAgent: "anthropic-ai", allow: "/" },
            { userAgent: "Google-Extended", allow: "/" },
            // Block AI training crawlers (optional — keeps content from training data)
            { userAgent: "CCBot", disallow: "/" },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
