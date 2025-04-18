import React from 'react';
import { Plus } from 'lucide-react';
import { FontOptions } from '../../../types/common';
import { ADD_SUMMARY_LABEL, ADD_SUMMARY_ICON_SIZE, ADD_SUMMARY_BUTTON_CLASS, SPAN_CLASS } from './constants';

interface Props {
    onClick: () => void;
    fontOptions: FontOptions;
}


const AddSummaryButton: React.FC<Props> = ({ onClick }) => (
    <button
        onClick={onClick}
        className={ADD_SUMMARY_BUTTON_CLASS}
        aria-label={ADD_SUMMARY_LABEL}>
        <Plus className={ADD_SUMMARY_ICON_SIZE} aria-hidden="true" />
        <span className={SPAN_CLASS}>{ADD_SUMMARY_LABEL}</span>
    </button>
);

export default AddSummaryButton;
