import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs, blogPosts } from "@/lib/blog/posts";
import { SITE_CONFIG } from "@/lib/config";

interface BlogSection {
  type: "intro" | "h2" | "h3" | "p" | "ul" | "ol" | "table" | "cta" | "faq";
  heading?: string;
  text?: string;
  items?: string[];
  rows?: { cells: string[] }[];
  headers?: string[];
  questions?: { q: string; a: string }[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: postUrl },
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
    },
  };
}

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case "intro":
      return (
        <div key={index} className="lead text-xl text-muted-foreground mb-8 leading-relaxed">
          {section.text}
        </div>
      );

    case "h2":
      return (
        <h2 key={index} className="text-2xl font-bold mt-12 mb-4 tracking-tight">
          {section.heading}
        </h2>
      );

    case "h3":
      return (
        <h3 key={index} className="text-xl font-semibold mt-8 mb-3 tracking-tight">
          {section.heading}
        </h3>
      );

    case "p":
      return (
        <p key={index} className="text-base leading-relaxed mb-4 text-foreground/90">
          {section.text}
        </p>
      );

    case "ul":
      return (
        <ul key={index} className="my-4 ml-6 space-y-2 list-disc marker:text-primary">
          {section.items?.map((item, i) => (
            <li key={i} className="text-base leading-relaxed text-foreground/90">
              {item}
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol key={index} className="my-4 ml-6 space-y-2 list-decimal marker:text-primary marker:font-semibold">
          {section.items?.map((item, i) => (
            <li key={i} className="text-base leading-relaxed text-foreground/90">
              {item}
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div key={index} className="my-6 overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            {section.headers && section.headers.length > 0 && (
              <thead className="bg-muted/50">
                <tr>
                  {section.headers.map((header, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 text-left font-semibold text-foreground border-b"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {section.rows?.map((row, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  {row.cells.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-foreground/90">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "cta":
      return (
        <div
          key={index}
          className="my-8 rounded-xl border bg-primary/5 p-6 text-center"
        >
          {section.heading && (
            <h3 className="text-xl font-bold mb-2">{section.heading}</h3>
          )}
          {section.text && (
            <p className="text-muted-foreground mb-4">{section.text}</p>
          )}
          <Link
            href="/upload"
            className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Create Your Website Free →
          </Link>
        </div>
      );

    case "faq":
      return (
        <div key={index} className="my-8 space-y-4">
          {section.heading && (
            <h2 className="text-2xl font-bold mb-6 tracking-tight">{section.heading}</h2>
          )}
          {section.questions?.map((qa, i) => (
            <details
              key={i}
              className="group border rounded-lg overflow-hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-medium hover:bg-muted/30 transition-colors list-none">
                <span>{qa.q}</span>
                <span className="ml-4 shrink-0 text-muted-foreground group-open:rotate-180 transition-transform duration-200">
                  ↓
                </span>
              </summary>
              <div className="px-5 pb-4 pt-2 text-sm leading-relaxed text-foreground/80 border-t bg-muted/10">
                {qa.a}
              </div>
            </details>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Magic Self",
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  const faqQuestions = post.sections.filter((s: BlogSection) => s.type === "faq");
  const faqSchema =
    faqQuestions.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqQuestions.flatMap((section: BlogSection) =>
            (section.questions ?? []).map((qa) => ({
              "@type": "Question",
              name: qa.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: qa.a,
              },
            }))
          ),
        }
      : null;

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex gap-12">
          {/* Article content */}
          <article className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-foreground line-clamp-1">{post.title}</span>
            </nav>

            {/* Post header */}
            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                    {post.author.charAt(0)}
                  </div>
                  <span className="font-medium text-foreground">{post.author}</span>
                </div>
                <span>·</span>
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
            </header>

            {/* Divider */}
            <hr className="mb-8 border-border" />

            {/* Post body */}
            <div className="prose-container">
              {post.sections.map((section: BlogSection, index: number) =>
                renderSection(section, index)
              )}
            </div>

            {/* Bottom mobile CTA */}
            <div className="mt-12 rounded-xl border bg-muted/30 p-8 text-center lg:hidden">
              <h2 className="text-xl font-bold mb-2">
                Turn your resume into a website
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Upload your PDF resume or LinkedIn export and get a live personal website in seconds. Free and open source.
              </p>
              <Link
                href="/upload"
                className="inline-flex items-center bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Create Your Website Free →
              </Link>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-10 border-t">
                <h2 className="text-xl font-bold mb-6">Related Articles</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all"
                    >
                      <div className="text-xs text-muted-foreground mb-2">
                        <time dateTime={related.publishedAt}>
                          {new Date(related.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                        <span className="mx-1">·</span>
                        <span>{related.readingTime}</span>
                      </div>
                      <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sticky sidebar CTA — desktop only */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <div className="rounded-xl border bg-muted/30 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h3 className="font-bold text-base mb-2">Build your resume website</h3>
                <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                  Upload your PDF resume or LinkedIn export and get a live personal website in seconds. Free and open source.
                </p>
                <Link
                  href="/upload"
                  className="block w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity text-center"
                >
                  Create Your Website Free →
                </Link>
                <p className="text-xs text-muted-foreground mt-3">
                  No credit card required
                </p>
              </div>

              {/* Share section */}
              <div className="mt-6 rounded-xl border p-5">
                <p className="text-sm font-semibold mb-3 text-center">Share this article</p>
                <div className="flex gap-2 justify-center">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}&via=magic_self`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 border rounded-lg px-3 py-2 text-xs font-medium hover:bg-muted transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X / Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 border rounded-lg px-3 py-2 text-xs font-medium hover:bg-muted transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
