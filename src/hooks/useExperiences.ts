import { useState } from 'react';
import { Experience } from '../types/experience';
import { ResumeSection } from '../types/common';

export const useExperiences = (sections: ResumeSection[], updateSection: (index: number, updatedSection: ResumeSection) => void) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: 'New Position',
      company: 'Company Name',
      period: 'Start Date - End Date',
      achievements: ['Achievement 1', 'Achievement 2', 'Achievement 3']
    };
    setExperiences([...experiences, newExperience]);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'experience');
    if (sectionIndex !== -1) {
      const updatedSectionData = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          experiences: [...(sections[sectionIndex].content.experiences || []), newExperience]
        }
      };
      updateSection(sectionIndex, updatedSectionData);
    }
  };

  const deleteExperience = (id: string) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    setExperiences(updatedExperiences);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'experience');
    if (sectionIndex !== -1) {
      const updatedSectionData = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          experiences: updatedExperiences
        }
      };
      updateSection(sectionIndex, updatedSectionData);
    }
  };

  const updateExperience = (id: string, updatedExperience: Experience) => {
    const updatedExperiences = experiences.map(exp =>
      exp.id === id ? updatedExperience : exp
    );
    setExperiences(updatedExperiences);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'experience');
    if (sectionIndex !== -1) {
      const updatedSectionData = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          experiences: updatedExperiences
        }
      };
      updateSection(sectionIndex, updatedSectionData);
    }
  };

  return {
    experiences,
    setExperiences,
    addExperience,
    deleteExperience,
    updateExperience
  };
};

