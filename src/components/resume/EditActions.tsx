"use client";

import { useEditableMode } from "@/components/resume/EditableModeContext";
import { Minimize2, Plus, X } from "lucide-react";

interface AddItemButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export function AddItemButton({
  label,
  onClick,
  className = "",
}: AddItemButtonProps) {
  const editable = useEditableMode();

  if (!editable) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-2 inline-flex items-center gap-1 rounded-sm border border-dashed border-sky-300 bg-sky-50 px-2 py-1 text-[11px] font-medium text-sky-800 transition hover:border-sky-400 hover:bg-sky-100 print:hidden ${className}`}
    >
      <Plus aria-hidden="true" size={12} strokeWidth={2.4} />
      {label}
    </button>
  );
}

interface RemoveItemButtonProps {
  label: string;
  onClick: () => void;
}

export function RemoveItemButton({ label, onClick }: RemoveItemButtonProps) {
  const editable = useEditableMode();

  if (!editable) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-rose-200 bg-rose-50 text-rose-600 transition hover:border-rose-300 hover:bg-rose-100 print:hidden"
    >
      <X aria-hidden="true" size={10} strokeWidth={2.4} />
    </button>
  );
}

interface CompactToggleButtonProps {
  compact: boolean;
  onChange: (compact: boolean) => void;
}

export function CompactToggleButton({
  compact,
  onChange,
}: CompactToggleButtonProps) {
  const editable = useEditableMode();

  if (!editable) {
    return null;
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={compact}
      aria-label={compact ? "Disable compact layout" : "Enable compact layout"}
      title={compact ? "Compact on" : "Compact off"}
      onClick={() => onChange(!compact)}
      className={`inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-medium transition print:hidden ${
        compact
          ? "border-amber-300 bg-amber-50 text-amber-800 hover:border-amber-400 hover:bg-amber-100"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <Minimize2 aria-hidden="true" size={10} strokeWidth={2.4} />
      Compact
    </button>
  );
}
