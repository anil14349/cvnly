import React from 'react';
import AddSectionButton from '../../common/AddSectionButton';
import { ADD_CERTIFICATION_TEXT, ADD_CERTIFICATION_BUTTON_CLASS, ADD_ICON_SIZE, CERTIFICATION_TEXT_CLASS } from './constants';

interface Props {
    onClick: () => void;
}

const AddCertificationButton: React.FC<Props> = ({ onClick }) => (
    <AddSectionButton
        onClick={onClick}
        text={ADD_CERTIFICATION_TEXT}
        buttonClassName={ADD_CERTIFICATION_BUTTON_CLASS}
        iconClassName={ADD_ICON_SIZE}
        textClassName={CERTIFICATION_TEXT_CLASS}
    />
);

export default AddCertificationButton;