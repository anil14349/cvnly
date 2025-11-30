import React from 'react';
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';
import { getHeaderFontFamily, getSubheaderFontFamily, getBodyFontFamily } from '../../utils/fontUtils';

interface MinimalTemplateProps {
  resumeData: any;
  socialLinks: any[];
  fontOptions: any;
  sections: any[];
  sectionTitles: any;
  renderSection: (section: any) => React.ReactNode;
  setResumeData: any;
  deleteSocialLink: any;
  addSocialLink: any;
  updateSocialLink: any;
  previewMode: boolean;
}

/**
 * MinimalTemplate - Ultra-clean, stark design
 * Features:
 * - Left-aligned header (different from centered Classic)
 * - No colors, pure black & white
 * - Thin hairline dividers
 * - Maximum content focus
 */
const MinimalTemplate: React.FC<MinimalTemplateProps> = ({
  resumeData,
  socialLinks,
  fontOptions,
  sections,
  renderSection,
  setResumeData,
  previewMode
}) => {
  const getContact = (type: string) => socialLinks.find(l => l.type === type);

  return (
    <div 
      className="minimal-template"
      style={{ 
        fontFamily: getBodyFontFamily(fontOptions),
        background: '#ffffff',
      }}
    >
      <style>{`
        /* === SECTION HEADERS === */
        .minimal-template .section-header-line {
          margin-bottom: 8px !important;
        }
        .minimal-template .section-header-line h2,
        .minimal-template .section-header-line input {
          font-size: 0.7rem !important;
          font-weight: 500 !important;
          text-transform: uppercase !important;
          letter-spacing: 3px !important;
          color: #000000 !important;
        }
        .minimal-template [style*="background-color: var(--line-color)"] {
          display: none !important;
        }
        .minimal-template .mt-4 {
          margin-top: 0.25rem !important;
        }
        
        /* === BODY TEXT - All Black/Gray + Font Family === */
        .minimal-template h3,
        .minimal-template h4,
        .minimal-template p,
        .minimal-template span,
        .minimal-template div,
        .minimal-template li,
        .minimal-template input,
        .minimal-template textarea {
          color: #333333 !important;
          font-family: inherit !important;
        }
        
        /* Ensure all inputs use body font */
        .minimal-template input,
        .minimal-template textarea,
        .minimal-template [contenteditable] {
          font-family: inherit !important;
        }
        
        /* === SKILLS === */
        .minimal-template .skills-section input {
          color: #333333 !important;
          background: transparent !important;
          border-color: #e5e5e5 !important;
        }
        .minimal-template .skills-section .text-blue-500,
        .minimal-template .skills-section .text-blue-600 {
          color: #333333 !important;
        }
        
        /* Skill bullets - black dots */
        .minimal-template .skills-section li::marker,
        .minimal-template ul li::marker {
          color: #333333 !important;
        }
        
        /* === EXPERIENCE === */
        .minimal-template .experience-section h3,
        .minimal-template .experience-section .font-semibold {
          color: #000000 !important;
          font-weight: 500 !important;
        }
        .minimal-template .experience-section .text-gray-600,
        .minimal-template .experience-section .text-gray-500 {
          color: #555555 !important;
        }
        /* Date - no blue, use gray */
        .minimal-template .experience-section .text-blue-600,
        .minimal-template .experience-section .text-blue-500,
        .minimal-template .education-date,
        .minimal-template [class*="text-blue"] {
          color: #666666 !important;
        }
        
        /* === EDUCATION === */
        .minimal-template .education-section h3 {
          color: #000000 !important;
        }
        .minimal-template .education-section .text-gray-600 {
          color: #555555 !important;
        }
        
        /* === PROJECTS === */
        .minimal-template .projects-section h4 {
          color: #000000 !important;
        }
        
        /* === CERTIFICATIONS === */
        .minimal-template .certifications-section h4 {
          color: #000000 !important;
        }
        
        /* === LINKS === */
        .minimal-template a {
          color: #333333 !important;
          text-decoration: underline !important;
        }
        
        /* === REMOVE COLORED BACKGROUNDS === */
        .minimal-template .bg-blue-50,
        .minimal-template .bg-blue-100,
        .minimal-template [class*="bg-blue"] {
          background: transparent !important;
        }
        
        /* === BORDERS - subtle gray === */
        .minimal-template .border-blue-200,
        .minimal-template .border-blue-300,
        .minimal-template [class*="border-blue"] {
          border-color: #e5e5e5 !important;
        }
        
        /* === BUTTONS === */
        .minimal-template button {
          color: #666666 !important;
        }
        .minimal-template button svg {
          color: #666666 !important;
        }
      `}</style>

      {/* === HEADER - Left Aligned === */}
      <div style={{ 
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: fontOptions?.headerLineVisible !== false ? `${fontOptions?.headerLineSize || '1px'} solid ${fontOptions?.headerLineColor || '#000000'}` : 'none',
      }}>
        {/* Name */}
        <h1
          contentEditable={!previewMode}
          suppressContentEditableWarning
          onBlur={(e) => !previewMode && setResumeData?.({ ...resumeData, name: e.currentTarget.textContent })}
          style={{
            fontSize: '1.5rem',
            fontWeight: 300,
            fontFamily: getHeaderFontFamily(fontOptions),
            color: '#000000',
            margin: '0 0 2px 0',
            outline: 'none',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          {resumeData?.name || 'Your Name'}
        </h1>

        {/* Title */}
        <p
          contentEditable={!previewMode}
          suppressContentEditableWarning
          onBlur={(e) => !previewMode && setResumeData?.({ ...resumeData, title: e.currentTarget.textContent })}
          style={{
            fontSize: '0.8rem',
            fontWeight: 400,
            fontFamily: getSubheaderFontFamily(fontOptions),
            color: '#666666',
            margin: '0 0 12px 0',
            outline: 'none',
          }}
        >
          {resumeData?.title || 'Professional Title'}
        </p>

        {/* Contact - Horizontal with dots */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          fontSize: '0.7rem',
          color: '#333333',
        }}>
          {getContact('email') && (
            <>
              <span>{getContact('email').value}</span>
              <span style={{ color: '#999' }}>•</span>
            </>
          )}
          {getContact('phone') && (
            <>
              <span>{getContact('phone').value}</span>
              <span style={{ color: '#999' }}>•</span>
            </>
          )}
          {getContact('linkedin') && (
            <>
              <span>{getContact('linkedin').value}</span>
              <span style={{ color: '#999' }}>•</span>
            </>
          )}
          {getContact('github') && (
            <>
              <span>{getContact('github').value}</span>
              <span style={{ color: '#999' }}>•</span>
            </>
          )}
          {getContact('location') && (
            <span>{getContact('location').value}</span>
          )}
        </div>
      </div>

      {/* === SECTIONS === */}
      {sections.map((section, index) => {
        if (section.visible === false) return null;
        return (
          <div 
            key={section.type + index} 
            style={{ 
              marginBottom: '14px',
              paddingBottom: '10px',
              borderBottom: index < sections.length - 1 ? '1px solid #eee' : 'none',
            }}
          >
            {renderSection(section)}
          </div>
        );
      })}
    </div>
  );
};

export default MinimalTemplate;
