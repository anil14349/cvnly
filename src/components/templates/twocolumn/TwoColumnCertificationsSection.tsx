import React, { useState } from 'react';
import { X, Plus, ExternalLink } from 'lucide-react';
import type { Certification } from '../../../types/certification';
import { getSubheaderFontFamily, getBodyFontFamily } from '../../../utils/fontUtils';

interface TwoColumnCertificationsSectionProps {
  certifications: Certification[];
  addCertification?: () => void;
  deleteCertification?: (id: string) => void;
  updateCertification?: (id: string, field: string, value: string) => void;
  fontOptions: any;
  title?: string;
  onTitleChange?: (title: string) => void;
  previewMode?: boolean;
}

/**
 * TwoColumnCertificationsSection - Professional dark sidebar certifications
 */
const TwoColumnCertificationsSection: React.FC<TwoColumnCertificationsSectionProps> = ({
  certifications,
  addCertification,
  deleteCertification,
  updateCertification,
  fontOptions,
  title = 'Certifications',
  onTitleChange,
  previewMode = false
}) => {
  return (
    <section>
      {/* Section Title */}
      <h3 style={{
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.6)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '12px',
        fontFamily: getSubheaderFontFamily(fontOptions),
      }}>
        {onTitleChange ? (
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              fontFamily: 'inherit',
              textTransform: 'inherit',
              letterSpacing: 'inherit',
              width: '100%',
              outline: 'none',
            }}
          />
        ) : title}
      </h3>

      {/* Certifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {certifications.map((cert) => (
          <CertificationCard
            key={cert.id}
            cert={cert}
            fontOptions={fontOptions}
            onUpdate={updateCertification}
            onDelete={deleteCertification}
            previewMode={previewMode}
          />
        ))}
      </div>

      {/* Add Certification */}
      {!previewMode && addCertification && (
        <button
          onClick={addCertification}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '12px',
            padding: '8px',
            background: 'transparent',
            border: '1px dashed rgba(255,255,255,0.25)',
            borderRadius: '6px',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
          }}
        >
          <Plus size={14} />
          Add Certification
        </button>
      )}
    </section>
  );
};

interface CertificationCardProps {
  cert: Certification;
  fontOptions: any;
  onUpdate?: (id: string, field: string, value: string) => void;
  onDelete?: (id: string) => void;
  previewMode?: boolean;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  cert,
  fontOptions,
  onUpdate,
  onDelete,
  previewMode,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        paddingLeft: '12px',
        borderLeft: '2px solid rgba(255,255,255,0.2)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Delete Button */}
      {!previewMode && isHovered && onDelete && (
        <button
          onClick={() => onDelete(cert.id)}
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
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
          }}
        >
          <X size={10} color="white" />
        </button>
      )}

      {/* Name */}
      <div
        contentEditable={!previewMode}
        suppressContentEditableWarning
        onBlur={(e) => onUpdate?.(cert.id, 'name', e.currentTarget.textContent || '')}
        style={{
          color: '#ffffff',
          fontSize: '0.85rem',
          fontWeight: 500,
          fontFamily: getSubheaderFontFamily(fontOptions),
          marginBottom: '2px',
          outline: 'none',
          lineHeight: 1.3,
        }}
      >
        {cert.name}
      </div>

      {/* Issuer */}
      <div
        contentEditable={!previewMode}
        suppressContentEditableWarning
        onBlur={(e) => onUpdate?.(cert.id, 'issuer', e.currentTarget.textContent || '')}
        style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.75rem',
          fontFamily: getBodyFontFamily(fontOptions),
          marginBottom: '2px',
          outline: 'none',
        }}
      >
        {cert.issuer}
      </div>

      {/* Date */}
      <div
        contentEditable={!previewMode}
        suppressContentEditableWarning
        onBlur={(e) => onUpdate?.(cert.id, 'date', e.currentTarget.textContent || '')}
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.7rem',
          fontFamily: getBodyFontFamily(fontOptions),
          outline: 'none',
        }}
      >
        {cert.date}
      </div>

      {/* Link */}
      {cert.url && (
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: '#60a5fa',
            fontSize: '0.7rem',
            marginTop: '4px',
            textDecoration: 'none',
          }}
        >
          View <ExternalLink size={10} />
        </a>
      )}
    </div>
  );
};

export default TwoColumnCertificationsSection;
