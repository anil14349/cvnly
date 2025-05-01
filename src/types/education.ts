import { FontOptions } from './common';

export interface Education {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  details: string[];
  location?: string;
}

export interface EducationSectionProps {
  educations: Education[];
  fontOptions: FontOptions;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
  index: number;
  sectionsLength: number;
  addEducation: () => void;
  deleteEducation?: (id: string) => void;
  updateEducation?: (id: string, field: string, value: string) => void;
  title?: string;
  onTitleChange?: (newTitle: string) => void;
}