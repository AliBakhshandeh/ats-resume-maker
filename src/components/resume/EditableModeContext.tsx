"use client";

import { createContext, useContext } from "react";

export const EditableModeContext = createContext(false);

export function useEditableMode() {
  return useContext(EditableModeContext);
}
