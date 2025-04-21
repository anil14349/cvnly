import React from 'react';

/**
 * PageBreak visually separates content and simulates a printed page break.
 * It is accessible and visually distinct for both light and dark themes.
 */
const PageBreak: React.FC = () => (
  <div className="relative flex items-center my-8 select-none print:break-before-page">
    <div className="w-full border-t-2 border-dashed border-gray-300 dark:border-gray-600"></div>
    <span className="absolute left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 shadow-md rounded-full -mt-3 z-10">
      Page Break
    </span>
  </div>
);

export default PageBreak;
