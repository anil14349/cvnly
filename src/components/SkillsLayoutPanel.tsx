import React from 'react';
import { LayoutList, Grid2x2, Circle, AlignJustify } from 'lucide-react';
import { SkillTheme } from '../types/skill';

interface SkillsLayoutPanelProps {
  skillsTheme: SkillTheme;
  setSkillsTheme: (theme: SkillTheme) => void;
}

const SkillsLayoutPanel: React.FC<SkillsLayoutPanelProps> = ({
  skillsTheme,
  setSkillsTheme,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Skills Layout</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Choose how your skills are displayed</p>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSkillsTheme('classic')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              skillsTheme === 'classic'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800'
            }`}
          >
            <LayoutList className="w-6 h-6 mb-2 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Classic</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Traditional list view</span>
          </button>

          <button
            onClick={() => setSkillsTheme('compact')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              skillsTheme === 'compact'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800'
            }`}
          >
            <AlignJustify className="w-6 h-6 mb-2 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Compact</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Space-saving design</span>
          </button>

          <button
            onClick={() => setSkillsTheme('card')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              skillsTheme === 'card'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800'
            }`}
          >
            <Grid2x2 className="w-6 h-6 mb-2 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Card</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Grid layout with cards</span>
          </button>

          <button
            onClick={() => setSkillsTheme('bubble')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              skillsTheme === 'bubble'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800'
            }`}
          >
            <Circle className="w-6 h-6 mb-2 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Bubble</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Modern bubble style</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsLayoutPanel; 