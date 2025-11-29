import React from 'react';

interface ProfessionalTemplateProps {
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

// Professional layout with navy blue accents - ACTUALLY SAME AS CLASSIC FOR NOW
// Will be replaced with TwoColumn in the selector
const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = (props) => {
  // Just use TwoColumn layout
  const TwoColumnLayout = require('./layouts/TwoColumnLayout').default;
  return <TwoColumnLayout {...props} />;
};

export default ProfessionalTemplate;

