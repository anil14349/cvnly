import { useState } from 'react';
import { Education } from '../types/education';
import { ResumeSection } from '../types/common';

export const useEducations = (sections: ResumeSection[], updateSection: (index: number, updatedSection: ResumeSection) => void) => {
  const [educations, setEducations] = useState<Education[]>([]);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: 'New Degree',
      school: 'University Name',
      startDate: 'Start Date',
      endDate: 'End Date',
      details: []
    };
    setEducations([...educations, newEducation]);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'education');
    if (sectionIndex !== -1) {
      const updatedSectionData = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          educations: [...(sections[sectionIndex].content.educations || []), newEducation]
        }
      };
      updateSection(sectionIndex, updatedSectionData);
    }
  };

  const deleteEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'education');
    if (sectionIndex !== -1) {
      const updatedSectionData = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          educations: sections[sectionIndex].content.educations?.filter(edu => edu.id !== id) || []
        }
      };
      updateSection(sectionIndex, updatedSectionData);
    }
  };

  return {
    educations,
    setEducations,
    addEducation,
    deleteEducation
  };
};

