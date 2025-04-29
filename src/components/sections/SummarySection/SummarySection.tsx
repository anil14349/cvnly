import React, { useState } from 'react';
import SectionControls from '../../common/SectionControls';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import { getFontClassNames, getFontInlineStyles } from '../../../utils/fontUtils';
import { DEFAULT_SUMMARY_TITLE, PLACEHOLDER_TEXT } from './constants';
import AddSummaryButton from './AddSummaryButton';
import SummaryEditor from './SummaryEditor';
import SummaryDisplay from './SummaryDisplay';

// If props are defined as type instead of interface, ensure previewMode?: boolean is present
type SummarySectionProps = {
  index: number;
  moveSection: (index: number, direction: "up" | "down") => void;
  deleteSection: (index: number) => void;
  sectionsLength: number;
  fontOptions: any;
  title?: string;
  onTitleChange?: (title: string) => void;
  previewMode?: boolean;
};

const SummarySection: React.FC<SummarySectionProps> = ({
  index,
  moveSection,
  deleteSection,
  sectionsLength,
  fontOptions,
  title = DEFAULT_SUMMARY_TITLE,
  onTitleChange,
  previewMode,
}) => {
  const [summary, setSummary] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const baseTextClasses = getFontClassNames(fontOptions);
  const lineStyle = getFontInlineStyles(fontOptions);

  const handleEditToggle = () => setIsEditing(true);
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setSummary(e.target.value);
  const handleBlur = () => setIsEditing(false);

  return (
    <section
      className="relative group mt-2"
      style={{
        background:
          fontOptions.theme === 'dark'
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
        <div className="mt-2">
          <AddSummaryButton onClick={handleEditToggle} fontOptions={fontOptions} />
        </div>
      ) : (
        <div className="mt-4">
          {isEditing ? (
            <SummaryEditor
              value={summary}
              onChange={handleSummaryChange}
              onBlur={handleBlur}
              fontOptions={fontOptions}
              style={lineStyle}
            />
          ) : (
            <SummaryDisplay
              summary={summary}
              fontClass={baseTextClasses}
              style={lineStyle}
              onClick={handleEditToggle}
              placeholder={PLACEHOLDER_TEXT}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default SummarySection;
