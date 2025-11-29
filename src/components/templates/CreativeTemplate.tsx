import React from 'react';
import ResumeHeader from '../layout/ResumeHeader';

interface CreativeTemplateProps {
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

// Creative layout with colorful gradient header
const CreativeTemplate: React.FC<CreativeTemplateProps> = ({
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
    <div style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
      {/* Gradient animated header */}
      <div style={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%)',
        color: 'white',
        padding: '40px',
        margin: '-24px -24px 32px -24px',
        borderRadius: '0 0 24px 24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
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

      {/* Single column with colorful accents */}
      {sections.map((section, index) => {
        if (!section.visible) return null;
        return (
          <div key={section.type + index}>
            {renderSection(section)}
          </div>
        );
      })}
    </div>
  );
};

export default CreativeTemplate;

