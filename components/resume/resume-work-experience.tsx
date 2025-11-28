import type { WorkExperience } from "@/lib/schemas/resume";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { formatDateRange } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

interface ResumeWorkExperienceProps {
  experiences: WorkExperience[];
}

export function ResumeWorkExperience({
  experiences,
}: ResumeWorkExperienceProps) {
  return (
    <div className="space-y-6 print:space-y-4">
      {experiences.map((job, index) => (
        <div key={index} className="space-y-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-semibold">{job.title}</h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {job.company}
                  {job.link && (
                    <a
                      href={`${job.link}?ref=${SITE_CONFIG.referralParam}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 inline-flex text-muted-foreground hover:text-foreground print:hidden"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </span>
                <span>·</span>
                <span>{job.location}</span>
                <Badge variant="outline" className="text-xs print:hidden">
                  {job.contract}
                </Badge>
              </div>
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {formatDateRange(job.start, job.end)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {job.description}
          </p>
        </div>
      ))}
    </div>
  );
}
