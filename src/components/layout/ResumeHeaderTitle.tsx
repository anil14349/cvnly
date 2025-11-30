import React, { useState } from "react";
import { FontOptions } from "../../types/common";
import { getSubheaderFontFamily } from "../../utils/fontUtils";

// Add dark mode variant to color class
const addDarkModeVariant = (colorClass: string): string => {
  const darkModeMap: { [key: string]: string } = {
    'text-gray-900': 'dark:text-gray-100',
    'text-gray-800': 'dark:text-gray-200',
    'text-gray-700': 'dark:text-gray-300',
    'text-gray-600': 'dark:text-gray-400',
    'text-gray-500': 'dark:text-gray-400',
    'text-black': 'dark:text-white',
    'text-blue-600': 'dark:text-blue-400',
    'text-blue-700': 'dark:text-blue-300',
    'text-blue-800': 'dark:text-blue-200',
  };
  return darkModeMap[colorClass] ? `${colorClass} ${darkModeMap[colorClass]}` : colorClass;
};

interface ResumeHeaderTitleProps {
    fontOptions: FontOptions;
    title: string;
    onUpdate?: () => void;
    onDelete?: () => void;
}

const ResumeHeaderTitle: React.FC<ResumeHeaderTitleProps> = ({ fontOptions, title, onUpdate, onDelete }) => {
    const [hovered, setHovered] = useState(false);
    const getTextAlignment = () => {
        switch (fontOptions.headerAlignment) {
            case 'left':
                return 'text-left';
            case 'right':
                return 'text-right';
            default:
                return 'text-center';
        }
    };

    const getContainerAlignment = () => {
        switch (fontOptions.headerAlignment) {
            case 'left':
                return 'justify-start';
            case 'right':
                return 'justify-end';
            default:
                return 'justify-center';
        }
    };

    return (
        title ? (
            <div
                className={`relative group ${getTextAlignment()}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className={`flex items-center w-full ${getContainerAlignment()}`}>
                    <h2
                        className={`
                            ${fontOptions.subheaderSize}
                            ${fontOptions.subheaderWeight}
                            ${addDarkModeVariant(fontOptions.subheaderColor)}
                            ${fontOptions.subheaderLineHeight}
                            ${fontOptions.subheaderLetterSpacing}
                            whitespace-pre-wrap mb-1
                            ${fontOptions.subheaderItalic ? 'italic' : ''}
                            ${fontOptions.subheaderUnderline ? 'underline' : ''}
                        `}
                        // eslint-disable-next-line react/forbid-component-props
                        style={{ fontFamily: getSubheaderFontFamily(fontOptions) }}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={onUpdate}
                    >
                        {title}
                    </h2>
                    {onDelete && (
                        <button
                            type="button"
                            aria-label="Remove title"
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 ml-2 p-1 rounded-full flex items-center justify-center h-6 w-6"
                            style={{ lineHeight: 1, minHeight: 0, marginBottom: 0, pointerEvents: hovered ? 'auto' : 'none' }}
                            onClick={onDelete}
                        >
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414l4.95-4.95-4.95-4.95A1 1 0 015.05 3.636L10 8.586z" clipRule="evenodd" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        ) : null
    );
};

export default ResumeHeaderTitle;
