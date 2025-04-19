import React from "react";
import { FontOptions } from "../../types/common";
import { getFontWeightValue } from "../../utils/fontUtils";

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
                ${fontOptions.headerColor} 
                ${fontOptions.headerLineHeight} 
                ${fontOptions.headerLetterSpacing} 
                ${getTextAlignment()}
                mb-1 whitespace-pre-wrap 
                font-header-${fontOptions.headerFont.toLowerCase()} 
                ${fontOptions.headerItalic ? 'italic' : ''} 
                ${fontOptions.headerUnderline ? 'underline' : ''}
            `}
            contentEditable
            suppressContentEditableWarning
            style={{ fontWeight: getFontWeightValue(fontOptions.headerWeight) }}
            onBlur={onUpdate}
        >
            {name}
        </h1>
    );
};

export default ResumeHeaderName;
