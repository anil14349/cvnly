import React from 'react';
import ResumeHeader from '../layout/ResumeHeader';
import { getBodyFontFamily } from '../../utils/fontUtils';

interface ClassicTemplateProps {
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

// Classic single-column centered layout
const ClassicTemplate: React.FC<ClassicTemplateProps> = ({
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
    <div style={{ fontFamily: getBodyFontFamily(fontOptions) }}>
      {/* Centered Header */}
      <div style={{ 
        textAlign: 'center', 
        borderBottom: fontOptions?.headerLineVisible !== false ? `${fontOptions?.headerLineSize || '2px'} solid ${fontOptions?.headerLineColor || '#1f2937'}` : 'none', 
        paddingBottom: '16px', 
        marginBottom: '24px' 
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

      {/* Single Column Content */}
      {sections.map((section, index) => {
        if (section.visible === false) return null;
        return (
          <div key={section.type + index}>
            {renderSection(section)}
          </div>
        );
      })}
    </div>
  );
};

export default ClassicTemplate;

