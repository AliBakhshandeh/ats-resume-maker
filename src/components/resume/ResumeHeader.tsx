"use client";

import {
  AddItemButton,
  RemoveItemButton,
} from "@/components/resume/EditActions";
import { EditableLink } from "@/components/resume/EditableLink";
import { EditableText } from "@/components/resume/EditableText";
import type { ResumeData } from "@/types/resume";
import { createEmptyLink } from "@/utils/createEmptyResumeItems";

interface ResumeHeaderProps {
  personal: ResumeData["personal"];
  onChange: (personal: ResumeData["personal"]) => void;
}

function isPlaceholder(value: string): boolean {
  return value.startsWith("[ADD ");
}

function LtrText({ value }: { value: string }) {
  return (
    <bdi dir="ltr" className="inline-block">
      {value}
    </bdi>
  );
}

function normalizeDisplayText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function getReadableLinkValue(
  link: ResumeData["personal"]["links"][number],
): string {
  if (link.displayValue?.trim()) {
    return normalizeDisplayText(link.displayValue);
  }

  if (link.href?.trim() && !link.href.startsWith("[ADD ")) {
    return normalizeDisplayText(
      link.href
        .replace(/^https?:\/\//i, "")
        .replace(/^www\./i, "")
        .replace(/\/$/, ""),
    );
  }

  return normalizeDisplayText(link.label);
}

export function ResumeHeader({ personal, onChange }: ResumeHeaderProps) {
  const updatePersonal = (patch: Partial<ResumeData["personal"]>) => {
    onChange({ ...personal, ...patch });
  };

  return (
    <header className="pb-1">
      <h1 className="text-[20pt] font-bold leading-tight tracking-normal text-slate-950">
        <EditableText
          value={personal.fullName}
          ariaLabel="Full name"
          onChange={(fullName) => updatePersonal({ fullName })}
        />
      </h1>
      <p className="mt-1 text-[9.8pt] font-semibold text-slate-700">
        <EditableText
          value={normalizeDisplayText(personal.headline)}
          ariaLabel="Headline"
          onChange={(headline) => updatePersonal({ headline })}
        />
      </p>
      <address className="resume-header-contact mt-2 text-[8.2pt] not-italic leading-snug text-slate-700">
        {personal.location ? (
          <p className="resume-contact-row">
            <span className="resume-contact-label">Location:</span>{" "}
            <EditableText
              value={normalizeDisplayText(personal.location)}
              ariaLabel="Location"
              onChange={(location) => updatePersonal({ location })}
            />
          </p>
        ) : null}
        {personal.email ? (
          <p className="resume-contact-row">
            <span className="resume-contact-label">Email:</span>{" "}
            <a href={`mailto:${personal.email}`}>
              <EditableText
                value={normalizeDisplayText(personal.email)}
                ariaLabel="Email"
                onChange={(email) => updatePersonal({ email })}
                renderValue={(value) => <LtrText value={value} />}
              />
            </a>
          </p>
        ) : null}
        {personal.phone ? (
          <p className="resume-contact-row">
            <span className="resume-contact-label">Phone:</span>{" "}
            <a href={`tel:${personal.phone}`}>
              <EditableText
                value={normalizeDisplayText(personal.phone)}
                ariaLabel="Phone"
                onChange={(phone) => updatePersonal({ phone })}
                renderValue={(value) => <LtrText value={value} />}
              />
            </a>
          </p>
        ) : null}
        {personal.links.map((link, index) => (
          <p
            key={`${link.label}-${link.href}-${index}`}
            className="resume-contact-row inline-flex items-center gap-1"
          >
            <span className="resume-contact-label">
              {normalizeDisplayText(link.label || "Link")}:
            </span>{" "}
            <EditableLink
              label={normalizeDisplayText(link.label)}
              href={link.href}
              editorTitle="Edit profile link"
              labelFieldName="Label"
              hrefFieldName="URL"
              openInNewTab={!isPlaceholder(link.href)}
              renderLabel={() => <LtrText value={getReadableLinkValue(link)} />}
              onChange={({ label, href }) => {
                const links = personal.links.map((item, itemIndex) =>
                  itemIndex === index
                    ? {
                        ...item,
                        label: normalizeDisplayText(label),
                        href,
                        displayValue:
                          href && !href.startsWith("[ADD ")
                            ? normalizeDisplayText(
                                href
                                  .replace(/^https?:\/\//i, "")
                                  .replace(/^www\./i, "")
                                  .replace(/\/$/, ""),
                              )
                            : undefined,
                      }
                    : item,
                );
                updatePersonal({ links });
              }}
            />
            <RemoveItemButton
              label="Remove link"
              onClick={() =>
                updatePersonal({
                  links: personal.links.filter(
                    (_, itemIndex) => itemIndex !== index,
                  ),
                })
              }
            />
          </p>
        ))}
        <AddItemButton
          label="Add link"
          className="mt-0"
          onClick={() =>
            updatePersonal({
              links: [...personal.links, createEmptyLink()],
            })
          }
        />
      </address>
    </header>
  );
}
