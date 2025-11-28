import { Badge } from "@/components/ui/badge";

interface ResumeSkillsProps {
  skills: string[];
}

export function ResumeSkills({ skills }: ResumeSkillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <Badge key={index} variant="secondary" className="print:text-xs">
          {skill}
        </Badge>
      ))}
    </div>
  );
}
