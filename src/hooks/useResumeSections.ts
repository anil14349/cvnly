import { useState, useRef } from 'react';
import { ResumeSection, SocialLink } from '../types/common';
import { Education } from '../types/education';
import { Experience } from '../types/experience';
import { Project } from '../types/project';
import { Skill } from '../types/skill';
import { Certification } from '../types/certification';

export function useResumeSections() {
  // Section states
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [sections, setSections] = useState<ResumeSection[]>([
    { type: 'summary', visible: true, content: {} },
    { type: 'skills', visible: true, content: { skills: [] } },
    { type: 'experience', visible: true, content: { experiences: [] } },
    { type: 'education', visible: true, content: { educations: [] } },
    { type: 'projects', visible: true, content: { projects: [] } },
    { type: 'certifications', visible: true, content: { certifications: [] } },
    { type: 'social', visible: true, content: { socialLinks: [] } }
  ]);
  const [sectionTitles, setSectionTitles] = useState({
    summary: 'Summary',
    skills: 'Skills',
    experience: 'Work Experience',
    education: 'Education',
    projects: 'Projects',
    certifications: 'Certifications'
  });
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      id: '1',
      type: 'email',
      value: 'john.doe@example.com'
    },
    {
      id: '2',
      type: 'phone',
      value: '+1 (555) 123-4567'
    },
    {
      id: '3',
      type: 'linkedin',
      value: 'linkedin.com/in/johndoe'
    }
  ]);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Section handlers (add, delete, update, move, etc.)
  // --- Section Handlers ---
  const handleSectionUpdate = (index: number, updatedSection: ResumeSection) => {
    const newSections = [...sections];
    newSections[index] = updatedSection;
    setSections(newSections);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: 'New Project',
      company: 'Company Name',
      period: 'Duration',
      description: 'Project description goes here.',
      responsibilities: ['Responsibility 1', 'Responsibility 2', 'Responsibility 3'],
      technologies: ['Tech 1', 'Tech 2', 'Tech 3']
    };
    setProjects([...projects, newProject]);
    const sectionIndex = sections.findIndex(section => section.type === 'projects');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          projects: [...(sections[sectionIndex].content.projects || []), newProject]
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
    const sectionIndex = sections.findIndex(section => section.type === 'projects');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          projects: sections[sectionIndex].content.projects?.filter(project => project.id !== id) || []
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

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
    const sectionIndex = sections.findIndex(section => section.type === 'education');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          educations: [...(sections[sectionIndex].content.educations || []), newEducation]
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const deleteEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
    const sectionIndex = sections.findIndex(section => section.type === 'education');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          educations: sections[sectionIndex].content.educations?.filter(edu => edu.id !== id) || []
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: 'New Position',
      company: 'Company Name',
      period: 'Start Date - End Date',
      achievements: ['Achievement 1', 'Achievement 2', 'Achievement 3']
    };
    setExperiences([...experiences, newExperience]);
    const sectionIndex = sections.findIndex(section => section.type === 'experience');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          experiences: [...(sections[sectionIndex].content.experiences || []), newExperience]
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const deleteExperience = (id: string) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    setExperiences(updatedExperiences);
    const sectionIndex = sections.findIndex(section => section.type === 'experience');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          experiences: updatedExperiences
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: 'New Certification',
      issuer: 'Issuing Organization',
      date: 'Date'
    };
    setCertifications([...certifications, newCertification]);
    const sectionIndex = sections.findIndex(section => section.type === 'certifications');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          certifications: [...(sections[sectionIndex].content.certifications || []), newCertification]
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const deleteCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
    const sectionIndex = sections.findIndex(section => section.type === 'certifications');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          certifications: sections[sectionIndex].content.certifications?.filter(cert => cert.id !== id) || []
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
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

  const updateExperience = (id: string, updatedExperience: Experience) => {
    const updatedExperiences = experiences.map(exp =>
      exp.id === id ? updatedExperience : exp
    );
    setExperiences(updatedExperiences);
    const sectionIndex = sections.findIndex(section => section.type === 'experience');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          experiences: updatedExperiences
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const updateProject = (id: string, updatedProject: Project) => {
    const updatedProjects = projects.map(project =>
      project.id === id ? updatedProject : project
    );
    setProjects(updatedProjects);
    const sectionIndex = sections.findIndex(section => section.type === 'projects');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          projects: updatedProjects
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const updateSectionTitle = (index: number, newTitle: string) => {
    setSectionTitles(prev => ({
      ...prev,
      [sections[index].type]: newTitle
    }));
  };

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

  const addSocialLink = (type: 'phone' | 'email' | 'linkedin' | 'github' | 'location') => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      type: type,
      value: ''
    };
    setSocialLinks([...socialLinks, newLink]);
  };

  const deleteSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const updateSocialLink = (id: string, value: string) => {
    setSocialLinks(socialLinks.map(link =>
      link.id === id ? { ...link, value } : link
    ));
  };

  // --- End Section Handlers ---

  return {
    skills, setSkills,
    experiences, setExperiences,
    educations, setEducations,
    projects, setProjects,
    certifications, setCertifications,
    sections, 
    setSections,
    sectionTitles, setSectionTitles,
    socialLinks, setSocialLinks,
    resumeRef,
    // Section Handlers
    handleSectionUpdate,
    addProject,
    deleteProject,
    addEducation,
    deleteEducation,
    addExperience,
    deleteExperience,
    addCertification,
    deleteCertification,
    updateCertification,
    updateExperience,
    updateProject,
    updateSectionTitle,
    moveSection,
    deleteSection,
    addSocialLink,
    deleteSocialLink,
    updateSocialLink
  };

}
