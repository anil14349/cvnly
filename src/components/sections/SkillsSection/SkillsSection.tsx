import React from 'react';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import SectionControls from '../../common/SectionControls';

import type { SkillsSectionProps, Skill } from '../../../types/skill';
import { DEFAULT_SKILLS_TITLE, SKILL_CATEGORY_CLASS } from './constants';
import { v4 as uuidv4 } from 'uuid';
import SkillCategory from './SkillCategory';
import { AddSkillCategoryButton } from './AddSkillCategoryButton';
import type { SkillLayoutType } from '../../../types/common';

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  index,
  moveSection,
  deleteSection,
  sectionsLength,
  fontOptions,
  skills,
  setSkills,
  title = DEFAULT_SKILLS_TITLE,
  onTitleChange
}) => {
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

  // Skill Layout Selector Handler
  const handleSkillLayoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (typeof fontOptions === 'object' && 'skillLayout' in fontOptions) {
      fontOptions.skillLayout = e.target.value as SkillLayoutType;
    }
    // If fontOptions is managed by parent, trigger parent update here
    // (You may need to lift state if fontOptions is immutable)
  };
  const skillLayout = fontOptions.skillLayout || 'bulleted';

  return (
    <section className="mt-2 relative group" aria-labelledby={`skills-section-${index}`}> 
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

      {/* Add margin between section header and grid */}
      <div>
        {skillLayout === 'classic' ? (
          <div>
            {skills.map((skillCategory) => (
              <SkillCategory
                key={skillCategory.id}
                category={skillCategory}
                fontOptions={fontOptions}
                updateSkill={handleUpdateSkill}
                deleteSkill={handleDeleteSkill}
                skillLayout={skillLayout}
              />
            ))}
          </div>
        ) : (
          <div className={SKILL_CATEGORY_CLASS}>
            {skills.map((skillCategory) => (
              <SkillCategory
                key={skillCategory.id}
                category={skillCategory}
                fontOptions={fontOptions}
                updateSkill={handleUpdateSkill}
                deleteSkill={handleDeleteSkill}
                skillLayout={skillLayout}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-2 print:hidden">
        <AddSkillCategoryButton onClick={addSkillCategory} />
      </div>
    </section>
  );
};

export default SkillsSection;
