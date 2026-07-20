"use client";

import {
  Download,
  FileDown,
  FileUp,
  Languages,
  LayoutList,
  LayoutPanelTop,
  PanelRight,
  PencilLine,
  Printer,
  Settings2,
  SlidersHorizontal,
  Type,
} from "lucide-react";
import { useRef, useState } from "react";
import { englishFontOptions, persianFontOptions } from "@/data/fontOptions";
import type { ResumeLanguage, ResumeSettings } from "@/types/resume";

type SettingsPosition = "topbar" | "sidebar";

interface PrintToolbarProps {
  language: ResumeLanguage;
  editable: boolean;
  settings: ResumeSettings;
  englishFont: string;
  englishFontSize: number;
  persianFont: string;
  persianFontSize: number;
  sectionGap: number;
  onEditableChange: (editable: boolean) => void;
  onSettingsChange: (settings: ResumeSettings) => void;
  onEnglishFontChange: (fontFamily: string) => void;
  onEnglishFontSizeChange: (fontSize: number) => void;
  onLanguageChange: (language: ResumeLanguage) => void;
  onPersianFontChange: (fontFamily: string) => void;
  onPersianFontSizeChange: (fontSize: number) => void;
  onSectionGapChange: (sectionGap: number) => void;
  onExportData: () => void;
  onImportData: (
    raw: string,
  ) => { ok: true } | { ok: false; error: string };
}

