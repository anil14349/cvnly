import { useState } from 'react';
import { ResumeSection } from '../types/common';

export interface SectionTitles {
  summary: string;
  skills: string;
  experience: string;
  education: string;
  projects: string;
  certifications: string;
}

const defaultTitles: SectionTitles = {
  summary: 'Summary',
  skills: 'Skills',
  experience: 'Work Experience',
  education: 'Education',
  projects: 'Projects',
  certifications: 'Certifications'
};

export const useSectionTitles = () => {
  const [sectionTitles, setSectionTitles] = useState<SectionTitles>(defaultTitles);

  const updateSectionTitle = (sections: ResumeSection[], index: number, newTitle: string) => {
    setSectionTitles(prev => ({
      ...prev,
      [sections[index].type]: newTitle
    }));
  };

  return {
    sectionTitles,
    setSectionTitles,
    updateSectionTitle
  };
};

