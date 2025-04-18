import React from 'react';
import { Plus } from 'lucide-react';
import {
    ADD_SUMMARY_TEXT,
    ADD_SUMMARY_BUTTON_CLASS,
    ADD_SUMMARY_ICON_SIZE,
    SUMMARY_TEXT_CLASS
} from './constants';

interface Props {
    onClick: () => void;
}

const AddSummaryButton: React.FC<Props> = ({ onClick }) => (
    <button
        onClick={onClick}
        className={ADD_SUMMARY_BUTTON_CLASS}
        aria-label={ADD_SUMMARY_TEXT}
    >
        <Plus className={ADD_SUMMARY_ICON_SIZE} aria-hidden="true" />
        <span className={SUMMARY_TEXT_CLASS}>{ADD_SUMMARY_TEXT}</span>
    </button>
);

export default AddSummaryButton;
