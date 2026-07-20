"use client";

import { useState } from "react";
import { EditableModeContext } from "@/components/resume/EditableModeContext";
import {
  LinkEditorProvider,
  useLinkEditor,
} from "@/components/resume/LinkEditorContext";
import { LinkEditorSidebar } from "@/components/resume/LinkEditorSidebar";
import { PrintToolbar } from "@/components/resume/PrintToolbar";
import { Resume } from "@/components/resume/Resume";
import {
  printSettings,
  resumeData,
  resumeDataFa,
  resumeSettings as defaultResumeSettings,
} from "@/data/resume";
import { englishFontOptions, persianFontOptions } from "@/data/fontOptions";
import type {
  ResumeData,
  ResumeLanguage,
  ResumeSettings,
} from "@/types/resume";
import {
  createEmptyEducation,
  createEmptyLanguage,
  createEmptyProject,
} from "@/utils/createEmptyResumeItems";
import {
  createResumeExportPayload,
  downloadResumeExport,
  parseResumeExportPayload,
} from "@/utils/resumeExport";

function ensureSectionData(
  data: ResumeData,
  settings: ResumeSettings,
): ResumeData {
  let next = data;

  if (settings.showProjects && (!next.projects || next.projects.length === 0)) {
    next = { ...next, projects: [createEmptyProject()] };
  }

  if (
    settings.showEducation &&
    (!next.education || next.education.length === 0)
  ) {
    next = { ...next, education: [createEmptyEducation()] };
  }

  if (
    settings.showLanguages &&
    (!next.languages || next.languages.length === 0)
  ) {
    next = { ...next, languages: [createEmptyLanguage()] };
  }

  return next;
}

function ResumeBuilderContent() {
  const [language, setLanguage] = useState<ResumeLanguage>("en");
  const [editable, setEditable] = useState(false);
  const [settings, setSettings] = useState<ResumeSettings>(
    defaultResumeSettings,
  );
  const [englishData, setEnglishData] = useState<ResumeData>(resumeData);
  const [persianData, setPersianData] = useState<ResumeData>(resumeDataFa);
  const [englishFont, setEnglishFont] = useState(englishFontOptions[0].value);
  const [persianFont, setPersianFont] = useState(persianFontOptions[0].value);
  const [englishFontSize, setEnglishFontSize] = useState(
    printSettings.bodyFontSize,
  );
  const [persianFontSize, setPersianFontSize] = useState(9.6);
  const [sectionGap, setSectionGap] = useState(8);
  const { closeLinkEditor } = useLinkEditor();
  const data = language === "fa" ? persianData : englishData;
  const activeFont = language === "fa" ? persianFont : englishFont;
  const activeFontSize =
    language === "fa" ? persianFontSize : englishFontSize;
  const updateData =
    language === "fa" ? setPersianData : setEnglishData;

  const handleEditableChange = (nextEditable: boolean) => {
    setEditable(nextEditable);
    if (!nextEditable) {
      closeLinkEditor();
    }
  };

  const handleSettingsChange = (nextSettings: ResumeSettings) => {
    setSettings(nextSettings);
    setEnglishData((current) => ensureSectionData(current, nextSettings));
    setPersianData((current) => ensureSectionData(current, nextSettings));
  };

  const handleExportData = () => {
    downloadResumeExport(
      createResumeExportPayload({
        language,
        settings,
        englishData,
        persianData,
        englishFont,
        persianFont,
        englishFontSize,
        persianFontSize,
        sectionGap,
      }),
    );
  };

  const handleImportData = (raw: string) => {
    const parsed = parseResumeExportPayload(raw);

    if (!parsed.ok) {
      return parsed;
    }

    const payload = parsed.data;

    setLanguage(payload.language);
    setSettings(payload.settings);
    setEnglishData(payload.englishData);
    setPersianData(payload.persianData);
    setEnglishFont(payload.englishFont);
    setPersianFont(payload.persianFont);
    setEnglishFontSize(payload.englishFontSize);
    setPersianFontSize(payload.persianFontSize);
    setSectionGap(payload.sectionGap);
    closeLinkEditor();

    return { ok: true as const };
  };

  return (
    <EditableModeContext.Provider value={editable}>
      <PrintToolbar
        language={language}
        editable={editable}
        settings={settings}
        englishFont={englishFont}
        englishFontSize={englishFontSize}
        persianFont={persianFont}
        persianFontSize={persianFontSize}
        sectionGap={sectionGap}
        onEditableChange={handleEditableChange}
        onSettingsChange={handleSettingsChange}
        onEnglishFontChange={setEnglishFont}
        onEnglishFontSizeChange={setEnglishFontSize}
        onPersianFontChange={setPersianFont}
        onPersianFontSizeChange={setPersianFontSize}
        onSectionGapChange={setSectionGap}
        onLanguageChange={setLanguage}
        onExportData={handleExportData}
        onImportData={handleImportData}
      />
      <LinkEditorSidebar />
      <div className="min-h-screen bg-slate-100 px-4 py-20 print:min-h-0 print:bg-white print:p-0">
        <Resume
          data={data}
          fontFamily={activeFont}
          fontSize={activeFontSize}
          language={language}
          onDataChange={updateData}
          sectionGap={sectionGap}
          settings={settings}
          printSettings={printSettings}
        />
      </div>
    </EditableModeContext.Provider>
  );
}

export function ResumeBuilder() {
  return (
    <LinkEditorProvider>
      <ResumeBuilderContent />
    </LinkEditorProvider>
  );
}
