import { useState, useEffect, RefObject } from 'react';
import { FontOptions } from '../types/common';
import { HEADER_FONTS, BODY_FONTS } from '../utils/fontUtils';

const defaultFontOptions: FontOptions = {
  // Header font settings
  headerFont: 'inter',
  headerSize: 'text-2xl',
  headerWeight: 'font-normal',
  headerLineHeight: 'leading-tight',
  headerLetterSpacing: 'tracking-wide',
  headerColor: 'text-gray-700',
  headerAlignment: 'center',
  headerItalic: false,
  headerUnderline: false,

  // Subheader font settings
  subheaderFont: 'inter',
  subheaderSize: 'text-sm',
  subheaderWeight: 'font-normal',
  subheaderLineHeight: 'leading-snug',
  subheaderLetterSpacing: 'tracking-wide',
  subheaderColor: 'text-gray-600',
  subheaderItalic: false,
  subheaderUnderline: false,

  // Section header font settings
  sectionHeaderFont: 'inter',
  sectionHeaderSize: 'text-xl',
  sectionHeaderWeight: 'font-normal',
  sectionHeaderLineHeight: 'leading-tight',
  sectionHeaderLetterSpacing: 'tracking-tight',
  sectionHeaderColor: 'text-gray-600',
  sectionHeaderItalic: false,
  sectionHeaderUnderline: false,

  // Body font settings
  bodyFont: 'inter',
  bodySize: 'text-sm',
  bodyWeight: 'font-normal',
  bodyLineHeight: 'leading-tight',
  bodyLetterSpacing: 'tracking-wide',
  bodyColor: 'text-gray-500',
  bodyItalic: false,
  bodyUnderline: false,

  // Line settings
  lineColor: '#4299e1'
};

export const useFontOptions = (resumeRef: RefObject<HTMLDivElement>) => {
  const [fontOptions, setFontOptions] = useState<FontOptions>(defaultFontOptions);

  // Initialize CSS variables on mount
  useEffect(() => {
    const root = document.documentElement;

    // Set initial CSS variables
    Object.entries(fontOptions).forEach(([key, value]) => {
      if (key.startsWith('line')) {
        root.style.setProperty(`--${key}`, value);
      }
    });

    // Set variables for all section headers
    document.querySelectorAll('[class*="section-header-"]').forEach(section => {
      const sectionElement = section as HTMLElement;
      Object.entries(fontOptions).forEach(([key, value]) => {
        if (key.startsWith('line')) {
          sectionElement.style.setProperty(`--${key}`, value);
        }
      });
    });
  }, []);

  const updateFontOption = (option: keyof FontOptions, value: string | boolean) => {
    setFontOptions(prevOptions => {
      const newOptions = {
        ...prevOptions,
        [option]: value
      };

      // Update CSS variables
      const root = document.documentElement;

      // Handle line color
      if (option === 'lineColor') {
        if (typeof value === 'string' && (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl') || /^[a-zA-Z]+$/.test(value))) {
          root.style.setProperty('--line-color', value as string);
        }
      }

      // Get the resume container
      const resumeContainer = resumeRef.current;
      if (!resumeContainer) return newOptions;

      // Handle font family options
      if (option === 'headerFont') {
        const headerFontClass = HEADER_FONTS[(value as string).toLowerCase().replace(/\s+/g, '') as keyof typeof HEADER_FONTS] || HEADER_FONTS.inter;
        resumeContainer.classList.remove(...Object.values(HEADER_FONTS));
        resumeContainer.classList.add(headerFontClass);
      }

      if (option === 'subheaderFont') {
        const subheaderFontClass = HEADER_FONTS[(value as string).toLowerCase().replace(/\s+/g, '') as keyof typeof HEADER_FONTS] || HEADER_FONTS.inter;
        resumeContainer.classList.remove(...Object.values(HEADER_FONTS));
        resumeContainer.classList.add(subheaderFontClass);
      }

      if (option === 'sectionHeaderFont') {
        const sectionHeaderFontClass = HEADER_FONTS[(value as string).toLowerCase().replace(/\s+/g, '') as keyof typeof HEADER_FONTS] || HEADER_FONTS.inter;
        resumeContainer.classList.remove(...Object.values(HEADER_FONTS));
        resumeContainer.classList.add(sectionHeaderFontClass);
      }

      if (option === 'bodyFont') {
        const bodyFontClass = BODY_FONTS[(value as string).toLowerCase().replace(/\s+/g, '') as keyof typeof BODY_FONTS] || BODY_FONTS.inter;
        resumeContainer.classList.remove(...Object.values(BODY_FONTS));
        resumeContainer.classList.add(bodyFontClass);
      }

      return newOptions;
    });
  };

  return {
    fontOptions,
    setFontOptions,
    updateFontOption
  };
};

