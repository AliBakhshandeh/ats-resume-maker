"use client";

import { EditableText } from "@/components/resume/EditableText";
import { useEditableMode } from "@/components/resume/EditableModeContext";
import { ResumeSection } from "@/components/resume/ResumeSection";

interface SummarySectionProps {
  title: string;
  summary: string;
  onChange: (summary: string) => void;
}

export function SummarySection({
  title,
  summary,
  onChange,
}: SummarySectionProps) {
  const editable = useEditableMode();

  if (!summary.trim() && !editable) {
    return null;
  }

  return (
    <ResumeSection title={title}>
      <p className="leading-snug text-slate-800">
        <EditableText
          value={summary || "Write a short professional summary"}
          ariaLabel="Professional summary"
          onChange={onChange}
        />
      </p>
    </ResumeSection>
  );
}
