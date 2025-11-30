import React, { useState } from 'react';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import SectionControls from '../../common/SectionControls';
import { X } from 'lucide-react';
import type { SkillsSectionProps, Skill } from '../../../types/skill';
import { DEFAULT_SKILLS_TITLE } from '../../sections/SkillsSection/constants';
import { v4 as uuidv4 } from 'uuid';
import { AddSkillCategoryButton } from '../../sections/SkillsSection/AddSkillCategoryButton';
import { getSubheaderFontFamily, getBodyFontFamily, getFontWeightValue } from '../../../utils/fontUtils';

// Convert Tailwind size class to CSS font-size for compact sidebar
const getCompactFontSize = (sizeClass: string): string => {
  const sizeMap: Record<string, string> = {
    'text-xs': '0.65rem',
    'text-sm': '0.75rem',
    'text-base': '0.8rem',
    'text-lg': '0.85rem',
    'text-xl': '0.9rem',
    'text-2xl': '0.95rem',
    'text-3xl': '1rem',
    'text-4xl': '1.1rem',
  };
  return sizeMap[sizeClass] || '0.75rem';
};

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

/**
 * ModernSkillsSection - Optimized for Modern template sidebar
 * Features:
 * - Supports all skill layouts (bulleted, pill, classic)
 * - Compact sizing for sidebar
 * - Full fontOptions support
 */
export const ModernSkillsSection: React.FC<SkillsSectionProps & { previewMode?: boolean }> = ({
  index,
  moveSection,
  deleteSection,
  sectionsLength,
  fontOptions,
  skills,
  setSkills,
  title = DEFAULT_SKILLS_TITLE,
  onTitleChange,
  previewMode = false
}) => {
  const skillLayout = fontOptions?.skillLayout || 'bulleted';
  const handleUpdateSkill = (id: string, updates: Partial<Skill>) => {
    if (!setSkills) return;
    const updatedSkills = skills.map(skill =>
      skill.id === id ? { ...skill, ...updates } : skill
    );
    setSkills(updatedSkills);
  };

  const handleDeleteSkill = (id: string) => {
    if (!setSkills) return;
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
  };

  const addSkillCategory = () => {
    if (!setSkills) return;
    const newCategory: Skill = {
      id: uuidv4(),
      category: 'New Category',
      items: ["New Skill 1", "New Skill 2", "New Skill 3"]
    };
    setSkills([...skills, newCategory]);
  };

  return (
    <section className="mt-4 relative group skills-section modern-skills" aria-labelledby={`skills-section-${index}`}>
      <SectionHeaderLine
        title={title}
        fontOptions={fontOptions}
        onTitleChange={onTitleChange}
        controls={
          <SectionControls
            index={index}
            moveSection={moveSection}
            deleteSection={deleteSection}
            sectionsLength={sectionsLength}
          />
        }
      />
      
      {/* Skill Categories - Respects skillLayout option */}
      <div className="mt-2 space-y-3">
        {skills.map((skillCategory) => (
          <SkillCategoryModern
            key={skillCategory.id}
            category={skillCategory}
            fontOptions={fontOptions}
            updateSkill={handleUpdateSkill}
            deleteSkill={handleDeleteSkill}
            previewMode={previewMode}
            skillLayout={skillLayout}
          />
        ))}
      </div>
      
      <div className="mt-2 print:hidden">
        {!previewMode && (
          <AddSkillCategoryButton onClick={addSkillCategory} fontOptions={fontOptions} />
        )}
      </div>
    </section>
  );
};

/**
 * SkillCategoryModern - Supports bulleted, pill, and classic layouts
 */
interface SkillCategoryModernProps {
  category: Skill;
  fontOptions: any;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  previewMode?: boolean;
  skillLayout?: 'bulleted' | 'pill' | 'classic';
}

