import React from 'react';
import { Plus } from 'lucide-react';
import { getAddSummaryButtonClasses } from '../../../utils/getThemeClasses';
import { FontOptions } from '../../../types/common';
import { ADD_CATEGORY_LABEL, ADD_SUMMARY_ICON_SIZE } from './constants';

interface AddSkillCategoryButtonProps {
    onClick: () => void;
    fontOptions: FontOptions;
}

const AddSkillCategoryButton: React.FC<AddSkillCategoryButtonProps> = ({ onClick, fontOptions }) => (
    <button
        onClick={onClick}
        className={getAddSummaryButtonClasses(fontOptions)}
        aria-label={ADD_CATEGORY_LABEL}
    >
        <Plus className={ADD_SUMMARY_ICON_SIZE} aria-hidden="true" />
        <span>{ADD_CATEGORY_LABEL}</span>
    </button>
);

export default AddSkillCategoryButton;
