// Common button styles for all sections
export const SECTION_ADD_BUTTON_BASE = 'flex items-center gap-1.5 text-xs print:hidden hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-transparent';
export const SECTION_ADD_BUTTON_MAIN = `${SECTION_ADD_BUTTON_BASE} mt-4 px-3 py-1.5 rounded add-section-btn`; // For main section add buttons (Add Experience, Add Education, etc.)
export const SECTION_ADD_BUTTON_SECONDARY = `${SECTION_ADD_BUTTON_BASE} ml-4 mt-2`; // For secondary add buttons within sections
export const SECTION_ADD_BUTTON_INLINE = `${SECTION_ADD_BUTTON_BASE} mt-2`; // For inline add buttons (like Add Technology)

// Common icon sizes
export const SECTION_ADD_ICON_SIZE = 'w-3.5 h-3.5 text-gray-400';
export const SECTION_DELETE_ICON_SIZE = 'w-3 h-3';
export const SECTION_DELETE_SMALL_ICON_SIZE = 'w-2.5 h-2.5';

// Common button text styles
export const SECTION_BUTTON_TEXT_STYLE = 'text-sm text-gray-500 dark:text-gray-400';

// Common delete button styles
export const SECTION_DELETE_BUTTON_BASE = 'text-gray-400 hover:text-red-500 opacity-0 transition-opacity print:hidden';
export const SECTION_DELETE_BUTTON_MAIN = `absolute -right-2 -top-2 ${SECTION_DELETE_BUTTON_BASE}`;
export const SECTION_DELETE_BUTTON_SECONDARY = `absolute -right-6 top-1/2 -translate-y-1/2 ${SECTION_DELETE_BUTTON_BASE}`;
export const SECTION_DELETE_BUTTON_INLINE = `absolute -right-1 -top-1 ${SECTION_DELETE_BUTTON_BASE}`; 