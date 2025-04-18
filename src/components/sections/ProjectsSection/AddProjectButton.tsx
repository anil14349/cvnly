import React from 'react';
import AddSectionButton from '../../common/AddSectionButton';
import { ADD_PROJECT_LABEL, ADD_PROJECT_BUTTON_CLASS, ADD_PROJECT_ICON_SIZE, ADD_PROJECT_SPAN } from './constants';

interface Props {
    onClick: () => void;
}

const AddProjectButton: React.FC<Props> = ({ onClick }) => (
    <AddSectionButton
        onClick={onClick}
        text={ADD_PROJECT_LABEL}
        buttonClassName={ADD_PROJECT_BUTTON_CLASS}
        iconClassName={ADD_PROJECT_ICON_SIZE}
        textClassName={ADD_PROJECT_SPAN}
    />
);

export default AddProjectButton;