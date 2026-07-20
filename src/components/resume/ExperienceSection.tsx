import { AddItemButton } from "@/components/resume/EditActions";
import { ExperienceItem } from "@/components/resume/ExperienceItem";
import { ResumeSection } from "@/components/resume/ResumeSection";
import type { Experience, ResumeLanguage } from "@/types/resume";
import { createEmptyExperience } from "@/utils/createEmptyResumeItems";

interface ExperienceSectionProps {
  title: string;
  language: ResumeLanguage;
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
  compactOlderExperience: boolean;
}

export function ExperienceSection({
  title,
  language,
  experience,
  onChange,
  compactOlderExperience,
}: ExperienceSectionProps) {
  return (
    <ResumeSection title={title}>
      <div className="space-y-2">
        {experience.map((item, index) => (
          <ExperienceItem
            key={`${item.company}-${item.title}-${item.startDate}-${index}`}
            experience={item}
            language={language}
            onChange={(nextItem) => {
              const nextExperience = [...experience];
              nextExperience[index] = nextItem;
              onChange(nextExperience);
            }}
            onRemove={() => {
              onChange(experience.filter((_, itemIndex) => itemIndex !== index));
            }}
            compact={
              item.compact ?? (index > 0 ? compactOlderExperience : false)
            }
          />
        ))}
      </div>
      <AddItemButton
        label="Add experience"
        onClick={() => onChange([...experience, createEmptyExperience()])}
      />
    </ResumeSection>
  );
}
