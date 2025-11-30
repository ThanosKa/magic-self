import type { Project } from "@/lib/schemas/resume";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface ResumeProjectsProps {
  projects: Project[];
}

export function ResumeProjects({ projects }: ResumeProjectsProps) {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold">{project.name}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors print:hidden"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
              {project.date && (
                <p className="text-sm text-muted-foreground">{project.date}</p>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs print:text-xs bg-[hsl(222.2,47.4%,11.2%,0.8)] text-[hsl(210,40%,98%)] dark:bg-[hsl(210,40%,98%,0.8)] dark:text-[hsl(222.2,47.4%,11.2%)] border-0"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          {project.highlights.length > 0 && (
            <ul className="space-y-1 text-sm">
              {project.highlights.map((highlight, hIndex) => (
                <li key={hIndex} className="flex gap-2">
                  <span className="flex-1">{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
