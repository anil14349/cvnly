import React from 'react';
import { ChevronUp, ChevronDown, X } from 'lucide-react';

interface SectionControlsProps {
  index: number;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
  sectionsLength: number;
}

const SectionControls: React.FC<SectionControlsProps> = ({
  index,
  moveSection,
  deleteSection,
  sectionsLength
}) => {
  return (
    <div className="flex items-center gap-1">
      {index > 0 && (
        <button
          onClick={() => moveSection(index, 'up')}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Move section up"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}
      {index < sectionsLength - 1 && (
        <button
          onClick={() => moveSection(index, 'down')}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Move section down"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
      <button
        onClick={() => deleteSection(index)}
        className="p-1 text-gray-400 hover:text-red-500"
        aria-label="Delete section"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SectionControls;