import { FontOptions } from './common';

export type SkillTheme = 'card' | 'bubble' | 'classic' | 'compact';

export interface Skill {
  id: string;
  category: string;
  items: string[];
  backgroundColor?: string;
  borderColor?: string;
  borderStyle?: string;
  borderWidth?: string;
  borderRadius?: string;
}

export interface SkillsSectionProps {
  index: number;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
  sectionsLength: number;
  fontOptions: FontOptions;
  skills: Skill[];
  setSkills?: (skills: Skill[]) => void;
  addSkill?: () => void;
  addSkillCategory?: () => void;
  updateSkill?: (id: string, updates: Partial<Skill>) => void;
  deleteSkill?: (id: string) => void;
  title?: string;
  onTitleChange?: (newTitle: string) => void;
}