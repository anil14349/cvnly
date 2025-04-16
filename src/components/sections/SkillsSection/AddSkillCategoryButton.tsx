import React from 'react';
import { Plus } from 'lucide-react';
import { FontOptions } from '../../../types/common';
import {
    ADD_CATEGORY_LABEL,
    ADD_SKILL_BUTTON_CLASS,
    ADD_SKILL_CATEGORY_ICON_CLASS,
    ADD_SKILL_LABEL_CLASS
} from './constants';

interface AddSkillCategoryButtonProps {
    onClick: () => void;
    fontOptions: FontOptions;
}

const AddSkillCategoryButton: React.FC<AddSkillCategoryButtonProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        className={ADD_SKILL_BUTTON_CLASS}
        aria-label={ADD_CATEGORY_LABEL}
    >
        <Plus className={ADD_SKILL_CATEGORY_ICON_CLASS} aria-hidden="true" />
        <span className={ADD_SKILL_LABEL_CLASS}>{ADD_CATEGORY_LABEL}</span>
    </button>
);

export default AddSkillCategoryButton;
