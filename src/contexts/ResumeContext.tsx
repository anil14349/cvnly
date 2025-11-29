import { createContext, useContext, ReactNode } from 'react';
import { ResumeSection, SocialLink, FontOptions } from '../types/common';
import { Skill } from '../types/skill';
import { Experience } from '../types/experience';
import { Education } from '../types/education';
import { Project } from '../types/project';
import { Certification } from '../types/certification';

export interface ResumeContextType {
  // Resume Data
  resumeData: { name: string; title: string };
  setResumeData: (data: { name: string; title: string }) => void;
  
  // Sections
  sections: ResumeSection[];
  setSections: (sections: ResumeSection[]) => void;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
  updateSection: (index: number, updatedSection: ResumeSection) => void;
  
  // Section Titles
  sectionTitles: Record<string, string>;
  updateSectionTitle: (sections: ResumeSection[], index: number, newTitle: string) => void;
  
  // Skills
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  
  // Experiences
  experiences: Experience[];
  addExperience: () => void;
  deleteExperience: (id: string) => void;
  updateExperience: (id: string, updatedExperience: Experience) => void;
  
  // Education
  educations: Education[];
  addEducation: () => void;
  deleteEducation: (id: string) => void;
  
  // Projects
  projects: Project[];
  addProject: () => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, updatedProject: Project) => void;
  
  // Certifications
  certifications: Certification[];
  addCertification: () => void;
  deleteCertification: (id: string) => void;
  updateCertification: (id: string, field: string, value: string) => void;
  
  // Social Links
  socialLinks: SocialLink[];
  addSocialLink: (type: 'phone' | 'email' | 'linkedin' | 'github' | 'location') => void;
  updateSocialLink: (id: string, value: string) => void;
  deleteSocialLink: (id: string) => void;
  
  // Font Options
  fontOptions: FontOptions;
  updateFontOption: (option: keyof FontOptions, value: string | boolean) => void;
  
  // Theme
  activeTheme: 'light' | 'dark';
  applyTheme: (theme: 'light' | 'dark') => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};

export default ResumeContext;

