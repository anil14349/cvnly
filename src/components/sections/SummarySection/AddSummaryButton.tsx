import React from 'react';
import AddSectionButton from '../../common/AddSectionButton';
import { FontOptions } from '../../../types/common';
import { ADD_SUMMARY_BUTTON_CLASS, ADD_SUMMARY_TEXT_SIZE, ADD_SUMMARY_TEXT, ADD_SUMMARY_ICON_SIZE } from './constants';

interface Props {
    onClick: () => void;
    fontOptions: FontOptions;
    previewMode?: boolean;
}

const AddSummaryButton: React.FC<Props> = ({ onClick, fontOptions, previewMode = false }) => (
    <AddSectionButton
        onClick={onClick}
        text={ADD_SUMMARY_TEXT}
        buttonClassName={ADD_SUMMARY_BUTTON_CLASS}
        iconClassName={ADD_SUMMARY_ICON_SIZE}
        textClassName={ADD_SUMMARY_TEXT_SIZE}
        fontOptions={fontOptions}
        previewMode={previewMode}
    />
);

export default AddSummaryButton;
