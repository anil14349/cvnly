import React, { useState } from 'react';
import { FontOptions } from '../../types/common';
import { Palette, Type, Layout, Italic, Underline, AlignLeft, AlignCenter } from 'lucide-react';
import {
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  LETTER_SPACING,
  FONT_FAMILIES,
  COLORS
} from '../../utils/fontUtils';

interface FontControlPanelTabbedProps {
  fontOptions: FontOptions;
  updateFontOption: (option: keyof FontOptions, value: string | boolean) => void;
}

type TabType = 'layout' | 'typography' | 'colors';

const FontControlPanelTabbed: React.FC<FontControlPanelTabbedProps> = ({
  fontOptions,
  updateFontOption,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('layout');

  const tabs = [
    { id: 'layout' as TabType, label: 'Layout', icon: Layout },
    { id: 'typography' as TabType, label: 'Typography', icon: Type },
    { id: 'colors' as TabType, label: 'Colors & Style', icon: Palette },
  ];

  const renderSelect = (
    key: keyof FontOptions,
    options: readonly string[],
    label: string,
    previewText?: string
  ) => (
    <div className="mb-3">
      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <select
        value={(fontOptions?.[key] as string) || options[0]}
        onChange={(e) => updateFontOption(key, e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const renderLayoutTab = () => (
    <div className="space-y-5">
      {/* Theme Selection */}
      <div>
        <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
          Theme
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
              (!fontOptions || !('theme' in fontOptions) || fontOptions.theme === 'light')
                ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300 shadow-md'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => updateFontOption('theme', 'light')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.46 6.46L5.05 5.05m12.02 0l-1.41 1.41M6.46 17.54l-1.41 1.41" />
            </svg>
            <span className="text-sm font-semibold">Light</span>
          </button>
          <button
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
              (fontOptions?.theme || 'light') === 'dark'
                ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300 shadow-md'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => updateFontOption('theme', 'dark')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
            <span className="text-sm font-semibold">Dark</span>
          </button>
        </div>
      </div>

      {/* Skill Layout */}
      <div>
        <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
          Skills Layout
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'bulleted', label: 'Bullets', icon: '• • •' },
            { value: 'horizontal', label: 'Horizontal', icon: '━ ━ ━' },
            { value: 'vertical', label: 'Vertical', icon: '| | |' },
          ].map((layout) => (
            <button
              key={layout.value}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all text-xs ${
                (fontOptions?.skillLayout || 'bulleted') === layout.value
                  ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-500 text-purple-700 dark:text-purple-300'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-purple-400 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => updateFontOption('skillLayout', layout.value)}
            >
              <span className="text-lg">{layout.icon}</span>
              <span className="font-semibold">{layout.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Header Alignment */}
      <div>
        <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
          Header Alignment
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => updateFontOption('headerAlignment', 'left')}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
              (fontOptions?.headerAlignment || 'center') === 'left'
                ? 'bg-green-50 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-green-400'
            }`}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => updateFontOption('headerAlignment', 'center')}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
              (fontOptions?.headerAlignment || 'center') === 'center'
                ? 'bg-green-50 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-green-400'
            }`}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-5 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          💡 <span className="font-bold">Tip:</span> Changes apply to your resume in real-time. Choose a theme and layout that best showcases your content.
        </p>
      </div>
    </div>
  );

  const renderTypographyTab = () => (
    <div className="space-y-5">
      {/* Font Families */}
      <div>
        <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
          Font Families
        </h3>
        <div className="space-y-3">
          {renderSelect('headerFont', FONT_FAMILIES as readonly string[], 'Header Font')}
          {renderSelect('bodyFont', FONT_FAMILIES as readonly string[], 'Body Font')}
        </div>
      </div>

      {/* Header Styles */}
      <div>
        <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
          Header Text
        </h3>
        <div className="space-y-3">
          {renderSelect('headerSize', Array.from(FONT_SIZES) as string[], 'Size')}
          {renderSelect('headerWeight', Array.from(FONT_WEIGHTS) as string[], 'Weight')}
          {renderSelect('headerLineHeight', Array.from(LINE_HEIGHTS) as string[], 'Line Height')}
          {renderSelect('headerLetterSpacing', Array.from(LETTER_SPACING) as string[], 'Letter Spacing')}
          
          {/* Style Options */}
          <div className="flex gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={fontOptions?.headerItalic || false}
                onChange={(e) => updateFontOption('headerItalic', e.target.checked)}
                className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
              />
              <Italic className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-xs text-gray-700 dark:text-gray-300">Italic</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={fontOptions?.headerUnderline || false}
                onChange={(e) => updateFontOption('headerUnderline', e.target.checked)}
                className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
              />
              <Underline className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-xs text-gray-700 dark:text-gray-300">Underline</span>
            </label>
          </div>
        </div>
      </div>

      {/* Body Text */}
      <div>
        <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
          Body Text
        </h3>
        <div className="space-y-3">
          {renderSelect('bodySize', Array.from(FONT_SIZES) as string[], 'Size')}
          {renderSelect('bodyWeight', Array.from(FONT_WEIGHTS) as string[], 'Weight')}
          {renderSelect('bodyLineHeight', Array.from(LINE_HEIGHTS) as string[], 'Line Height')}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-5 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
        <p className="text-xs text-purple-800 dark:text-purple-200">
          💡 <span className="font-bold">Tip:</span> Use consistent fonts throughout. Professional fonts like Inter or Roboto work best for ATS systems.
        </p>
      </div>
    </div>
  );

  const renderColorsTab = () => {
    const textColors = [
      'text-gray-700', 'text-gray-900', 'text-black',
      'text-blue-600', 'text-blue-800',
      'text-indigo-600', 'text-indigo-800',
      'text-purple-600', 'text-purple-800',
      'text-red-600', 'text-red-800',
      'text-green-600', 'text-green-800'
    ];

    return (
      <div className="space-y-5">
        {/* Header Color */}
        <div>
          <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
            Header Color
          </h3>
          {renderSelect('headerColor', textColors, 'Select Color')}
        </div>

        {/* Body Color */}
        <div>
          <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
            Body Color
          </h3>
          {renderSelect('bodyColor', textColors, 'Select Color')}
        </div>

        {/* Line Color */}
        <div>
          <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
            Section Line Color
          </h3>
          <input
            type="color"
            value={fontOptions?.lineColor || '#4299e1'}
            onChange={(e) => updateFontOption('lineColor', e.target.value)}
            className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Current: {fontOptions?.lineColor || '#4299e1'}
          </p>
        </div>

        {/* Reset Button */}
        <div className="pt-4">
          <button
            onClick={() => {
              // Reset to defaults
              updateFontOption('headerColor', 'text-gray-700');
              updateFontOption('bodyColor', 'text-gray-500');
              updateFontOption('lineColor', '#4299e1');
            }}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            Reset to Defaults
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-5 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-xs text-green-800 dark:text-green-200">
            💡 <span className="font-bold">Tip:</span> Darker colors improve readability. Keep sufficient contrast between text and background for ATS compatibility.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-5">
      {/* NO HEADER - Panel already shows "Appearance" */}

      {/* Tab Navigation */}
      <div className="flex border-b-2 border-gray-200 dark:border-gray-700 mb-5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition-all relative ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 rounded-t-lg"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="overflow-y-auto">
        {activeTab === 'layout' && renderLayoutTab()}
        {activeTab === 'typography' && renderTypographyTab()}
        {activeTab === 'colors' && renderColorsTab()}
      </div>
    </div>
  );
};

export default FontControlPanelTabbed;
