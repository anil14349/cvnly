import React from 'react';
import { getSummaryInputClasses } from '../../../utils/getThemeClasses';
import { FontOptions } from '../../../types/common';

interface Props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: () => void;
    fontOptions: FontOptions;
    style: React.CSSProperties;
}

const SummaryEditor: React.FC<Props> = ({ value, onChange, onBlur, fontOptions, style }) => (
    <textarea
        className={getSummaryInputClasses(fontOptions)}
        style={{ ...style, minHeight: '120px' }}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus
    />
);

export default SummaryEditor;
