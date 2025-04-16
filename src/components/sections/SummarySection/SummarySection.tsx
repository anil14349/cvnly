import React, { useState } from 'react';
import SectionControls from '../../common/SectionControls';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import { FontOptions } from '../../../types/common';
import { Plus } from 'lucide-react';

interface SummarySectionProps {
  index: number;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
  sectionsLength: number;
  fontOptions: FontOptions;
  title?: string;
  onTitleChange?: (newTitle: string) => void;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  index,
  moveSection,
  deleteSection,
  sectionsLength,
  fontOptions,
  title = "Professional Summary",
  onTitleChange
}) => {
  const [summary, setSummary] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleAddSummary = () => {
    setIsEditing(true);
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
  };

  const handleSummaryBlur = () => {
    setIsEditing(false);
  };

  return (
    <div
      className="relative group"
      style={{
        background: fontOptions.theme === 'dark'
          ? fontOptions.widgetBgDark || '#181f2a'
          : fontOptions.widgetBgLight || '#fff',
      }}
    >
      <SectionHeaderLine
        title={title}
        fontOptions={fontOptions}
        onTitleChange={onTitleChange}
        controls={
          <SectionControls
            index={index}
            moveSection={moveSection}
            deleteSection={deleteSection}
            sectionsLength={sectionsLength}
          />
        }
      />

      {!summary && !isEditing ? (
        <button
          onClick={handleAddSummary}
          className={`mt-4 flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
          aria-label="Add summary"
        >
          <Plus className="w-3 h-3" aria-hidden="true" />
          <span>Add Summary</span>
        </button>
      ) : (
        <div className="mt-4">
          {isEditing ? (
            <textarea
              value={summary}
              onChange={handleSummaryChange}
              onBlur={handleSummaryBlur}
              className={`w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
              style={{
                lineHeight: fontOptions.bodyLineHeight,
                letterSpacing: fontOptions.bodyLetterSpacing,
                minHeight: '120px'
              }}
              placeholder="Enter your professional summary here..."
              autoFocus
            />
          ) : (
            <div
              className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
              style={{
                lineHeight: fontOptions.bodyLineHeight,
                letterSpacing: fontOptions.bodyLetterSpacing
              }}
              onClick={() => setIsEditing(true)}
            >
              {summary}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SummarySection;