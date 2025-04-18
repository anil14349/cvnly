import React from 'react';
import { Plus } from 'lucide-react';
import { FontOptions } from '../../../types/common';
import { ADD_PROJECT_BUTTON_CLASS, ADD_PROJECT_LABEL, ADD_PROJECT_ICON_SIZE, ADD_PROJECT_SPAN } from './constants';
interface Props {
    onClick: () => void;
    fontOptions: FontOptions;
}


const AddProjectButton: React.FC<Props> = ({ onClick }) => (
    <button
        onClick={onClick}
        className={ADD_PROJECT_BUTTON_CLASS}
        aria-label={ADD_PROJECT_LABEL}
    >
        <Plus className={ADD_PROJECT_ICON_SIZE} aria-hidden="true" />
        <span className={ADD_PROJECT_SPAN}>Add Project</span>
    </button>
);

export default AddProjectButton; 