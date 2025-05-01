import React from 'react';
import { SUMMARY_DISPLAY_CLASS } from './constants';

interface Props {
    summary: string;
    fontClass: string;
    style?: React.CSSProperties;
    onClick: () => void;
    placeholder: string;
    previewMode?: boolean;
}

const SummaryDisplay: React.FC<Props> = ({ summary, fontClass, style, onClick, placeholder, previewMode }) => (
    <div
        onClick={onClick}
        className={`${SUMMARY_DISPLAY_CLASS} ${fontClass}`}
        style={style}
    >
        {summary || placeholder}
    </div>
);

export default SummaryDisplay;
