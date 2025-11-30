import { Badge } from "@/components/ui/badge";

interface ResumeSkillsProps {
  skills: string[];
}

export function ResumeSkills({ skills }: ResumeSkillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="print:text-xs bg-[hsl(222.2,47.4%,11.2%,0.8)] text-[hsl(210,40%,98%)] dark:bg-[hsl(210,40%,98%,0.8)] dark:text-[hsl(222.2,47.4%,11.2%)] border-0"
        >
          {skill}
        </Badge>
      ))}
    </div>
  );
}
