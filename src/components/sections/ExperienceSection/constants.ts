import { SECTION_BUTTON_STYLES } from '../../common/constants';

// Button Classes
export const ADD_EXPERIENCE_BUTTON_CLASS = SECTION_BUTTON_STYLES.button;
export const ADD_EXPERIENCE_ICON_SIZE = SECTION_BUTTON_STYLES.icon;
export const ADD_EXPERIENCE_TEXT_CLASS = SECTION_BUTTON_STYLES.text;
export const ADD_EXPERIENCE_TEXT = 'Add Experience';

// Delete Button Classes
export const DELETE_EXPERIENCE_BUTTON_CLASS = 'absolute -right-2 -top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/experience:opacity-100 transition-opacity print:hidden';
export const DELETE_EXPERIENCE_ICON_SIZE = 'w-4 h-4';
export const DELETE_EXPERIENCE_BUTTON_PADDING = '0.25rem';

// Achievement Button Classes
export const DELETE_ACHIEVEMENT_BUTTON_CLASS = 'ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden';
export const DELETE_ACHIEVEMENT_ICON_SIZE = 'w-3 h-3';
export const ADD_ACHIEVEMENT_BUTTON_CLASS = 'flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity mb-1';
export const ADD_ACHIEVEMENT_ICON_SIZE = 'w-3 h-3';

// Layout Classes
export const EXPERIENCE_CONTAINER_CLASS = 'relative group';
export const EXPERIENCE_ITEM_CLASS = 'relative group/experience group space-y-2';
export const EXPERIENCE_HEADER_CLASS = 'flex flex-col sm:flex-row sm:items-center justify-between';
export const EXPERIENCE_PERIOD_CLASS = 'text-right';
export const ACHIEVEMENT_LIST_CLASS = 'list-disc ml-5 mb-1';
export const ACHIEVEMENT_ITEM_CLASS = 'whitespace-pre-wrap group/achievement group relative';
export const ACHIEVEMENT_TEXT_CONTAINER_CLASS = 'inline-flex items-center';

// Default Colors
export const DEFAULT_BG_DARK = '#181f2a';
export const DEFAULT_BG_LIGHT = '#fff';