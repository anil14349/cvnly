import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { Skill } from '../../../types/skill';
import { v4 as uuidv4 } from 'uuid';
import { getSubheaderFontFamily, getBodyFontFamily, getFontWeightValue } from '../../../utils/fontUtils';

interface TwoColumnSkillsSectionProps {
  skills: Skill[];
  setSkills?: (skills: Skill[]) => void;
  fontOptions: any;
  title?: string;
  onTitleChange?: (title: string) => void;
  previewMode?: boolean;
}

/**
 * TwoColumnSkillsSection - Professional dark sidebar skills
 * Supports bulleted, pill, and classic layouts via fontOptions.skillLayout
 */
export const TwoColumnSkillsSection: React.FC<TwoColumnSkillsSectionProps> = ({
  skills,
  setSkills,
  fontOptions,
  title = 'Skills',
  onTitleChange,
  previewMode = false
}) => {
  const skillLayout = fontOptions?.skillLayout || 'pill'; // Default to pill for dark sidebar
  const handleUpdateSkill = (id: string, updates: Partial<Skill>) => {
    if (!setSkills) return;
    setSkills(skills.map(skill => skill.id === id ? { ...skill, ...updates } : skill));
  };

  const handleDeleteSkill = (id: string) => {
    if (!setSkills) return;
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const addSkillCategory = () => {
    if (!setSkills) return;
    setSkills([...skills, {
      id: uuidv4(),
      category: 'Category',
      items: ['Skill 1', 'Skill 2']
    }]);
  };

  return (
    <section>
      {/* Section Title */}
      <h3 style={{
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.6)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '12px',
        fontFamily: getSubheaderFontFamily(fontOptions),
      }}>
        {onTitleChange ? (
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              fontFamily: 'inherit',
              textTransform: 'inherit',
              letterSpacing: 'inherit',
              width: '100%',
              outline: 'none',
            }}
          />
        ) : title}
      </h3>

      {/* Skill Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {skills.map((category) => (
          <SkillCategoryTwoColumn
            key={category.id}
            category={category}
            fontOptions={fontOptions}
            updateSkill={handleUpdateSkill}
            deleteSkill={handleDeleteSkill}
            previewMode={previewMode}
            skillLayout={skillLayout}
          />
        ))}
      </div>

      {/* Add Category */}
      {!previewMode && (
        <button
          onClick={addSkillCategory}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '12px',
            padding: '8px',
            background: 'transparent',
            border: '1px dashed rgba(255,255,255,0.25)',
            borderRadius: '6px',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
          }}
        >
          <Plus size={14} />
          Add Category
        </button>
      )}
    </section>
  );
};

interface SkillCategoryTwoColumnProps {
  category: Skill;
  fontOptions: any;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  previewMode?: boolean;
  skillLayout?: 'bulleted' | 'pill' | 'classic';
}

