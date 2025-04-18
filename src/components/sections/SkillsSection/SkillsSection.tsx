import React from 'react';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import SectionControls from '../../common/SectionControls';
import AddSkillCategoryButton from './AddSkillCategoryButton';
import type { SkillsSectionProps, Skill } from '../../../types/skill';
import { DEFAULT_SKILLS_TITLE, SKILL_CATEGORY_CLASS } from './constants';
import { v4 as uuidv4 } from 'uuid';
import SkillCategory from './SkillCategory';



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

  return (
    <section className="relative group" aria-labelledby={`skills-section-${index}`}>
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

      <div className={SKILL_CATEGORY_CLASS}>
        {skills.map((skillCategory) => (
          <SkillCategory
            key={skillCategory.id}
            category={skillCategory}
            fontOptions={fontOptions}
            updateSkill={handleUpdateSkill}
            deleteSkill={handleDeleteSkill}
          />
        ))}
        <div className="mt-4 print:hidden">
          <AddSkillCategoryButton onClick={addSkillCategory} fontOptions={fontOptions} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
