import React, { useState } from "react";
import { FontOptions } from "../../types/common";
import { getFontWeightValue } from "../../utils/fontUtils";

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
                            ${fontOptions.subheaderColor}
                            ${fontOptions.subheaderLineHeight}
                            ${fontOptions.subheaderLetterSpacing}
                            whitespace-pre-wrap mb-1
                            font-header-${fontOptions.subheaderFont.toLowerCase()}
                            ${fontOptions.subheaderItalic ? 'italic' : ''}
                            ${fontOptions.subheaderUnderline ? 'underline' : ''}
                        `}
                        contentEditable
                        suppressContentEditableWarning
                        style={{ fontWeight: getFontWeightValue(fontOptions.subheaderWeight) }}
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
