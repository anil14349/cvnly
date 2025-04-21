import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FontOptions } from '../../types/common';
import { getHeaderLineColor } from '../../utils/fontUtils';

interface LineColorButtonProps {
    onClick: () => void;
    text: string;
    fontOptions: FontOptions;
    iconClassName?: string;
    textClassName?: string;
}

/**
 * A button component that uses the same color as the section header line
 * for consistent styling across the resume
 */
const LineColorButton: React.FC<LineColorButtonProps> = ({
    onClick,
    text,
    fontOptions,
    iconClassName = 'w-3.5 h-3.5',
    textClassName = 'text-sm'
}) => {
    // Get the same color as used in section header lines
    const lineColor = getHeaderLineColor(fontOptions);
    const [isHovered, setIsHovered] = useState(false);
    
    // Calculate hover color - slightly more opaque version of the line color
    const hoverColor = fontOptions.theme === 'dark' 
        ? 'rgba(229, 231, 235, 0.4)' 
        : 'rgba(156, 163, 175, 0.4)';
    
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full transition-all print:hidden"
            style={{
                border: `1px dashed ${isHovered ? hoverColor : lineColor}`,
                borderColor: isHovered ? hoverColor : lineColor
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Plus className={iconClassName} style={{ color: lineColor }} />
            <span className={textClassName} style={{ color: lineColor }}>
                {text}
            </span>
        </button>
    );
};

export default LineColorButton;
