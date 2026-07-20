"use client";

import { useLinkEditor } from "@/components/resume/LinkEditorContext";
import { Link2, X } from "lucide-react";
import { useEffect, useState } from "react";

export function LinkEditorSidebar() {
  const { fields, closeLinkEditor } = useLinkEditor();
  const [label, setLabel] = useState("");
  const [href, setHref] = useState("");

  useEffect(() => {
    if (!fields) {
      return;
    }

    setLabel(fields.label);
    setHref(fields.href);
  }, [fields]);

  if (!fields) {
    return null;
  }

  const save = () => {
    const nextLabel = label.trim();
    const nextHref = href.trim();

    if (!nextLabel) {
      return;
    }

    fields.onSave({ label: nextLabel, href: nextHref });
    closeLinkEditor();
  };

  return (
    <aside
      className="fixed bottom-4 left-4 top-4 z-30 flex w-[min(21rem,calc(100vw-2rem))] flex-col gap-4 overflow-y-auto rounded-md border border-slate-200 bg-white/95 p-4 text-sm shadow-xl shadow-slate-900/10 backdrop-blur print:hidden"
      aria-label="Link editor"
    >
      <header className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-start gap-2">
          <div className="flex size-9 items-center justify-center rounded-sm bg-sky-700 text-white">
            <Link2 aria-hidden="true" size={18} strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="text-sm font-semibold leading-tight text-slate-950">
              {fields.title}
            </h2>
            <p className="mt-0.5 text-xs leading-snug text-slate-500">
              Edit display text and URL
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close link editor"
          onClick={closeLinkEditor}
          className="inline-flex size-8 items-center justify-center rounded-sm border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
        >
          <X aria-hidden="true" size={16} />
        </button>
      </header>

      <div className="grid gap-3">
        <label className="grid gap-1 text-xs font-medium text-slate-600">
          {fields.labelFieldName ?? "Label"}
          <input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                save();
              }

              if (event.key === "Escape") {
                event.preventDefault();
                closeLinkEditor();
              }
            }}
            className="rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800 outline-none transition hover:border-slate-400 focus-visible:ring-2 focus-visible:ring-sky-600"
          />
        </label>
        <label className="grid gap-1 text-xs font-medium text-slate-600">
          {fields.hrefFieldName ?? "URL"}
          <input
            value={href}
            dir="ltr"
            placeholder="https://"
            onChange={(event) => setHref(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                save();
              }

              if (event.key === "Escape") {
                event.preventDefault();
                closeLinkEditor();
              }
            }}
            className="rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800 outline-none transition hover:border-slate-400 focus-visible:ring-2 focus-visible:ring-sky-600"
          />
        </label>
      </div>

      <div className="mt-auto flex gap-2 border-t border-slate-200 pt-3">
        <button
          type="button"
          onClick={closeLinkEditor}
          className="inline-flex flex-1 items-center justify-center rounded-sm border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={save}
          className="inline-flex flex-1 items-center justify-center rounded-sm bg-sky-700 px-3 py-1.5 font-medium text-white transition hover:bg-sky-600"
        >
          Save
        </button>
      </div>
    </aside>
  );
}
