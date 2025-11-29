import React from 'react';
import { CheckCircle, Circle, Target } from 'lucide-react';

interface ProgressTrackerProps {
  hasName: boolean;
  hasTitle: boolean;
  hasExperience: boolean;
  hasEducation: boolean;
  hasSkills: boolean;
  hasProjects: boolean;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  hasName,
  hasTitle,
  hasExperience,
  hasEducation,
  hasSkills,
  hasProjects
}) => {
  const items = [
    { label: 'Name', completed: hasName && hasName !== '' },
    { label: 'Title', completed: hasTitle && hasTitle !== '' },
    { label: 'Experience', completed: hasExperience },
    { label: 'Education', completed: hasEducation },
    { label: 'Skills', completed: hasSkills },
    { label: 'Projects', completed: hasProjects },
  ];

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header - Compact */}
      <div className="px-4 py-2.5 border-b border-gray-200 dark:border-gray-700 bg-indigo-50 dark:bg-indigo-900/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Progress</h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {completedCount}/{totalCount} sections
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">
              {percentage}%
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-3">
        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Checklist - Compact */}
        <div className="space-y-1.5">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 py-1"
            >
              {item.completed ? (
                <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
              )}
              <span
                className={`text-xs font-medium ${
                  item.completed
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {item.label}
              </span>
              {item.completed && (
                <span className="ml-auto text-xs text-green-600 dark:text-green-400">
                  ✓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;

