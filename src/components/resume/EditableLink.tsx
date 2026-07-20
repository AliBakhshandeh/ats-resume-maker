"use client";

import { useEditableMode } from "@/components/resume/EditableModeContext";
import { useLinkEditor } from "@/components/resume/LinkEditorContext";
import { Link2 } from "lucide-react";
import type { ReactNode, SyntheticEvent } from "react";

interface EditableLinkProps {
  label: string;
  href: string;
  onChange: (next: { label: string; href: string }) => void;
  editorTitle: string;
  labelFieldName?: string;
  hrefFieldName?: string;
  className?: string;
  openInNewTab?: boolean;
  renderLabel?: (label: string) => ReactNode;
}

export function EditableLink({
  label,
  href,
  onChange,
  editorTitle,
  labelFieldName = "Label",
  hrefFieldName = "URL",
  className,
  openInNewTab = true,
  renderLabel,
}: EditableLinkProps) {
  const editable = useEditableMode();
  const { openLinkEditor } = useLinkEditor();

  const openEditor = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    openLinkEditor({
      title: editorTitle,
      label,
      href,
      labelFieldName,
      hrefFieldName,
      onSave: onChange,
    });
  };

  const content = renderLabel ? renderLabel(label) : label;
  const resolvedHref =
    !href || href.startsWith("[ADD ") ? "#" : href;

  if (!editable) {
    if (!href || resolvedHref === "#") {
      return href ? (
        <a href={resolvedHref} className={className}>
          {content}
        </a>
      ) : (
        <span className={className}>{content}</span>
      );
    }

    return (
      <a
        href={resolvedHref}
        className={className}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noreferrer noopener" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 print:gap-0">
      <span
        tabIndex={0}
        role="button"
        aria-label={`${editorTitle}. Double click or use link button to edit.`}
        title="Double click to edit link"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onDoubleClick={openEditor}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            openEditor(event);
          }
        }}
        className={`cursor-text rounded-sm transition hover:bg-sky-50 focus-visible:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 print:cursor-auto print:hover:bg-transparent ${className ?? ""}`}
      >
        {content}
      </span>
      <button
        type="button"
        aria-label={`Edit ${editorTitle.toLowerCase()}`}
        title="Edit link"
        onClick={openEditor}
        className="inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-sky-200 bg-sky-50 text-sky-700 transition hover:border-sky-300 hover:bg-sky-100 print:hidden"
      >
        <Link2 aria-hidden="true" size={10} strokeWidth={2.4} />
      </button>
    </span>
  );
}
