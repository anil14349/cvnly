import React from 'react';

interface Props {
    summary: string;
    fontClass: string;
    style: React.CSSProperties;
    onClick: () => void;
    placeholder: string;
}

const SummaryDisplay: React.FC<Props> = ({ summary, fontClass, style, onClick, placeholder }) => (
    <div
        className={`cursor-text whitespace-pre-wrap ${fontClass}`}
        style={style}
        onClick={onClick}
        role="textbox"
        aria-label="Professional Summary"
    >
        {summary || (
            <span className="text-gray-100 italic print:text-black">
                {placeholder}
            </span>
        )}
    </div>
);

export default SummaryDisplay;
