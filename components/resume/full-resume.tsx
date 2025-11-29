import type { ResumeData } from "@/lib/schemas/resume";
import { ResumeHeader } from "@/components/resume/resume-header";
import { ResumeSummary } from "@/components/resume/resume-summary";
import { ResumeWorkExperience } from "@/components/resume/resume-work-experience";
import { ResumeEducation } from "@/components/resume/resume-education";
import { ResumeSkills } from "@/components/resume/resume-skills";
import { ResumeSection } from "@/components/resume/resume-section";
import { ResumeProjects } from "@/components/resume/resume-projects";

interface FullResumeProps {
  data: ResumeData;
  profileImageUrl?: string | null;
}

export function FullResume({ data, profileImageUrl }: FullResumeProps) {
  const { header, summary, workExperience, projects, education } = data;

  return (
    <div className="space-y-10 print:space-y-8">
      <ResumeHeader header={header} profileImageUrl={profileImageUrl} />

      {header.skills.length > 0 && (
        <ResumeSection>
          <ResumeSkills skills={header.skills} />
        </ResumeSection>
      )}

      {summary && (
        <ResumeSection title="About">
          <ResumeSummary summary={summary} />
        </ResumeSection>
      )}

      {workExperience.length > 0 && (
        <ResumeSection title="Experience">
          <ResumeWorkExperience experiences={workExperience} />
        </ResumeSection>
      )}

      {projects.length > 0 && (
        <ResumeSection title="Projects">
          <ResumeProjects projects={projects} />
        </ResumeSection>
      )}

      {education.length > 0 && (
        <ResumeSection title="Education">
          <ResumeEducation education={education} />
        </ResumeSection>
      )}
    </div>
  );
}
