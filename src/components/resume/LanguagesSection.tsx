"use client";

import {
  AddItemButton,
  RemoveItemButton,
} from "@/components/resume/EditActions";
import { EditableText } from "@/components/resume/EditableText";
import { ResumeSection } from "@/components/resume/ResumeSection";
import type { Language } from "@/types/resume";
import { createEmptyLanguage } from "@/utils/createEmptyResumeItems";

interface LanguagesSectionProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
}

export function LanguagesSection({
  languages,
  onChange,
}: LanguagesSectionProps) {
  return (
    <ResumeSection title="Languages" className="flex-1">
      <ul className="space-y-1 leading-snug">
        {languages.map((language, index) => (
          <li key={`${language.name}-${index}`} className="relative pr-4">
            <span className="font-semibold text-slate-950">
              <EditableText
                value={language.name}
                ariaLabel="Language name"
                onChange={(name) => {
                  const next = [...languages];
                  next[index] = { ...language, name };
                  onChange(next);
                }}
              />
              :{" "}
            </span>
            <EditableText
              value={language.proficiency}
              ariaLabel={`${language.name} proficiency`}
              onChange={(proficiency) => {
                const next = [...languages];
                next[index] = { ...language, proficiency };
                onChange(next);
              }}
            />
            <span className="absolute -right-1 top-0.5">
              <RemoveItemButton
                label="Remove language"
                onClick={() =>
                  onChange(languages.filter((_, itemIndex) => itemIndex !== index))
                }
              />
            </span>
          </li>
        ))}
      </ul>
      <AddItemButton
        label="Add language"
        onClick={() => onChange([...languages, createEmptyLanguage()])}
      />
    </ResumeSection>
  );
}
