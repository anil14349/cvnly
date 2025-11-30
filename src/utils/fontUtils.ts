import { FontOptions } from '../types/common';

// Font Families
export const FONT_FAMILIES = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Source Sans Pro',
  'Raleway',
  'Ubuntu',
  'Playfair Display'
] as const;

// Font Sizes
export const FONT_SIZES = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl'] as const;

// Font Weights
export const FONT_WEIGHTS = ['font-normal', 'font-medium', 'font-semibold', 'font-bold'] as const;

// Line Heights
export const LINE_HEIGHTS = ['leading-tight', 'leading-normal', 'leading-relaxed'] as const;

// Letter Spacing
export const LETTER_SPACING = ['tracking-tight', 'tracking-normal', 'tracking-wide'] as const;

// Colors (for section line color picker)
export const COLORS = [
  { name: 'Slate', value: 'border-slate-500', hex: '#64748b' },
  { name: 'Gray', value: 'border-gray-500', hex: '#6b7280' },
  { name: 'Zinc', value: 'border-zinc-500', hex: '#71717a' },
  { name: 'Red', value: 'border-red-500', hex: '#ef4444' },
  { name: 'Rose', value: 'border-rose-500', hex: '#f43f5e' },
  { name: 'Orange', value: 'border-orange-500', hex: '#f97316' },
  { name: 'Amber', value: 'border-amber-500', hex: '#f59e42' },
  { name: 'Yellow', value: 'border-yellow-500', hex: '#fbbf24' },
  { name: 'Lime', value: 'border-lime-500', hex: '#84cc16' },
  { name: 'Green', value: 'border-green-500', hex: '#22c55e' },
  { name: 'Emerald', value: 'border-emerald-500', hex: '#10b981' },
  { name: 'Teal', value: 'border-teal-500', hex: '#14b8a6' },
  { name: 'Cyan', value: 'border-cyan-500', hex: '#06b6d4' },
  { name: 'Sky', value: 'border-sky-500', hex: '#0ea5e9' },
  { name: 'Blue', value: 'border-blue-500', hex: '#3b82f6' },
  { name: 'Indigo', value: 'border-indigo-500', hex: '#6366f1' },
  { name: 'Violet', value: 'border-violet-500', hex: '#8b5cf6' },
  { name: 'Purple', value: 'border-purple-500', hex: '#a21caf' },
  { name: 'Fuchsia', value: 'border-fuchsia-500', hex: '#d946ef' },
  { name: 'Pink', value: 'border-pink-500', hex: '#ec4899' },
  { name: 'Black', value: 'border-black', hex: '#000000' },
  { name: 'White', value: 'border-white', hex: '#ffffff' },
];

// Font Classes
export const HEADER_FONTS = {
  inter: 'font-header-inter',
  montserrat: 'font-header-montserrat',
  playfairdisplay: 'font-header-playfairdisplay',
  lato: 'font-header-lato',
  opensans: 'font-header-opensans',
  poppins: 'font-header-poppins',
  roboto: 'font-header-roboto',
  raleway: 'font-header-raleway',
  ubuntu: 'font-header-ubuntu',
  sourcesanspro: 'font-header-sourcesanspro'
} as const;

export const BODY_FONTS = {
  inter: 'font-body-inter',
  sourcesanspro: 'font-body-sourcesanspro',
  opensans: 'font-body-opensans',
  lato: 'font-body-lato',
  montserrat: 'font-body-montserrat',
  roboto: 'font-body-roboto',
  raleway: 'font-body-raleway',
  ubuntu: 'font-body-ubuntu'
} as const;

// Utility Functions
export const getFontClasses = (type: 'header' | 'subheader' | 'sectionHeader' | 'body', options: FontOptions) => {
  if (!options) return '';

  const normalizeFontName = (font: string) => font.toLowerCase().replace(/\s+/g, '');

  const classMap = {
    header: {
      font: `font-header-${normalizeFontName(options.headerFont)}`,
      size: options.headerSize,
      weight: options.headerWeight,
      lineHeight: options.headerLineHeight,
      letterSpacing: options.headerLetterSpacing,
      color: options.headerColor
    },
    subheader: {
      font: `font-header-${normalizeFontName(options.subheaderFont)}`,
      size: options.subheaderSize,
      weight: options.subheaderWeight,
      lineHeight: options.subheaderLineHeight,
      letterSpacing: options.subheaderLetterSpacing,
      color: options.subheaderColor
    },
    sectionHeader: {
      font: `font-header-${normalizeFontName(options.sectionHeaderFont)}`,
      size: options.sectionHeaderSize,
      weight: options.sectionHeaderWeight,
      lineHeight: options.sectionHeaderLineHeight,
      letterSpacing: options.sectionHeaderLetterSpacing,
      color: options.sectionHeaderColor
    },
    body: {
      font: `font-body-${normalizeFontName(options.bodyFont)}`,
      size: options.bodySize,
      weight: options.bodyWeight,
      lineHeight: options.bodyLineHeight,
      letterSpacing: options.bodyLetterSpacing,
      color: options.bodyColor
    }
  };

  const classes = classMap[type];
  return Object.values(classes).filter(Boolean).join(' ');
};

