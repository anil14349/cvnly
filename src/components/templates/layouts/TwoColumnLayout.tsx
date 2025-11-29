import React from 'react';
import ResumeHeader from '../../layout/ResumeHeader';

interface TwoColumnLayoutProps {
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

// Professional two-column layout with left sidebar
const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
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
  const leftColumnTypes = ['summary', 'skills', 'certifications'];
  const leftSections = sections.filter(s => leftColumnTypes.includes(s.type));
  const rightSections = sections.filter(s => !leftColumnTypes.includes(s.type));

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', display: 'flex', gap: '24px' }}>
      {/* Left Column - 35% */}
      <div style={{
        flex: '0 0 35%',
        background: '#2c3e50',
        color: 'white',
        padding: '24px',
        margin: '-24px 0 -24px -24px',
        minHeight: '100vh'
      }}>
        {/* Header in sidebar */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
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

        {/* Left column sections */}
        {leftSections.map((section, index) => {
          if (section.visible === false) return null;
          return (
            <div key={section.type + index} style={{ marginBottom: '24px', color: '#ecf0f1' }}>
              {renderSection(section)}
            </div>
          );
        })}
      </div>

      {/* Right Column - 65% */}
      <div style={{ flex: '0 0 65%', padding: '24px 24px 24px 0' }}>
        {rightSections.map((section, index) => {
          if (section.visible === false) return null;
          return (
            <div key={section.type + index}>
              {renderSection(section)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TwoColumnLayout;

