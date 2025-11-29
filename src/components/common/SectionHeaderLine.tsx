import React from 'react';
import { FontOptions } from '../../types/common';

interface SectionHeaderLineProps {
    title: string;
    fontOptions?: FontOptions;
    index?: number;
    totalSections?: number;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    onTitleChange?: (title: string) => void;
    controls?: React.ReactNode;
}

const SectionHeaderLine: React.FC<SectionHeaderLineProps> = ({
    title,
    fontOptions,
    index,
    totalSections,
    onMoveUp,
    onMoveDown,
    onTitleChange,
    controls
}) => {
    React.useEffect(() => {
        // Use lineColor from fontOptions, defaulting to blue
        const lineColor = fontOptions?.lineColor || '#4299e1';
        document.documentElement.style.setProperty('--line-color', lineColor);
    }, [fontOptions?.lineColor]);

    const headerStyle = {
        fontFamily: fontOptions?.sectionHeaderFont || 'inherit',
        fontSize: fontOptions?.sectionHeaderSize || 'inherit',
        fontWeight: fontOptions?.sectionHeaderWeight || 'inherit',
        lineHeight: fontOptions?.sectionHeaderLineHeight || 'inherit',
        letterSpacing: fontOptions?.sectionHeaderLetterSpacing || 'inherit',
        fontStyle: fontOptions?.sectionHeaderItalic ? 'italic' : 'normal',
        textDecoration: fontOptions?.sectionHeaderUnderline ? 'underline' : 'none',
        color: fontOptions?.sectionHeaderColor || 'inherit',
    };

    return (
        <div className="relative group">
            <div className="flex items-center justify-between gap-4 pb-2">
                <h2 className="section-header flex-grow" style={headerStyle}>
                    {onTitleChange ? (
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            className="bg-transparent border-none focus:outline-none focus:ring-0 w-full"
                            style={headerStyle}
                            aria-label={`Edit ${title} section title`}
                        />
                    ) : (
                        title
                    )}
                </h2>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
                    {controls || (index !== undefined && totalSections !== undefined && (
                        <div className="flex gap-2">
                            {index > 0 && (
                                <button
                                    onClick={onMoveUp}
                                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                                    title="Move section up"
                                >
                                    ↑
                                </button>
                            )}
                            {index < totalSections - 1 && (
                                <button
                                    onClick={onMoveDown}
                                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                                    title="Move section down"
                                >
                                    ↓
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div 
                style={{ 
                    height: '1px', 
                    width: '100%', 
                    backgroundColor: 'var(--line-color)' 
                }} 
            />
        </div>
    );
};

export default SectionHeaderLine; 