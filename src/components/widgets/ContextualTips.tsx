import React, { useState } from 'react';
import { Lightbulb, X, TrendingUp, Zap } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  description: string;
  category: 'keywords' | 'format' | 'content' | 'general';
  icon: string;
}

interface ContextualTipsProps {
  score: number;
  breakdown: {
    keywords: number;
    format: number;
    sections: number;
    length: number;
    readability: number;
  };
}

const ContextualTips: React.FC<ContextualTipsProps> = ({ score, breakdown }) => {
  const [dismissedTips, setDismissedTips] = useState<string[]>([]);

  const allTips: Tip[] = [
    // Keywords tips
    {
      id: 'keywords-action-verbs',
      title: 'Use Strong Action Verbs',
      description: 'Start bullet points with verbs like "Led", "Built", "Managed", "Achieved", "Implemented", "Optimized".',
      category: 'keywords',
      icon: '💪'
    },
    {
      id: 'keywords-industry',
      title: 'Include Industry Keywords',
      description: 'Research job descriptions in your field and include relevant technical terms and skills.',
      category: 'keywords',
      icon: '🎯'
    },
    // Format tips
    {
      id: 'format-bullets',
      title: 'Use Bullet Points',
      description: 'Break down responsibilities and achievements into clear, scannable bullet points.',
      category: 'format',
      icon: '📝'
    },
    {
      id: 'format-consistent',
      title: 'Stay Consistent',
      description: 'Use consistent formatting for dates, job titles, and section headers throughout.',
      category: 'format',
      icon: '✨'
    },
    // Content tips
    {
      id: 'content-metrics',
      title: 'Quantify Achievements',
      description: 'Use numbers and metrics: "Increased sales by 30%" instead of "Increased sales".',
      category: 'content',
      icon: '📊'
    },
    {
      id: 'content-relevant',
      title: 'Stay Relevant',
      description: 'Focus on recent and relevant experience. Older experiences can be summarized briefly.',
      category: 'content',
      icon: '🎓'
    },
  ];

  // Generate contextual tips based on score breakdown
  const getRelevantTips = (): Tip[] => {
    const tips: Tip[] = [];

    if (breakdown.keywords < 15) {
      tips.push(allTips.find(t => t.id === 'keywords-action-verbs')!);
      tips.push(allTips.find(t => t.id === 'keywords-industry')!);
    }

    if (breakdown.format < 15) {
      tips.push(allTips.find(t => t.id === 'format-bullets')!);
      tips.push(allTips.find(t => t.id === 'format-consistent')!);
    }

    if (breakdown.readability < 10) {
      tips.push(allTips.find(t => t.id === 'content-metrics')!);
    }

    // Add general tip if doing well
    if (score >= 70) {
      tips.push({
        id: 'general-proofread',
        title: 'Final Polish',
        description: 'Proofread carefully for typos and grammatical errors. Consider having someone else review it.',
        category: 'general',
        icon: '✅'
      });
    }

    return tips.filter(t => t && !dismissedTips.includes(t.id));
  };

  const relevantTips = getRelevantTips();

  if (relevantTips.length === 0 || score >= 85) {
    return null;
  }

  const handleDismiss = (tipId: string) => {
    setDismissedTips([...dismissedTips, tipId]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      {/* Header - Compact */}
      <div className="px-4 py-2.5 border-b border-gray-200 dark:border-gray-700 bg-amber-50 dark:bg-amber-900/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              Pro Tips
              <Zap className="w-3 h-3 text-amber-500" />
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {relevantTips.length} tip{relevantTips.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Tips List */}
      <div className="px-4 py-3 space-y-2">
        {relevantTips.slice(0, 2).map((tip) => (
          <div
            key={tip.id}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5 border border-gray-200 dark:border-gray-600 relative group hover:border-amber-300 dark:hover:border-amber-700 transition-all"
          >
            {/* Dismiss Button */}
            <button
              onClick={() => handleDismiss(tip.id)}
              className="absolute top-1.5 right-1.5 p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Dismiss tip"
            >
              <X className="w-3 h-3 text-gray-400" />
            </button>

            <div className="flex items-start gap-2 pr-6">
              <span className="text-base flex-shrink-0">{tip.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-0.5 text-xs">
                  {tip.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                  {tip.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContextualTips;

