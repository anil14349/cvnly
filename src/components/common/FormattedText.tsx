import React, { useRef, useEffect } from 'react';
import type { FontOptions } from '../../types/common';

interface FormattedTextProps {
    text: string;
    fontOptions: FontOptions;
    onTextChange: (newText: string) => void;
    isEditing?: boolean;
    className?: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({
    text,
    fontOptions,
    onTextChange,
    isEditing = false,
    className = '',
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
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*((?!\*)[^*]+)\*/g, '<em>$1</em>');

        return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
    };

    const textStyle = {
        fontSize: fontOptions.bodySize,
        fontWeight: fontOptions.bodyWeight,
        color: fontOptions.bodyColor,
        fontFamily: fontOptions.bodyFont,
        lineHeight: fontOptions.bodyLineHeight,
        letterSpacing: fontOptions.bodyLetterSpacing,
        fontStyle: fontOptions.bodyItalic ? 'italic' : 'normal',
        textDecoration: fontOptions.bodyUnderline ? 'underline' : 'none',
    };

    return (
        <div
            ref={contentRef}
            className={`outline-none ${className}`}
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