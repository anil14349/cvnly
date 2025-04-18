import { SECTION_ADD_BUTTON_MAIN } from '../../common/constants';
// Layout classes
export const EDUCATION_CONTAINER_CLASS = 'relative group';
export const EDUCATION_LIST_CLASS = 'mt-2 space-y-4';
export const EDUCATION_ITEM_CLASS = 'relative group/education space-y-2';
export const EDUCATION_CONTENT_CLASS = 'flex flex-col sm:flex-row sm:items-baseline justify-between';
export const EDUCATION_DETAILS_CLASS = 'space-y-0.5';
export const EDUCATION_DETAILS_LIST_CLASS = 'list-disc ml-4 space-y-0.5';
export const EDUCATION_DETAIL_ITEM_CLASS = 'group/detail relative';
export const INLINE_BLOCK_CLASS = 'inline-block';

// Button classes
export const DELETE_EDUCATION_BUTTON_CLASS = 'absolute -right-2 -top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/education:opacity-100 transition-opacity print:hidden';
export const DELETE_DETAIL_BUTTON_CLASS = 'absolute -right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover/detail:opacity-100 transition-opacity print:hidden';
export const ADD_EDUCATION_BUTTON_CLASS = SECTION_ADD_BUTTON_MAIN + ' mt-1';

// Icon sizes
export const DELETE_ICON_SIZE = 'w-3 h-3';
export const ADD_ICON_SIZE = 'w-3 h-3';

// Text content
export const DEFAULT_TITLE = 'Education';
export const ADD_EDUCATION_TEXT = 'Add Education';
export const PRESENT_TEXT = 'Present';
export const GPA_PREFIX = 'GPA: ';
export const FIELD_SEPARATOR = ' in ';
export const DATE_SEPARATOR = ' - ';
export const DELETE_EDUCATION_ARIA_LABEL = 'Delete education: ';
export const DELETE_DETAIL_ARIA_LABEL = 'Delete detail: ';
export const DETAIL_SUFFIX = '...';

// Default values
export const DEFAULT_BG_DARK = '#181f2a';
export const DEFAULT_BG_LIGHT = '#fff'; 