export const applyFontClasses = (fontOptions: FontOptions): string => {
  const classes = [
    HEADER_FONTS[fontOptions.headerFont.toLowerCase().replace(/\s+/g, '') as keyof typeof HEADER_FONTS] || HEADER_FONTS.inter,
    BODY_FONTS[fontOptions.bodyFont.toLowerCase().replace(/\s+/g, '') as keyof typeof BODY_FONTS] || BODY_FONTS.inter,
    fontOptions.headerSize,
    fontOptions.subheaderSize,
    fontOptions.sectionHeaderSize,
    fontOptions.bodySize,
  ].filter(Boolean);

  return classes.join(' ');
};

// Helper Functions
export const getFontSizeClass = (size: string): string => {
  const index = FONT_SIZES.indexOf(size as typeof FONT_SIZES[number]);
  return index !== -1 ? FONT_SIZES[index] : FONT_SIZES[2];
};

export const getFontWeightClass = (weight: string): string => {
  const index = FONT_WEIGHTS.indexOf(weight as typeof FONT_WEIGHTS[number]);
  return index !== -1 ? FONT_WEIGHTS[index] : FONT_WEIGHTS[0];
};

export const getLineHeightClass = (height: string): string => {
  const index = LINE_HEIGHTS.indexOf(height as typeof LINE_HEIGHTS[number]);
  return index !== -1 ? LINE_HEIGHTS[index] : LINE_HEIGHTS[1];
};

export const getLetterSpacingClass = (spacing: string): string => {
  const index = LETTER_SPACING.indexOf(spacing as typeof LETTER_SPACING[number]);
  return index !== -1 ? LETTER_SPACING[index] : LETTER_SPACING[1];
};

export const getHeaderFontClass = (font: string): string => 
  HEADER_FONTS[font.toLowerCase().replace(/\s+/g, '') as keyof typeof HEADER_FONTS] || HEADER_FONTS.inter;

export const getBodyFontClass = (font: string): string => 
  BODY_FONTS[font.toLowerCase().replace(/\s+/g, '') as keyof typeof BODY_FONTS] || BODY_FONTS.inter;

export const getFontWeightValue = (fontWeight: string): number => {
  const weightMap: Record<string, number> = {
    'font-thin': 100,
    'font-extralight': 200,
    'font-light': 300,
    'font-normal': 400,
    'font-medium': 500,
    'font-semibold': 600,
    'font-bold': 700,
    'font-extrabold': 800,
    'font-black': 900
  };
  
  return weightMap[fontWeight] || 400; // default to normal (400) if not found
}; 


// Add dark mode variant to color class
const addDarkModeVariant = (colorClass: string): string => {
  // Map light mode colors to dark mode equivalents
  const darkModeMap: { [key: string]: string } = {
    'text-gray-900': 'dark:text-gray-100',
    'text-gray-800': 'dark:text-gray-200',
    'text-gray-700': 'dark:text-gray-300',
    'text-gray-600': 'dark:text-gray-400',
    'text-gray-500': 'dark:text-gray-400',
    'text-black': 'dark:text-white',
    'text-blue-600': 'dark:text-blue-400',
    'text-blue-700': 'dark:text-blue-300',
    'text-blue-800': 'dark:text-blue-200',
    'text-indigo-600': 'dark:text-indigo-400',
    'text-indigo-700': 'dark:text-indigo-300',
    'text-indigo-800': 'dark:text-indigo-200',
    'text-purple-600': 'dark:text-purple-400',
    'text-purple-700': 'dark:text-purple-300',
    'text-purple-800': 'dark:text-purple-200',
    'text-red-600': 'dark:text-red-400',
    'text-red-700': 'dark:text-red-300',
    'text-green-600': 'dark:text-green-400',
    'text-green-700': 'dark:text-green-300',
  };
  
  const darkVariant = darkModeMap[colorClass];
  return darkVariant ? `${colorClass} ${darkVariant}` : colorClass;
};

