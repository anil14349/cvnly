import React from 'react';
import AddSectionButton from '../../../components/common/AddSectionButton';
import { ADD_SKILL_BUTTON_CLASS } from './constants';

interface AddSkillCategoryButtonProps {
    onClick: () => void;
}

export const AddSkillCategoryButton: React.FC<AddSkillCategoryButtonProps> = ({ onClick }) => {
    return (
        <AddSectionButton
            onClick={onClick}
            text="Add Category"
            variant="secondary"
            buttonClassName={ADD_SKILL_BUTTON_CLASS}
        />
    );
};
