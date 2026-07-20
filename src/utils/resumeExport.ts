import type {
  ResumeData,
  ResumeLanguage,
  ResumeSettings,
} from "@/types/resume";

export const RESUME_EXPORT_VERSION = 1 as const;

export interface ResumeExportPayload {
  version: typeof RESUME_EXPORT_VERSION;
  exportedAt: string;
  language: ResumeLanguage;
  settings: ResumeSettings;
  englishData: ResumeData;
  persianData: ResumeData;
  englishFont: string;
  persianFont: string;
  englishFontSize: number;
  persianFontSize: number;
  sectionGap: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isResumeLanguage(value: unknown): value is ResumeLanguage {
  return value === "en" || value === "fa";
}

function isResumeData(value: unknown): value is ResumeData {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isRecord(value.personal) &&
    typeof value.personal.fullName === "string" &&
    typeof value.personal.headline === "string" &&
    typeof value.personal.email === "string" &&
    Array.isArray(value.personal.links) &&
    typeof value.summary === "string" &&
    Array.isArray(value.skills) &&
    Array.isArray(value.experience)
  );
}

function isResumeSettings(value: unknown): value is ResumeSettings {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.showSummary === "boolean" &&
    typeof value.showSkills === "boolean" &&
    typeof value.showProjects === "boolean" &&
    typeof value.showEducation === "boolean" &&
    typeof value.showLanguages === "boolean"
  );
}

export function createResumeExportPayload(input: {
  language: ResumeLanguage;
  settings: ResumeSettings;
  englishData: ResumeData;
  persianData: ResumeData;
  englishFont: string;
  persianFont: string;
  englishFontSize: number;
  persianFontSize: number;
  sectionGap: number;
}): ResumeExportPayload {
  return {
    version: RESUME_EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    ...input,
  };
}

export function parseResumeExportPayload(
  raw: string,
): { ok: true; data: ResumeExportPayload } | { ok: false; error: string } {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: "Invalid JSON. Paste a valid export file." };
  }

  if (!isRecord(parsed)) {
    return { ok: false, error: "Export data must be a JSON object." };
  }

  if (
    parsed.version !== RESUME_EXPORT_VERSION &&
    typeof parsed.version !== "number"
  ) {
    return { ok: false, error: "Missing or unsupported export version." };
  }

  if (!isResumeLanguage(parsed.language)) {
    return { ok: false, error: "Invalid language in export data." };
  }

  if (!isResumeSettings(parsed.settings)) {
    return { ok: false, error: "Invalid settings in export data." };
  }

  if (!isResumeData(parsed.englishData)) {
    return { ok: false, error: "Invalid englishData in export data." };
  }

  if (!isResumeData(parsed.persianData)) {
    return { ok: false, error: "Invalid persianData in export data." };
  }

  if (
    typeof parsed.englishFont !== "string" ||
    typeof parsed.persianFont !== "string" ||
    typeof parsed.englishFontSize !== "number" ||
    typeof parsed.persianFontSize !== "number" ||
    typeof parsed.sectionGap !== "number"
  ) {
    return { ok: false, error: "Invalid typography settings in export data." };
  }

  return {
    ok: true,
    data: {
      version: RESUME_EXPORT_VERSION,
      exportedAt:
        typeof parsed.exportedAt === "string"
          ? parsed.exportedAt
          : new Date().toISOString(),
      language: parsed.language,
      settings: parsed.settings,
      englishData: parsed.englishData,
      persianData: parsed.persianData,
      englishFont: parsed.englishFont,
      persianFont: parsed.persianFont,
      englishFontSize: parsed.englishFontSize,
      persianFontSize: parsed.persianFontSize,
      sectionGap: parsed.sectionGap,
    },
  };
}

export function downloadResumeExport(payload: ResumeExportPayload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const stamp = payload.exportedAt.slice(0, 10);
  const name = payload.englishData.personal.fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  anchor.href = url;
  anchor.download = `${name || "resume"}-data-${stamp}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
