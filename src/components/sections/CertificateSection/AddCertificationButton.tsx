import React from 'react';
import { FontOptions } from '../../../types/common';
import { ADD_CERTIFICATION_BUTTON_STYLES, ADD_CERTIFICATION_TEXT } from './constants';

interface Props {
    onClick: () => void;
    fontOptions: FontOptions;
}

const AddCertificationButton: React.FC<Props> = ({ onClick }) => (
    <button
        onClick={onClick}
        className={ADD_CERTIFICATION_BUTTON_STYLES.button + ' mt-1'}
        aria-label={ADD_CERTIFICATION_TEXT}
    >
        <span className="text-lg leading-none mr-1">+</span>
        <span className={ADD_CERTIFICATION_BUTTON_STYLES.text}>{ADD_CERTIFICATION_TEXT}</span>
    </button>
);

export default AddCertificationButton; 