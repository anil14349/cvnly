import { useState, useRef } from 'react';
import { ResumeSection, SocialLink, FontOptions } from '../types/common';
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
  // ... These will be moved from App.tsx in the next step ...

  return {
    skills, setSkills,
    experiences, setExperiences,
    educations, setEducations,
    projects, setProjects,
    certifications, setCertifications,
    sections, setSections,
    sectionTitles, setSectionTitles,
    socialLinks, setSocialLinks,
    resumeRef
  };
}
