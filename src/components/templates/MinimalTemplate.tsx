import React from 'react';
import ResumeHeader from '../layout/ResumeHeader';

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

// Ultra-minimal layout with maximum whitespace
const MinimalTemplate: React.FC<MinimalTemplateProps> = ({
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
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      {/* Simple Header */}
      <div style={{ paddingBottom: '32px', marginBottom: '40px' }}>
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

      {/* Maximum whitespace between sections */}
      {sections.map((section, index) => {
        if (section.visible === false) return null;
        return (
          <div key={section.type + index} style={{ marginBottom: '40px' }}>
            {renderSection(section)}
          </div>
        );
      })}
    </div>
  );
};

export default MinimalTemplate;

