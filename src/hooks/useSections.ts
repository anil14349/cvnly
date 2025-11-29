import { useState } from 'react';
import { ResumeSection } from '../types/common';

const initialSections: ResumeSection[] = [
  { type: 'summary', visible: true, content: {} },
  { type: 'skills', visible: true, content: { skills: [] } },
  { type: 'experience', visible: true, content: { experiences: [] } },
  { type: 'education', visible: true, content: { educations: [] } },
  { type: 'projects', visible: true, content: { projects: [] } },
  { type: 'certifications', visible: true, content: { certifications: [] } },
  { type: 'social', visible: true, content: { socialLinks: [] } }
];

export const useSections = () => {
  const [sections, setSections] = useState<ResumeSection[]>(initialSections);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < sections.length) {
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      setSections(newSections);
    }
  };

  const deleteSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const updateSection = (index: number, updatedSection: ResumeSection) => {
    const newSections = [...sections];
    newSections[index] = updatedSection;
    setSections(newSections);
  };

  return {
    sections,
    setSections,
    moveSection,
    deleteSection,
    updateSection
  };
};

