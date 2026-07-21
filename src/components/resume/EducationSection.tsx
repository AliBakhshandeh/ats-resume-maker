"use client";

import {
  AddItemButton,
  RemoveItemButton,
} from "@/components/resume/EditActions";
import { EditableText } from "@/components/resume/EditableText";
import { ResumeSection } from "@/components/resume/ResumeSection";
import type { Education } from "@/types/resume";
import { createEmptyEducation } from "@/utils/createEmptyResumeItems";

interface EducationSectionProps {
  title: string;
  education: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationSection({
  title,
  education,
  onChange,
}: EducationSectionProps) {
  const enabledEducation = education.filter((item) => item.enabled !== false);

  return (
    <ResumeSection title={title} className="flex-1">
      <div className="space-y-1">
        {enabledEducation.map((item) => {
          const itemIndex = education.indexOf(item);

          return (
            <article
              key={`${item.institution}-${item.degree ?? ""}-${item.startDate ?? ""}-${itemIndex}`}
              className="relative leading-snug"
            >
              <div className="absolute -right-1 -top-0.5">
                <RemoveItemButton
                  label="Remove education"
                  onClick={() =>
                    onChange(
                      education.filter((_, index) => index !== itemIndex),
                    )
                  }
                />
              </div>
              <h3 className="font-semibold text-slate-950">
                <EditableText
                  value={item.institution}
                  ariaLabel="Institution"
                  onChange={(institution) => {
                    const next = [...education];
                    next[itemIndex] = { ...item, institution };
                    onChange(next);
                  }}
                />
              </h3>
              <p>
                <EditableText
                  value={item.degree ?? ""}
                  ariaLabel="Degree"
                  onChange={(degree) => {
                    const next = [...education];
                    next[itemIndex] = { ...item, degree };
                    onChange(next);
                  }}
                />
                <span aria-hidden="true">, </span>
                <EditableText
                  value={item.field ?? ""}
                  ariaLabel="Field of study"
                  onChange={(field) => {
                    const next = [...education];
                    next[itemIndex] = { ...item, field };
                    onChange(next);
                  }}
                />
                <span aria-hidden="true"> | </span>
                <EditableText
                  value={item.location ?? ""}
                  ariaLabel="Education location"
                  onChange={(location) => {
                    const next = [...education];
                    next[itemIndex] = { ...item, location };
                    onChange(next);
                  }}
                />
              </p>
              <p className="text-slate-700">
                <EditableText
                  value={item.startDate ?? ""}
                  ariaLabel="Education start date"
                  onChange={(startDate) => {
                    const next = [...education];
                    next[itemIndex] = { ...item, startDate };
                    onChange(next);
                  }}
                />
                <span aria-hidden="true"> - </span>
                <EditableText
                  value={item.endDate ?? ""}
                  ariaLabel="Education end date"
                  onChange={(endDate) => {
                    const next = [...education];
                    next[itemIndex] = { ...item, endDate };
                    onChange(next);
                  }}
                />
              </p>
            </article>
          );
        })}
      </div>
      <AddItemButton
        label="Add education"
        onClick={() => onChange([...education, createEmptyEducation()])}
      />
    </ResumeSection>
  );
}
