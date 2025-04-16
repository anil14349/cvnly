import React from 'react';
import { Plus } from 'lucide-react';
import { getAddSummaryButtonClasses } from '../../../utils/getThemeClasses';
import { FontOptions } from '../../../types/common';
import { ADD_SUMMARY_LABEL, ADD_SUMMARY_ICON_SIZE } from './constants';

interface Props {
    onClick: () => void;
    fontOptions: FontOptions;
}

const AddSummaryButton: React.FC<Props> = ({ onClick, fontOptions }) => (
    <button
        onClick={onClick}
        className={getAddSummaryButtonClasses(fontOptions)}
        aria-label={ADD_SUMMARY_LABEL}
    >
        <Plus className={ADD_SUMMARY_ICON_SIZE} aria-hidden="true" />
        <span>{ADD_SUMMARY_LABEL}</span>
    </button>
);

export default AddSummaryButton;
