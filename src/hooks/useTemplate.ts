import { useState } from 'react';
import { ResumeTemplate } from '../types/templates';

export const useTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>('classic');

  const updateTemplate = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
  };

  return {
    selectedTemplate,
    updateTemplate
  };
};

