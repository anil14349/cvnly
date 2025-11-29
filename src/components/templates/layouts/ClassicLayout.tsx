import React from 'react';
import ResumeHeader from '../../layout/ResumeHeader';

interface ClassicLayoutProps {
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

// Traditional single-column layout with centered header
const ClassicLayout: React.FC<ClassicLayoutProps> = ({
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
    <div className="classic-layout" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Centered Header */}
      <div style={{ textAlign: 'center', borderBottom: '1px solid #ddd', paddingBottom: '12px', marginBottom: '12px' }}>
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

      {/* Single Column Content */}
      <div>
        {sections.map((section, index) => {
          if (!section.visible) return null;
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

export default ClassicLayout;

