import { ReactNode, useRef } from 'react';
import ResumeContext from './ResumeContext';
import { useResumeData } from '../hooks/useResumeData';
import { useSections } from '../hooks/useSections';
import { useSectionTitles } from '../hooks/useSectionTitles';
import { useSkills } from '../hooks/useSkills';
import { useExperiences } from '../hooks/useExperiences';
import { useEducations } from '../hooks/useEducations';
import { useProjects } from '../hooks/useProjects';
import { useCertifications } from '../hooks/useCertifications';
import { useSocialLinks } from '../hooks/useSocialLinks';
import { useFontOptions } from '../hooks/useFontOptions';
import { useTheme } from '../hooks/useTheme';

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  // Initialize all hooks
  const { resumeData, setResumeData } = useResumeData();
  const { sections, setSections, moveSection, deleteSection, updateSection } = useSections();
  const { sectionTitles, updateSectionTitle } = useSectionTitles();
  const { skills, setSkills } = useSkills();
  const { experiences, addExperience, deleteExperience, updateExperience } = useExperiences(sections, updateSection);
  const { educations, addEducation, deleteEducation } = useEducations(sections, updateSection);
  const { projects, addProject, deleteProject, updateProject } = useProjects(sections, updateSection);
  const { certifications, addCertification, deleteCertification, updateCertification } = useCertifications(sections, updateSection);
  const { socialLinks, addSocialLink, updateSocialLink, deleteSocialLink } = useSocialLinks();
  const { fontOptions, updateFontOption } = useFontOptions(resumeRef);
  const { activeTheme, applyTheme } = useTheme();

  const contextValue = {
    resumeData,
    setResumeData,
    sections,
    setSections,
    moveSection,
    deleteSection,
    updateSection,
    sectionTitles,
    updateSectionTitle,
    skills,
    setSkills,
    experiences,
    addExperience,
    deleteExperience,
    updateExperience,
    educations,
    addEducation,
    deleteEducation,
    projects,
    addProject,
    deleteProject,
    updateProject,
    certifications,
    addCertification,
    deleteCertification,
    updateCertification,
    socialLinks,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    fontOptions,
    updateFontOption,
    activeTheme,
    applyTheme
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};

