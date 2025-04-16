import React from 'react';
import { Plus } from 'lucide-react';
import { getAddSummaryButtonClasses } from '../../../utils/getThemeClasses';
import { FontOptions } from '../../../types/common';
import { ADD_CATEGORY_LABEL, ADD_SUMMARY_ICON_SIZE, SKILL_CATEGORY_HEADER_CLASS } from './constants';

interface AddSkillCategoryButtonProps {
    onClick: () => void;
    fontOptions: FontOptions;
}

const AddSkillCategoryButton: React.FC<AddSkillCategoryButtonProps> = ({ onClick, fontOptions }) => (
    <div className={SKILL_CATEGORY_HEADER_CLASS}>
        <button
            onClick={onClick}
            className={`${getAddSummaryButtonClasses(fontOptions)} h-full w-full flex flex-col items-center justify-center`}
            aria-label={ADD_CATEGORY_LABEL}
        >
            <Plus className={ADD_SUMMARY_ICON_SIZE} aria-hidden="true" />
            <span>{ADD_CATEGORY_LABEL}</span>
        </button>
    </div>
);

export default AddSkillCategoryButton;
