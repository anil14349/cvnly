import { FontOptions } from '../../../types/common';

export interface SummarySectionProps {
  index: number;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
  sectionsLength: number;
  fontOptions: FontOptions;
  title?: string;
  onTitleChange?: (newTitle: string) => void;
  summary: string;
  onSummaryChange: (value: string) => void;
  isPreview?: boolean;
}
