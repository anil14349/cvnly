import React from 'react';
import { ResumeTemplate } from '../../types/templates';
import ClassicLayout from './layouts/ClassicLayout';
import ModernLayout from './layouts/ModernLayout';
import TwoColumnLayout from './layouts/TwoColumnLayout';
import ClassicTemplate from './ClassicTemplate';
import MinimalTemplate from './MinimalTemplate';
import CreativeTemplate from './CreativeTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';

interface TemplateWrapperProps {
  template: ResumeTemplate;
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

const TemplateWrapper: React.FC<TemplateWrapperProps> = (props) => {
  const { template } = props;

  // Structural layouts (different HTML structure)
  if (template === 'modern') {
    return <ModernLayout {...props} />;
  }
  
  if (template === 'two-column') {
    return <TwoColumnLayout {...props} />;
  }
  
  // Other structural/styled templates
  const templateComponents = {
    classic: ClassicLayout,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
    executive: ExecutiveTemplate
  };

  const TemplateComponent = templateComponents[template as keyof typeof templateComponents] || ClassicLayout;

  return <TemplateComponent {...props} />;
};

export default TemplateWrapper;

