import type { Education } from "@/lib/schemas/resume";

interface ResumeEducationProps {
  education: Education[];
}

export function ResumeEducation({ education }: ResumeEducationProps) {
  return (
    <div className="space-y-6 print:space-y-4">
      {education.map((edu, index) => (
        <div key={index} className="space-y-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-semibold">{edu.degree}</h3>
              <p className="text-sm text-muted-foreground font-medium">
                {edu.school}
              </p>
            </div>
            {edu.start && edu.end && edu.start.trim() && edu.end.trim() && (
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {edu.start} - {edu.end}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
