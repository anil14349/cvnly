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
    
    // Use a darker version of the line color for better visibility
    const darkLineColor = fontOptions.theme === 'dark' 
        ? lineColor // In dark mode, keep the original color for contrast
        : `rgba(${parseInt(lineColor.slice(1, 3), 16)}, ${parseInt(lineColor.slice(3, 5), 16)}, ${parseInt(lineColor.slice(5, 7), 16)}, 0.8)`; // Darker in light mode
        
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all print:hidden shadow-sm"
            style={{
                border: `1.5px dashed ${isHovered ? darkLineColor : hoverColor}`,
                borderColor: isHovered ? darkLineColor : hoverColor,
                borderStyle: 'dashed',
                borderWidth: '1.5px',
                borderRadius: '16px',
                padding: '4px 10px',
                backgroundColor: isHovered ? 'transparent' : 'rgba(156, 163, 175, 0.05)',
                transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Plus className={iconClassName} style={{ 
                color: fontOptions.theme === 'dark' ? '#e5e7eb' : '#374151',
                fontWeight: 'bold',
                width: '14px',
                height: '14px'
            }} />
            <span 
                className={`${textClassName} font-medium`} 
                style={{ 
                    color: fontOptions.theme === 'dark' ? '#e5e7eb' : '#374151',
                    fontWeight: 400,
                    marginLeft: '4px',
                    fontSize: '0.75rem' // Smaller font size (12px)
                }}
            >
                {text}
            </span>
        </button>
    );
};

export default LineColorButton;
