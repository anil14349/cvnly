import { useState } from 'react';
import { Project } from '../types/project';
import { ResumeSection } from '../types/common';

export const useProjects = (sections: ResumeSection[], updateSection: (index: number, updatedSection: ResumeSection) => void) => {
  const [projects, setProjects] = useState<Project[]>([]);

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

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'projects');
    if (sectionIndex !== -1) {
      const updatedSectionData = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          projects: [...(sections[sectionIndex].content.projects || []), newProject]
        }
      };
      updateSection(sectionIndex, updatedSectionData);
    }
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'projects');
    if (sectionIndex !== -1) {
      const updatedSectionData = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          projects: sections[sectionIndex].content.projects?.filter(project => project.id !== id) || []
        }
      };
      updateSection(sectionIndex, updatedSectionData);
    }
  };

  const updateProject = (id: string, updatedProject: Project) => {
    const updatedProjects = projects.map(project =>
      project.id === id ? updatedProject : project
    );
    setProjects(updatedProjects);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'projects');
    if (sectionIndex !== -1) {
      const updatedSectionData = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          projects: updatedProjects
        }
      };
      updateSection(sectionIndex, updatedSectionData);
    }
  };

  return {
    projects,
    setProjects,
    addProject,
    deleteProject,
    updateProject
  };
};

