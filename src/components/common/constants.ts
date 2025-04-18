// Common button styles for all sections
export const SECTION_ADD_BUTTON_BASE = 'add-section-btn mt-4 flex items-center px-3 py-1.5 rounded hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-transparent print:hidden';

// Button styles object pattern (for consistency)
export const SECTION_BUTTON_STYLES = {
    button: 'add-section-btn mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-transparent print:hidden',
    icon: 'w-3.5 h-3.5 mr-1.5 text-gray-400 transition-colors group-hover:text-gray-500',
    text: 'text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
};

// Button variants
export const SECTION_BUTTON_VARIANTS = {
    primary: {
        button: SECTION_BUTTON_STYLES.button, // Default button
        secondary: `${SECTION_BUTTON_STYLES.button} mt-2 ml-4`, // Secondary buttons (within sections)
        inline: `${SECTION_BUTTON_STYLES.button} mt-2` // Inline buttons (like Add Technology)
    }
};

// Common icon sizes
export const SECTION_ADD_ICON_SIZE = 'w-3.5 h-3.5 mr-1.5 text-gray-400';
export const SECTION_DELETE_ICON_SIZE = 'w-3 h-3';
export const SECTION_DELETE_SMALL_ICON_SIZE = 'w-2.5 h-2.5';

// Common button text styles
export const SECTION_BUTTON_TEXT_STYLE = 'text-sm text-gray-500 dark:text-gray-400';

// Common delete button styles
export const SECTION_DELETE_BUTTON_BASE = 'text-gray-400 hover:text-red-500 opacity-0 transition-opacity print:hidden';
export const SECTION_DELETE_BUTTON_MAIN = `absolute -right-2 -top-2 ${SECTION_DELETE_BUTTON_BASE}`;
export const SECTION_DELETE_BUTTON_SECONDARY = `absolute -right-6 top-1/2 -translate-y-1/2 ${SECTION_DELETE_BUTTON_BASE}`;
export const SECTION_DELETE_BUTTON_INLINE = `absolute -right-1 -top-1 ${SECTION_DELETE_BUTTON_BASE}`;

export const SECTION_ADD_BUTTON_MAIN = 'text-sm text-gray-500 dark:text-gray-400 font-normal';