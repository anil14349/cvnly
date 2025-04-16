import React, { useState } from 'react';
import { Skill } from '../../../types/skill';
import { FontOptions } from '../../../types/common';
import { CategoryHeader, SkillList, NewSkillInput } from './SkillCategoryParts';
import { SKILL_CATEGORY_HEADER_CLASS } from './constants';

interface Props {
    category: Skill;
    fontOptions: FontOptions;
    updateSkill: (id: string, updates: Partial<Skill>) => void;
    deleteSkill: (id: string) => void;
}

const SkillCategory: React.FC<Props> = ({
    category,
    fontOptions,
    updateSkill,
    deleteSkill
}) => {
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            updateSkill(category.id, { items: [...category.items, newSkill.trim()] });
            setNewSkill('');
        }
    };

    const handleEditSkill = (index: number, value: string) => {
        const updatedItems = [...category.items];
        updatedItems[index] = value;
        updateSkill(category.id, { items: updatedItems });
    };

    const handleDeleteSkill = (index: number) => {
        const updatedItems = category.items.filter((_, i) => i !== index);
        updateSkill(category.id, { items: updatedItems });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSkill(category.id, { category: e.target.value });
    };

    return (
        <div className={SKILL_CATEGORY_HEADER_CLASS}>
            <CategoryHeader
                category={category}
                onChange={handleCategoryChange}
                deleteCategory={() => deleteSkill(category.id)}
                fontOptions={fontOptions}
            />

            <SkillList
                items={category.items}
                onEdit={handleEditSkill}
                onDelete={handleDeleteSkill}
                fontOptions={fontOptions}
            />

            <NewSkillInput
                value={newSkill}
                onChange={setNewSkill}
                onAdd={handleAddSkill}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                fontOptions={fontOptions}
            />
        </div>
    );
};

export default SkillCategory;
