import React from "react";
import { FontOptions } from "../../types/common";
import { getFontFamilyString } from "../../utils/fontUtils";

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

interface ResumeHeaderNameProps {
    fontOptions: FontOptions;
    name: string;
    onUpdate?: () => void;
}

const ResumeHeaderName: React.FC<ResumeHeaderNameProps> = ({ fontOptions, name, onUpdate }) => {
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

    return (
        <h1
            className={`
                ${fontOptions.headerSize} 
                ${fontOptions.headerWeight}
                ${addDarkModeVariant(fontOptions.headerColor)} 
                ${fontOptions.headerLineHeight} 
                ${fontOptions.headerLetterSpacing} 
                ${getTextAlignment()}
                mb-1 whitespace-pre-wrap 
                ${fontOptions.headerItalic ? 'italic' : ''} 
                ${fontOptions.headerUnderline ? 'underline' : ''}
            `}
            /* @ts-ignore - Inline style required: Tailwind JIT can't process dynamic font class names */
            style={{ fontFamily: getFontFamilyString(fontOptions.headerFont) }}
            contentEditable
            suppressContentEditableWarning
            onBlur={onUpdate}
        >
            {name}
        </h1>
    );
};

export default ResumeHeaderName;
