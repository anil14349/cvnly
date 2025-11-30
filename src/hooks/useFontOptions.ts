import { useState, useEffect, RefObject } from 'react';
import { FontOptions } from '../types/common';

const defaultFontOptions: FontOptions = {
  // Header font settings (Name) - Raleway for elegant, professional look
  headerFont: 'Raleway',
  headerSize: 'text-2xl',
  headerWeight: 'font-semibold',
  headerLineHeight: 'leading-tight',
  headerLetterSpacing: 'tracking-normal',
  headerColor: 'text-gray-800',
  headerAlignment: 'center',
  headerItalic: false,
  headerUnderline: false,

  // Subheader font settings (Title) - Raleway for consistency
  subheaderFont: 'Raleway',
  subheaderSize: 'text-base',
  subheaderWeight: 'font-normal',
  subheaderLineHeight: 'leading-snug',
  subheaderLetterSpacing: 'tracking-wide',
  subheaderColor: 'text-gray-600',
  subheaderItalic: false,
  subheaderUnderline: false,

  // Section header font settings - Raleway for clean section headers
  sectionHeaderFont: 'Raleway',
  sectionHeaderSize: 'text-base',
  sectionHeaderWeight: 'font-semibold',
  sectionHeaderLineHeight: 'leading-tight',
  sectionHeaderLetterSpacing: 'tracking-normal',
  sectionHeaderColor: 'text-gray-700',
  sectionHeaderItalic: false,
  sectionHeaderUnderline: false,

  // Body font settings - Open Sans for excellent readability
  bodyFont: 'Open Sans',
  bodySize: 'text-sm',
  bodyWeight: 'font-normal',
  bodyLineHeight: 'leading-relaxed',
  bodyLetterSpacing: 'tracking-normal',
  bodyColor: 'text-gray-600',
  bodyItalic: false,
  bodyUnderline: false,

  // Line settings - Professional blue accent
  lineColor: '#3b82f6',
  sectionLineColor: '#3b82f6',
  sectionLineSize: '1px',
  sectionLineVisible: true,
  headerLineColor: '#1f2937',
  headerLineSize: '2px',
  headerLineVisible: true
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

