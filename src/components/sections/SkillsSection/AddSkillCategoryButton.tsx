import { AddSectionButton } from '../../common/AddSectionButton';
import { ADD_SKILL_BUTTON_CLASS } from './constants';
import { FontOptions } from '../../../types/common';

interface AddSkillCategoryButtonProps {
    onClick: () => void;
    fontOptions: FontOptions;
}

export const AddSkillCategoryButton = ({ onClick, fontOptions }: AddSkillCategoryButtonProps) => {
    return (
        <AddSectionButton
            onClick={onClick}
            text="Add Skill Category"
            buttonClassName={ADD_SKILL_BUTTON_CLASS}
            fontOptions={fontOptions}
        />
    );
};
