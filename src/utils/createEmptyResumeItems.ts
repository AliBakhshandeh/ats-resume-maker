import type {
  Education,
  Experience,
  Language,
  Project,
  ResumeLink,
  SkillGroup,
} from "@/types/resume";

export function createEmptyExperience(): Experience {
  return {
    company: "Company name",
    title: "Job title",
    employmentType: "Full-time",
    location: "City, Country",
    startDate: "2024",
    endDate: "Present",
    current: true,
    highlights: [{ text: "Describe a key achievement or responsibility" }],
  };
}

export function createEmptyProject(): Project {
  return {
    name: "Project name",
    description: "Short project description",
    highlights: [{ text: "Highlight what you built or shipped" }],
  };
}

export function createEmptyEducation(): Education {
  return {
    institution: "University or school",
    degree: "Degree",
    field: "Field of study",
    location: "City, Country",
    startDate: "2018",
    endDate: "2022",
  };
}

export function createEmptyLanguage(): Language {
  return {
    name: "Language",
    proficiency: "Proficiency",
  };
}

export function createEmptySkillGroup(): SkillGroup {
  return {
    title: "Skill group",
    items: ["Skill 1", "Skill 2"],
  };
}

export function createEmptyLink(): ResumeLink {
  return {
    label: "Website",
    href: "https://",
    displayValue: "Website",
  };
}
