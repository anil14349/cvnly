import React from 'react';
import { EducationSectionProps } from '../../../types/education';
import SectionControls from '../../common/SectionControls';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import { Plus, X } from 'lucide-react';
import FormattedText from '../../common/FormattedText';

const EducationSection: React.FC<EducationSectionProps> = ({
  educations,
  fontOptions,
  moveSection,
  deleteSection,
  index,
  sectionsLength,
  addEducation,
  deleteEducation,
  updateEducation,
  title = "Education",
  onTitleChange
}) => {
  const updateDetail = (educationId: string, detailIndex: number, newText: string) => {
    const education = educations.find(edu => edu.id === educationId);
    if (!education) return;

    const updatedDetails = [...education.details];
    updatedDetails[detailIndex] = newText;

    updateEducation?.(educationId, 'details', JSON.stringify(updatedDetails));
  };

  return (
    <div
      style={{
        background: fontOptions.theme === 'dark'
          ? fontOptions.widgetBgDark || '#181f2a'
          : fontOptions.widgetBgLight || '#fff',
      }}
      className="relative group"
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

      <div className="mt-2 space-y-4">
        {educations.map((edu) => (
          <div key={edu.id} className="relative group/education space-y-2">
            <button
              onClick={() => deleteEducation?.(edu.id)}
              className="absolute -right-2 -top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/education:opacity-100 transition-opacity print:hidden"
              aria-label={`Delete education: ${edu.school}`}
            >
              <X className="w-3 h-3" aria-hidden="true" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
              <div className="space-y-0.5">
                <h3 className={`${fontOptions.subheaderSize} ${fontOptions.subheaderWeight} ${fontOptions.subheaderColor} font-header-${fontOptions.headerFont.toLowerCase()} ${fontOptions.subheaderItalic ? 'italic' : ''} ${fontOptions.subheaderUnderline ? 'underline' : ''}`}>
                  <FormattedText
                    text={edu.school}
                    fontOptions={fontOptions}
                    onTextChange={(newText) => updateEducation?.(edu.id, 'school', newText)}
                    isEditing={true}
                    className="inline-block"
                  />
                </h3>
                <div className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
                  <FormattedText
                    text={edu.degree}
                    fontOptions={fontOptions}
                    onTextChange={(newText) => updateEducation?.(edu.id, 'degree', newText)}
                    isEditing={true}
                    className="inline-block"
                  />
                  {edu.field && (
                    <>
                      {' in '}
                      <FormattedText
                        text={edu.field}
                        fontOptions={fontOptions}
                        onTextChange={(newText) => updateEducation?.(edu.id, 'field', newText)}
                        isEditing={true}
                        className="inline-block"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
                <FormattedText
                  text={edu.startDate}
                  fontOptions={fontOptions}
                  onTextChange={(newText) => updateEducation?.(edu.id, 'startDate', newText)}
                  isEditing={true}
                  className="inline-block"
                />
                {' - '}
                <FormattedText
                  text={edu.endDate || 'Present'}
                  fontOptions={fontOptions}
                  onTextChange={(newText) => updateEducation?.(edu.id, 'endDate', newText)}
                  isEditing={true}
                  className="inline-block"
                />
              </div>
            </div>

            {edu.gpa && (
              <div className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
                GPA:{' '}
                <FormattedText
                  text={edu.gpa}
                  fontOptions={fontOptions}
                  onTextChange={(newText) => updateEducation?.(edu.id, 'gpa', newText)}
                  isEditing={true}
                  className="inline-block"
                />
              </div>
            )}

            {edu.details && edu.details.length > 0 && (
              <ul className={`list-disc ml-4 space-y-0.5 ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
                {edu.details.map((detail, idx) => (
                  <li key={idx} className="group/detail relative">
                    <FormattedText
                      text={detail}
                      fontOptions={fontOptions}
                      onTextChange={(newText) => updateDetail(edu.id, idx, newText)}
                      isEditing={true}
                      className="inline-block"
                    />
                    <button
                      onClick={() => {
                        const updatedDetails = edu.details.filter((_, i) => i !== idx);
                        updateEducation?.(edu.id, 'details', JSON.stringify(updatedDetails));
                      }}
                      className="absolute -right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover/detail:opacity-100 transition-opacity print:hidden"
                      aria-label={`Delete detail: ${detail.substring(0, 20)}...`}
                    >
                      <X className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={addEducation}
        className={`mt-4 flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
        aria-label="Add education"
      >
        <Plus className="w-3 h-3" aria-hidden="true" />
        <span>Add Education</span>
      </button>
    </div>
  );
};

export default EducationSection;