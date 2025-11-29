import React, { useEffect, useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle, ArrowUp, AlertTriangle, Sparkles } from 'lucide-react';
import { calculateATSScore, getScoreColor, getScoreBgColor } from '../../utils/atsScoreCalculator';

interface ATSScoreWidgetProps {
  resumeData: {
    name: string;
    title: string;
    sections: any[];
    skills: any[];
    experiences: any[];
    educations: any[];
    projects: any[];
  };
}

const ATSScoreWidget: React.FC<ATSScoreWidgetProps> = ({ resumeData }) => {
  const [scoreData, setScoreData] = useState<ReturnType<typeof calculateATSScore> | null>(null);

  useEffect(() => {
    const result = calculateATSScore(resumeData);
    setScoreData(result);
  }, [resumeData]);

  if (!scoreData) return null;

  const { score, recommendations, breakdown } = scoreData;

  // Determine severity level
  const getSeverityConfig = (score: number) => {
    if (score >= 80) {
      return {
        level: 'Excellent',
        icon: Sparkles,
        bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
        borderColor: 'border-green-500 dark:border-green-400',
        headerGradient: 'from-green-500 to-emerald-500',
        textColor: 'text-green-700 dark:text-green-300',
        iconColor: 'text-green-500',
        message: 'Your resume is well-optimized for ATS systems!',
        ringColor: 'ring-green-500/20'
      };
    } else if (score >= 60) {
      return {
        level: 'Good',
        icon: ArrowUp,
        bgGradient: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
        borderColor: 'border-yellow-500 dark:border-yellow-400',
        headerGradient: 'from-yellow-500 to-amber-500',
        textColor: 'text-yellow-700 dark:text-yellow-300',
        iconColor: 'text-yellow-500',
        message: 'Your resume is decent but can be improved',
        ringColor: 'ring-yellow-500/20'
      };
    } else {
      return {
        level: 'Needs Attention',
        icon: AlertTriangle,
        bgGradient: 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20',
        borderColor: 'border-red-500 dark:border-red-400',
        headerGradient: 'from-red-500 to-rose-500',
        textColor: 'text-red-700 dark:text-red-300',
        iconColor: 'text-red-500',
        message: 'Critical: Your resume needs significant improvements',
        ringColor: 'ring-red-500/20'
      };
    }
  };

  const config = getSeverityConfig(score);
  const StatusIcon = config.icon;

  return (
    <div className={`bg-gradient-to-br ${config.bgGradient} rounded-lg shadow-md border-2 ${config.borderColor} overflow-hidden`}>
      <div className={`px-4 py-3 bg-gradient-to-r ${config.headerGradient}`}>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">ATS Score</h2>
            <p className="text-xs text-white/90">
              Applicant Tracking System
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Score Circle - Compact */}
        <div className="flex flex-col items-center mb-3">
          <div className="relative w-28 h-28 mb-2">
            <svg className="transform -rotate-90 w-28 h-28">
              <circle
                cx="56"
                cy="56"
                r="50"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="56"
                cy="56"
                r="50"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - score / 100)}`}
                className={`${config.iconColor} transition-all duration-1000`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-black ${config.textColor}`}>
                  {score}
                </div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300">/ 100</div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-gray-800 border ${config.borderColor} shadow-sm mb-2`}>
            <StatusIcon className={`w-4 h-4 ${config.iconColor}`} />
            <span className={`font-bold text-xs ${config.textColor}`}>
              {config.level}
            </span>
          </div>

          {/* Status Message */}
          <p className={`text-center text-xs font-medium ${config.textColor} mb-3 px-2`}>
            {config.message}
          </p>

          {/* CTA Button - Only show if score < 80 */}
          {score < 80 && (
            <button
              onClick={() => {
                const quickWins = document.querySelector('[data-quick-wins]');
                if (quickWins) {
                  quickWins.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
              }}
              className={`w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r ${config.headerGradient} text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all`}
            >
              <AlertCircle className="w-4 h-4" />
              {score < 60 ? 'Fix Issues' : 'Improve'}
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Score Breakdown */}
        <div className="space-y-2 mb-4">
          <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5">
            <span className="w-0.5 h-3 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
            Breakdown
          </h3>
          {Object.entries(breakdown).map(([key, value]) => {
            const maxScore = key === 'keywords' ? 25 : key === 'sections' ? 25 : key === 'format' ? 20 : 15;
            const percentage = (value / maxScore) * 100;
            const barColor = percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500';
            
            return (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                    {key}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                      percentage >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200' :
                      percentage >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200'
                    }`}>
                      {Math.round(percentage)}%
                    </span>
                    <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
                      {Math.round(value)}/{maxScore}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendations - Top 2 Only */}
        {recommendations.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              <span className="w-0.5 h-3 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
              Top Tips
            </h3>
            <div className="space-y-1.5">
              {recommendations.slice(0, 2).map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-xs text-gray-800 dark:text-gray-200 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className={`mt-0.5 flex-shrink-0 ${
                    index === 0 ? config.iconColor : 'text-blue-500'
                  }`}>
                    {index === 0 ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                  </div>
                  <span className="font-medium leading-tight">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSScoreWidget;
