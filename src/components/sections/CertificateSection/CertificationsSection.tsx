import React from 'react';
import { X, Plus, ExternalLink } from 'lucide-react';
import { CertificationSectionProps } from '../../../types/certification';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import SectionControls from '../../common/SectionControls';

const CertificationsSection: React.FC<CertificationSectionProps> = ({
  certifications,
  fontOptions,
  moveSection,
  deleteSection,
  index,
  sectionsLength,
  addCertification = () => { },
  deleteCertification = () => { },
  updateCertification = () => { },
  title = "Certifications",
  onTitleChange
}) => {
  const handleBlur = (cert: any, field: string, value: string) => {
    updateCertification(cert.id, field, value);
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

      <div className="mt-4 space-y-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="relative group/certification">
            <button
              onClick={() => deleteCertification(cert.id)}
              className="absolute -right-2 -top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/certification:opacity-100 transition-opacity print:hidden"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <div>
                <h4
                  className={`${fontOptions.subheaderSize} ${fontOptions.subheaderWeight} ${fontOptions.subheaderLineHeight} ${fontOptions.subheaderLetterSpacing} text-gray-800 dark:text-gray-800 font-header-${fontOptions.headerFont.toLowerCase()} ${fontOptions.subheaderItalic ? 'italic' : ''} ${fontOptions.subheaderUnderline ? 'underline' : ''}`}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(cert, 'name', e.currentTarget.textContent || '')}
                >
                  {cert.name}
                </h4>
                <div
                  className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyLineHeight} ${fontOptions.bodyLetterSpacing} text-gray-600 dark:text-gray-700 font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(cert, 'issuer', e.currentTarget.textContent || '')}
                >
                  {cert.issuer}
                </div>
              </div>
              <div
                className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyLineHeight} ${fontOptions.bodyLetterSpacing} text-gray-500 dark:text-gray-700 text-sm mt-1 sm:mt-0 font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur(cert, 'date', e.currentTarget.textContent || '')}
              >
                {cert.date}
              </div>
            </div>

            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyLineHeight} ${fontOptions.bodyLetterSpacing} text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1 font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur(cert, 'url', e.currentTarget.textContent || '')}
              >
                <span>View Certificate</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addCertification}
        className={`mt-6 flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
        aria-label="Add certification"
      >
        <Plus className="w-3 h-3" aria-hidden="true" />
        <span>Add Certification</span>
      </button>
    </div>
  );
};

export default CertificationsSection;