import React from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Circle } from 'lucide-react';
import { getHeaderFontFamily, getSubheaderFontFamily, getBodyFontFamily } from '../../utils/fontUtils';

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
  // Additional props for skills
  skills?: any[];
  setSkills?: (skills: any[]) => void;
}

/**
 * CreativeTemplate - Bold, visually distinctive design
 * Features:
 * - Left accent strip with gradient
 * - Bold geometric shapes
 * - Vibrant color palette
 * - Visual skill indicators
 */
const CreativeTemplate: React.FC<CreativeTemplateProps> = ({
  resumeData,
  socialLinks,
  fontOptions,
  sections,
  renderSection,
  setResumeData,
  previewMode,
  skills = [],
}) => {
  // Creative color palette
  const colors = {
    primary: '#6366f1',    // Indigo
    secondary: '#ec4899',  // Pink
    accent: '#14b8a6',     // Teal
    dark: '#1e1b4b',       // Dark indigo
    light: '#f8fafc',
    gradient: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
  };

  const getContact = (type: string) => socialLinks.find(l => l.type === type);

  // Separate skills section from other sections
  const skillsSection = sections.find(s => s.type === 'skills');
  const otherSections = sections.filter(s => s.type !== 'skills');

  return (
    <div 
      className="creative-template"
      style={{ 
        fontFamily: getBodyFontFamily(fontOptions),
        background: '#ffffff',
        display: 'flex',
        minHeight: '100%',
        margin: '-24px',
      }}
    >
      <style>{`
        .creative-template .section-header-line h2,
        .creative-template .section-header-line input {
          font-size: 0.9rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 2px !important;
          color: ${colors.primary} !important;
        }
        .creative-template [style*="background-color: var(--line-color)"] {
          background: ${colors.gradient} !important;
          height: 3px !important;
          border-radius: 2px !important;
        }
        .creative-template .mt-4 {
          margin-top: 0.5rem !important;
        }
      `}</style>

      {/* === LEFT ACCENT STRIP === */}
      <div style={{
        width: '8px',
        background: colors.gradient,
        flexShrink: 0,
      }} />

      {/* === MAIN CONTENT AREA === */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* === HEADER SECTION === */}
        <div style={{
          padding: '24px 32px',
          background: colors.light,
          borderBottom: `3px solid ${colors.primary}`,
          position: 'relative',
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '24px',
            display: 'flex',
            gap: '8px',
            opacity: 0.3,
          }}>
            <Circle size={12} fill={colors.primary} stroke="none" />
            <Circle size={12} fill={colors.secondary} stroke="none" />
            <Circle size={12} fill={colors.accent} stroke="none" />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
            {/* Name & Title */}
            <div style={{ flex: 1 }}>
              <h1
                contentEditable={!previewMode}
                suppressContentEditableWarning
                onBlur={(e) => !previewMode && setResumeData?.({ ...resumeData, name: e.currentTarget.textContent })}
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  fontFamily: getHeaderFontFamily(fontOptions),
                  color: colors.dark,
                  margin: '0 0 4px 0',
                  outline: 'none',
                  letterSpacing: '-0.5px',
                }}
              >
                {resumeData?.name || 'Your Name'}
              </h1>
              <p
                contentEditable={!previewMode}
                suppressContentEditableWarning
                onBlur={(e) => !previewMode && setResumeData?.({ ...resumeData, title: e.currentTarget.textContent })}
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  fontFamily: getSubheaderFontFamily(fontOptions),
                  color: colors.primary,
                  margin: 0,
                  outline: 'none',
                }}
              >
                {resumeData?.title || 'Professional Title'}
              </p>
            </div>

            {/* Contact Info - Stacked */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontSize: '0.75rem',
              color: colors.dark,
            }}>
              {getContact('email') && (
                <ContactItem icon={<Mail size={12} />} value={getContact('email').value} color={colors.primary} />
              )}
              {getContact('phone') && (
                <ContactItem icon={<Phone size={12} />} value={getContact('phone').value} color={colors.secondary} />
              )}
              {getContact('linkedin') && (
                <ContactItem icon={<Linkedin size={12} />} value={getContact('linkedin').value} color={colors.accent} />
              )}
              {getContact('github') && (
                <ContactItem icon={<Github size={12} />} value={getContact('github').value} color={colors.primary} />
              )}
              {getContact('location') && (
                <ContactItem icon={<MapPin size={12} />} value={getContact('location').value} color={colors.secondary} />
              )}
            </div>
          </div>
        </div>

        {/* === BODY CONTENT === */}
        <div style={{ display: 'flex', flex: 1 }}>
          
          {/* Main Column */}
          <div style={{ flex: 1, padding: '20px 28px' }}>
            {otherSections.map((section, index) => {
              if (section.visible === false) return null;
              return (
                <div key={section.type + index} style={{ marginBottom: '16px' }}>
                  {renderSection(section)}
                </div>
              );
            })}
          </div>

          {/* Skills Sidebar (if skills exist) */}
          {skillsSection && skillsSection.visible !== false && skills.length > 0 && (
            <div style={{
              width: '180px',
              background: colors.light,
              padding: '20px 16px',
              borderLeft: `1px solid ${colors.primary}20`,
            }}>
              <h3 style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: colors.primary,
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: `2px solid ${colors.primary}`,
              }}>
                Skills
              </h3>
              
              {skills.map((category, idx) => (
                <div key={category.id || idx} style={{ marginBottom: '14px' }}>
                  <div style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: colors.dark,
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    {category.category}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {category.items.map((skill: string, skillIdx: number) => (
                      <span
                        key={skillIdx}
                        style={{
                          fontSize: '0.65rem',
                          padding: '2px 8px',
                          background: `${colors.primary}15`,
                          color: colors.primary,
                          borderRadius: '10px',
                          fontWeight: 500,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === FOOTER ACCENT === */}
        <div style={{
          height: '4px',
          background: colors.gradient,
        }} />
      </div>
    </div>
  );
};

// Contact item with colored icon
const ContactItem: React.FC<{ icon: React.ReactNode; value: string; color: string }> = ({ icon, value, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <span style={{ color, display: 'flex' }}>{icon}</span>
    <span style={{ color: '#374151' }}>{value}</span>
  </div>
);

export default CreativeTemplate;
