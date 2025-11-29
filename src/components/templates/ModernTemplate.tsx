import React from 'react';

interface ModernTemplateProps {
  children: React.ReactNode;
  className?: string;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ children, className }) => {
  return (
    <div className={`modern-template ${className || ''}`}>
      <style>{`
        .modern-template {
          /* Contemporary design with subtle accents */
          font-family: 'Inter', 'Helvetica', sans-serif;
        }
        
        .modern-template .resume-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 24px;
          border-radius: 8px 8px 0 0;
          margin: -24px -24px 24px -24px;
        }
        
        .modern-template .section-header-line {
          position: relative;
          padding-left: 16px;
          margin-bottom: 16px;
          font-size: 1.25rem;
          font-weight: 700;
          color: #667eea;
        }
        
        .modern-template .section-header-line::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          border-radius: 2px;
        }
        
        .modern-template .section-content {
          margin-left: 16px;
        }
      `}</style>
      {children}
    </div>
  );
};

export default ModernTemplate;

