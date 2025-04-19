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
import type { SkillLayoutType } from '../../types/common';
import {
  PANEL_STYLES,
  THEME_SELECTOR_STYLES,
  FONT_FAMILY_STYLES,
  SECTION_STYLES,
  SKILL_LAYOUT_STYLES,
  PREVIEW_STYLES,
  PANEL_CONTAINER_STYLES,
  STYLE_CHECKBOX_STYLES
} from './constants';

const SKILL_LAYOUT_OPTIONS: { value: SkillLayoutType; label: string }[] = [
  { value: 'bulleted', label: 'Bulleted List' },
  { value: 'pill', label: 'Pill/Chip' },
  { value: 'classic', label: 'Classic Inline' },
];

interface FontControlPanelProps {
  fontOptions: FontOptions;
  updateFontOption: (option: keyof FontOptions, value: string | boolean) => void;
}

// Helper function to convert border color class to background color class
const getBackgroundColorFromBorderColor = (borderColorClass: string) => {
  return borderColorClass.replace('border-', 'bg-');
};

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

  return (
    <div
      className={PANEL_STYLES.container}
      style={fontOptions.theme === 'dark' ? PANEL_CONTAINER_STYLES.dark : PANEL_CONTAINER_STYLES.light}
    >
      {/* Section Line Color Picker (Redesigned) */}
      <div className={PANEL_STYLES.colorPicker.container}>
        <div className={PANEL_STYLES.colorPicker.header}>
          <span className={PANEL_STYLES.colorPicker.title}>Section Line Color</span>
          <Palette className={PANEL_STYLES.colorPicker.icon} />
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {COLORS.map((color) => (
            <button
              key={color.value}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-sm
                ${fontOptions.lineColor === color.hex ? 'border-blue-500 ring-2 ring-blue-400' : 'border-gray-300 dark:border-gray-700'}`}
              style={{ background: color.hex }}
              title={color.name}
              aria-label={`Set section line color to ${color.name}`}
              onClick={() => updateFontOption('lineColor', color.hex)}
              type="button"
            >
              {fontOptions.lineColor === color.hex && (
                <span className="block w-3 h-3 rounded-full bg-white bg-opacity-80 border border-blue-500" />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">Custom</span>
          <input
            type="text"
            className={PANEL_STYLES.colorPicker.custom.input}
            value={fontOptions.lineColor}
            onChange={(e) => updateFontOption('lineColor', e.target.value)}
            aria-label="Set custom section line color value"
            placeholder="#hex or color name"
          />
        </div>
      </div>

      {/* Theme Selector */}
      <div className={THEME_SELECTOR_STYLES.container}>
        <label className={PANEL_STYLES.label.section}>Theme</label>
        <div className={THEME_SELECTOR_STYLES.radioGroup}>
          <label className={THEME_SELECTOR_STYLES.radioLabel}>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={fontOptions.theme === "light"}
              onChange={() => updateFontOption("theme", "light")}
              className={THEME_SELECTOR_STYLES.radioInput}
            />
            <span className={THEME_SELECTOR_STYLES.radioText}>Light</span>
          </label>
          <label className={THEME_SELECTOR_STYLES.radioLabel}>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={fontOptions.theme === "dark"}
              onChange={() => updateFontOption("theme", "dark")}
              className={THEME_SELECTOR_STYLES.radioInput}
            />
            <span className={THEME_SELECTOR_STYLES.radioText}>Dark</span>
          </label>
        </div>
      </div>

      {/* Skill Layout */}
      <div className={SKILL_LAYOUT_STYLES.container}>
        <label className={SKILL_LAYOUT_STYLES.label}>Skill Layout</label>
        <div className={SKILL_LAYOUT_STYLES.buttonGroup}>
          {SKILL_LAYOUT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => updateFontOption('skillLayout', opt.value)}
              className={`${SKILL_LAYOUT_STYLES.button.base} ${fontOptions.skillLayout === opt.value
                ? SKILL_LAYOUT_STYLES.button.active[fontOptions.theme || 'light']
                : SKILL_LAYOUT_STYLES.button.inactive[fontOptions.theme || 'light']
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

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