import type { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ResumeSection({
  title,
  children,
  className = "",
}: ResumeSectionProps) {
  return (
    <section className={`resume-section ${className}`.trim()}>
      <h2 className="section-heading">{title}</h2>
      {children}
    </section>
  );
}
