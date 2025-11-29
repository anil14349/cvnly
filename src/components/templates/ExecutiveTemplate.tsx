import React from 'react';
import ResumeHeader from '../layout/ResumeHeader';

interface ExecutiveTemplateProps {
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

// Executive layout with centered design and decorative borders
const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({
  resumeData,
  socialLinks,
  fontOptions,
  sections,
  sectionTitles,
  renderSection,
  setResumeData,
  deleteSocialLink,
  addSocialLink,
  updateSocialLink,
  previewMode
}) => {
  return (
    <div style={{ fontFamily: 'Garamond, Georgia, serif' }}>
      {/* Bordered Header */}
      <div style={{
        textAlign: 'center',
        borderTop: '4px solid #2c3e50',
        borderBottom: '4px solid #2c3e50',
        padding: '32px 0',
        marginBottom: '40px'
      }}>
        <ResumeHeader
          resumeData={resumeData}
          setResumeData={previewMode ? (() => {}) : setResumeData}
          socialLinks={socialLinks}
          deleteSocialLink={previewMode ? (() => {}) : deleteSocialLink}
          addSocialLink={previewMode ? (() => {}) : addSocialLink}
          updateSocialLink={previewMode ? (() => {}) : updateSocialLink}
          fontOptions={fontOptions}
        />
      </div>

      {/* Centered sections with decorative lines */}
      {sections.map((section, index) => {
        if (section.visible === false) return null;
        return (
          <div key={section.type + index} style={{ marginBottom: '36px', maxWidth: '90%', margin: '0 auto 36px auto' }}>
            {renderSection(section)}
          </div>
        );
      })}
    </div>
  );
};

export default ExecutiveTemplate;

