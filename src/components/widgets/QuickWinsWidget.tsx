import React from 'react';
import { Target, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

interface QuickWin {
  id: string;
  title: string;
  impact: number;
  completed: boolean;
  actionText: string;
  onClick: () => void;
}

interface QuickWinsWidgetProps {
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

const QuickWinsWidget: React.FC<QuickWinsWidgetProps> = ({
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
    return null; // Don't show if score is good or no improvements available
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 overflow-hidden shadow-md">
      <div className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Quick Wins</h2>
            <p className="text-xs text-blue-100">
              +{topQuickWins.reduce((sum, win) => sum + win.impact, 0)} points available
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 space-y-2">
        {topQuickWins.map((win) => (
          <div
            key={win.id}
            className="group relative bg-white dark:bg-gray-800 rounded-lg p-2.5 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer"
            onClick={win.onClick}
          >
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                {win.completed ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {win.title}
                  </h3>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-1.5 py-0.5 rounded-full">
                    +{win.impact}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all mt-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickWinsWidget;

