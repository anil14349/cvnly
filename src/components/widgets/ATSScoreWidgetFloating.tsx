import React, { useEffect, useState } from 'react';
import { AlertCircle, ArrowUp, AlertTriangle, Sparkles } from 'lucide-react';
import { calculateATSScore, getScoreColor } from '../../utils/atsScoreCalculator';

interface ATSScoreWidgetFloatingProps {
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

const ATSScoreWidgetFloating: React.FC<ATSScoreWidgetFloatingProps> = ({ resumeData }) => {
  const [scoreData, setScoreData] = useState<ReturnType<typeof calculateATSScore> | null>(null);

  useEffect(() => {
    const result = calculateATSScore(resumeData);
    setScoreData(result);
  }, [resumeData]);

  if (!scoreData) return null;

  const { score, recommendations, breakdown } = scoreData;

  // Max scores for each category
  const getMaxScore = (key: string): number => {
    const maxScores: Record<string, number> = {
      keywords: 25,
      format: 20,
      sections: 20,
      length: 15,
      readability: 20,
    };
    return maxScores[key] || 20;
  };

  return (
    <div className="p-5">
      {/* NO HEADER - Panel already shows "ATS Score" */}
      
      {/* Clean Score Display */}
      <div className="flex flex-col items-center mb-6">
        {/* Large Score Number */}
        <div className="flex items-baseline gap-1 mb-3">
          <div className="text-7xl font-bold tracking-tight tabular-nums" style={{ color: getScoreColor(score) }}>
            {score}
          </div>
          <div className="text-3xl font-normal text-gray-500 dark:text-gray-400">/100</div>
        </div>
        
        {/* Status Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
          score >= 80 
            ? 'bg-green-100 text-green-700' 
            : score >= 60 
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {score >= 80 ? (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Excellent</span>
            </>
          ) : score >= 60 ? (
            <>
              <ArrowUp className="w-4 h-4" />
              <span>Good</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-4 h-4" />
              <span>Needs Work</span>
            </>
          )}
        </div>
        
        {/* Message */}
        <p className="text-sm text-gray-700 dark:text-gray-100 text-center mt-3 leading-relaxed font-medium">
          {score >= 80 
            ? 'Your resume is well-optimized for ATS systems!' 
            : score >= 60 
            ? 'Your resume is decent but can be improved'
            : 'Your resume needs significant improvements'}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700 my-5" />

      {/* Breakdown Section - Compact & Clean */}
      <div className="space-y-3 mb-6">
        <h3 className="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-3">
          Breakdown
        </h3>
        
        {Object.entries(breakdown).map(([key, value]) => {
          const percentage = Math.round((value / getMaxScore(key)) * 100);
          return (
            <div key={key} className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                  {key}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">
                  {percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-700 ease-out ${
                    percentage >= 70
                      ? 'bg-green-600 dark:bg-green-500'
                      : percentage >= 40
                      ? 'bg-yellow-600 dark:bg-yellow-500'
                      : 'bg-red-600 dark:bg-red-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Priority Action - Single Most Important */}
      {recommendations.length > 0 && (
        <>
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-5" />
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-600">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-700 rounded-lg flex-shrink-0 mt-0.5">
                <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-100" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-blue-900 dark:text-white mb-1.5 uppercase tracking-wide">
                  Priority Action
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-100 leading-relaxed font-medium">
                  {recommendations[0]}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ATSScoreWidgetFloating;

