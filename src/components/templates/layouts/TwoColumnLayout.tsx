import React from 'react';
import { Mail, Phone, Linkedin, MapPin, Github } from 'lucide-react';
import { TwoColumnSkillsSection, TwoColumnCertificationsSection, TwoColumnSummarySection } from '../twocolumn';
import { getHeaderFontFamily, getSubheaderFontFamily, getBodyFontFamily } from '../../../utils/fontUtils';

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

/**
 * TwoColumnLayout - Professional two-column resume template
 * Left sidebar: Header, Contact, Summary, Skills, Certifications
 * Right main: Experience, Education, Projects
 */
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
  previewMode,
  skills = [],
  setSkills,
  certifications = [],
  addCertification,
  deleteCertification,
  updateCertification,
  onSectionTitleChange,
}) => {
  // Split sections
  const sidebarTypes = ['summary', 'skills', 'certifications'];
  const sidebarSections = sections.filter(s => sidebarTypes.includes(s.type));
  const mainSections = sections.filter(s => !sidebarTypes.includes(s.type));

  // Get contact info from socialLinks
  const getContactInfo = () => {
    const email = socialLinks.find(l => l.type === 'email');
    const phone = socialLinks.find(l => l.type === 'phone');
    const linkedin = socialLinks.find(l => l.type === 'linkedin');
    const github = socialLinks.find(l => l.type === 'github');
    const location = socialLinks.find(l => l.type === 'location');
    return { email, phone, linkedin, github, location };
  };

  const contacts = getContactInfo();

  // Render sidebar section
  const renderSidebarSection = (section: any) => {
    if (section.type === 'summary') {
      return (
        <TwoColumnSummarySection
          fontOptions={fontOptions}
          title={sectionTitles?.summary || 'About Me'}
          onTitleChange={onSectionTitleChange ? (title) => onSectionTitleChange('summary', title) : undefined}
          previewMode={previewMode}
        />
      );
    }
    
    if (section.type === 'skills') {
      return (
        <TwoColumnSkillsSection
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
        <TwoColumnCertificationsSection
          fontOptions={fontOptions}
          certifications={certifications}
          addCertification={addCertification}
          deleteCertification={deleteCertification}
          updateCertification={updateCertification}
          title={sectionTitles?.certifications || 'Certifications'}
          onTitleChange={onSectionTitleChange ? (title) => onSectionTitleChange('certifications', title) : undefined}
          previewMode={previewMode}
        />
      );
    }
    
    return null;
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100%',
      background: '#ffffff',
      margin: '-24px',
    }}>
      {/* ===== LEFT SIDEBAR ===== */}
      <div style={{
        width: '320px',
        minWidth: '320px',
        background: 'linear-gradient(180deg, #1e3a5f 0%, #0d1f33 100%)',
        color: '#ffffff',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        {/* === HEADER SECTION === */}
        <div style={{ 
          textAlign: 'center', 
          paddingBottom: '20px', 
          borderBottom: fontOptions?.headerLineVisible !== false ? `${fontOptions?.headerLineSize || '1px'} solid rgba(255,255,255,0.15)` : 'none' 
        }}>
          {/* Name */}
          <h1 
            contentEditable={!previewMode}
            suppressContentEditableWarning
            onBlur={(e) => !previewMode && setResumeData?.({ ...resumeData, name: e.currentTarget.textContent })}
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              fontFamily: getHeaderFontFamily(fontOptions),
              color: '#ffffff',
              margin: '0 0 8px 0',
              outline: 'none',
              lineHeight: 1.2,
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
              fontSize: '0.95rem',
              fontFamily: getSubheaderFontFamily(fontOptions),
              color: 'rgba(255,255,255,0.85)',
              margin: 0,
              outline: 'none',
              fontWeight: 400,
            }}
          >
            {resumeData?.title || 'Professional Title'}
          </p>
        </div>

        {/* === CONTACT SECTION === */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '4px',
          }}>
            Contact
          </h3>
          
          {contacts.email && (
            <ContactItem 
              icon={<Mail size={14} />} 
              value={contacts.email.value}
              previewMode={previewMode}
              onChange={(val) => updateSocialLink?.(contacts.email.id, 'value', val)}
              onDelete={() => deleteSocialLink?.(contacts.email.id)}
              fontFamily={getBodyFontFamily(fontOptions)}
            />
          )}
          
          {contacts.phone && (
            <ContactItem 
              icon={<Phone size={14} />} 
              value={contacts.phone.value}
              previewMode={previewMode}
              onChange={(val) => updateSocialLink?.(contacts.phone.id, 'value', val)}
              onDelete={() => deleteSocialLink?.(contacts.phone.id)}
              fontFamily={getBodyFontFamily(fontOptions)}
            />
          )}
          
          {contacts.linkedin && (
            <ContactItem 
              icon={<Linkedin size={14} />} 
              value={contacts.linkedin.value}
              previewMode={previewMode}
              onChange={(val) => updateSocialLink?.(contacts.linkedin.id, 'value', val)}
              onDelete={() => deleteSocialLink?.(contacts.linkedin.id)}
              fontFamily={getBodyFontFamily(fontOptions)}
            />
          )}
          
          {contacts.github && (
            <ContactItem 
              icon={<Github size={14} />} 
              value={contacts.github.value}
              previewMode={previewMode}
              onChange={(val) => updateSocialLink?.(contacts.github.id, 'value', val)}
              onDelete={() => deleteSocialLink?.(contacts.github.id)}
              fontFamily={getBodyFontFamily(fontOptions)}
            />
          )}
          
          {contacts.location && (
            <ContactItem 
              icon={<MapPin size={14} />} 
              value={contacts.location.value}
              previewMode={previewMode}
              onChange={(val) => updateSocialLink?.(contacts.location.id, 'value', val)}
              onDelete={() => deleteSocialLink?.(contacts.location.id)}
              fontFamily={getBodyFontFamily(fontOptions)}
            />
          )}
        </div>

        {/* === SIDEBAR SECTIONS === */}
        {sidebarSections.map((section, index) => {
          if (section.visible === false) return null;
          return (
            <div key={section.type + index}>
              {renderSidebarSection(section)}
            </div>
          );
        })}
      </div>

      {/* ===== RIGHT MAIN CONTENT ===== */}
      <div style={{
        flex: 1,
        padding: '32px',
        background: '#ffffff',
        minWidth: 0,
      }}>
        {mainSections.map((section, index) => {
          if (section.visible === false) return null;
          return (
            <div key={section.type + index} style={{ marginBottom: '24px' }}>
              {renderSection(section)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Contact item component
interface ContactItemProps {
  icon: React.ReactNode;
  value: string;
  previewMode?: boolean;
  onChange?: (value: string) => void;
  onDelete?: () => void;
  fontFamily: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, value, previewMode, onChange, onDelete, fontFamily }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div 
      style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ color: 'rgba(255,255,255,0.6)', display: 'flex' }}>{icon}</span>
      <span
        contentEditable={!previewMode}
        suppressContentEditableWarning
        onBlur={(e) => onChange?.(e.currentTarget.textContent || '')}
        style={{
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.9)',
          fontFamily,
          outline: 'none',
          wordBreak: 'break-all',
          flex: 1,
        }}
      >
        {value}
      </span>
      {!previewMode && isHovered && onDelete && (
        <button
          onClick={onDelete}
          style={{
            background: 'rgba(239, 68, 68, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
          }}
          title="Delete"
        >
          <span style={{ color: 'white', fontSize: '10px', lineHeight: 1 }}>×</span>
        </button>
      )}
    </div>
  );
};

export default TwoColumnLayout;
