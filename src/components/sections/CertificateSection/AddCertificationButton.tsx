import React from 'react';
import { Plus } from 'lucide-react';
import { FontOptions } from '../../../types/common';
import { ADD_CERTIFICATION_BUTTON_STYLES, ADD_CERTIFICATION_TEXT } from './constants';

interface Props {
    onClick: () => void;
    fontOptions: FontOptions;
}

const AddCertificationButton: React.FC<Props> = ({ onClick }) => (
    <button
        onClick={onClick}
        className={ADD_CERTIFICATION_BUTTON_STYLES.button}
        aria-label={ADD_CERTIFICATION_TEXT}
    >
        <Plus className={ADD_CERTIFICATION_BUTTON_STYLES.icon} aria-hidden="true" />
        <span className={ADD_CERTIFICATION_BUTTON_STYLES.text}>{ADD_CERTIFICATION_TEXT}</span>
    </button>
);

export default AddCertificationButton; 