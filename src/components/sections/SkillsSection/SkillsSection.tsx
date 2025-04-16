import React from 'react';
import { Plus } from 'lucide-react';
import SkillCategory from './SkillCategory';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import SectionControls from '../../common/SectionControls';
import type { SkillsSectionProps, Skill } from '../../../types/skill';
import { v4 as uuidv4 } from 'uuid';

const SkillsSection: React.FC<SkillsSectionProps> = ({
  index,
  moveSection,
  deleteSection,
  sectionsLength,
  fontOptions,
  skills,
  setSkills,
  title = "Skills & Certifications",
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
      items: []
    };
    setSkills([...skills, newCategory]);
  };

  return (
    <section
      className="relative group"
      aria-labelledby={`skills-section-${index}`}
    >
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

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skillCategory) => (
          <SkillCategory
            key={skillCategory.id}
            category={skillCategory}
            fontOptions={fontOptions}
            updateSkill={handleUpdateSkill}
            deleteSkill={handleDeleteSkill}
          />
        ))}

        <button
          onClick={addSkillCategory}
          className="flex items-center justify-center h-full min-h-[200px] border-2 border-dashed border-gray-300/50 dark:border-gray-500/25 rounded-lg hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-colors group/add bg-white dark:bg-[#1e293b] print:hidden"
          aria-label="Add skill category"
        >
          <div className="text-center">
            <Plus className="w-6 h-6 mx-auto text-gray-400 group-hover/add:text-blue-500 dark:group-hover/add:text-blue-400 transition-colors" aria-hidden="true" />
            <span className="mt-2 block text-sm font-medium text-gray-400 group-hover/add:text-blue-500 dark:group-hover/add:text-blue-400 transition-colors">
              Add Category
            </span>
          </div>
        </button>
      </div>
    </section>
  );
};

export default SkillsSection;
