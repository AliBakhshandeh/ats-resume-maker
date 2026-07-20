"use client";

import {
  AddItemButton,
  CompactToggleButton,
  RemoveItemButton,
} from "@/components/resume/EditActions";
import { EditableLink } from "@/components/resume/EditableLink";
import { EditableText } from "@/components/resume/EditableText";
import { useEditableMode } from "@/components/resume/EditableModeContext";
import type { Experience, ResumeLanguage } from "@/types/resume";
import { renderEmphasizedText } from "@/utils/renderEmphasizedText";

interface ExperienceItemProps {
  experience: Experience;
  language: ResumeLanguage;
  onChange: (experience: Experience) => void;
  onRemove?: () => void;
}

export function ExperienceItem({
  experience,
  language,
  onChange,
  onRemove,
}: ExperienceItemProps) {
  const editable = useEditableMode();
  const compact = experience.compact === true;
  const presentLabel = language === "fa" ? "اکنون" : "Present";
  const enabledHighlights = experience.highlights.filter(
    (highlight) => highlight.enabled !== false,
  );
  const updateExperience = (patch: Partial<Experience>) => {
    onChange({ ...experience, ...patch });
  };
  const updateHighlight = (index: number, text: string) => {
    onChange({
      ...experience,
      highlights: experience.highlights.map((highlight, highlightIndex) =>
        highlightIndex === index ? { ...highlight, text } : highlight,
      ),
    });
  };
  const removeHighlight = (index: number) => {
    onChange({
      ...experience,
      highlights: experience.highlights.filter(
        (_, highlightIndex) => highlightIndex !== index,
      ),
    });
  };
  const addHighlight = () => {
    onChange({
      ...experience,
      highlights: [
        ...experience.highlights,
        { text: "Describe a key achievement or responsibility" },
      ],
    });
  };
  const setCompact = (nextCompact: boolean) => {
    updateExperience({
      compact: nextCompact,
      shortDescription:
        nextCompact && experience.shortDescription === undefined
          ? enabledHighlights[0]?.text ?? "Short description"
          : experience.shortDescription,
    });
  };

  const itemActions = (
    <div className="absolute -right-1 -top-1 z-10 flex items-center gap-1">
      <CompactToggleButton compact={compact} onChange={setCompact} />
      {onRemove ? (
        <RemoveItemButton label="Remove experience" onClick={onRemove} />
      ) : null}
    </div>
  );

  const companyName = (
    <EditableLink
      label={experience.company}
      href={experience.companyUrl ?? ""}
      editorTitle="Edit company link"
      labelFieldName="Company"
      hrefFieldName="Company URL"
      onChange={({ label, href }) =>
        updateExperience({
          company: label,
          companyUrl: href || undefined,
        })
      }
    />
  );

  const endDateValue = experience.current
    ? presentLabel
    : (experience.endDate ?? "");

  const dateRange = (
    <span className="inline-flex flex-wrap items-center gap-1">
      <EditableText
        value={experience.startDate}
        ariaLabel={`${experience.company} start date`}
        onChange={(startDate) => updateExperience({ startDate })}
      />
      <span aria-hidden="true">-</span>
      <EditableText
        value={endDateValue}
        ariaLabel={`${experience.company} end date`}
        onChange={(endDate) => {
          const normalized = endDate.trim();
          const isCurrent =
            normalized.toLowerCase() === "present" || normalized === "اکنون";

          updateExperience({
            endDate: isCurrent ? "" : normalized,
            current: isCurrent,
          });
        }}
      />
    </span>
  );

  if (compact) {
    return (
      <article className="relative break-inside-avoid page-break-inside-avoid">
        {itemActions}
        <div className="flex flex-wrap justify-between gap-x-3 gap-y-0.5 leading-tight">
          <div>
            <h3 className="font-semibold text-slate-950">{companyName}</h3>
            <p className="text-slate-800">
              <EditableText
                value={experience.title}
                ariaLabel={`${experience.company} title`}
                onChange={(title) => updateExperience({ title })}
              />
            </p>
          </div>
          <p className="text-slate-700">{dateRange}</p>
        </div>
        {experience.shortDescription !== undefined ? (
          <p className="mt-0.5 leading-snug text-slate-700">
            <EditableText
              value={experience.shortDescription}
              ariaLabel={`${experience.company} description`}
              onChange={(shortDescription) =>
                updateExperience({ shortDescription })
              }
              renderValue={renderEmphasizedText}
            />
          </p>
        ) : (
          <AddItemButton
            label="Add description"
            onClick={() =>
              updateExperience({
                shortDescription: "Short description",
              })
            }
          />
        )}
      </article>
    );
  }

  return (
    <article className="relative break-inside-avoid page-break-inside-avoid">
      {itemActions}
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
        <div>
          <h3 className="text-[9.7pt] font-bold leading-tight text-slate-950">
            {companyName}
          </h3>
          <p className="font-semibold leading-snug text-slate-800">
            <EditableText
              value={experience.title}
              ariaLabel={`${experience.company} title`}
              onChange={(title) => updateExperience({ title })}
            />
            {experience.employmentType || editable ? (
              <>
                <span aria-hidden="true"> | </span>
                <EditableText
                  value={experience.employmentType || "Full-time"}
                  ariaLabel={`${experience.company} employment type`}
                  onChange={(employmentType) =>
                    updateExperience({ employmentType })
                  }
                />
              </>
            ) : null}
          </p>
        </div>
        <div className="text-right text-[8.4pt] leading-snug text-slate-700">
          <p>{dateRange}</p>
          {experience.location || editable ? (
            <p>
              <EditableText
                value={experience.location || "City, Country"}
                ariaLabel={`${experience.company} location`}
                onChange={(location) => updateExperience({ location })}
              />
            </p>
          ) : null}
        </div>
      </div>
      <ul className="mt-1.5 list-disc space-y-0.5 pl-4 leading-snug">
        {enabledHighlights.map((highlight, index) => {
          const highlightIndex = experience.highlights.indexOf(highlight);

          return (
            <li key={`${highlight.text}-${index}`} className="relative pr-4">
              <EditableText
                value={highlight.text}
                ariaLabel={`${experience.company} bullet`}
                onChange={(text) => updateHighlight(highlightIndex, text)}
                renderValue={renderEmphasizedText}
              />
              <span className="absolute -right-1 top-0.5">
                <RemoveItemButton
                  label="Remove bullet"
                  onClick={() => removeHighlight(highlightIndex)}
                />
              </span>
            </li>
          );
        })}
      </ul>
      <AddItemButton label="Add bullet" onClick={addHighlight} />
    </article>
  );
}
