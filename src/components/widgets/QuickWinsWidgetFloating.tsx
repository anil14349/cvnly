import React from 'react';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

interface QuickWin {
  id: string;
  title: string;
  impact: number;
  completed: boolean;
  actionText: string;
  onClick: () => void;
}

interface QuickWinsWidgetFloatingProps {
  score: number;
  breakdown: {
    keywords: number;
    format: number;
    sections: number;
    length: number;
    readability: number;
  };
  hasExperience: boolean;
  hasEducation: boolean;
  hasProjects: boolean;
}

const QuickWinsWidgetFloating: React.FC<QuickWinsWidgetFloatingProps> = ({
  score,
  breakdown,
  hasExperience,
  hasEducation,
  hasProjects
}) => {
  const quickWins: QuickWin[] = [];

  // Generate quick wins based on current state
  if (!hasExperience) {
    quickWins.push({
      id: 'experience',
      title: 'Add Work Experience',
      impact: 15,
      completed: false,
      actionText: 'Add Experience',
      onClick: () => {
        const addButton = document.querySelector('[class*="add-experience"]') as HTMLButtonElement;
        addButton?.click();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  if (!hasEducation) {
    quickWins.push({
      id: 'education',
      title: 'Include Education',
      impact: 10,
      completed: false,
      actionText: 'Add Education',
      onClick: () => {
        const addButton = document.querySelector('[class*="add-education"]') as HTMLButtonElement;
        addButton?.click();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  if (breakdown.keywords < 15) {
    quickWins.push({
      id: 'keywords',
      title: 'Add More Action Verbs',
      impact: 8,
      completed: false,
      actionText: 'Show Examples',
      onClick: () => {
        alert('Action verbs examples: Led, Built, Managed, Achieved, Implemented, Designed, Developed, Optimized');
      }
    });
  }

  if (!hasProjects && breakdown.sections < 20) {
    quickWins.push({
      id: 'projects',
      title: 'Add Projects Section',
      impact: 7,
      completed: false,
      actionText: 'Add Projects',
      onClick: () => {
        const addButton = document.querySelector('[class*="add-project"]') as HTMLButtonElement;
        addButton?.click();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  if (breakdown.readability < 10) {
    quickWins.push({
      id: 'readability',
      title: 'Use More Bullet Points',
      impact: 5,
      completed: false,
      actionText: 'Learn More',
      onClick: () => {
        alert('Tip: Break down your responsibilities into clear bullet points. Each bullet should start with an action verb and include measurable results when possible.');
      }
    });
  }

  // Sort by impact
  quickWins.sort((a, b) => b.impact - a.impact);

  // Only show top 3 quick wins
  const topQuickWins = quickWins.slice(0, 3);

  if (topQuickWins.length === 0 || score >= 80) {
    return (
      <div className="p-5 text-center">
        <div className="text-5xl mb-3">🎉</div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Great Job!
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your resume is in excellent shape. No immediate improvements needed.
        </p>
      </div>
    );
  }

  const totalPoints = topQuickWins.reduce((sum, win) => sum + win.impact, 0);

  return (
    <div className="p-5">
      {/* NO HEADER - Panel already shows "Quick Wins" */}
      
      {/* Summary Banner */}
      <div className="mb-5 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">+{totalPoints}</div>
            <div className="text-xs text-blue-100">points available</div>
          </div>
          <div className="text-sm font-medium opacity-90">
            {topQuickWins.length} action{topQuickWins.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Quick Wins List */}
      <div className="space-y-3">
        {topQuickWins.map((win, index) => (
          <div
            key={win.id}
            className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer shadow-sm hover:shadow-md"
            onClick={win.onClick}
          >
            <div className="flex items-start gap-3">
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {win.completed ? (
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {win.title}
                  </h3>
                  <span className="flex-shrink-0 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
                    +{win.impact}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Click to {win.actionText.toLowerCase()}
                </p>
              </div>

              {/* Arrow Icon */}
              <div className="flex-shrink-0 mt-1">
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Progress Indicator */}
            {index === 0 && (
              <div className="absolute top-2 right-2">
                <span className="px-2 py-0.5 text-xs font-bold bg-yellow-400 text-yellow-900 rounded-full shadow-sm">
                  Priority
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Tip */}
      <div className="mt-5 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">
          💡 <span className="font-bold">Tip:</span> Complete these actions to boost your ATS score by {totalPoints} points!
        </p>
      </div>
    </div>
  );
};

export default QuickWinsWidgetFloating;

