import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog/posts";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Blog — Resume, Portfolio & Career Tips",
  description:
    "Expert guides on building your personal website, converting your LinkedIn PDF to a portfolio, and standing out in your job search. Free tips from Magic Self.",
  alternates: { canonical: `${SITE_CONFIG.url}/blog` },
  openGraph: {
    title: "Blog — Resume, Portfolio & Career Tips | Magic Self",
    description:
      "Expert guides on building your personal website, converting your LinkedIn PDF to a portfolio, and standing out in your job search.",
    url: `${SITE_CONFIG.url}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Resume &amp; Portfolio Tips
        </h1>
        <p className="text-xl text-muted-foreground">
          Guides to help you build your online presence, land more interviews, and showcase your work.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sortedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
              {post.title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-16 border rounded-xl p-8 bg-muted/30 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to build your resume website?</h2>
        <p className="text-muted-foreground mb-6">
          Convert your PDF resume or LinkedIn export into a live personal website in seconds. Free and open source.
        </p>
        <Link
          href="/upload"
          className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Create Your Website Free →
        </Link>
      </div>
    </main>
  );
}
