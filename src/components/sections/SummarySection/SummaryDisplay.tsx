import React from 'react';
import { SUMMARY_DISPLAY_CLASS } from './constants';

interface Props {
    summary: string;
    fontClass: string;
    style?: React.CSSProperties;
    onClick: () => void;
    placeholder: string;
}

const SummaryDisplay: React.FC<Props> = ({ summary, fontClass, style, onClick, placeholder }) => (
    <div
        onClick={onClick}
        className={`${SUMMARY_DISPLAY_CLASS} ${fontClass}`}
        style={style}
    >
        {summary || placeholder}
    </div>
);

export default SummaryDisplay;
