import React, { useState } from 'react';
import { FontOptions } from '../../types/common';
import { ChevronDown, ChevronUp, Type, AlignLeft, Heading, Italic, Underline, Palette } from 'lucide-react';
import {
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  LETTER_SPACING,
  FONT_FAMILIES,
  COLORS
} from '../../utils/fontUtils';

import {
  PANEL_STYLES,
  FONT_FAMILY_STYLES,
  SECTION_STYLES,
  PREVIEW_STYLES,
  PANEL_CONTAINER_STYLES,
  STYLE_CHECKBOX_STYLES
} from './constants';

interface FontControlPanelProps {
  fontOptions: FontOptions;
  updateFontOption: (option: keyof FontOptions, value: string | boolean) => void;
}

const FontControlPanel: React.FC<FontControlPanelProps> = ({
  fontOptions,
  updateFontOption,
}) => {
  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    lineColor: true,
    fonts: true,
    header: false,
    subheader: false,
    sectionHeader: false,
    body: false
  });

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSelect = (
    key: keyof FontOptions,
    options: string[] | { name: string; value: string }[],
    label: string,
    previewText?: string
  ) => (
    <div className={PANEL_STYLES.select.container}>
      <label
        htmlFor={`${key}-select`}
        className={PANEL_STYLES.select.label}
      >
        {label}
      </label>
      <div className={PANEL_STYLES.select.wrapper}>
        <select
          id={`${key}-select`}
          value={fontOptions[key] as string}
          onChange={(e) => updateFontOption(key, e.target.value)}
          className={PANEL_STYLES.select.input}
          aria-label={label}
        >
          {options.map((option) => (
            <option
              key={typeof option === 'string' ? option : option.value}
              value={typeof option === 'string' ? option : option.value}
            >
              {typeof option === 'string' ? option : option.name}
            </option>
          ))}
        </select>
        {previewText && (
          <div
            className={`${PANEL_STYLES.select.preview} ${fontOptions[key] as string}`}
            style={PREVIEW_STYLES.container}
            aria-label={`Preview of ${label}`}
          >
            {previewText}
          </div>
        )}
      </div>
    </div>
  );

  const SectionDivider = () => (
    <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
  );

  return (
    <div
      className={PANEL_STYLES.container}
      style={fontOptions.theme === 'dark' ? PANEL_CONTAINER_STYLES.dark : PANEL_CONTAINER_STYLES.light}
    >
      {/* Section Line Color Picker (Polished Grid) */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-sm text-gray-100 dark:text-gray-200">Section Line Color</span>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {COLORS.map((color) => (
            <div key={color.value} className="flex flex-col items-center">
              <button
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-sm relative
                  ${fontOptions.lineColor === color.hex ? 'border-blue-500 ring-2 ring-blue-400' : 'border-gray-300 dark:border-gray-700'}
                  ${color.name === 'White' ? 'border border-gray-400' : ''}`}
                style={{ background: color.hex }}
                title={color.name}
                aria-label={`Set section line color to ${color.name}`}
                onClick={() => updateFontOption('lineColor', color.hex)}
                type="button"
              >
                {fontOptions.lineColor === color.hex && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                )}
              </button>
              <span className="text-[10px] text-gray-900 dark:text-gray-200 font-medium mt-1 whitespace-nowrap pointer-events-none select-none" style={{textShadow:'0 1px 2px rgba(0,0,0,0.15)'}}>{color.name}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-400">Custom</span>
          <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center" style={{background: fontOptions.lineColor}} />
          <input
            type="color"
            value={/^#[0-9A-Fa-f]{6}$/.test(fontOptions.lineColor) ? fontOptions.lineColor : '#000000'}
            onChange={e => updateFontOption('lineColor', e.target.value)}
            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
            aria-label="Pick custom section line color"
          />
          <input
            type="text"
            className="ml-2 px-2 py-1 rounded border border-gray-300 bg-gray-800 text-gray-100 text-xs w-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={fontOptions.lineColor}
            onChange={e => updateFontOption('lineColor', e.target.value)}
            aria-label="Set custom section line color value"
            placeholder="#hex or color name"
          />
        </div>
      </div>

      <SectionDivider />

      {/* Theme Selection (Polished) */}
      <div className="mb-4">
        <span className="font-semibold text-sm text-gray-100 dark:text-gray-200 mb-1 block">Theme</span>
        <div className="flex gap-2">
          <button
            className={`flex items-center gap-1 px-4 py-1.5 rounded-full border-2 transition-colors text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-400
            ${fontOptions.theme === 'light' ? 'bg-blue-50 text-blue-700 border-blue-500' : 'bg-gray-800 text-gray-300 border-gray-600 hover:border-blue-400'}`}
            aria-label="Set theme to Light"
            onClick={() => updateFontOption('theme', 'light')}
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.46 6.46L5.05 5.05m12.02 0l-1.41 1.41M6.46 17.54l-1.41 1.41"/></svg>
            Light
          </button>
          <button
            className={`flex items-center gap-1 px-4 py-1.5 rounded-full border-2 transition-colors text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-400
            ${fontOptions.theme === 'dark' ? 'bg-blue-900/20 text-blue-300 border-blue-500' : 'bg-gray-800 text-gray-300 border-gray-600 hover:border-blue-400'}`}
            aria-label="Set theme to Dark"
            onClick={() => updateFontOption('theme', 'dark')}
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
            Dark
          </button>
        </div>
      </div>

      <SectionDivider />

      {/* Skill Layout (Polished) */}
      <div className="mb-4">
        <span className="font-semibold text-sm text-gray-100 dark:text-gray-200 mb-1 block">Skill Layout</span>
        <div className="flex gap-2">
          <button
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg border-2 transition-colors text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-400
            ${fontOptions.skillLayout === 'bulleted' ? 'bg-blue-50 text-blue-700 border-blue-500' : 'bg-gray-800 text-gray-300 border-gray-600 hover:border-blue-400'}`}
            aria-label="Bulleted List Skill Layout"
            onClick={() => updateFontOption('skillLayout', 'bulleted')}
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="1.5"/><circle cx="6" cy="12" r="1.5"/><circle cx="6" cy="18" r="1.5"/><rect x="10" y="5" width="8" height="2" rx="1"/><rect x="10" y="11" width="8" height="2" rx="1"/><rect x="10" y="17" width="8" height="2" rx="1"/></svg>
            Bulleted
          </button>
          <button
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg border-2 transition-colors text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-400
            ${fontOptions.skillLayout === 'pill' ? 'bg-blue-50 text-blue-700 border-blue-500' : 'bg-gray-800 text-gray-300 border-gray-600 hover:border-blue-400'}`}
            aria-label="Pill/Chip Skill Layout"
            onClick={() => updateFontOption('skillLayout', 'pill')}
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="4" rx="2"/></svg>
            Pill/Chip
          </button>
          <button
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg border-2 transition-colors text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-400
            ${fontOptions.skillLayout === 'classic' ? 'bg-blue-50 text-blue-700 border-blue-500' : 'bg-gray-800 text-gray-300 border-gray-600 hover:border-blue-400'}`}
            aria-label="Classic Inline Skill Layout"
            onClick={() => updateFontOption('skillLayout', 'classic')}
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="2" rx="1"/><rect x="4" y="15" width="10" height="2" rx="1"/></svg>
            Classic
          </button>
        </div>
      </div>

      <SectionDivider />

      {/* Font Family Section */}
      <div>
        <button
          onClick={() => toggleSection('fonts')}
          className={PANEL_STYLES.button.toggle}
        >
          <div className={SECTION_STYLES.header}>
            <Type className={PANEL_STYLES.icon.small} />
            <span className={PANEL_STYLES.label.section}>Font Families</span>
          </div>
          {expandedSections.fonts ? <ChevronUp className={PANEL_STYLES.icon.small} /> : <ChevronDown className={PANEL_STYLES.icon.small} />}
        </button>
        {expandedSections.fonts && (
          <div className={PANEL_STYLES.section.content}>
            <div className={FONT_FAMILY_STYLES.grid}>
              {renderSelect('headerFont', Array.from(FONT_FAMILIES) as string[], 'Header Font', 'Header')}
              {renderSelect('subheaderFont', Array.from(FONT_FAMILIES) as string[], 'Subheader Font', 'Subheader')}
              {renderSelect('sectionHeaderFont', Array.from(FONT_FAMILIES) as string[], 'Section Header Font', 'Section')}
              {renderSelect('bodyFont', Array.from(FONT_FAMILIES) as string[], 'Body Font', 'Body')}
            </div>
          </div>
        )}
      </div>

      {/* Collapsible Font Style Sections */}
      <div className={PANEL_STYLES.section.divider}>
        {/* Header Text */}
        <div>
          <button
            onClick={() => toggleSection('header')}
            className={PANEL_STYLES.button.toggle}
          >
            <div className={SECTION_STYLES.header}>
              <Heading className={PANEL_STYLES.icon.small} />
              <span className={PANEL_STYLES.label.section}>Header Text</span>
            </div>
            {expandedSections.header ? <ChevronUp className={PANEL_STYLES.icon.small} /> : <ChevronDown className={PANEL_STYLES.icon.small} />}
          </button>
          {expandedSections.header && (
            <div className={PANEL_STYLES.section.content}>
              {renderSelect('headerSize', Array.from(FONT_SIZES) as string[], 'Header Size', 'Header')}
              {renderSelect('headerWeight', Array.from(FONT_WEIGHTS) as string[], 'Header Weight', 'Header')}
              {renderSelect('headerLineHeight', Array.from(LINE_HEIGHTS) as string[], 'Header Line Height', 'Header')}
              {renderSelect('headerLetterSpacing', Array.from(LETTER_SPACING) as string[], 'Header Letter Spacing', 'Header')}
              {renderSelect('headerColor', COLORS, 'Header Color', 'Header')}
              <div className={SECTION_STYLES.content}>
                <label className={PANEL_STYLES.label.style}>Style</label>
                <div className={STYLE_CHECKBOX_STYLES.container}>
                  <label className={STYLE_CHECKBOX_STYLES.label}>
                    <input
                      type="checkbox"
                      checked={fontOptions.headerItalic}
                      onChange={() => updateFontOption('headerItalic', !fontOptions.headerItalic)}
                      className={STYLE_CHECKBOX_STYLES.checkbox}
                    />
                    <Italic className={STYLE_CHECKBOX_STYLES.icon} />
                    <span className={STYLE_CHECKBOX_STYLES.text}>Italic</span>
                  </label>
                  <label className={STYLE_CHECKBOX_STYLES.label}>
                    <input
                      type="checkbox"
                      checked={fontOptions.headerUnderline}
                      onChange={() => updateFontOption('headerUnderline', !fontOptions.headerUnderline)}
                      className={STYLE_CHECKBOX_STYLES.checkbox}
                    />
                    <Underline className={STYLE_CHECKBOX_STYLES.icon} />
                    <span className={STYLE_CHECKBOX_STYLES.text}>Underline</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Subheader Text */}
        <div>
          <button
            onClick={() => toggleSection('subheader')}
            className={PANEL_STYLES.button.toggle}
          >
            <div className={SECTION_STYLES.header}>
              <Heading className={PANEL_STYLES.icon.small} />
              <span className={PANEL_STYLES.label.section}>Subheader Text</span>
            </div>
            {expandedSections.subheader ? <ChevronUp className={PANEL_STYLES.icon.small} /> : <ChevronDown className={PANEL_STYLES.icon.small} />}
          </button>
          {expandedSections.subheader && (
            <div className={PANEL_STYLES.section.content}>
              {renderSelect('subheaderSize', Array.from(FONT_SIZES) as string[], 'Subheader Size', 'Subheader')}
              {renderSelect('subheaderWeight', Array.from(FONT_WEIGHTS) as string[], 'Subheader Weight', 'Subheader')}
              {renderSelect('subheaderLineHeight', Array.from(LINE_HEIGHTS) as string[], 'Subheader Line Height', 'Subheader')}
              {renderSelect('subheaderLetterSpacing', Array.from(LETTER_SPACING) as string[], 'Subheader Letter Spacing', 'Subheader')}
              {renderSelect('subheaderColor', COLORS, 'Subheader Color', 'Subheader')}
              <div className={SECTION_STYLES.content}>
                <label className={PANEL_STYLES.label.style}>Style</label>
                <div className={STYLE_CHECKBOX_STYLES.container}>
                  <label className={STYLE_CHECKBOX_STYLES.label}>
                    <input
                      type="checkbox"
                      checked={fontOptions.subheaderItalic}
                      onChange={() => updateFontOption('subheaderItalic', !fontOptions.subheaderItalic)}
                      className={STYLE_CHECKBOX_STYLES.checkbox}
                    />
                    <Italic className={STYLE_CHECKBOX_STYLES.icon} />
                    <span className={STYLE_CHECKBOX_STYLES.text}>Italic</span>
                  </label>
                  <label className={STYLE_CHECKBOX_STYLES.label}>
                    <input
                      type="checkbox"
                      checked={fontOptions.subheaderUnderline}
                      onChange={() => updateFontOption('subheaderUnderline', !fontOptions.subheaderUnderline)}
                      className={STYLE_CHECKBOX_STYLES.checkbox}
                    />
                    <Underline className={STYLE_CHECKBOX_STYLES.icon} />
                    <span className={STYLE_CHECKBOX_STYLES.text}>Underline</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section Header Text */}
        <div>
          <button
            onClick={() => toggleSection('sectionHeader')}
            className={PANEL_STYLES.button.toggle}
          >
            <div className={SECTION_STYLES.header}>
              <Heading className={PANEL_STYLES.icon.small} />
              <span className={PANEL_STYLES.label.section}>Section Header Text</span>
            </div>
            {expandedSections.sectionHeader ? <ChevronUp className={PANEL_STYLES.icon.small} /> : <ChevronDown className={PANEL_STYLES.icon.small} />}
          </button>
          {expandedSections.sectionHeader && (
            <div className={PANEL_STYLES.section.content}>
              {renderSelect('sectionHeaderSize', Array.from(FONT_SIZES) as string[], 'Section Header Size', 'Section')}
              {renderSelect('sectionHeaderWeight', Array.from(FONT_WEIGHTS) as string[], 'Section Header Weight', 'Section')}
              {renderSelect('sectionHeaderLineHeight', Array.from(LINE_HEIGHTS) as string[], 'Section Header Line Height', 'Section')}
              {renderSelect('sectionHeaderLetterSpacing', Array.from(LETTER_SPACING) as string[], 'Section Header Letter Spacing', 'Section')}
              {renderSelect('sectionHeaderColor', COLORS, 'Section Header Color', 'Section')}
              <div className={SECTION_STYLES.content}>
                <label className={PANEL_STYLES.label.style}>Style</label>
                <div className={STYLE_CHECKBOX_STYLES.container}>
                  <label className={STYLE_CHECKBOX_STYLES.label}>
                    <input
                      type="checkbox"
                      checked={fontOptions.sectionHeaderItalic}
                      onChange={() => updateFontOption('sectionHeaderItalic', !fontOptions.sectionHeaderItalic)}
                      className={STYLE_CHECKBOX_STYLES.checkbox}
                    />
                    <Italic className={STYLE_CHECKBOX_STYLES.icon} />
                    <span className={STYLE_CHECKBOX_STYLES.text}>Italic</span>
                  </label>
                  <label className={STYLE_CHECKBOX_STYLES.label}>
                    <input
                      type="checkbox"
                      checked={fontOptions.sectionHeaderUnderline}
                      onChange={() => updateFontOption('sectionHeaderUnderline', !fontOptions.sectionHeaderUnderline)}
                      className={STYLE_CHECKBOX_STYLES.checkbox}
                    />
                    <Underline className={STYLE_CHECKBOX_STYLES.icon} />
                    <span className={STYLE_CHECKBOX_STYLES.text}>Underline</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Body Text */}
        <div>
          <button
            onClick={() => toggleSection('body')}
            className={PANEL_STYLES.button.toggle}
          >
            <div className={SECTION_STYLES.header}>
              <AlignLeft className={PANEL_STYLES.icon.small} />
              <span className={PANEL_STYLES.label.section}>Body Text</span>
            </div>
            {expandedSections.body ? <ChevronUp className={PANEL_STYLES.icon.small} /> : <ChevronDown className={PANEL_STYLES.icon.small} />}
          </button>
          {expandedSections.body && (
            <div className={PANEL_STYLES.section.content}>
              {renderSelect('bodySize', Array.from(FONT_SIZES) as string[], 'Body Size', 'Body')}
              {renderSelect('bodyWeight', Array.from(FONT_WEIGHTS) as string[], 'Body Weight', 'Body')}
              {renderSelect('bodyLineHeight', Array.from(LINE_HEIGHTS) as string[], 'Body Line Height', 'Body')}
              {renderSelect('bodyLetterSpacing', Array.from(LETTER_SPACING) as string[], 'Body Letter Spacing', 'Body')}
              {renderSelect('bodyColor', COLORS, 'Body Color', 'Body')}
              <div className={SECTION_STYLES.content}>
                <label className={PANEL_STYLES.label.style}>Style</label>
                <div className={STYLE_CHECKBOX_STYLES.container}>
                  <label className={STYLE_CHECKBOX_STYLES.label}>
                    <input
                      type="checkbox"
                      checked={fontOptions.bodyItalic}
                      onChange={() => updateFontOption('bodyItalic', !fontOptions.bodyItalic)}
                      className={STYLE_CHECKBOX_STYLES.checkbox}
                    />
                    <Italic className={STYLE_CHECKBOX_STYLES.icon} />
                    <span className={STYLE_CHECKBOX_STYLES.text}>Italic</span>
                  </label>
                  <label className={STYLE_CHECKBOX_STYLES.label}>
                    <input
                      type="checkbox"
                      checked={fontOptions.bodyUnderline}
                      onChange={() => updateFontOption('bodyUnderline', !fontOptions.bodyUnderline)}
                      className={STYLE_CHECKBOX_STYLES.checkbox}
                    />
                    <Underline className={STYLE_CHECKBOX_STYLES.icon} />
                    <span className={STYLE_CHECKBOX_STYLES.text}>Underline</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FontControlPanel;