import React from 'react';
import ResumeHeader from '../../layout/ResumeHeader';
import { getBodyFontFamily } from '../../../utils/fontUtils';

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
    <div className="classic-layout" style={{ fontFamily: getBodyFontFamily(fontOptions) }}>
      {/* Centered Header */}
      <div style={{ 
        textAlign: 'center', 
        borderBottom: fontOptions?.headerLineVisible !== false ? `${fontOptions?.headerLineSize || '1px'} solid ${fontOptions?.headerLineColor || '#1f2937'}` : 'none', 
        paddingBottom: '12px', 
        marginBottom: '12px' 
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
      <div>
        {sections.map((section, index) => {
          if (section.visible === false) return null;
          return (
            <div key={section.type + index} style={{ marginBottom: '12px' }}>
              {renderSection(section)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassicLayout;

