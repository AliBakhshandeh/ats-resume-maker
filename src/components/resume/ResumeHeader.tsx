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
          value={personal.headline}
          ariaLabel="Headline"
          onChange={(headline) => updatePersonal({ headline })}
        />
      </p>
      <address className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[8.2pt] not-italic leading-snug text-slate-700">
        {[personal.location, personal.email, personal.phone]
          .filter((item): item is string => Boolean(item))
          .map((item) => (
            <span key={item} className="header-contact-item">
              {item === personal.email && !isPlaceholder(item) ? (
                <a href={`mailto:${item}`}>
                  <EditableText
                    value={item}
                    ariaLabel="Email"
                    onChange={(email) => updatePersonal({ email })}
                    renderValue={(value) => <LtrText value={value} />}
                  />
                </a>
              ) : item === personal.phone ? (
                <a href={`tel:${item}`}>
                  <EditableText
                    value={item}
                    ariaLabel="Phone"
                    onChange={(phone) => updatePersonal({ phone })}
                    renderValue={(value) => <LtrText value={value} />}
                  />
                </a>
              ) : (
                <EditableText
                  value={item}
                  ariaLabel="Location"
                  onChange={(location) => updatePersonal({ location })}
                />
              )}
            </span>
          ))}
        {personal.links.map((link, index) => (
          <span
            key={`${link.label}-${link.href}-${index}`}
            className="header-contact-item inline-flex items-center gap-1"
          >
            <EditableLink
              label={link.label}
              href={link.href}
              editorTitle="Edit profile link"
              labelFieldName="Label"
              hrefFieldName="URL"
              openInNewTab={!isPlaceholder(link.href)}
              renderLabel={(value) => <LtrText value={value} />}
              onChange={({ label, href }) => {
                const links = personal.links.map((item, itemIndex) =>
                  itemIndex === index
                    ? {
                        ...item,
                        label,
                        href,
                        displayValue: label,
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
          </span>
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
