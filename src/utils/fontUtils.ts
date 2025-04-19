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
  '#1e293b', // slate-800 (dark blue-gray)
  '#64748b', // slate-500 (mid blue-gray)
  '#e11d48', // rose-600
  '#f59e42', // orange-400
  '#fbbf24', // yellow-400
  '#22c55e', // green-500
  '#0ea5e9', // sky-500
  '#6366f1', // indigo-500
  '#a21caf', // purple-700
  '#f43f5e', // pink-500
  '#f1f5f9', // slate-100 (light gray)
  '#18181b', // zinc-900 (almost black)
] as const;

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


export const getFontClassNames = (fontOptions: FontOptions): string => {
  return [
    fontOptions.bodySize,
    fontOptions.bodyWeight,
    fontOptions.bodyColor,
    `font-body-${fontOptions.bodyFont.toLowerCase()}`,
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
    fontOptions.headerColor,
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

export const getFontInlineStyles = (fontOptions: FontOptions) => ({
  lineHeight: fontOptions.bodyLineHeight,
  letterSpacing: fontOptions.bodyLetterSpacing,
});