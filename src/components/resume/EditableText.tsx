"use client";

import { useEditableMode } from "@/components/resume/EditableModeContext";
import { useEffect, useRef, useState } from "react";
import type { ReactNode, SyntheticEvent } from "react";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  ariaLabel?: string;
  renderValue?: (value: string) => ReactNode;
}

export function EditableText({
  value,
  onChange,
  className,
  ariaLabel = "Editable text",
  renderValue,
}: EditableTextProps) {
  const editable = useEditableMode();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!editable) {
      setIsEditing(false);
      setDraft(value);
    }
  }, [editable, value]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const commit = () => {
    const nextValue = draft.trim();

    if (nextValue && nextValue !== value) {
      onChange(nextValue);
    }

    setIsEditing(false);
  };

  const cancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  const startEditing = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDraft(value);
    setIsEditing(true);
  };

  if (isEditing && editable) {
    return (
      <textarea
        ref={inputRef}
        aria-label={ariaLabel}
        value={draft}
        rows={Math.max(1, Math.min(5, draft.split("\n").length))}
        onBlur={commit}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            cancel();
          }

          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            commit();
          }
        }}
        className={`w-full resize-none rounded-sm border border-sky-400 bg-sky-50 px-1 py-0.5 text-inherit leading-inherit text-slate-950 outline-none ring-2 ring-sky-100 print:border-0 print:bg-transparent print:p-0 print:ring-0 ${className ?? ""}`}
      />
    );
  }

  if (!editable) {
    return (
      <span className={className}>{renderValue ? renderValue(value) : value}</span>
    );
  }

  return (
    <span
      tabIndex={0}
      role="textbox"
      aria-label={`${ariaLabel}. Double click to edit.`}
      title="Double click to edit"
      onClick={(event) => {
        // Keep parent <a> from navigating while editing is enabled.
        event.preventDefault();
        event.stopPropagation();
      }}
      onDoubleClick={startEditing}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          startEditing(event);
        }
      }}
      className={`cursor-text rounded-sm transition hover:bg-sky-50 focus-visible:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 print:cursor-auto print:hover:bg-transparent ${className ?? ""}`}
    >
      {renderValue ? renderValue(value) : value}
    </span>
  );
}
