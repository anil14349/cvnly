// Import FontOptions interface
import { FontOptions } from './common';

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface ExperienceSectionProps {
  index: number;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
  sectionsLength: number;
  fontOptions: FontOptions; // Updated from any type to FontOptions
  experiences: Experience[];
  addExperience: () => void;
  deleteExperience: (id: string) => void;
  updateExperience?: (id: string, updatedExperience: Experience) => void;
  title?: string; // Optional title prop
  onTitleChange?: (newTitle: string) => void; // Optional callback for title changes
} 