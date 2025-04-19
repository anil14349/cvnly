// Button style constants
export const BUTTON_STYLES = {
  active: {
    light: 'border-blue-500 bg-blue-50 text-blue-700',
    dark: 'border-blue-500 bg-blue-900/20 text-blue-300'
  },
  inactive: {
    light: 'border-gray-300 text-gray-800 hover:border-gray-400',
    dark: 'border-gray-600 text-gray-200 hover:border-gray-500'
  }
};

// Panel style constants
export const PANEL_STYLES = {
  container: 'font-control-panel rounded-lg shadow p-3 mb-4 text-xs',
  section: {
    header: 'sticky top-0 z-10 bg-white dark:bg-gray-900 py-0.5 px-0.5 rounded-t-lg flex items-center gap-1 border-b border-gray-100 dark:border-gray-800',
    content: 'p-1 space-y-1 bg-white dark:bg-gray-900',
    divider: 'divide-y divide-gray-200 dark:divide-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden'
  },
  button: {
    toggle: 'w-full flex items-center justify-between px-1 py-0.5 bg-gray-50 dark:bg-gray-800/50 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors',
    style: 'px-1 py-0.5 text-xs rounded border transition-all',
    copy: 'flex items-center gap-0.5 px-2 py-1 rounded border-2 transition-all font-semibold shadow-sm text-xs'
  },
  label: {
    section: 'text-xs font-medium text-gray-700 dark:text-gray-300',
    style: 'text-xs font-medium text-gray-600 dark:text-gray-400'
  },
  icon: {
    small: 'w-2 h-2',
    medium: 'w-3 h-3'
  },
  select: {
    container: 'mb-1',
    label: 'block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5',
    wrapper: 'flex items-center gap-0.5',
    input: 'flex-1 px-1 py-0.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
    preview: 'px-1 py-0.5 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600'
  },
  colorPicker: {
    container: 'mb-2',
    header: 'flex items-center justify-between mb-0.5',
    title: 'text-xs font-semibold text-gray-700 dark:text-gray-200',
    icon: 'w-3 h-3 text-gray-400',
    swatches: 'flex flex-wrap gap-0.5 mb-0.5',
    swatch: 'w-4 h-4 rounded-full border transition-all focus:outline-none focus:ring-1 focus:ring-blue-400',
    custom: {
      container: 'flex items-center gap-0.5 mt-0.5',
      label: 'text-xs text-gray-500 dark:text-gray-400',
      input: 'flex-1 px-1 py-0.5 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400'
    }
  }
};

// Theme selector styles
export const THEME_SELECTOR_STYLES = {
  container: 'mb-2',
  radioGroup: 'flex gap-2',
  radioLabel: 'inline-flex items-center cursor-pointer',
  radioInput: 'form-radio text-blue-500 focus:ring-blue-500',
  radioText: 'ml-1 text-gray-300'
};

// Font family section styles
export const FONT_FAMILY_STYLES = {
  container: 'mb-2',
  grid: 'grid grid-cols-1 gap-1 mt-1'
};

// Section styles
export const SECTION_STYLES = {
  header: 'flex items-center gap-0.5',
  content: 'flex flex-col gap-0.5 mt-0.5',
  buttonGrid: 'grid grid-cols-2 gap-0.5'
};

// Skill layout styles
export const SKILL_LAYOUT_STYLES = {
  container: 'mb-2',
  label: 'block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1',
  buttonGroup: 'flex gap-1',
  button: {
    base: 'px-2 py-1 text-xs rounded border transition-all',
    active: {
      light: 'border-blue-500 bg-blue-50 text-blue-700',
      dark: 'border-blue-500 bg-blue-900/20 text-blue-300'
    },
    inactive: {
      light: 'border-gray-300 text-gray-800 hover:border-gray-400',
      dark: 'border-gray-600 text-gray-200 hover:border-gray-500'
    }
  }
};

// Preview styles
export const PREVIEW_STYLES = {
  container: {
    minWidth: '60px',
    textAlign: 'center' as const
  }
};

// Panel container styles
export const PANEL_CONTAINER_STYLES = {
  light: {
    background: '#181f2a',
    color: '#181f2a',
    maxWidth: 340
  },
  dark: {
    background: '#181f2a',
    color: '#fff',
    maxWidth: 340
  }
};

// Color swatch styles
export const COLOR_SWATCH_STYLES = {
  active: 'border-blue-500 ring-1 ring-blue-400',
  inactive: 'border-gray-200 dark:border-gray-700'
}; 