const SkillCategoryTwoColumn: React.FC<SkillCategoryTwoColumnProps> = ({
  category,
  fontOptions,
  updateSkill,
  deleteSkill,
  previewMode,
  skillLayout = 'pill',
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      updateSkill(category.id, { items: [...category.items, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleDeleteSkillItem = (index: number) => {
    updateSkill(category.id, { items: category.items.filter((_, i) => i !== index) });
  };

  const handleEditSkill = (index: number, value: string) => {
    const items = [...category.items];
    items[index] = value;
    updateSkill(category.id, { items });
  };

  // Classic layout: "Category: skill1, skill2, skill3"
  if (skillLayout === 'classic') {
    return (
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', position: 'relative' }}
      >
        <input
          type="text"
          value={category.category}
          onChange={(e) => updateSkill(category.id, { category: e.target.value })}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontSize: '0.8rem',
            fontWeight: 600,
            fontFamily: getSubheaderFontFamily(fontOptions),
            outline: 'none',
            padding: 0,
            minWidth: '40px',
            width: `${category.category.length}ch`,
            maxWidth: '40%',
          }}
        />
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>:</span>
        <input
          type="text"
          value={category.items.join(', ')}
          onChange={(e) => {
            const items = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
            updateSkill(category.id, { items });
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.85)',
            fontSize: '0.75rem',
            fontFamily: getBodyFontFamily(fontOptions),
            outline: 'none',
            padding: 0,
            flex: 1,
          }}
        />
        {!previewMode && isHovered && (
          <button
            onClick={() => deleteSkill(category.id)}
            style={{
              background: 'rgba(239, 68, 68, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <X size={8} color="white" />
          </button>
        )}
      </div>
    );
  }

  // Bulleted layout
  if (skillLayout === 'bulleted') {
    return (
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: 'relative' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <input
            type="text"
            value={category.category}
            onChange={(e) => updateSkill(category.id, { category: e.target.value })}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: getSubheaderFontFamily(fontOptions),
              outline: 'none',
              padding: 0,
              flex: 1,
            }}
          />
          {!previewMode && isHovered && (
            <button
              onClick={() => deleteSkill(category.id)}
              style={{
                background: 'rgba(239, 68, 68, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '14px',
                height: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <X size={8} color="white" />
            </button>
          )}
        </div>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {category.items.map((item, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>•</span>
              <input
                type="text"
                value={item}
                onChange={(e) => handleEditSkill(idx, e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.75rem',
                  fontFamily: getBodyFontFamily(fontOptions),
                  outline: 'none',
                  padding: 0,
                  flex: 1,
                }}
              />
              {!previewMode && (
                <button
                  onClick={() => handleDeleteSkillItem(idx)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(239, 68, 68, 0.8)',
                    cursor: 'pointer',
                    padding: 0,
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <X size={10} />
                </button>
              )}
            </li>
          ))}
          {!previewMode && (
            <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>•</span>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                placeholder="Add skill..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.75rem',
                  fontFamily: getBodyFontFamily(fontOptions),
                  outline: 'none',
                  padding: 0,
                  flex: 1,
                }}
              />
            </li>
          )}
        </ul>
      </div>
    );
  }

  // Default: Pill/Tag layout
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative' }}
    >
      {/* Category Name */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <input
          type="text"
          value={category.category}
          onChange={(e) => updateSkill(category.id, { category: e.target.value })}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontSize: '0.85rem',
            fontWeight: 500,
            fontFamily: getSubheaderFontFamily(fontOptions),
            outline: 'none',
            padding: 0,
            flex: 1,
          }}
        />
        {!previewMode && isHovered && (
          <button
            onClick={() => deleteSkill(category.id)}
            style={{
              background: 'rgba(239, 68, 68, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <X size={10} color="white" />
          </button>
        )}
      </div>

      {/* Skills as Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {category.items.map((item, idx) => (
          <SkillTag
            key={idx}
            value={item}
            onChange={(val) => handleEditSkill(idx, val)}
            onDelete={() => handleDeleteSkillItem(idx)}
            previewMode={previewMode}
            fontFamily={getBodyFontFamily(fontOptions)}
          />
        ))}
        
        {/* Add skill inline */}
        {!previewMode && (
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            onBlur={() => newSkill && handleAddSkill()}
            placeholder="+"
            style={{
              background: 'transparent',
              border: '1px dashed rgba(255,255,255,0.3)',
              borderRadius: '4px',
              padding: '4px 10px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.75rem',
              fontFamily: getBodyFontFamily(fontOptions),
              outline: 'none',
              width: newSkill ? '80px' : '28px',
              transition: 'width 0.2s',
              textAlign: 'center',
            }}
            onFocus={(e) => e.currentTarget.style.width = '80px'}
          />
        )}
      </div>
    </div>
  );
};

interface SkillTagProps {
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  previewMode?: boolean;
  fontFamily: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ value, onChange, onDelete, previewMode, fontFamily }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.12)',
        borderRadius: '4px',
        padding: '4px 10px',
        display: 'inline-flex',
        alignItems: 'center',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        contentEditable={!previewMode}
        suppressContentEditableWarning
        onBlur={(e) => onChange(e.currentTarget.textContent || '')}
        style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '0.75rem',
          fontFamily,
          outline: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </span>
      {!previewMode && isHovered && (
        <button
          onClick={onDelete}
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            background: '#ef4444',
            border: 'none',
            borderRadius: '50%',
            width: '14px',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <X size={8} color="white" />
        </button>
      )}
    </div>
  );
};

export default TwoColumnSkillsSection;
