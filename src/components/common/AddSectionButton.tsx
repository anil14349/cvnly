import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SECTION_BUTTON_STYLES, SECTION_BUTTON_TEXT_STYLE } from './constants';
import { FontOptions } from '../../types/common';
import { getHeaderLineColor } from '../../utils/fontUtils';

interface AddSectionButtonProps {
    onClick: () => void;
    text: string;
    fontOptions?: FontOptions;
    variant?: 'primary' | 'secondary' | 'inline';
    buttonClassName?: string;
    iconClassName?: string;
    textClassName?: string;
}

export const AddSectionButton = ({
    onClick,
    text,
    fontOptions,
    variant = 'primary',
    buttonClassName,
    iconClassName,
    textClassName
}: AddSectionButtonProps) => {
    const defaultButtonClass = SECTION_BUTTON_STYLES.button;
    const defaultIconClass = SECTION_BUTTON_STYLES.icon;
    const defaultTextClass = SECTION_BUTTON_TEXT_STYLE;
    const [isHovered, setIsHovered] = useState(false);
    
    // Use line color if fontOptions is provided
    let buttonStyle = {};
    let iconStyle = {};
    let textStyle = {};
    
    if (fontOptions) {
        const lineColor = getHeaderLineColor(fontOptions);
        const hoverColor = fontOptions.theme === 'dark' 
            ? 'rgba(229, 231, 235, 0.4)' 
            : 'rgba(156, 163, 175, 0.4)';
            
        buttonStyle = {
            border: `1px dashed ${isHovered ? hoverColor : lineColor}`,
            borderColor: isHovered ? hoverColor : lineColor
        };
        
        iconStyle = { color: lineColor };
        textStyle = { color: lineColor };
    }

    return (
        <button
            onClick={onClick}
            className={`${defaultButtonClass} ${buttonClassName || ''}`}
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Plus 
                className={`${defaultIconClass} ${iconClassName || ''}`} 
                style={iconStyle}
            />
            <span 
                className={`${defaultTextClass} ${textClassName || ''}`}
                style={textStyle}
            >
                {text}
            </span>
        </button>
    );
};

export default AddSectionButton;