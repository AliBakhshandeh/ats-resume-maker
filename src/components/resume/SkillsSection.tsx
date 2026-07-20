"use client";

import {
  AddItemButton,
  RemoveItemButton,
} from "@/components/resume/EditActions";
import { EditableText } from "@/components/resume/EditableText";
import { ResumeSection } from "@/components/resume/ResumeSection";
import type { SkillGroup } from "@/types/resume";
import { createEmptySkillGroup } from "@/utils/createEmptyResumeItems";

interface SkillsSectionProps {
  title: string;
  skills: SkillGroup[];
  onChange: (skills: SkillGroup[]) => void;
}

export function SkillsSection({ title, skills, onChange }: SkillsSectionProps) {
  return (
    <ResumeSection title={title}>
      <div className="grid gap-y-1.5">
        {skills.map((group, index) => (
          <p key={`${group.title}-${index}`} className="relative leading-snug pr-4">
            <span className="font-semibold text-slate-950">
              <EditableText
                value={group.title}
                ariaLabel={`${group.title} skill group title`}
                onChange={(titleValue) => {
                  const nextSkills = [...skills];
                  nextSkills[index] = { ...group, title: titleValue };
                  onChange(nextSkills);
                }}
              />
              :{" "}
            </span>
            <EditableText
              value={group.items.join(", ")}
              ariaLabel={`${group.title} skills`}
              onChange={(itemsValue) => {
                const nextSkills = [...skills];
                nextSkills[index] = {
                  ...group,
                  items: itemsValue
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                };
                onChange(nextSkills);
              }}
            />
            <span className="absolute -right-1 top-0.5">
              <RemoveItemButton
                label="Remove skill group"
                onClick={() =>
                  onChange(skills.filter((_, itemIndex) => itemIndex !== index))
                }
              />
            </span>
          </p>
        ))}
      </div>
      <AddItemButton
        label="Add skill group"
        onClick={() => onChange([...skills, createEmptySkillGroup()])}
      />
    </ResumeSection>
  );
}
