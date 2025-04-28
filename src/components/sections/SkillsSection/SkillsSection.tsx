import React from 'react';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import SectionControls from '../../common/SectionControls';

import type { SkillsSectionProps } from '../../../types/skill';
import { DEFAULT_SKILLS_TITLE, SKILL_CATEGORY_CLASS } from './constants';
import SkillCategory from './SkillCategory';
import { AddSkillCategoryButton } from './AddSkillCategoryButton';

export const SkillsSection: React.FC<SkillsSectionProps & { isPreview?: boolean }> = ({
  index,
  moveSection,
  deleteSection,
  sectionsLength,
  fontOptions,
  skills,
  setSkills,
  title = DEFAULT_SKILLS_TITLE,
  onTitleChange,
  addSkillCategory,
  updateSkill,
  deleteSkill,
  isPreview = false
}) => {
  const skillLayout = fontOptions.skillLayout || 'bulleted';

  return (
    <section className="mt-2 relative group skills-section" aria-labelledby={`skills-section-${index}`}> 
      <SectionHeaderLine
        title={title}
        fontOptions={fontOptions}
        onTitleChange={onTitleChange}
        controls={
          !isPreview && moveSection && deleteSection && (
            <SectionControls
              index={index}
              moveSection={moveSection}
              deleteSection={deleteSection}
              sectionsLength={sectionsLength}
            />
          )
        }
      />
      {/* Render skills here using skillLayout and skills */}
      <div className="mt-2">
        {skillLayout === 'classic' ? (
          <div>
            {skills.map((skillCategory) => (
              <SkillCategory
                key={skillCategory.id}
                category={skillCategory}
                fontOptions={fontOptions}
                skillLayout={skillLayout}
                isPreview={isPreview}
                updateSkill={updateSkill ? updateSkill : () => {}}
                deleteSkill={deleteSkill ? deleteSkill : () => {}}
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
                skillLayout={skillLayout}
                isPreview={isPreview}
                updateSkill={updateSkill ? updateSkill : () => {}}
                deleteSkill={deleteSkill ? deleteSkill : () => {}}
              />
            ))}
          </div>
        )}
      </div>
      {!isPreview && addSkillCategory && (
        <div className="mt-4 print:hidden">
          <AddSkillCategoryButton onClick={addSkillCategory} fontOptions={fontOptions} />
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