export const getFontClassNames = (fontOptions: FontOptions): string => {
  return [
    fontOptions.bodySize,
    fontOptions.bodyWeight,
    addDarkModeVariant(fontOptions.bodyColor),
    fontOptions.bodyItalic ? 'italic' : '',
    fontOptions.bodyUnderline ? 'underline' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const getHeadingClassNames = (fontOptions: FontOptions): string => {
  return [
    fontOptions.headerSize,
    fontOptions.headerWeight,
    addDarkModeVariant(fontOptions.headerColor),
    `font-header-${fontOptions.headerFont.toLowerCase()}`,
    fontOptions.headerItalic ? 'italic' : '',
    fontOptions.headerUnderline ? 'underline' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const getSubheadingClassNames = (fontOptions: FontOptions): string => {
  return [
    fontOptions.subheaderSize,
    fontOptions.subheaderWeight,
    fontOptions.subheaderColor,
    
    `font-subheader-${fontOptions.subheaderFont.toLowerCase()}`,
    fontOptions.subheaderItalic ? 'italic' : '',
    fontOptions.subheaderUnderline ? 'underline' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const getSectionHeaderClassNames = (fontOptions: FontOptions): string => {
  return [
    fontOptions.sectionHeaderSize,
    fontOptions.sectionHeaderWeight,
    fontOptions.sectionHeaderColor,
    `font-sectionheader-${fontOptions.sectionHeaderFont.toLowerCase()}`,
    fontOptions.sectionHeaderItalic ? 'italic' : '',
    fontOptions.sectionHeaderUnderline ? 'underline' : '',
  ]
    .filter(Boolean)
    .join(' ');
};  

export const getCategoryClassNames = (fontOptions: FontOptions): string => {
  return [
    fontOptions.categorySize,
    fontOptions.categoryWeight,
    fontOptions.categoryColor
  ]
    .filter(Boolean)
    .join(' ');
};

export const getLineClassNames = (fontOptions: FontOptions): string => {
  return [
    fontOptions.lineColor
  ]
    .filter(Boolean)
    .join(' ');
};

export const getThemeClassNames = (fontOptions: FontOptions): string => {
  return [
    fontOptions.theme
  ]
    .filter(Boolean)
    .join(' ');
};

export const getHeaderFontLineStyles = (fontOptions: FontOptions): React.CSSProperties => ({
  lineHeight: fontOptions.headerLineHeight,
  letterSpacing: fontOptions.headerLetterSpacing,
});

export const getSubheaderFontLineStyles = (fontOptions: FontOptions): React.CSSProperties => ({
  lineHeight: fontOptions.subheaderLineHeight,
  letterSpacing: fontOptions.subheaderLetterSpacing,
});

export const getSectionHeaderFontLineStyles = (fontOptions: FontOptions): React.CSSProperties => ({
  lineHeight: fontOptions.sectionHeaderLineHeight,
  letterSpacing: fontOptions.sectionHeaderLetterSpacing,
});

export const getFontInlineStyles = (fontOptions: FontOptions): React.CSSProperties => ({
  lineHeight: fontOptions.bodyLineHeight,
  letterSpacing: fontOptions.bodyLetterSpacing,
  fontFamily: getBodyFontFamily(fontOptions),
});

// Get the header line color based on theme
export const getHeaderLineColor = (fontOptions: FontOptions) => {
  // If dark mode, use lighter colors
  if (fontOptions.theme === 'dark') {
    return 'rgba(229, 231, 235, 0.2)'; // Light gray with low opacity for dark mode
  }
  // For light mode, use subtle gray
  return 'rgba(156, 163, 175, 0.2)'; // Gray-400 with low opacity
};

// Font family mapping
const FONT_FAMILY_MAP: Record<string, string> = {
  'inter': "'Inter', sans-serif",
  'montserrat': "'Montserrat', sans-serif",
  'playfair display': "'Playfair Display', serif",
  'playfairdisplay': "'Playfair Display', serif",
  'lato': "'Lato', sans-serif",
  'open sans': "'Open Sans', sans-serif",
  'opensans': "'Open Sans', sans-serif",
  'poppins': "'Poppins', sans-serif",
  'roboto': "'Roboto', sans-serif",
  'raleway': "'Raleway', sans-serif",
  'ubuntu': "'Ubuntu', sans-serif",
  'source sans pro': "'Source Sans Pro', sans-serif",
  'sourcesanspro': "'Source Sans Pro', sans-serif"
};

// Get actual font-family string for inline styles
// Note: Inline styles are required because Tailwind JIT cannot process dynamic class names
export const getFontFamilyString = (fontName: string): string => {
  const normalizedName = fontName.toLowerCase().replace(/\s+/g, '');
  return FONT_FAMILY_MAP[normalizedName] || FONT_FAMILY_MAP[fontName.toLowerCase()] || "'Inter', sans-serif";
};

// Helper functions for specific font types from FontOptions
export const getHeaderFontFamily = (fontOptions: FontOptions): string => {
  return getFontFamilyString(fontOptions.headerFont);
};

export const getSubheaderFontFamily = (fontOptions: FontOptions): string => {
  return getFontFamilyString(fontOptions.subheaderFont);
};

export const getSectionHeaderFontFamily = (fontOptions: FontOptions): string => {
  return getFontFamilyString(fontOptions.sectionHeaderFont);
};

export const getBodyFontFamily = (fontOptions: FontOptions): string => {
  return getFontFamilyString(fontOptions.bodyFont);
};