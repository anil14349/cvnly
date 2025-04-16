import { FontOptions } from './common';

export interface Hobby {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface HobbiesSectionProps {
  index: number;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
  sectionsLength: number;
  fontOptions: FontOptions;
  hobbies: Hobby[];
  addHobby: () => void;
  deleteHobby: (id: string) => void;
  updateHobby?: (id: string, updatedHobby: Hobby) => void;
  title?: string;
  onTitleChange?: (newTitle: string) => void;
} 