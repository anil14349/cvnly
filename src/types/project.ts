// Import FontOptions interface
import { FontOptions } from './common';

export interface Project {
  id: string;
  name: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  url?: string;
}

export interface ProjectsSectionProps {
  projects: Project[];
  fontOptions: FontOptions;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: () => void;
  index: number;
  sectionsLength: number;
  addProject: () => void;
  deleteProject?: (id: string) => void;
  updateProject?: (id: string, updatedProject: Project) => void;
  title?: string;
  onTitleChange?: (newTitle: string) => void;
}