import { SECTION_BUTTON_STYLES, SECTION_BUTTON_TEXT_STYLE } from '../../common/constants';

// Layout classes
export const PROJECTS_CONTAINER_CLASS = 'relative group';
export const PROJECTS_LIST_CLASS = 'space-y-6';
export const PROJECT_ITEM_CLASS = 'relative group/project space-y-2';
export const PROJECT_CONTENT_CLASS = 'flex flex-col sm:flex-row sm:items-baseline justify-between';
export const PROJECT_DETAILS_CLASS = 'space-y-0.5';
export const PROJECT_DESCRIPTION_CLASS = 'space-y-1';
export const PROJECT_TECHNOLOGIES_CLASS = 'space-y-1.5';
export const PROJECT_TECH_LIST_CLASS = 'flex flex-wrap gap-1.5';
export const PROJECT_TECH_ITEM_CLASS = 'group/tech relative';
export const PROJECT_TECH_BADGE_CLASS = 'rounded-md transition-colors inline-flex items-center';
export const PROJECT_RESPONSIBILITIES_LIST_CLASS = 'list-disc ml-4 space-y-0.5';
export const PROJECT_RESPONSIBILITY_ITEM_CLASS = 'group/responsibility relative';
export const INLINE_BLOCK_CLASS = 'inline-block';

// Button classes
export const DELETE_PROJECT_BUTTON_CLASS = 'absolute -right-2 -top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/project:opacity-100 transition-opacity print:hidden';
export const DELETE_RESPONSIBILITY_BUTTON_CLASS = 'absolute -right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover/responsibility:opacity-100 transition-opacity print:hidden';
export const DELETE_TECH_BUTTON_CLASS = 'absolute -right-1 -top-1 text-gray-400 hover:text-red-500 opacity-0 group-hover/tech:opacity-100 transition-opacity print:hidden';
export const ADD_RESPONSIBILITY_BUTTON_CLASS = 'flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity';
export const ADD_TECHNOLOGY_BUTTON_CLASS = 'flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity';
export const ADD_PROJECT_BUTTON_CLASS = SECTION_BUTTON_STYLES.button + ' mt-1';

// Icon sizes
export const DELETE_ICON_SIZE = 'w-3 h-3';
export const DELETE_TECH_ICON_SIZE = 'w-2.5 h-2.5';
export const ADD_ICON_SIZE = 'w-3 h-3';

// Text content
export const DEFAULT_TITLE = 'Projects';
export const ADD_PROJECT_TEXT = 'Add Project';
export const ADD_RESPONSIBILITY_TEXT = 'Add Responsibility';
export const ADD_TECHNOLOGY_TEXT = 'Add Technology';
export const NEW_RESPONSIBILITY_TEXT = 'New responsibility';
export const NEW_TECH_TEXT = 'New Tech';
export const DELETE_PROJECT_ARIA_LABEL = 'Delete project: ';
export const DELETE_RESPONSIBILITY_ARIA_LABEL = 'Delete responsibility: ';
export const DELETE_TECH_ARIA_LABEL = 'Delete technology: ';
export const DETAIL_SUFFIX = '...';

// Default values
export const DEFAULT_BG_DARK = '#181f2a';
export const DEFAULT_BG_LIGHT = '#fff';

// Add Project Button styles
export const ADD_PROJECT_BUTTON_STYLES = {
    button: 'add-section-btn mt-4 flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity',
    icon: 'w-3.5 h-3.5 mr-1.5 text-gray-400',
    text: 'text-sm text-gray-500 dark:text-gray-400'
};

export const DATE_SEPARATOR = ' - ';
export const ADD_PROJECT_LABEL = 'Add Project';
export const ADD_PROJECT_ICON_SIZE = 'w-3.5 h-3.5 mr-1.5 text-gray-400';
export const ADD_PROJECT_SPAN = SECTION_BUTTON_TEXT_STYLE;
export { SECTION_BUTTON_TEXT_STYLE };