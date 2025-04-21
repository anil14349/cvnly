import React from 'react';
import LineColorButton from '../../common/LineColorButton';
import { ADD_SUMMARY_TEXT } from './constants';
import { FontOptions } from '../../../types/common';

interface Props {
    onClick: () => void;
    fontOptions: FontOptions;
}

const AddSummaryButton: React.FC<Props> = ({ onClick, fontOptions }) => (
    <div className="mt-2 print:hidden">
        <LineColorButton
            onClick={onClick}
            text={ADD_SUMMARY_TEXT}
            fontOptions={fontOptions}
        />
    </div>
);

export default AddSummaryButton;
