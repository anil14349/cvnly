import React, { useState } from 'react';
import { FontOptions } from '../../types/common';

interface LineBreakToolProps {
  fontOptions: FontOptions;
  onFontOptionChange: (option: keyof FontOptions, value: string | boolean) => void;
}

const LineBreakTool: React.FC<LineBreakToolProps> = ({ fontOptions, onFontOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedBreak, setSelectedBreak] = useState<HTMLDivElement | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    // Only show the context menu if right clicking on the resume content or a page break
    const target = e.target as HTMLElement;
    const resumeContainer = target.closest('.resume-container');
    const pageBreak = target.closest('.line-break') as HTMLDivElement | null;

    if (!resumeContainer) return;

    // Prevent the default context menu
    e.preventDefault();

    // Set the position of the custom context menu
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);

    // Store the selected page break if right-clicking on one
    setSelectedBreak(pageBreak);

    // Close the menu when clicking anywhere else
    const closeMenu = () => {
      setIsOpen(false);
      setSelectedBreak(null);
      document.removeEventListener('click', closeMenu);
    };

    document.addEventListener('click', closeMenu);
  };

  React.useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu as unknown as EventListener);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu as unknown as EventListener);
    };
  }, []);

  const insertLineBreak = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const lineBreak = document.createElement('div');
    lineBreak.className = 'line-break page-break-before w-full border-t border-gray-300 dark:border-gray-600 my-4';
    lineBreak.innerHTML = '<div class="flex justify-center -mt-2.5"><span class="bg-white dark:bg-gray-800 px-2 text-xs text-gray-500 dark:text-gray-400">Page Break</span></div>';

    range.insertNode(lineBreak);
    setIsOpen(false);
  };

  const deleteLineBreak = () => {
    if (selectedBreak) {
      selectedBreak.remove();
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 bg-white dark:bg-gray-100 shadow-md rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 text-sm"
      style={{ top: position.y, left: position.x }}
    >
      {!selectedBreak ? (
        <button
          onClick={insertLineBreak}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m-8-8h16" />
          </svg>
          Insert Page Break
        </button>
      ) : (
        <button
          onClick={deleteLineBreak}
          className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Page Break
        </button>
      )}
    </div>
  );
};

export default LineBreakTool; 