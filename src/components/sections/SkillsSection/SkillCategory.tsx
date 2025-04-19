import React, { useState } from 'react';
import { Skill } from '../../../types/skill';
import { FontOptions } from '../../../types/common';
import { CategoryHeader, SkillList, NewSkillInput } from './SkillCategoryParts';
import { getFontClassNames } from '../../../utils/fontUtils';
import {
    CLASSIC_CATEGORY_CONTAINER_CLASS,
    CLASSIC_CATEGORY_INPUT_CLASS,
    CLASSIC_CATEGORY_SEPARATOR_CLASS,
    CLASSIC_ITEMS_INPUT_CLASS
} from './constants';

interface Props {
    category: Skill;
    fontOptions: FontOptions;
    updateSkill: (id: string, updates: Partial<Skill>) => void;
    deleteSkill: (id: string) => void;
    skillLayout?: import('../../../types/common').SkillLayoutType;
}

const SkillCategory: React.FC<Props> = ({
    category,
    fontOptions,
    updateSkill,
    deleteSkill,
    skillLayout = 'bulleted',
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

    const baseTextClasses = getFontClassNames(fontOptions);

    if (skillLayout === 'classic') {
        // Compose the display value
        const subheaderClasses = `${fontOptions.subheaderSize} ${fontOptions.subheaderWeight} ${fontOptions.subheaderColor} font-header-${fontOptions.subheaderFont?.toLowerCase?.()} ${fontOptions.subheaderItalic ? 'italic' : ''} ${fontOptions.subheaderUnderline ? 'underline' : ''}`;
        const bodyClasses = `${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`;
        return (
            <li className={CLASSIC_CATEGORY_CONTAINER_CLASS}>
                <input
                    type="text"
                    value={category.category}
                    onChange={e => {
                        updateSkill(category.id, { category: e.target.value });
                    }}
                    className={`${CLASSIC_CATEGORY_INPUT_CLASS} ${subheaderClasses}`}
                    style={{ minWidth: 40, width: `${category.category.length}ch`, maxWidth: '100%' }}
                />
                <span className={CLASSIC_CATEGORY_SEPARATOR_CLASS}>:</span>
                <input
                    type="text"
                    value={category.items.join(', ')}
                    onChange={e => {
                        const items = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        updateSkill(category.id, { items });
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            // Add a new blank category below (to be handled in parent)
                        }
                    }}
                    className={`${CLASSIC_ITEMS_INPUT_CLASS} ${bodyClasses}`}
                    style={{ minWidth: 120 }}
                />
            </li>
        );
    }
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 group/category">
            <CategoryHeader
                category={category}
                onChange={handleCategoryChange}
                deleteCategory={() => deleteSkill(category.id)}
                fontOptions={fontOptions}
            />
            {skillLayout === 'pill' ? (
                <div className="flex flex-wrap gap-2 mt-1">
                    {category.items.map((item, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200">
                            {item}
                        </span>
                    ))}
                </div>
            ) : (
                <SkillList
                    items={category.items}
                    onEdit={handleEditSkill}
                    onDelete={handleDeleteSkill}
                    fontOptions={fontOptions}
                    baseTextClasses={baseTextClasses}
                />
            )}
            <NewSkillInput
                value={newSkill}
                onChange={setNewSkill}
                onAdd={handleAddSkill}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                fontOptions={fontOptions}
                baseTextClasses={baseTextClasses}
            />
        </div>
    );
};

export default SkillCategory;
