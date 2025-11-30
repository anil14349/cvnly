import React from "react";
import { X, ExternalLink } from "lucide-react";
import AddSectionButton from "../../common/AddSectionButton";
import {
  CertificationSectionProps,
  Certification,
} from "../../../types/certification";
import SectionHeaderLine from "../../common/SectionHeaderLine";
import SectionControls from "../../common/SectionControls";
import { getBodyFontFamily, getSubheaderFontFamily, getFontWeightValue } from "../../../utils/fontUtils";
import {
  ADD_CERTIFICATION_BUTTON_CLASS,
  DEFAULT_TITLE,
  VIEW_CERTIFICATE_TEXT,
  ADD_CERTIFICATION_TEXT,
  ADD_ICON_SIZE,
  CERTIFICATION_TEXT_CLASS,
} from "../../sections/CertificateSection/constants";

// Convert Tailwind size class to CSS font-size for compact sidebar
const getCompactFontSize = (sizeClass: string, reduction: number = 0): string => {
  const sizeMap: Record<string, number> = {
    'text-xs': 0.65,
    'text-sm': 0.75,
    'text-base': 0.8,
    'text-lg': 0.85,
    'text-xl': 0.9,
    'text-2xl': 0.95,
    'text-3xl': 1,
    'text-4xl': 1.1,
  };
  const baseSize = sizeMap[sizeClass] || 0.75;
  return `${Math.max(0.6, baseSize - reduction)}rem`;
};

// Add dark mode variant to color class
const addDarkModeVariant = (colorClass: string): string => {
  const darkModeMap: { [key: string]: string } = {
    'text-gray-900': 'dark:text-gray-100',
    'text-gray-800': 'dark:text-gray-200',
    'text-gray-700': 'dark:text-gray-300',
    'text-gray-600': 'dark:text-gray-400',
    'text-gray-500': 'dark:text-gray-400',
    'text-black': 'dark:text-white',
    'text-blue-600': 'dark:text-blue-400',
  };
  return darkModeMap[colorClass] ? `${colorClass} ${darkModeMap[colorClass]}` : colorClass;
};

/**
 * ModernCertificationsSection - Optimized for Modern template sidebar
 * Features:
 * - Compact layout
 * - Better spacing for narrow sidebar
 * - Clean card design
 */
const ModernCertificationsSection: React.FC<CertificationSectionProps & { previewMode?: boolean }> = ({
  certifications,
  fontOptions,
  moveSection,
  deleteSection,
  index,
  sectionsLength,
  addCertification = () => { },
  deleteCertification = () => { },
  updateCertification = () => { },
  title = DEFAULT_TITLE,
  onTitleChange,
  previewMode = false
}) => {
  const handleBlur = (cert: Certification, field: string, value: string) => {
    updateCertification(cert.id, field, value);
  };

  // Build style objects for compact sidebar - use inline styles to ensure fontOptions are applied
  const nameStyles: React.CSSProperties = {
    fontFamily: getSubheaderFontFamily(fontOptions),
    fontSize: getCompactFontSize(fontOptions.subheaderSize),
    fontWeight: getFontWeightValue(fontOptions.subheaderWeight),
    fontStyle: fontOptions.subheaderItalic ? 'italic' : 'normal',
    textDecoration: fontOptions.subheaderUnderline ? 'underline' : 'none',
  };

  const bodyStyles: React.CSSProperties = {
    fontFamily: getBodyFontFamily(fontOptions),
    fontSize: getCompactFontSize(fontOptions.bodySize, 0.05),
    fontWeight: getFontWeightValue(fontOptions.bodyWeight),
    fontStyle: fontOptions.bodyItalic ? 'italic' : 'normal',
    textDecoration: fontOptions.bodyUnderline ? 'underline' : 'none',
  };

  const linkStyles: React.CSSProperties = {
    fontFamily: getBodyFontFamily(fontOptions),
    fontSize: getCompactFontSize(fontOptions.bodySize, 0.1),
  };

  const subheaderColorClass = addDarkModeVariant(fontOptions.subheaderColor);
  const bodyColorClass = addDarkModeVariant(fontOptions.bodyColor);

  return (
    <div className="mt-4 relative group modern-certifications">
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

      {/* Certifications List - Compact Layout */}
      <div className="mt-2 space-y-2" style={{ maxWidth: '100%', overflow: 'hidden' }}>
        {certifications.map((cert) => (
          <div 
            key={cert.id} 
            className="group/certification relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2"
            style={{ maxWidth: '100%', overflow: 'hidden' }}
          >
            {!previewMode && (
              <button
                onClick={() => deleteCertification(cert.id)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/certification:opacity-100 transition-opacity shadow-md"
                aria-label="Delete certification"
              >
                <X className="w-3 h-3" />
              </button>
            )}

            {/* Certification Content */}
            <div className="space-y-0.5" style={{ maxWidth: '100%', overflow: 'hidden' }}>
              {/* Name */}
              <h4
                className={`${subheaderColorClass} truncate`}
                style={{ ...nameStyles, maxWidth: '100%' }}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleBlur(cert, "name", e.currentTarget.textContent || "")
                }
              >
                {cert.name}
              </h4>
              
              {/* Issuer */}
              <div
                className={`${bodyColorClass} truncate`}
                style={{ ...bodyStyles, maxWidth: '100%' }}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleBlur(
                    cert,
                    "issuer",
                    e.currentTarget.textContent || ""
                  )
                }
              >
                {cert.issuer}
              </div>
              
              {/* Date */}
              <div
                className="text-gray-500 dark:text-gray-400"
                style={{ ...bodyStyles, maxWidth: '100%' }}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleBlur(cert, "date", e.currentTarget.textContent || "")
                }
              >
                {cert.date}
              </div>

              {/* Link */}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-0.5"
                  style={linkStyles}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleBlur(cert, "url", e.currentTarget.textContent || "")
                  }
                >
                  <span>{VIEW_CERTIFICATE_TEXT}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Certification Button */}
      <div className="mt-2 print:hidden">
        {!previewMode && (
          <AddSectionButton
            onClick={addCertification}
            text={ADD_CERTIFICATION_TEXT}
            buttonClassName={ADD_CERTIFICATION_BUTTON_CLASS}
            iconClassName={ADD_ICON_SIZE}
            textClassName={CERTIFICATION_TEXT_CLASS}
            fontOptions={fontOptions}
          />
        )}
      </div>
    </div>
  );
};

export default ModernCertificationsSection;

