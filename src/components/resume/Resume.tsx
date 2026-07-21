import { EducationSection } from "@/components/resume/EducationSection";
import { ExperienceSection } from "@/components/resume/ExperienceSection";
import { LanguagesSection } from "@/components/resume/LanguagesSection";
import { ProjectsSection } from "@/components/resume/ProjectsSection";
import { ResumeHeader } from "@/components/resume/ResumeHeader";
import { SkillsSection } from "@/components/resume/SkillsSection";
import { SummarySection } from "@/components/resume/SummarySection";
import type { CSSProperties, Dispatch, SetStateAction } from "react";
import type {
  PrintSettings,
  ResumeData,
  ResumeLanguage,
  ResumeSettings,
} from "@/types/resume";

interface ResumeProps {
  data: ResumeData;
  fontFamily: string;
  fontSize: number;
  language: ResumeLanguage;
  onDataChange: Dispatch<SetStateAction<ResumeData>>;
  sectionGap: number;
  settings: ResumeSettings;
  printSettings: PrintSettings;
}

export function Resume({
  data,
  fontFamily,
  fontSize,
  language,
  onDataChange,
  sectionGap,
  settings,
  printSettings,
}: ResumeProps) {
  const labels =
    language === "fa"
      ? {
          summary: "Professional Summary / خلاصه حرفه‌ای",
          skills: "Technical Skills / مهارت‌های فنی",
          experience: "Work Experience / سوابق کاری",
          projects: "Projects / پروژه‌ها",
          education: "Education / تحصیلات",
          languages: "Languages / زبان‌ها",
        }
      : {
          summary: "Professional Summary",
          skills: "Technical Skills",
          experience: "Work Experience",
          projects: "Projects",
          education: "Education",
          languages: "Languages",
        };
  const updatePersonal = (personal: ResumeData["personal"]) => {
    onDataChange((current) => ({ ...current, personal }));
  };
  const updateSummary = (summary: string) => {
    onDataChange((current) => ({ ...current, summary }));
  };
  const updateSkills = (skills: ResumeData["skills"]) => {
    onDataChange((current) => ({ ...current, skills }));
  };
  const updateExperience = (experience: ResumeData["experience"]) => {
    onDataChange((current) => ({ ...current, experience }));
  };
  const updateProjects = (projects: NonNullable<ResumeData["projects"]>) => {
    onDataChange((current) => ({ ...current, projects }));
  };
  const updateEducation = (education: NonNullable<ResumeData["education"]>) => {
    onDataChange((current) => ({ ...current, education }));
  };
  const updateLanguages = (languages: NonNullable<ResumeData["languages"]>) => {
    onDataChange((current) => ({ ...current, languages }));
  };

  return (
    <main
      className="resume-paper"
      dir={language === "fa" ? "rtl" : "ltr"}
      lang={language === "fa" ? "fa" : "en"}
      style={
        {
          "--resume-body-font-size": `${fontSize}pt`,
          "--resume-content-padding": `${printSettings.contentPaddingMm}mm`,
          "--resume-section-gap": `${sectionGap}px`,
          fontFamily,
        } as CSSProperties
      }
      aria-label="Resume"
    >
      <ResumeHeader personal={data.personal} onChange={updatePersonal} />
      {settings.showSummary ? (
        <SummarySection
          title={labels.summary}
          summary={data.summary}
          onChange={updateSummary}
        />
      ) : null}
      {settings.showSkills ? (
        <SkillsSection
          title={labels.skills}
          skills={data.skills}
          onChange={updateSkills}
        />
      ) : null}
      <ExperienceSection
        title={labels.experience}
        language={language}
        experience={data.experience}
        onChange={updateExperience}
      />
      {settings.showProjects ? (
        <ProjectsSection
          title={labels.projects}
          projects={data.projects ?? []}
          onChange={updateProjects}
        />
      ) : null}
      {settings.showEducation || settings.showLanguages ? (
        <div className="resume-footer-grid">
          {settings.showEducation ? (
            <EducationSection
              title={labels.education}
              education={data.education ?? []}
              onChange={updateEducation}
            />
          ) : null}
          {settings.showLanguages ? (
            <LanguagesSection
              title={labels.languages}
              languages={data.languages ?? []}
              onChange={updateLanguages}
            />
          ) : null}
        </div>
      ) : null}
    </main>
  );
}
