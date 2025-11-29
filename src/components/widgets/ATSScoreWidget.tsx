import React, { useEffect, useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">ATS Score</h2>
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Applicant Tracking System compatibility
        </p>
      </div>

      <div className="px-5 py-5">
        {/* Score Circle */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
                className={`${score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">out of 100</div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Score Breakdown</h3>
          {Object.entries(breakdown).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 capitalize">
                  {key}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {Math.round(value)}/{key === 'keywords' ? 25 : key === 'sections' ? 25 : key === 'format' ? 20 : key === 'length' ? 15 : 15}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    value >= 20 ? 'bg-green-500' : value >= 10 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{
                    width: `${(value / (key === 'keywords' ? 25 : key === 'sections' ? 25 : key === 'format' ? 20 : key === 'length' ? 15 : 15)) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Recommendations
          </h3>
          <div className="space-y-2.5">
            {recommendations.slice(0, 5).map((rec, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 p-2 rounded bg-gray-50 dark:bg-gray-700/50"
              >
                {index === 0 ? (
                  <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${getScoreColor(score)}`} />
                ) : (
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                )}
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-800 dark:text-blue-300">
            ATS systems scan resumes for keywords, format, and structure. A higher score increases your chances of passing initial screening.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ATSScoreWidget;
