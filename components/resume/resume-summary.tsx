interface ResumeSummaryProps {
  summary: string;
}

export function ResumeSummary({ summary }: ResumeSummaryProps) {
  return (
    <p className="text-muted-foreground leading-relaxed print:text-sm">
      {summary}
    </p>
  );
}
