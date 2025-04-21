import React from 'react';
import AddSectionButton from '../../common/AddSectionButton';
import { ADD_PROJECT_LABEL, ADD_PROJECT_BUTTON_CLASS, SECTION_BUTTON_TEXT_STYLE, ADD_PROJECT_ICON_CLASS } from './constants';

interface Props {
    onClick: () => void;
}

const AddProjectButton: React.FC<Props> = ({ onClick }) => (
    <AddSectionButton
        onClick={onClick}
        text={ADD_PROJECT_LABEL}
        buttonClassName={ADD_PROJECT_BUTTON_CLASS}
        iconClassName={ADD_PROJECT_ICON_CLASS}
        textClassName={SECTION_BUTTON_TEXT_STYLE}
    />
);

export default AddProjectButton;