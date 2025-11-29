import React from 'react';
import ResumeHeader from '../../layout/ResumeHeader';

interface ModernLayoutProps {
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

// Two-column layout with sidebar for skills/contact
const ModernLayout: React.FC<ModernLayoutProps> = ({
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
  // Split sections into main and sidebar
  const sidebarTypes = ['skills', 'certifications'];
  const mainSections = sections.filter(s => !sidebarTypes.includes(s.type));
  const sidebarSections = sections.filter(s => sidebarTypes.includes(s.type));

  return (
    <div className="modern-layout" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Full-width gradient header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '32px',
        margin: '-24px -24px 24px -24px',
        borderRadius: '0 0 8px 8px'
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

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Main content - 70% */}
        <div style={{ flex: '0 0 70%' }}>
          {mainSections.map((section, index) => {
            if (!section.visible) return null;
            return (
              <div key={section.type + index}>
                {renderSection(section)}
              </div>
            );
          })}
        </div>

        {/* Sidebar - 30% */}
        <div style={{ flex: '0 0 30%', background: '#f7fafc', padding: '16px', borderRadius: '8px' }}>
          {sidebarSections.map((section, index) => {
            if (!section.visible) return null;
            return (
              <div key={section.type + index} style={{ marginBottom: '20px' }}>
                {renderSection(section)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;

