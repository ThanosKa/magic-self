import type { Education } from "@/lib/schemas/resume"
import { Card, CardContent } from "@/components/ui/card"

interface ResumeEducationProps {
  education: Education[]
}

export function ResumeEducation({ education }: ResumeEducationProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 print:grid-cols-2 print:gap-2">
      {education.map((edu, index) => (
        <Card key={index} className="print:border-none print:shadow-none">
          <CardContent className="p-4 print:p-2">
            <h3 className="font-semibold">{edu.school}</h3>
            <p className="text-sm text-muted-foreground">{edu.degree}</p>
            <p className="text-sm text-muted-foreground">
              {edu.start} - {edu.end}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
