import React from 'react';
import SummarySection from './sections/SummarySection/SummarySection';
import SkillsSection from './sections/SkillsSection/SkillsSection';
import ExperienceSection from './sections/ExperienceSection/ExperienceSection';
import EducationSection from './sections/EducationSection/EducationSection';
import ProjectsSection from './sections/ProjectsSection/ProjectsSection';
import CertificationsSection from './sections/CertificateSection/CertificationsSection';
import { ResumeSection, FontOptions, Skill, Experience, Project } from '../types/common';

interface ResumeSectionRendererProps {
  section: ResumeSection;
  index: number;
  sectionTitles: Record<string, string>;
  fontOptions: FontOptions;
  sectionsLength: number;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
  updateSectionTitle: (index: number, newTitle: string) => void;
  setSkills: (skills: Skill[]) => void;
  addExperience: () => void;
  deleteExperience: (id: string) => void;
  updateExperience: (id: string, updatedExperience: Experience) => void;
  addEducation: () => void;
  deleteEducation: (id: string) => void;
  addProject: () => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, updatedProject: Project) => void;
  addCertification: () => void;
  deleteCertification: (id: string) => void;
  updateCertification: (id: string, field: string, value: string) => void;
}

const ResumeSectionRenderer: React.FC<ResumeSectionRendererProps> = ({
  section,
  index,
  sectionTitles,
  fontOptions,
  sectionsLength,
  moveSection,
  deleteSection,
  updateSectionTitle,
  setSkills,
  addExperience,
  deleteExperience,
  updateExperience,
  addEducation,
  deleteEducation,
  addProject,
  deleteProject,
  updateProject,
  addCertification,
  deleteCertification,
  updateCertification
}) => {
  if (!section.visible) return null;
  switch (section.type) {
    case 'summary':
      return (
        <SummarySection
          key="summary"
          index={index}
          moveSection={moveSection}
          deleteSection={deleteSection}
          sectionsLength={sectionsLength}
          fontOptions={fontOptions}
          title={sectionTitles.summary}
          onTitleChange={newTitle => updateSectionTitle(index, newTitle)}
        />
      );
    case 'skills':
      return (
        <SkillsSection
          key="skills"
          index={index}
          moveSection={moveSection}
          deleteSection={deleteSection}
          sectionsLength={sectionsLength}
          fontOptions={fontOptions}
          title={sectionTitles.skills}
          onTitleChange={newTitle => updateSectionTitle(index, newTitle)}
          skills={section.content.skills || []}
          setSkills={setSkills}
        />
      );
    case 'experience':
      return (
        <ExperienceSection
          key="experience"
          index={index}
          moveSection={moveSection}
          deleteSection={deleteSection}
          sectionsLength={sectionsLength}
          fontOptions={fontOptions}
          title={sectionTitles.experience}
          onTitleChange={newTitle => updateSectionTitle(index, newTitle)}
          experiences={section.content.experiences || []}
          addExperience={addExperience}
          deleteExperience={deleteExperience}
          updateExperience={updateExperience}
        />
      );
    case 'education':
      return (
        <EducationSection
          key="education"
          index={index}
          moveSection={moveSection}
          deleteSection={deleteSection}
          sectionsLength={sectionsLength}
          fontOptions={fontOptions}
          title={sectionTitles.education}
          onTitleChange={newTitle => updateSectionTitle(index, newTitle)}
          educations={section.content.educations || []}
          addEducation={addEducation}
          deleteEducation={deleteEducation}
        />
      );
    case 'projects':
      return (
        <ProjectsSection
          key="projects"
          index={index}
          moveSection={moveSection}
          deleteSection={() => deleteSection(index)}
          sectionsLength={sectionsLength}
          fontOptions={fontOptions}
          title={sectionTitles.projects}
          onTitleChange={newTitle => updateSectionTitle(index, newTitle)}
          projects={section.content.projects || []}
          addProject={addProject}
          deleteProject={deleteProject}
          updateProject={updateProject}
        />
      );
    case 'certifications':
      return (
        <CertificationsSection
          key="certifications"
          index={index}
          moveSection={moveSection}
          deleteSection={() => deleteSection(index)}
          sectionsLength={sectionsLength}
          fontOptions={fontOptions}
          title={sectionTitles.certifications}
          onTitleChange={newTitle => updateSectionTitle(index, newTitle)}
          certifications={section.content.certifications || []}
          addCertification={addCertification}
          deleteCertification={deleteCertification}
          updateCertification={updateCertification}
        />
      );
    default:
      return null;
  }
};

export default ResumeSectionRenderer;
