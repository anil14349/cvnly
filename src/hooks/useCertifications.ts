import { useState } from 'react';
import { Certification } from '../types/certification';
import { ResumeSection } from '../types/common';

export const useCertifications = (sections: ResumeSection[], updateSection: (index: number, updatedSection: ResumeSection) => void) => {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: 'New Certification',
      issuer: 'Issuing Organization',
      date: 'Date'
    };
    setCertifications([...certifications, newCertification]);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'certifications');
    if (sectionIndex !== -1) {
      const updatedSectionData = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          certifications: [...(sections[sectionIndex].content.certifications || []), newCertification]
        }
      };
      updateSection(sectionIndex, updatedSectionData);
    }
  };

  const deleteCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'certifications');
    if (sectionIndex !== -1) {
      const updatedSectionData = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          certifications: sections[sectionIndex].content.certifications?.filter(cert => cert.id !== id) || []
        }
      };
      updateSection(sectionIndex, updatedSectionData);
    }
  };

  const updateCertification = (id: string, field: string, value: string) => {
    setCertifications(certifications.map(cert => {
      if (cert.id === id) {
        return {
          ...cert,
          [field]: value
        };
      }
      return cert;
    }));
  };

  return {
    certifications,
    setCertifications,
    addCertification,
    deleteCertification,
    updateCertification
  };
};

