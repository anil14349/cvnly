import { AddSectionButton } from '../../common/AddSectionButton';
import { ADD_SKILL_BUTTON_CLASS, ADD_SKILL_ICON_SIZE, ADD_SKILL_TEXT_SIZE } from './constants';
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
            iconClassName={ADD_SKILL_ICON_SIZE}
            textClassName={ADD_SKILL_TEXT_SIZE}
            fontOptions={fontOptions}
        />
    );
};
