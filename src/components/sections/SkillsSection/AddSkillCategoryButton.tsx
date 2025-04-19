import { AddSectionButton } from '../../common/AddSectionButton';
import { ADD_SKILL_BUTTON_CLASS } from './constants';

interface AddSkillCategoryButtonProps {
    onClick: () => void;
}

export const AddSkillCategoryButton = ({ onClick }: AddSkillCategoryButtonProps) => {
    return (
        <AddSectionButton
            onClick={onClick}
            text="Add Skill Category"
            buttonClassName={ADD_SKILL_BUTTON_CLASS}
        />
    );
};
