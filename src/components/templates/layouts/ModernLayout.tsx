import React from 'react';
import ResumeHeader from '../../layout/ResumeHeader';
import { ModernSkillsSection, ModernCertificationsSection } from '../modern';
import { getBodyFontFamily } from '../../../utils/fontUtils';

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
  // Additional props for direct section rendering
  skills?: any[];
  setSkills?: (skills: any[]) => void;
  certifications?: any[];
  addCertification?: () => void;
  deleteCertification?: (id: string) => void;
  updateCertification?: (id: string, field: string, value: string) => void;
  onSectionTitleChange?: (sectionType: string, newTitle: string) => void;
  moveSection?: (index: number, direction: 'up' | 'down') => void;
  deleteSection?: (index: number) => void;
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
  previewMode,
  // New props for direct rendering
  skills = [],
  setSkills,
  certifications = [],
  addCertification,
  deleteCertification,
  updateCertification,
  onSectionTitleChange,
  moveSection,
  deleteSection
}) => {
  // Split sections into main and sidebar
  const sidebarTypes = ['skills', 'certifications'];
  const mainSections = sections.filter(s => !sidebarTypes.includes(s.type));
  const sidebarSections = sections.filter(s => sidebarTypes.includes(s.type));

  // Render sidebar section using Modern-specific components
  const renderSidebarSection = (section: any) => {
    const sectionIndex = sections.findIndex(s => s.type === section.type);
    
    if (section.type === 'skills') {
      return (
        <ModernSkillsSection
          index={sectionIndex}
          moveSection={moveSection || (() => {})}
          deleteSection={deleteSection || (() => {})}
          sectionsLength={sections.length}
          fontOptions={fontOptions}
          skills={skills}
          setSkills={setSkills}
          title={sectionTitles?.skills || 'Skills'}
          onTitleChange={onSectionTitleChange ? (title) => onSectionTitleChange('skills', title) : undefined}
          previewMode={previewMode}
        />
      );
    }
    
    if (section.type === 'certifications') {
      return (
        <ModernCertificationsSection
          index={sectionIndex}
          moveSection={moveSection || (() => {})}
          deleteSection={deleteSection || (() => {})}
          sectionsLength={sections.length}
          fontOptions={fontOptions}
          certifications={certifications}
          addCertification={addCertification || (() => {})}
          deleteCertification={deleteCertification || (() => {})}
          updateCertification={updateCertification || (() => {})}
          title={sectionTitles?.certifications || 'Certifications'}
          onTitleChange={onSectionTitleChange ? (title) => onSectionTitleChange('certifications', title) : undefined}
          previewMode={previewMode}
        />
      );
    }
    
    // Fallback to generic renderSection
    return renderSection(section);
  };

  return (
    <div className="modern-layout" style={{ fontFamily: getBodyFontFamily(fontOptions) }}>
      <style>{`
        .modern-layout {
          --sidebar-bg: #f8fafc;
          --sidebar-border: #e2e8f0;
        }
        
        .dark .modern-layout {
          --sidebar-bg: rgba(30, 41, 59, 0.4);
          --sidebar-border: rgba(71, 85, 105, 0.4);
        }
        
        /* Header section - ensure white text on gradient */
        .modern-header-gradient h1,
        .modern-header-gradient h2,
        .modern-header-gradient span,
        .modern-header-gradient input,
        .modern-header-gradient a,
        .modern-header-gradient button {
          color: white !important;
        }
        
        .modern-header-gradient input::placeholder {
          color: rgba(255,255,255,0.6) !important;
        }
        
        .modern-header-gradient .text-gray-600,
        .modern-header-gradient .text-gray-700,
        .modern-header-gradient .text-gray-800,
        .modern-header-gradient .text-gray-900,
        .modern-header-gradient .text-black {
          color: white !important;
        }
        
        .modern-header-gradient svg {
          color: rgba(255,255,255,0.8) !important;
        }
        
        /* Sidebar section spacing */
        .modern-sidebar .sidebar-section {
          margin-top: 0 !important;
        }
        
        .modern-sidebar .sidebar-section .mt-4 {
          margin-top: 0 !important;
        }
        
        /* Section headers in sidebar - more compact */
        .modern-sidebar .sidebar-section .section-header-line h2 {
          font-size: 1rem;
        }
      `}</style>
      {/* Full-width gradient header */}
      <div 
        className="modern-header-gradient"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '32px',
          margin: '-24px -24px 24px -24px',
          borderRadius: '0 0 8px 8px'
        }}
      >
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
      <div style={{ display: 'flex', gap: '20px', width: '100%', overflow: 'hidden' }}>
        {/* Main content - flexible */}
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          {mainSections.map((section, index) => {
            if (section.visible === false) return null;
            return (
              <div key={section.type + index}>
                {renderSection(section)}
              </div>
            );
          })}
        </div>

        {/* Sidebar - fixed width */}
        <div 
          className="modern-sidebar dark:bg-gray-800/30"
          style={{ 
            flex: '0 0 240px', 
            maxWidth: '240px',
            background: 'var(--sidebar-bg, #f8fafc)', 
            padding: '16px', 
            borderRadius: '12px',
            border: '1px solid var(--sidebar-border, #e2e8f0)',
            overflow: 'hidden'
          }}
        >
          {sidebarSections.map((section, index) => {
            if (section.visible === false) return null;
            return (
              <div 
                key={section.type + index} 
                className="sidebar-section"
                style={{ marginBottom: index < sidebarSections.length - 1 ? '24px' : '0' }}
              >
                {renderSidebarSection(section)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;

