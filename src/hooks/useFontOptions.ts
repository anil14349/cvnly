import { useState, useEffect, RefObject } from 'react';
import { FontOptions } from '../types/common';
import { HEADER_FONTS, BODY_FONTS } from '../utils/fontUtils';

const defaultFontOptions: FontOptions = {
  // Header font settings
  headerFont: 'Inter',
  headerSize: 'text-2xl',
  headerWeight: 'font-normal',
  headerLineHeight: 'leading-tight',
  headerLetterSpacing: 'tracking-wide',
  headerColor: 'text-gray-700',
  headerAlignment: 'center',
  headerItalic: false,
  headerUnderline: false,

  // Subheader font settings
  subheaderFont: 'Inter',
  subheaderSize: 'text-sm',
  subheaderWeight: 'font-normal',
  subheaderLineHeight: 'leading-snug',
  subheaderLetterSpacing: 'tracking-wide',
  subheaderColor: 'text-gray-600',
  subheaderItalic: false,
  subheaderUnderline: false,

  // Section header font settings
  sectionHeaderFont: 'Inter',
  sectionHeaderSize: 'text-xl',
  sectionHeaderWeight: 'font-normal',
  sectionHeaderLineHeight: 'leading-tight',
  sectionHeaderLetterSpacing: 'tracking-tight',
  sectionHeaderColor: 'text-gray-600',
  sectionHeaderItalic: false,
  sectionHeaderUnderline: false,

  // Body font settings
  bodyFont: 'Inter',
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

      // Font classes are applied directly in components via className
      // No need to manipulate classList here as it causes conflicts
      // Components like ResumeHeaderName.tsx already apply font-header-{font} dynamically

      return newOptions;
    });
  };

  return {
    fontOptions,
    setFontOptions,
    updateFontOption
  };
};

