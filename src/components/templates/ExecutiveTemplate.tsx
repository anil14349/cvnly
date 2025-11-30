import React from 'react';
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';
import { getHeaderFontFamily, getSubheaderFontFamily, getBodyFontFamily } from '../../utils/fontUtils';

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

/**
 * ExecutiveTemplate - Sophisticated, authoritative design for senior professionals
 * Features:
 * - Elegant serif typography
 * - Gold/Navy color accents
 * - Distinguished borders and spacing
 * - Clean, hierarchical layout
 */
const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({
  resumeData,
  socialLinks,
  fontOptions,
  sections,
  renderSection,
  setResumeData,
  previewMode
}) => {
  // Executive color palette
  const colors = {
    navy: '#1e3a5f',
    gold: '#b8860b',
    charcoal: '#2d3748',
    warmGray: '#4a5568',
    lightGray: '#718096',
    cream: '#faf9f7',
    border: '#c9a227',
  };

  // Get contact info
  const getContact = (type: string) => socialLinks.find(l => l.type === type);

  return (
    <div 
      className="executive-template"
      style={{ 
        fontFamily: getBodyFontFamily(fontOptions),
        background: colors.cream,
        minHeight: '100%',
        margin: '-24px',
        padding: '0',
      }}
    >
      <style>{`
        .executive-template .section-header-line {
          border-bottom: none !important;
        }
        .executive-template .section-header-line h2 {
          color: ${colors.navy} !important;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.85rem !important;
          font-weight: 600 !important;
        }
        .executive-template .section-header-line input {
          color: ${colors.navy} !important;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .executive-template [style*="background-color: var(--line-color)"] {
          background-color: ${colors.gold} !important;
          height: 2px !important;
        }
      `}</style>

      {/* === HEADER SECTION === */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.navy} 0%, #0d1f33 100%)`,
        padding: '28px 32px',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Gold accent line */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '3px',
          background: colors.gold,
        }} />

        {/* Name */}
        <h1
          contentEditable={!previewMode}
          suppressContentEditableWarning
          onBlur={(e) => !previewMode && setResumeData?.({ ...resumeData, name: e.currentTarget.textContent })}
          style={{
            fontSize: '1.75rem',
            fontWeight: 400,
            fontFamily: "'Playfair Display', Georgia, serif",
            color: '#ffffff',
            margin: '0 0 4px 0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            outline: 'none',
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
            fontSize: '0.85rem',
            fontFamily: getSubheaderFontFamily(fontOptions),
            color: colors.gold,
            margin: '0 0 12px 0',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            outline: 'none',
          }}
        >
          {resumeData?.title || 'Professional Title'}
        </p>

        {/* Contact Info - Horizontal */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          marginTop: '16px',
        }}>
          {getContact('email') && (
            <ContactBadge icon={<Mail size={14} />} value={getContact('email').value} />
          )}
          {getContact('phone') && (
            <ContactBadge icon={<Phone size={14} />} value={getContact('phone').value} />
          )}
          {getContact('linkedin') && (
            <ContactBadge icon={<Linkedin size={14} />} value={getContact('linkedin').value} />
          )}
          {getContact('github') && (
            <ContactBadge icon={<Github size={14} />} value={getContact('github').value} />
          )}
          {getContact('location') && (
            <ContactBadge icon={<MapPin size={14} />} value={getContact('location').value} />
          )}
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div style={{ padding: '24px 40px' }}>
        {sections.map((section, index) => {
          if (section.visible === false) return null;
          return (
            <div 
              key={section.type + index} 
              style={{ 
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: index < sections.length - 1 ? `1px solid ${colors.border}15` : 'none',
              }}
            >
              {renderSection(section)}
            </div>
          );
        })}
      </div>

      {/* === FOOTER ACCENT === */}
      <div style={{
        height: '2px',
        background: `linear-gradient(90deg, transparent 0%, ${colors.gold} 50%, transparent 100%)`,
        margin: '0 40px 16px 40px',
      }} />
    </div>
  );
};

// Contact badge component
const ContactBadge: React.FC<{ icon: React.ReactNode; value: string }> = ({ icon, value }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'rgba(255,255,255,0.85)',
    fontSize: '0.8rem',
  }}>
    <span style={{ opacity: 0.7 }}>{icon}</span>
    <span>{value}</span>
  </div>
);

export default ExecutiveTemplate;
