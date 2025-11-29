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

// Add dark mode variant to color class
const addDarkModeVariant = (colorClass: string): string => {
  const darkModeMap: { [key: string]: string } = {
    'text-gray-900': 'dark:text-gray-100',
    'text-gray-800': 'dark:text-gray-200',
    'text-gray-700': 'dark:text-gray-300',
    'text-gray-600': 'dark:text-gray-400',
    'text-gray-500': 'dark:text-gray-400',
    'text-black': 'dark:text-white',
    'text-blue-600': 'dark:text-blue-400',
  };
  return darkModeMap[colorClass] ? `${colorClass} ${darkModeMap[colorClass]}` : colorClass;
};

interface Props {
    category: Skill;
    fontOptions: FontOptions;
    updateSkill: (id: string, updates: Partial<Skill>) => void;
    deleteSkill: (id: string) => void;
    skillLayout?: import('../../../types/common').SkillLayoutType;
    previewMode?: boolean;
}

const SkillCategory: React.FC<Props> = ({
    category,
    fontOptions,
    updateSkill,
    deleteSkill,
    skillLayout = 'bulleted',
    previewMode = false,
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
        const subheaderClasses = `${fontOptions.subheaderSize} ${fontOptions.subheaderWeight} ${addDarkModeVariant(fontOptions.subheaderColor)} ${fontOptions.subheaderLineHeight} ${fontOptions.subheaderLetterSpacing} font-header-${fontOptions.subheaderFont?.toLowerCase?.()} ${fontOptions.subheaderItalic ? 'italic' : ''} ${fontOptions.subheaderUnderline ? 'underline' : ''}`;
        const bodyClasses = `${fontOptions.bodySize} ${fontOptions.bodyWeight} ${addDarkModeVariant(fontOptions.bodyColor)} ${fontOptions.bodyLineHeight} ${fontOptions.bodyLetterSpacing} font-body-${fontOptions.bodyFont?.toLowerCase?.()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`;
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
        <div className="bg-white dark:bg-gray-800 border-none border-gray-100 dark:border-gray-700 rounded-lg shadow-sm p-4 group/category">
            <CategoryHeader
                category={category}
                onChange={handleCategoryChange}
                deleteCategory={() => deleteSkill(category.id)}
                fontOptions={fontOptions}
            />
            {skillLayout === 'pill' ? (
                <>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {category.items.map((item, idx) => (
                            <div key={idx} className="group/pill relative">
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => handleEditSkill(idx, e.target.value)}
                                className={`px-3 py-1 rounded-full border bg-gray-100 dark:bg-gray-700 ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${addDarkModeVariant(fontOptions.bodyColor)} font-body-${fontOptions.bodyFont?.toLowerCase?.()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    style={{
                                        borderColor: 'var(--line-color, #d1d5db)',
                                        fontFamily: fontOptions.bodyFont,
                                        lineHeight: fontOptions.bodyLineHeight,
                                        letterSpacing: fontOptions.bodyLetterSpacing,
                                        minWidth: `${Math.max(item.length * 0.6, 3)}rem`,
                                    }}
                                />
                                {!previewMode && (
                                    <button
                                        onClick={() => handleDeleteSkill(idx)}
                                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/pill:opacity-100 transition-opacity"
                                        aria-label="Delete skill"
                                    >
                                        <span className="text-xs">×</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {!previewMode && (
                        <div className="mt-2">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                placeholder="Add new skill..."
                                className={`px-3 py-1 rounded-full border border-dashed bg-transparent ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${addDarkModeVariant(fontOptions.bodyColor)} font-body-${fontOptions.bodyFont?.toLowerCase?.()} focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                                style={{
                                    borderColor: 'var(--line-color, #d1d5db)',
                                    fontFamily: fontOptions.bodyFont,
                                    lineHeight: fontOptions.bodyLineHeight,
                                    letterSpacing: fontOptions.bodyLetterSpacing,
                                }}
                            />
                        </div>
                    )}
                </>
            ) : (
                <>
                    <SkillList
                        items={category.items}
                        onEdit={handleEditSkill}
                        onDelete={handleDeleteSkill}
                        fontOptions={fontOptions}
                        baseTextClasses={baseTextClasses}
                    />
                    <NewSkillInput
                        value={newSkill}
                        onChange={setNewSkill}
                        onAdd={handleAddSkill}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        fontOptions={fontOptions}
                        baseTextClasses={baseTextClasses}
                        previewMode={previewMode}
                    />
                </>
            )}
        </div>
    );
};

export default SkillCategory;
