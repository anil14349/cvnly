import React from 'react';

interface ResumeStats {
  words: number;
  readTime: number;
  sections: number;
}

interface AnalyticsWidgetProps {
  resumeStats: ResumeStats;
  atsScore: number;
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ resumeStats, atsScore }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700 overflow-hidden transition-colors">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-lg font-semibold text-black dark:text-white">Resume Analytics</h2>
        <p className="text-sm text-gray-800 dark:text-gray-400 mt-1">Real-time metrics for your resume</p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-black dark:text-blue-400">{resumeStats.words}</div>
            <div className="text-xs text-gray-800 dark:text-gray-400 mt-1">Words</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-black dark:text-green-400">{resumeStats.readTime}</div>
            <div className="text-xs text-gray-800 dark:text-gray-400 mt-1">Min. read</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-black dark:text-purple-400">{resumeStats.sections}</div>
            <div className="text-xs text-gray-800 dark:text-gray-400 mt-1">Sections</div>
          </div>
        </div>
        
        {/* ATS Score */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-300">ATS Compatibility</div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{atsScore}%</div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                atsScore >= 80 ? 'bg-green-600' : 
                atsScore >= 60 ? 'bg-yellow-400' : 'bg-red-500'
              }`} 
              style={{ width: `${atsScore}%` }}
            ></div>
          </div>
          <p className="mt-2 text-xs text-gray-700 dark:text-gray-400">
            {atsScore >= 80 ? 'Great! Your resume is ATS-friendly.' : 
            atsScore >= 60 ? 'Good, but could be improved for ATS.' : 
            'Needs improvement for ATS systems.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget; 