import React, { useState } from 'react';
import { FontOptions } from '../../types/common';
import { ChevronDown, ChevronUp, Type, AlignLeft, Heading, Italic, Underline, Palette, Copy, Check } from 'lucide-react';
import {
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  LETTER_SPACING,
  FONT_FAMILIES,
  COLORS
} from '../../utils/fontUtils';

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

  // State for copy feedback
  const [copied, setCopied] = useState(false);

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Copy current font settings to clipboard
  const copyFontSettings = () => {
    const settings = JSON.stringify(fontOptions, null, 2);
    navigator.clipboard.writeText(settings);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSelect = (
    key: keyof FontOptions,
    options: string[],
    label: string,
    previewText?: string
  ) => (
    <div className="mb-2">
      <label
        htmlFor={`${key}-select`}
        className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <div className="flex items-center gap-1">
        <select
          id={`${key}-select`}
          value={fontOptions[key] as string}
          onChange={(e) => updateFontOption(key, e.target.value)}
          className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          aria-label={label}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {previewText && (
          <div
            className={`px-2 py-1 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 ${fontOptions[key] as string}`}
            style={{ minWidth: '80px', textAlign: 'center' }}
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
      className="font-control-panel rounded-xl shadow-lg p-6 mb-6"
      style={{
        background:
          fontOptions.theme === 'dark'
            ? fontOptions.widgetBgDark || '#181f2a'
            : fontOptions.widgetBgLight || '#181f2a',
        color: fontOptions.theme === 'dark' ? '#fff' : '#181f2a',
      }}
    >
      {/* Color Picker */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Theme Colors</span>
          <Palette className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex flex-wrap gap-1 mb-1">
          {COLORS.map((color) => (
            <button
              key={color}
              className={`w-5 h-5 rounded-full border transition-all focus:outline-none focus:ring-1 focus:ring-blue-400 ${fontOptions.lineColor === color ? 'border-blue-500 ring-1 ring-blue-400' : 'border-gray-200 dark:border-gray-700'}`}
              style={{ background: color }}
              onClick={() => updateFontOption('lineColor', color)}
              aria-label={`Set accent color to ${color}`}
            />
          ))}
          <input
            type="color"
            className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer"
            value={fontOptions.lineColor}
            onChange={(e) => updateFontOption('lineColor', e.target.value)}
            aria-label="Custom color picker"
          />
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">Custom</span>
          <input
            type="text"
            className="flex-1 px-1 py-0.5 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={fontOptions.lineColor}
            onChange={(e) => updateFontOption('lineColor', e.target.value)}
            aria-label="Set custom color value"
          />
        </div>
      </div>

      {/* Theme Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">Theme</label>
        <div className="flex gap-6">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={fontOptions.theme === "light"}
              onChange={() => updateFontOption("theme", "light")}
              className="form-radio text-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-300">Light</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={fontOptions.theme === "dark"}
              onChange={() => updateFontOption("theme", "dark")}
              className="form-radio text-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-300">Dark</span>
          </label>
        </div>
      </div>

      {/* Font Family Section */}
      <div className="mb-3">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-1 px-1 rounded-t-lg flex items-center gap-2 border-b border-gray-100 dark:border-gray-800">
          <Type className="w-3 h-3 text-gray-500 dark:text-gray-400" />
          <span className="font-semibold text-gray-700 dark:text-gray-200 text-xs">Font Families</span>
        </div>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {renderSelect('headerFont', Array.from(FONT_FAMILIES) as string[], 'Header Font', 'Header')}
          {renderSelect('subheaderFont', Array.from(FONT_FAMILIES) as string[], 'Subheader Font', 'Subheader')}
          {renderSelect('sectionHeaderFont', Array.from(FONT_FAMILIES) as string[], 'Section Header Font', 'Section')}
          {renderSelect('bodyFont', Array.from(FONT_FAMILIES) as string[], 'Body Font', 'Body')}
        </div>
      </div>

      {/* Collapsible Font Style Sections */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden">
        {/* Header Text */}
        <div>
          <button
            onClick={() => toggleSection('header')}
            className="w-full flex items-center justify-between px-2 py-1 bg-gray-50 dark:bg-gray-800/50 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <div className="flex items-center gap-1">
              <Heading className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Header Text</span>
            </div>
            {expandedSections.header ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {expandedSections.header && (
            <div className="p-2 space-y-2 bg-white dark:bg-gray-900">
              {renderSelect('headerSize', Array.from(FONT_SIZES) as string[], 'Header Size', 'Header')}
              {renderSelect('headerWeight', Array.from(FONT_WEIGHTS) as string[], 'Header Weight', 'Header')}
              {renderSelect('headerLineHeight', Array.from(LINE_HEIGHTS) as string[], 'Header Line Height', 'Header')}
              {renderSelect('headerLetterSpacing', Array.from(LETTER_SPACING) as string[], 'Header Letter Spacing', 'Header')}
              {renderSelect('headerColor', Array.from(COLORS) as string[], 'Header Color', 'Header')}
              {/* Style Buttons */}
              <div className="flex flex-col gap-1 mt-1">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Style</label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => updateFontOption('headerItalic', !fontOptions.headerItalic)}
                    className={`px-1.5 py-1 text-xs rounded border transition-all ${fontOptions.headerItalic ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500'}`}
                  >
                    <Italic className="w-3 h-3" /> Italic
                  </button>
                  <button
                    onClick={() => updateFontOption('headerUnderline', !fontOptions.headerUnderline)}
                    className={`px-1.5 py-1 text-xs rounded border transition-all ${fontOptions.headerUnderline ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500'}`}
                  >
                    <Underline className="w-3 h-3" /> Underline
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Subheader Text */}
        <div>
          <button
            onClick={() => toggleSection('subheader')}
            className="w-full flex items-center justify-between px-2 py-1 bg-gray-50 dark:bg-gray-800/50 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <div className="flex items-center gap-1">
              <Heading className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Subheader Text</span>
            </div>
            {expandedSections.subheader ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {expandedSections.subheader && (
            <div className="p-2 space-y-2 bg-white dark:bg-gray-900">
              {renderSelect('subheaderSize', Array.from(FONT_SIZES) as string[], 'Subheader Size', 'Subheader')}
              {renderSelect('subheaderWeight', Array.from(FONT_WEIGHTS) as string[], 'Subheader Weight', 'Subheader')}
              {renderSelect('subheaderLineHeight', Array.from(LINE_HEIGHTS) as string[], 'Subheader Line Height', 'Subheader')}
              {renderSelect('subheaderLetterSpacing', Array.from(LETTER_SPACING) as string[], 'Subheader Letter Spacing', 'Subheader')}
              {renderSelect('subheaderColor', Array.from(COLORS) as string[], 'Subheader Color', 'Subheader')}
              {/* Style Buttons */}
              <div className="flex flex-col gap-1 mt-1">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Style</label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => updateFontOption('subheaderItalic', !fontOptions.subheaderItalic)}
                    className={`px-1.5 py-1 text-xs rounded border transition-all ${fontOptions.subheaderItalic ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500'}`}
                  >
                    <Italic className="w-3 h-3" /> Italic
                  </button>
                  <button
                    onClick={() => updateFontOption('subheaderUnderline', !fontOptions.subheaderUnderline)}
                    className={`px-1.5 py-1 text-xs rounded border transition-all ${fontOptions.subheaderUnderline ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500'}`}
                  >
                    <Underline className="w-3 h-3" /> Underline
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Section Header Text */}
        <div>
          <button
            onClick={() => toggleSection('sectionHeader')}
            className="w-full flex items-center justify-between px-2 py-1 bg-gray-50 dark:bg-gray-800/50 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <div className="flex items-center gap-1">
              <Heading className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Section Header Text</span>
            </div>
            {expandedSections.sectionHeader ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {expandedSections.sectionHeader && (
            <div className="p-2 space-y-2 bg-white dark:bg-gray-900">
              {renderSelect('sectionHeaderSize', Array.from(FONT_SIZES) as string[], 'Section Header Size', 'Section')}
              {renderSelect('sectionHeaderWeight', Array.from(FONT_WEIGHTS) as string[], 'Section Header Weight', 'Section')}
              {renderSelect('sectionHeaderLineHeight', Array.from(LINE_HEIGHTS) as string[], 'Section Header Line Height', 'Section')}
              {renderSelect('sectionHeaderLetterSpacing', Array.from(LETTER_SPACING) as string[], 'Section Header Letter Spacing', 'Section')}
              {renderSelect('sectionHeaderColor', Array.from(COLORS) as string[], 'Section Header Color', 'Section')}
              {/* Style Buttons */}
              <div className="flex flex-col gap-1 mt-1">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Style</label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => updateFontOption('sectionHeaderItalic', !fontOptions.sectionHeaderItalic)}
                    className={`px-1.5 py-1 text-xs rounded border transition-all ${fontOptions.sectionHeaderItalic ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500'}`}
                  >
                    <Italic className="w-3 h-3" /> Italic
                  </button>
                  <button
                    onClick={() => updateFontOption('sectionHeaderUnderline', !fontOptions.sectionHeaderUnderline)}
                    className={`px-1.5 py-1 text-xs rounded border transition-all ${fontOptions.sectionHeaderUnderline ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500'}`}
                  >
                    <Underline className="w-3 h-3" /> Underline
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Body Text */}
        <div>
          <button
            onClick={() => toggleSection('body')}
            className="w-full flex items-center justify-between px-2 py-1 bg-gray-50 dark:bg-gray-800/50 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <div className="flex items-center gap-1">
              <AlignLeft className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Body Text</span>
            </div>
            {expandedSections.body ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {expandedSections.body && (
            <div className="p-2 space-y-2 bg-white dark:bg-gray-900">
              {renderSelect('bodySize', Array.from(FONT_SIZES) as string[], 'Body Size', 'Body')}
              {renderSelect('bodyWeight', Array.from(FONT_WEIGHTS) as string[], 'Body Weight', 'Body')}
              {renderSelect('bodyLineHeight', Array.from(LINE_HEIGHTS) as string[], 'Body Line Height', 'Body')}
              {renderSelect('bodyLetterSpacing', Array.from(LETTER_SPACING) as string[], 'Body Letter Spacing', 'Body')}
              {renderSelect('bodyColor', Array.from(COLORS) as string[], 'Body Color', 'Body')}
              {/* Style Buttons */}
              <div className="flex flex-col gap-1 mt-1">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Style</label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => updateFontOption('bodyItalic', !fontOptions.bodyItalic)}
                    className={`px-1.5 py-1 text-xs rounded border transition-all ${fontOptions.bodyItalic ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500'}`}
                  >
                    <Italic className="w-3 h-3" /> Italic
                  </button>
                  <button
                    onClick={() => updateFontOption('bodyUnderline', !fontOptions.bodyUnderline)}
                    className={`px-1.5 py-1 text-xs rounded border transition-all ${fontOptions.bodyUnderline ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500'}`}
                  >
                    <Underline className="w-3 h-3" /> Underline
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Copy Font Settings Button */}
      <div className="flex justify-end mt-3">
        <button
          onClick={copyFontSettings}
          className={`flex items-center gap-1 px-3 py-1.5 rounded border-2 transition-all font-semibold shadow-sm text-xs ${copied ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30' : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/20'}`}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default FontControlPanel;