import React, { useState } from 'react';
import { X, TrendingUp, Sparkles, BookOpen, Award } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  description: string;
  category: 'keywords' | 'format' | 'content' | 'general';
  icon: string;
}

interface ContextualTipsFloatingProps {
  score: number;
  breakdown: {
    keywords: number;
    format: number;
    sections: number;
    length: number;
    readability: number;
  };
}

const ContextualTipsFloating: React.FC<ContextualTipsFloatingProps> = ({ score, breakdown }) => {
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
    {
      id: 'content-impact',
      title: 'Show Impact',
      description: 'Focus on results and outcomes. What changed because of your work?',
      category: 'content',
      icon: '🚀'
    },
    {
      id: 'format-length',
      title: 'Optimal Length',
      description: 'Keep your resume to 1-2 pages. Prioritize quality over quantity.',
      category: 'format',
      icon: '📄'
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

    if (breakdown.length < 10) {
      tips.push(allTips.find(t => t.id === 'format-length')!);
    }

    // Add content tips if sections score is low
    if (breakdown.sections < 15) {
      tips.push(allTips.find(t => t.id === 'content-relevant')!);
      tips.push(allTips.find(t => t.id === 'content-impact')!);
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

  const handleDismiss = (tipId: string) => {
    setDismissedTips([...dismissedTips, tipId]);
  };

  if (relevantTips.length === 0 || score >= 85) {
    return (
      <div className="p-5 text-center">
        <div className="text-5xl mb-3">🏆</div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Excellent Work!
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          Your resume is in great shape. Keep up the good work!
        </p>
      </div>
    );
  }

  return (
    <div className="p-5">
      {/* NO HEADER - Panel already shows "Tips & Help" */}
      
      {/* Summary Banner */}
      <div className="mb-5 p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5" />
              <span className="text-lg font-bold">Pro Tips</span>
            </div>
            <div className="text-xs text-amber-100">
              {relevantTips.length} personalized tip{relevantTips.length !== 1 ? 's' : ''} for you
            </div>
          </div>
          <TrendingUp className="w-8 h-8 opacity-50" />
        </div>
      </div>

      {/* Tips List */}
      <div className="space-y-3 mb-5">
        {relevantTips.map((tip, index) => (
          <div
            key={tip.id}
            className="relative group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-500 transition-all shadow-sm hover:shadow-md"
          >
            {/* Dismiss Button */}
            <button
              onClick={() => handleDismiss(tip.id)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Dismiss tip"
              title="Dismiss this tip"
            >
              <X className="w-3 h-3 text-gray-500 dark:text-gray-400" />
            </button>

            <div className="flex items-start gap-3 pr-8">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center text-2xl">
                {tip.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1.5 text-sm">
                  {tip.title}
                </h3>
                <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-2 right-2">
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                tip.category === 'keywords' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                tip.category === 'format' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                tip.category === 'content' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {tip.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Help Resources */}
      <div className="space-y-3">
        {/* Resource 1 */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-bold text-blue-900 dark:text-blue-100 mb-0.5">
                Resume Writing Guide
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Learn best practices for creating ATS-friendly resumes
              </p>
            </div>
          </div>
        </div>

        {/* Resource 2 */}
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <div className="flex items-start gap-2">
            <Award className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-bold text-purple-900 dark:text-purple-100 mb-0.5">
                Action Verbs Library
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                100+ powerful verbs to make your resume stand out
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-5 p-3 bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-800 dark:text-gray-100 text-center">
          💡 <span className="font-bold">Remember:</span> Your resume should tell your professional story clearly and concisely.
        </p>
      </div>
    </div>
  );
};

export default ContextualTipsFloating;