export function PrintToolbar({
  language,
  editable,
  settings,
  englishFont,
  englishFontSize,
  persianFont,
  persianFontSize,
  sectionGap,
  onEditableChange,
  onSettingsChange,
  onEnglishFontChange,
  onEnglishFontSizeChange,
  onLanguageChange,
  onPersianFontChange,
  onPersianFontSizeChange,
  onSectionGapChange,
  onExportData,
  onImportData,
}: PrintToolbarProps) {
  const [settingsPosition, setSettingsPosition] =
    useState<SettingsPosition>("sidebar");
  const [importText, setImportText] = useState("");
  const [importMessage, setImportMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isSidebar = settingsPosition === "sidebar";
  const nextLanguage = language === "fa" ? "en" : "fa";

  const panelClassName = isSidebar
    ? "fixed bottom-4 right-4 top-4 z-20 flex w-[min(21rem,calc(100vw-2rem))] flex-col gap-4 overflow-y-auto rounded-md border border-slate-200 bg-white/95 p-4 text-sm shadow-xl shadow-slate-900/10 backdrop-blur print:hidden"
    : "fixed left-1/2 top-4 z-20 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-md border border-slate-200 bg-white/95 px-3 py-2 text-sm shadow-lg shadow-slate-900/10 backdrop-blur print:hidden";
  const fieldsetClassName = isSidebar
    ? "grid gap-3 rounded-md border border-slate-200 bg-slate-50/70 p-3"
    : "contents";
  const legendClassName = isSidebar
    ? "mb-2 flex items-center gap-1.5 px-0 text-[11px] font-semibold uppercase tracking-normal text-slate-500"
    : "sr-only";
  const labelClassName = isSidebar
    ? "grid gap-1 text-xs font-medium text-slate-600"
    : "flex items-center gap-1 text-xs font-medium text-slate-600";
  const selectClassName =
    "rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800 outline-none transition hover:border-slate-400 focus-visible:ring-2 focus-visible:ring-sky-600";
  const numberInputClassName =
    "w-16 rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800 outline-none transition hover:border-slate-400 focus-visible:ring-2 focus-visible:ring-sky-600";
  const buttonClassName =
    "inline-flex items-center justify-center gap-1.5 rounded-sm px-3 py-1.5 font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2";
  const positionButtonClassName =
    "inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm border px-2 py-1.5 text-xs font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-sky-600";

  const getNumberValue = (value: string, fallback: number) => {
    const nextValue = Number(value);

    return Number.isFinite(nextValue) ? nextValue : fallback;
  };

  const printFullResume = () => {
    const resumePaper = document.querySelector<HTMLElement>(".resume-paper");

    if (!resumePaper) {
      window.print();
      return;
    }

    const pxToMm = 25.4 / 96;
    const pageWidthMm = 210;
    const pageHeightMm = Math.ceil(resumePaper.scrollHeight * pxToMm) + 2;
    const printStyle = document.createElement("style");
    printStyle.dataset.fullResumePrint = "true";
    printStyle.textContent = `
      @page {
        size: ${pageWidthMm}mm ${pageHeightMm}mm;
        margin: 0;
      }

      @media print {
        html,
        body {
          width: ${pageWidthMm}mm;
          min-height: ${pageHeightMm}mm;
        }

        .resume-paper {
          width: ${pageWidthMm}mm;
          min-height: ${pageHeightMm}mm;
          padding: var(--resume-content-padding);
        }
      }
    `;

    const cleanup = () => {
      printStyle.remove();
      window.removeEventListener("afterprint", cleanup);
    };

    document.head.append(printStyle);
    window.addEventListener("afterprint", cleanup);
    window.print();
    window.setTimeout(cleanup, 120000);
  };

  const applyImport = (raw: string) => {
    const result = onImportData(raw);

    if (result.ok) {
      setImportText("");
      setImportMessage({
        type: "success",
        text: "Resume data imported successfully.",
      });
      return;
    }

    setImportMessage({ type: "error", text: result.error });
  };

  return (
    <aside className={panelClassName} aria-label="Resume settings">
      {isSidebar ? (
        <header className="flex items-start gap-2 border-b border-slate-200 pb-3">
          <div className="flex size-9 items-center justify-center rounded-sm bg-slate-950 text-white">
            <Settings2 aria-hidden="true" size={18} strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="text-sm font-semibold leading-tight text-slate-950">
              Resume settings
            </h2>
            <p className="mt-0.5 text-xs leading-snug text-slate-500">
              Export, typography, and layout controls
            </p>
          </div>
        </header>
      ) : null}

      <section className={isSidebar ? "grid gap-2" : "contents"}>
        <button
          type="button"
          aria-label="Print or export resume as PDF"
          onClick={() => window.print()}
          className={`${buttonClassName} bg-slate-950 text-white hover:bg-slate-700`}
        >
          <Printer aria-hidden="true" size={16} />
          Print / Export PDF
        </button>
        <button
          type="button"
          aria-label="Export full resume as one long PDF page"
          onClick={printFullResume}
          className={`${buttonClassName} bg-sky-700 text-white hover:bg-sky-600`}
        >
          <Download aria-hidden="true" size={16} />
          Export Full PDF
        </button>
        <button
          type="button"
          aria-label="Toggle resume language"
          onClick={() => onLanguageChange(nextLanguage)}
          className={`${buttonClassName} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
        >
          <Languages aria-hidden="true" size={16} />
          {language === "fa" ? "English Version" : "Persian Version"}
        </button>
      </section>

      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>
          <FileDown aria-hidden="true" size={14} />
          Resume data
        </legend>
        <div className={isSidebar ? "grid gap-2" : "flex flex-wrap gap-2"}>
          <button
            type="button"
            aria-label="Export resume data as JSON"
            onClick={onExportData}
            className={`${buttonClassName} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 ${isSidebar ? "w-full" : ""}`}
          >
            <FileDown aria-hidden="true" size={16} />
            Export JSON
          </button>
          <button
            type="button"
            aria-label="Import resume data from JSON file"
            onClick={() => fileInputRef.current?.click()}
            className={`${buttonClassName} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 ${isSidebar ? "w-full" : ""}`}
          >
            <FileUp aria-hidden="true" size={16} />
            Import JSON file
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              event.target.value = "";

              if (!file) {
                return;
              }

              const text = await file.text();
              applyImport(text);
            }}
          />
        </div>
        {isSidebar ? (
          <div className="grid gap-2">
            <label className="grid gap-1 text-xs font-medium text-slate-600">
              Or paste JSON
              <textarea
                value={importText}
                rows={5}
                placeholder='{"version":1,"englishData":...}'
                onChange={(event) => {
                  setImportText(event.target.value);
                  setImportMessage(null);
                }}
                className="resize-y rounded-sm border border-slate-300 bg-white px-2 py-1.5 font-mono text-[11px] leading-snug text-slate-800 outline-none transition hover:border-slate-400 focus-visible:ring-2 focus-visible:ring-sky-600"
              />
            </label>
            <button
              type="button"
              disabled={!importText.trim()}
              onClick={() => applyImport(importText)}
              className={`${buttonClassName} bg-slate-950 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300`}
            >
              Apply pasted data
            </button>
            {importMessage ? (
              <p
                className={`text-[11px] leading-snug ${
                  importMessage.type === "success"
                    ? "text-emerald-700"
                    : "text-rose-700"
                }`}
              >
                {importMessage.text}
              </p>
            ) : (
              <p className="text-[11px] leading-snug text-slate-500">
                Export saves EN + FA content, sections, and typography. Import
                restores the resume from that file.
              </p>
            )}
          </div>
        ) : null}
      </fieldset>

      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>
          <PencilLine aria-hidden="true" size={14} />
          Editing
        </legend>
        <div
          className={
            isSidebar
              ? "flex items-center justify-between gap-3 rounded-sm border border-slate-200 bg-white px-3 py-2"
              : "flex items-center gap-2"
          }
        >
          <div className={isSidebar ? "min-w-0" : "contents"}>
            <p className="text-xs font-medium text-slate-700">Editable</p>
            {isSidebar ? (
              <p className="mt-0.5 text-[11px] leading-snug text-slate-500">
                Double-click text to edit
              </p>
            ) : null}
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={editable}
            aria-label="Toggle editable mode"
            onClick={() => onEditableChange(!editable)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
              editable
                ? "border-sky-700 bg-sky-700"
                : "border-slate-300 bg-slate-200"
            }`}
          >
            <span
              aria-hidden="true"
              className={`inline-block size-4 rounded-full bg-white shadow transition ${
                editable ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </fieldset>

      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>
          <LayoutList aria-hidden="true" size={14} />
          Sections
        </legend>
        <div className={isSidebar ? "grid gap-2" : "flex flex-wrap gap-2"}>
          {(
            [
              ["showSummary", "Summary"],
              ["showSkills", "Skills"],
              ["showProjects", "Projects"],
              ["showEducation", "Education"],
              ["showLanguages", "Languages"],
              ["compactOlderExperience", "Compact older jobs"],
            ] as const
          ).map(([key, label]) => (
            <label
              key={key}
              className={
                isSidebar
                  ? "flex items-center justify-between gap-3 rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700"
                  : "inline-flex items-center gap-1.5 text-xs font-medium text-slate-700"
              }
            >
              <span>{label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={settings[key]}
                aria-label={`Toggle ${label}`}
                onClick={() =>
                  onSettingsChange({
                    ...settings,
                    [key]: !settings[key],
                  })
                }
                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
                  settings[key]
                    ? "border-sky-700 bg-sky-700"
                    : "border-slate-300 bg-slate-200"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`inline-block size-3.5 rounded-full bg-white shadow transition ${
                    settings[key] ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>
          <LayoutPanelTop aria-hidden="true" size={14} />
          Panel
        </legend>
        <div className={isSidebar ? "flex rounded-sm bg-white p-1" : "flex"}>
          {(["sidebar", "topbar"] as const).map((position) => (
            <button
              key={position}
              type="button"
              aria-pressed={settingsPosition === position}
              onClick={() => setSettingsPosition(position)}
              className={
                settingsPosition === position
                  ? `${positionButtonClassName} border-slate-900 bg-slate-900 text-white`
                  : `${positionButtonClassName} border-transparent text-slate-600 hover:bg-slate-100`
              }
            >
              {position === "sidebar" ? (
                <PanelRight aria-hidden="true" size={14} />
              ) : (
                <LayoutPanelTop aria-hidden="true" size={14} />
              )}
              {position === "sidebar" ? "Sidebar" : "Topbar"}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>
          <Type aria-hidden="true" size={14} />
          Typography
        </legend>
        <label className={labelClassName}>
          English font
          <select
            aria-label="English font"
            value={englishFont}
            onChange={(event) => onEnglishFontChange(event.target.value)}
            className={selectClassName}
          >
            {englishFontOptions.map((font) => (
              <option key={font.label} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClassName}>
          Persian font
          <select
            aria-label="Persian font"
            value={persianFont}
            onChange={(event) => onPersianFontChange(event.target.value)}
            className={selectClassName}
          >
            {persianFontOptions.map((font) => (
              <option key={font.label} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>
          <SlidersHorizontal aria-hidden="true" size={14} />
          Scale
        </legend>
        <div className={isSidebar ? "grid grid-cols-3 gap-2" : "contents"}>
          <label className={labelClassName}>
            EN size
            <input
              aria-label="English font size"
              type="number"
              min="7"
              max="13"
              step="0.1"
              value={englishFontSize}
              onChange={(event) =>
                onEnglishFontSizeChange(
                  getNumberValue(event.target.value, englishFontSize),
                )
              }
              className={numberInputClassName}
            />
          </label>
          <label className={labelClassName}>
            FA size
            <input
              aria-label="Persian font size"
              type="number"
              min="7"
              max="14"
              step="0.1"
              value={persianFontSize}
              onChange={(event) =>
                onPersianFontSizeChange(
                  getNumberValue(event.target.value, persianFontSize),
                )
              }
              className={numberInputClassName}
            />
          </label>
          <label className={labelClassName}>
            Gap
            <input
              aria-label="Section spacing"
              type="number"
              min="0"
              max="24"
              step="1"
              value={sectionGap}
              onChange={(event) =>
                onSectionGapChange(
                  getNumberValue(event.target.value, sectionGap),
                )
              }
              className={numberInputClassName}
            />
          </label>
        </div>
      </fieldset>
    </aside>
  );
}