const SkillCategoryModern: React.FC<SkillCategoryModernProps> = ({
  category,
  fontOptions,
  updateSkill,
  deleteSkill,
  previewMode = false,
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

  // Build style objects for compact sidebar - use inline styles to ensure fontOptions are applied
  const subheaderStyles: React.CSSProperties = {
    fontFamily: getSubheaderFontFamily(fontOptions),
    fontSize: getCompactFontSize(fontOptions.subheaderSize),
    fontWeight: getFontWeightValue(fontOptions.subheaderWeight),
    fontStyle: fontOptions.subheaderItalic ? 'italic' : 'normal',
    textDecoration: fontOptions.subheaderUnderline ? 'underline' : 'none',
  };

  const bodyStyles: React.CSSProperties = {
    fontFamily: getBodyFontFamily(fontOptions),
    fontSize: getCompactFontSize(fontOptions.bodySize),
    fontWeight: getFontWeightValue(fontOptions.bodyWeight),
    fontStyle: fontOptions.bodyItalic ? 'italic' : 'normal',
    textDecoration: fontOptions.bodyUnderline ? 'underline' : 'none',
  };

  const subheaderColorClass = addDarkModeVariant(fontOptions.subheaderColor);
  const bodyColorClass = addDarkModeVariant(fontOptions.bodyColor);

  // Classic layout: "Category: skill1, skill2, skill3"
  if (skillLayout === 'classic') {
    return (
      <div className="flex items-start gap-1 group/category" style={{ maxWidth: '100%' }}>
        <input
          type="text"
          value={category.category}
          onChange={(e) => updateSkill(category.id, { category: e.target.value })}
          className={`bg-transparent border-none focus:outline-none ${subheaderColorClass}`}
          style={{ ...subheaderStyles, minWidth: '40px', width: `${category.category.length}ch`, maxWidth: '40%' }}
        />
        <span className={subheaderColorClass} style={subheaderStyles}>:</span>
        <input
          type="text"
          value={category.items.join(', ')}
          onChange={(e) => {
            const items = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
            updateSkill(category.id, { items });
          }}
          className={`flex-1 bg-transparent border-none focus:outline-none ${bodyColorClass}`}
          style={{ ...bodyStyles, minWidth: '60px' }}
        />
        {!previewMode && (
          <button
            onClick={() => deleteSkill(category.id)}
            className="opacity-0 group-hover/category:opacity-100 transition-all print:hidden ml-1"
            aria-label="Delete category"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  // Pill layout: rounded tags
  if (skillLayout === 'pill') {
    return (
      <div className="bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg p-2 group/category" style={{ maxWidth: '100%', overflow: 'hidden' }}>
        <div className="flex items-center justify-between mb-2">
          <input
            type="text"
            value={category.category}
            onChange={(e) => updateSkill(category.id, { category: e.target.value })}
            className={`bg-transparent border-none focus:outline-none ${subheaderColorClass}`}
            style={{ ...subheaderStyles, maxWidth: 'calc(100% - 24px)' }}
          />
          {!previewMode && (
            <button onClick={() => deleteSkill(category.id)} className="opacity-0 group-hover/category:opacity-100 transition-all print:hidden">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {category.items.map((item, idx) => (
            <div key={idx} className="group/pill relative">
              <input
                type="text"
                value={item}
                onChange={(e) => handleEditSkill(idx, e.target.value)}
                className={`px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 ${bodyColorClass} focus:outline-none focus:ring-1 focus:ring-blue-500`}
                style={{ ...bodyStyles, minWidth: `${Math.max(item.length * 0.5, 2)}rem` }}
              />
              {!previewMode && (
                <button
                  onClick={() => handleDeleteSkill(idx)}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/pill:opacity-100"
                >
                  <span className="text-[8px]">×</span>
                </button>
              )}
            </div>
          ))}
        </div>
        {!previewMode && (
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            placeholder="+ Add"
            className={`mt-1 px-2 py-0.5 rounded-full border border-dashed border-gray-300 dark:border-gray-600 bg-transparent ${bodyColorClass} focus:outline-none placeholder:text-gray-400`}
            style={{ ...bodyStyles, width: '60px' }}
          />
        )}
      </div>
    );
  }

  // Default: Bulleted layout
  return (
    <div className="bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg p-2 group/category" style={{ maxWidth: '100%', overflow: 'hidden' }}>
      {/* Category Header */}
      <div className="flex items-center justify-between mb-2" style={{ maxWidth: '100%' }}>
        <input
          type="text"
          value={category.category}
          onChange={(e) => updateSkill(category.id, { category: e.target.value })}
          className={`bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/20 rounded px-0 py-0.5 min-w-0 flex-1 ${subheaderColorClass}`}
          style={{ ...subheaderStyles, maxWidth: 'calc(100% - 24px)' }}
        />
        {!previewMode && (
          <button
            onClick={() => deleteSkill(category.id)}
            className="opacity-0 group-hover/category:opacity-100 transition-all print:hidden ml-2 p-1 rounded hover:bg-red-500/20"
            aria-label="Delete category"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Skills - Bulleted List */}
      <ul className="space-y-1" style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {category.items.map((item, idx) => (
          <li key={idx} className="group/item flex items-start gap-1.5">
            <span style={{ color: 'var(--line-color, #3b82f6)', ...bodyStyles }}>•</span>
            <input
              type="text"
              value={item}
              onChange={(e) => handleEditSkill(idx, e.target.value)}
              className={`flex-1 bg-transparent border-none focus:outline-none ${bodyColorClass}`}
              style={bodyStyles}
            />
            {!previewMode && (
              <button
                onClick={() => handleDeleteSkill(idx)}
                className="opacity-0 group-hover/item:opacity-100 transition-opacity"
                aria-label="Delete skill"
              >
                <X className="w-3 h-3 text-red-500" />
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Add New Skill */}
      {!previewMode && (
        <div className="mt-1 flex items-center gap-1.5">
          <span style={{ color: 'var(--line-color, #3b82f6)', ...bodyStyles }}>•</span>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            placeholder="Add skill..."
            className={`flex-1 bg-transparent border-none focus:outline-none ${bodyColorClass} placeholder:text-gray-400`}
            style={bodyStyles}
          />
        </div>
      )}
    </div>
  );
};

export default ModernSkillsSection;

