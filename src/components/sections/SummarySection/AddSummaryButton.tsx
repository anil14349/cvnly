import React from 'react';
import AddSectionButton from '../../common/AddSectionButton';
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
    <AddSectionButton
        onClick={onClick}
        text={ADD_SUMMARY_TEXT}
        buttonClassName={ADD_SUMMARY_BUTTON_CLASS}
        iconClassName={ADD_SUMMARY_ICON_SIZE}
        textClassName={SUMMARY_TEXT_CLASS}
    />
);

export default AddSummaryButton;
