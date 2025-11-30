import React, { useRef } from 'react';
import type { FontOptions } from '../../types/common';
import { getFontSizeClass, getBodyFontFamily } from '../../utils/fontUtils';

interface FormattedTextProps {
    text: string;
    fontOptions: FontOptions;
    onTextChange: (newText: string) => void;
    isEditing?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const FormattedText: React.FC<FormattedTextProps> = ({
    text,
    fontOptions,
    onTextChange,
    isEditing = false,
    className = '',
    style,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isEditing) return;

        // Handle bold (Cmd/Ctrl + B)
        if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
            e.preventDefault();
            const selection = window.getSelection();
            if (!selection || !contentRef.current) return;

            const range = selection.getRangeAt(0);
            const selectedText = range.toString();

            if (selectedText) {
                // If text is selected, apply formatting only to selection
                const start = range.startOffset;
                const end = range.endOffset;
                const fullText = contentRef.current.textContent || '';

                const beforeSelection = fullText.substring(0, start);
                const afterSelection = fullText.substring(end);

                // Check if selection is already bold
                const isBold = selectedText.startsWith('**') && selectedText.endsWith('**');
                const formattedSelection = isBold
                    ? selectedText.substring(2, selectedText.length - 2)
                    : `**${selectedText}**`;

                const newText = beforeSelection + formattedSelection + afterSelection;
                onTextChange(newText);
            } else {
                // If no selection, check if entire text is bold
                const isBold = text.startsWith('**') && text.endsWith('**');
                const newText = isBold ? text.substring(2, text.length - 2) : `**${text}**`;
                onTextChange(newText);
            }
        }

        // Handle italic (Cmd/Ctrl + I)
        if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
            e.preventDefault();
            const selection = window.getSelection();
            if (!selection || !contentRef.current) return;

            const range = selection.getRangeAt(0);
            const selectedText = range.toString();

            if (selectedText) {
                // If text is selected, apply formatting only to selection
                const start = range.startOffset;
                const end = range.endOffset;
                const fullText = contentRef.current.textContent || '';

                const beforeSelection = fullText.substring(0, start);
                const afterSelection = fullText.substring(end);

                // Check if selection is already italic
                const isItalic = selectedText.startsWith('*') && selectedText.endsWith('*') && !selectedText.startsWith('**');
                const formattedSelection = isItalic
                    ? selectedText.substring(1, selectedText.length - 1)
                    : `*${selectedText}*`;

                const newText = beforeSelection + formattedSelection + afterSelection;
                onTextChange(newText);
            } else {
                // If no selection, check if entire text is italic
                const isItalic = text.startsWith('*') && text.endsWith('*') && !text.startsWith('**');
                const newText = isItalic ? text.substring(1, text.length - 1) : `*${text}*`;
                onTextChange(newText);
            }
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!isEditing) return;
        const newText = e.currentTarget.textContent || '';
        if (newText !== text) {
            onTextChange(newText);
        }
    };

    const renderFormattedText = () => {
        // Handle undefined or null text
        if (!text) {
            return <span></span>;
        }

        // Replace markdown-style formatting with HTML
        const formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*((?!\*)[^*]+)\*/g, '<em>$1</em>');

        return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
    };

    const trimmedText = text.trim();

    const isDatePattern =
        /^\d{4}\s*-\s*(\d{4}|Present)$/i.test(trimmedText) || // "2020 - 2024" or "2020 - Present"
        /^(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\s+\d{4}\s*-\s*(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?|\d{4}|Present)$/i.test(trimmedText) || // Month Year - Month Year | Month Year - Present
        trimmedText === 'Start Date - End Date';

    const isDateElement =
        (className.includes('inline-block') && isDatePattern) ||
        trimmedText === 'Present' ||
        className.includes('experience-period');

    // Create the text style with fontOptions and apply custom styles if provided
    // Note: Using getBodyFontFamily() to get proper CSS font-family string with fallbacks
    const textStyle: React.CSSProperties = {
        fontWeight: fontOptions.bodyWeight,
        color: isDateElement ? 'var(--line-color)' : fontOptions.bodyColor,
        fontFamily: getBodyFontFamily(fontOptions),
        lineHeight: fontOptions.bodyLineHeight,
        letterSpacing: fontOptions.bodyLetterSpacing,
        fontStyle: fontOptions.bodyItalic ? 'italic' : 'normal',
        textDecoration: fontOptions.bodyUnderline ? 'underline' : 'none',
        ...(style || {}), // Merge custom styles (overrides fontOptions)
    };

    return (
        <div
            ref={contentRef}
            className={`outline-none ${getFontSizeClass(fontOptions.bodySize)} ${className}`}
            contentEditable={isEditing}
            suppressContentEditableWarning={isEditing}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            style={textStyle}
            role="textbox"
            aria-multiline="true"
            aria-label="Editable text"
        >
            {renderFormattedText()}
        </div>
    );
};

export default FormattedText; 