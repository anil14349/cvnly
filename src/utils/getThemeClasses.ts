import { FontOptions } from "../types/common";
import { getFontClassNames } from "./fontUtils";


export function getSummaryInputClasses(fontOptions: FontOptions): string {
  const themeClasses =
    fontOptions.theme === 'dark'
      ? 'bg-[#181f2a] border-gray-700 text-white'
      : 'bg-white border-gray-300';

  return `w-full p-3 rounded-lg border ${themeClasses} ${getFontClassNames(fontOptions)}`;
}

// utils/getThemeClasses.ts

export const getAddSummaryButtonClasses = (fontOptions: FontOptions) => {
  return `mt-4 flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${getFontClassNames(fontOptions)}`;
};

