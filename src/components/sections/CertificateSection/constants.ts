import { 
  SECTION_BUTTON_TEXT_STYLE, 
  SECTION_BUTTON_STYLES, 
  SECTION_ADD_ICON_SIZE 
} from '../../common/constants';

export const CERTIFICATION_CONTAINER_CLASS = 'relative group';
export const CERTIFICATION_ITEM_CLASS = 'relative group/certification';
export const DELETE_BUTTON_CLASS = 'absolute -right-2 -top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/certification:opacity-100 transition-opacity print:hidden';
export const CERTIFICATION_CONTENT_CLASS = 'flex flex-col sm:flex-row sm:items-center justify-between mb-2';
export const CERTIFICATION_DATE_CLASS = 'text-sm mt-1 sm:mt-0';
export const CERTIFICATION_LINK_CLASS = 'inline-flex items-center gap-1';
export const ADD_CERTIFICATION_BUTTON_CLASS = SECTION_BUTTON_STYLES.button;
export const ADD_ICON_SIZE = SECTION_ADD_ICON_SIZE;
export const CERTIFICATION_TEXT_CLASS = SECTION_BUTTON_TEXT_STYLE;
// Text content
export const DEFAULT_TITLE = 'Certifications';
export const VIEW_CERTIFICATE_TEXT = 'View Certificate';
export const ADD_CERTIFICATION_TEXT = 'Add Certification';

// Icon sizes
export const DELETE_ICON_SIZE = 'w-4 h-4';
export const EXTERNAL_LINK_ICON_SIZE = 'w-4 h-4';

// Layout classes
export const CERTIFICATIONS_LIST_CLASS = 'mt-2 space-y-4';
export const CERTIFICATION_HEADER_CLASS = '';
export const CERTIFICATION_ISSUER_CLASS = '';

// Default values
export const DEFAULT_BG_DARK = '#181f2a';
export const DEFAULT_BG_LIGHT = '#fff';

// Add Certification Button styles
export const ADD_CERTIFICATION_BUTTON_STYLES = {
  button: 'add-section-btn flex items-center px-3 py-1.0 rounded hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-transparent print:hidden',
  icon: 'w-3.5 h-3.5 mr-1.5 text-gray-400',
  text: 'text-sm text-gray-500 dark:text-gray-400'
};
