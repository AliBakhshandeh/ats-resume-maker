"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface LinkEditorFields {
  title: string;
  label: string;
  href: string;
  labelFieldName?: string;
  hrefFieldName?: string;
  onSave: (next: { label: string; href: string }) => void;
}

interface LinkEditorContextValue {
  fields: LinkEditorFields | null;
  openLinkEditor: (fields: LinkEditorFields) => void;
  closeLinkEditor: () => void;
}

const LinkEditorContext = createContext<LinkEditorContextValue | null>(null);

export function LinkEditorProvider({ children }: { children: ReactNode }) {
  const [fields, setFields] = useState<LinkEditorFields | null>(null);

  return (
    <LinkEditorContext.Provider
      value={{
        fields,
        openLinkEditor: setFields,
        closeLinkEditor: () => setFields(null),
      }}
    >
      {children}
    </LinkEditorContext.Provider>
  );
}

export function useLinkEditor() {
  const context = useContext(LinkEditorContext);

  if (!context) {
    throw new Error("useLinkEditor must be used within LinkEditorProvider");
  }

  return context;
}
