import React from "react";
import { FontOptions } from "../../types/common";
import { getFontWeightValue } from "../../utils/fontUtils";

interface ResumeHeaderTitleProps {
    fontOptions: FontOptions;
    title: string;
    onUpdate?: () => void;
}

const ResumeHeaderTitle: React.FC<ResumeHeaderTitleProps> = ({ fontOptions, title, onUpdate }) => {
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
        <h2
            className={`
                ${fontOptions.subheaderSize} 
                ${fontOptions.subheaderColor} 
                ${fontOptions.subheaderLineHeight} 
                ${fontOptions.subheaderLetterSpacing} 
                ${getTextAlignment()}
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
    );
};

export default ResumeHeaderTitle;
