import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getUserIdByUsername, getResume } from "@/lib/server/supabase-actions";
import { FullResume } from "@/components/resume/full-resume";
import { SITE_CONFIG } from "@/lib/config";
import type { ResumeData } from "@/lib/schemas/resume";
import Link from "next/link";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;

  const userId = await getUserIdByUsername(username);
  if (!userId) {
    return { title: "Not Found" };
  }

  const resume = await getResume(userId);
  if (!resume?.resume_data || resume.status !== "live") {
    return { title: "Not Found" };
  }

  const resumeData = resume.resume_data as ResumeData;
  const { name, shortAbout } = resumeData.header;

  return {
    title: `${name}'s Resume | ${SITE_CONFIG.name}`,
    description: shortAbout || resumeData.summary,
    openGraph: {
      title: `${name}'s Resume | ${SITE_CONFIG.name}`,
      description: shortAbout || resumeData.summary,
      type: "profile",
      url: `${SITE_CONFIG.url}/${username}`,
      images: [
        {
          url: `${SITE_CONFIG.url}/${username}/og`,
          width: 1200,
          height: 630,
          alt: `${name}'s Resume`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name}'s Resume | ${SITE_CONFIG.name}`,
      description: shortAbout || resumeData.summary,
      images: [`${SITE_CONFIG.url}/${username}/og`],
    },
  };
}

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageProps) {
  const { username } = await params;
  const query = await searchParams;

  // Handle error redirects from other pages
  if (query.usernameNotFound) {
    redirect(`/?error=username_not_found&username=${query.usernameNotFound}`);
  }

  const userId = await getUserIdByUsername(username);

  if (!userId) {
    notFound();
  }

  const resume = await getResume(userId);

  if (!resume?.resume_data || resume.status !== "live") {
    notFound();
  }

  const resumeData = resume.resume_data as ResumeData;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resumeData.header.name,
    description: resumeData.summary || resumeData.header.shortAbout,
    jobTitle: resumeData.header.shortAbout,
    url: `${SITE_CONFIG.url}/${username}`,
    email: resumeData.header.contacts?.email,
    knowsAbout: resumeData.header.skills,
    worksFor: resumeData.workExperience[0]
      ? {
          "@type": "Organization",
          name: resumeData.workExperience[0].company,
          url: resumeData.workExperience[0].link,
        }
      : undefined,
    alumniOf: resumeData.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.school,
    })),
    sameAs: [
      resumeData.header.contacts?.linkedin,
      resumeData.header.contacts?.github,
      resumeData.header.contacts?.twitter
        ? `https://twitter.com/${resumeData.header.contacts.twitter.replace("@", "")}`
        : undefined,
      resumeData.header.contacts?.website,
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-16">
          <FullResume data={resumeData} />

          {/* Footer */}
          <footer className="mt-16 border-t pt-8">
            <p className="text-center text-sm text-muted-foreground">
              Made with{" "}
              <Link
                href={`${SITE_CONFIG.url}?ref=${SITE_CONFIG.referralParam}`}
                className="font-medium text-foreground hover:underline"
                target="_blank"
              >
                {SITE_CONFIG.name}
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
