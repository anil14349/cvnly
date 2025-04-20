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
  title = DEFAULT_SKILLS_TITLE,
  onTitleChange,
  addSkill,
  deleteSkill,
  updateSkill,
  isPreview = false
}) => {
  const skillLayout = fontOptions.skillLayout || 'bulleted';

  return (
    <section className="relative group" aria-labelledby={`skills-section-${index}`}>
      <SectionHeaderLine
        title={title}
        fontOptions={fontOptions}
        onTitleChange={onTitleChange}
        controls={
          !isPreview && (
            <SectionControls
              index={index}
              moveSection={moveSection}
              deleteSection={deleteSection}
              sectionsLength={sectionsLength}
            />
          )
        }
      />

      {/* Add margin between section header and grid */}
      <div className="mt-2">
        {skillLayout === 'classic' ? (
          <div>
            {skills.map((skillCategory) => (
              <SkillCategory
                key={skillCategory.id}
                category={skillCategory}
                fontOptions={fontOptions}
                updateSkill={updateSkill || (() => { })}
                deleteSkill={deleteSkill || (() => { })}
                skillLayout={skillLayout}
                isPreview={isPreview}
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
                updateSkill={updateSkill || (() => { })}
                deleteSkill={deleteSkill || (() => { })}
                skillLayout={skillLayout}
                isPreview={isPreview}
              />
            ))}
          </div>
        )}
      </div>
      {!isPreview && (
        <div className="mt-4 print:hidden">
          <AddSkillCategoryButton onClick={addSkill || (() => { })} />
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
