import React from 'react';
import { useResumeContext } from '../../../contexts/ResumeContext';
import { getSubheaderFontFamily, getBodyFontFamily } from '../../../utils/fontUtils';

interface TwoColumnSummarySectionProps {
  fontOptions: any;
  title?: string;
  onTitleChange?: (title: string) => void;
  previewMode?: boolean;
}

/**
 * TwoColumnSummarySection - Professional dark sidebar summary
 */
const TwoColumnSummarySection: React.FC<TwoColumnSummarySectionProps> = ({
  fontOptions,
  title = 'About Me',
  onTitleChange,
  previewMode = false
}) => {
  const { resumeData, setResumeData } = useResumeContext();
  const summary = resumeData?.summary || '';

  const handleChange = (value: string) => {
    if (!previewMode && setResumeData) {
      setResumeData({ ...resumeData, summary: value });
    }
  };

  return (
    <section>
      {/* Section Title */}
      <h3 style={{
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.6)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '12px',
        fontFamily: getSubheaderFontFamily(fontOptions),
      }}>
        {onTitleChange ? (
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              fontFamily: 'inherit',
              textTransform: 'inherit',
              letterSpacing: 'inherit',
              width: '100%',
              outline: 'none',
            }}
          />
        ) : title}
      </h3>

      {/* Summary Content */}
      <div
        contentEditable={!previewMode}
        suppressContentEditableWarning
        onBlur={(e) => handleChange(e.currentTarget.textContent || '')}
        style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: '0.8rem',
          fontFamily: getBodyFontFamily(fontOptions),
          lineHeight: 1.6,
          outline: 'none',
          minHeight: summary ? 'auto' : '60px',
          padding: summary ? '0' : '12px',
          background: summary ? 'transparent' : 'rgba(255,255,255,0.05)',
          borderRadius: summary ? '0' : '6px',
          border: summary ? 'none' : '1px dashed rgba(255,255,255,0.2)',
        }}
        data-placeholder={!summary && !previewMode ? 'Write a brief professional summary...' : undefined}
      >
        {summary || (!previewMode ? 'Write a brief professional summary...' : '')}
      </div>
    </section>
  );
};

export default TwoColumnSummarySection;
