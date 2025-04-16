import { FontOptions } from './common';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  organization?: string;
}

export interface AchievementsSectionProps {
  index: number;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
  sectionsLength: number;
  fontOptions: FontOptions;
  achievements: Achievement[];
  addAchievement: () => void;
  deleteAchievement: (id: string) => void;
  updateAchievement?: (id: string, updatedAchievement: Achievement) => void;
  title?: string;
  onTitleChange?: (newTitle: string) => void;
} 