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
    buttonStyleOverride?: React.CSSProperties;
    iconStyleOverride?: React.CSSProperties;
    textStyleOverride?: React.CSSProperties;
    previewMode?: boolean;
}

export const AddSectionButton = ({
    onClick,
    text,
    fontOptions,
    variant = 'primary',
    buttonClassName,
    iconClassName,
    textClassName,
    buttonStyleOverride,
    iconStyleOverride,
    textStyleOverride,
    previewMode = false
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

        // Use a darker version of the line color for better visibility
        const darkLineColor = fontOptions.theme === 'dark'
            ? lineColor // In dark mode, keep the original color for contrast
            : `rgba(${parseInt(lineColor.slice(1, 3), 16)}, ${parseInt(lineColor.slice(3, 5), 16)}, ${parseInt(lineColor.slice(5, 7), 16)}, 0.8)`; // Darker in light mode

        buttonStyle = {
            border: `1.5px dashed ${isHovered ? darkLineColor : hoverColor}`,
            borderColor: isHovered ? darkLineColor : hoverColor,
            borderStyle: 'dashed',
            borderWidth: '1.5px',
            borderRadius: '16px',
            padding: '4px 10px',
            backgroundColor: isHovered ? 'transparent' : 'rgba(156, 163, 175, 0.05)',
            transition: 'all 0.2s ease-in-out'
        };
        iconStyle = {
            color: fontOptions.theme === 'dark' ? '#e5e7eb' : '#374151',
            fontWeight: 'bold',
            width: '14px',
            height: '14px'
        };
        textStyle = {
            color: fontOptions.theme === 'dark' ? '#e5e7eb' : '#374151', // Darker text (gray-800 in light mode, gray-200 in dark mode)
            fontWeight: 400,
            marginLeft: '4px',
            fontSize: '0.75rem' // Smaller font size (12px)
        };
    }

    if (previewMode) {
        return null;
    }

    return (
        <button
            onClick={onClick}
            className={`${defaultButtonClass} ${buttonClassName || ''} print:hidden`}
            style={{ ...buttonStyle, ...buttonStyleOverride }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Plus
                className={`${defaultIconClass} ${iconClassName || ''}`}
                style={{ ...iconStyle, ...iconStyleOverride }}
            />
            <span
                className={`${defaultTextClass} ${textClassName || ''}`}
                style={{ ...textStyle, ...textStyleOverride }}
            >
                {text}
            </span>
        </button>
    );
};

export default AddSectionButton;