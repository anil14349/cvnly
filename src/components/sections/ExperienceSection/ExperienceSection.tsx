import React from 'react';
import { Plus, X } from 'lucide-react';
import AddSectionButton from '../../common/AddSectionButton';
import { ExperienceSectionProps } from '../../../types/experience';
import SectionControls from '../../common/SectionControls';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import FormattedText from '../../common/FormattedText';
import { getFontClassNames } from '../../../utils/fontUtils';
import { ADD_EXPERIENCE_BUTTON_CLASS, SECTION_BUTTON_TEXT_STYLE, ADD_EXPERIENCE_TEXT, ADD_EXPERIENCE_ICON_SIZE } from './constants';

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  fontOptions,
  moveSection,
  deleteSection,
  index,
  sectionsLength,
  addExperience,
  deleteExperience,
  updateExperience,
  title = "Work Experience",
  onTitleChange
}) => {
  const addAchievement = (experienceId: string) => {
    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) return;

    const updatedExperience = {
      ...experience,
      achievements: [...experience.achievements, 'New achievement']
    };

    updateExperience?.(experienceId, updatedExperience);
  };

  const removeAchievement = (experienceId: string, achievementIndex: number) => {
    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) return;

    const updatedAchievements = experience.achievements.filter((_, i) => i !== achievementIndex);
    const updatedExperience = {
      ...experience,
      achievements: updatedAchievements
    };

    updateExperience?.(experienceId, updatedExperience);
  };

  const updateAchievement = (experienceId: string, achievementIndex: number, newText: string) => {
    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) return;

    const updatedAchievements = [...experience.achievements];
    updatedAchievements[achievementIndex] = newText;

    const updatedExperience = {
      ...experience,
      achievements: updatedAchievements
    };

    updateExperience?.(experienceId, updatedExperience);
  };

  const baseTextClasses = getFontClassNames(fontOptions);

  return (
    <div
      style={{
        background: fontOptions.theme === 'dark'
          ? fontOptions.widgetBgDark || '#181f2a'
          : fontOptions.widgetBgLight || '#fff',
      }}
      className="relative group"
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

      <div className="space-y-4">
        {experiences.map((experience) => (
          <div key={experience.id} className="relative group/experience group space-y-2">
            <button
              onClick={() => deleteExperience?.(experience.id)}
              className="absolute -top-2 -right-2 z-10 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
              aria-label={`Delete experience: ${experience.title}`}
              style={{ padding: '0.25rem' }}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h3 className={baseTextClasses} contentEditable suppressContentEditableWarning>
                  {experience.title}
                </h3>
                <div className={baseTextClasses} contentEditable suppressContentEditableWarning>
                  {experience.company}
                </div>
              </div>
              <div className={`${baseTextClasses} text-right`} contentEditable suppressContentEditableWarning>
                {experience.period}
              </div>
            </div>

            <ul className={`${baseTextClasses} list-disc ml-5 mb-1`}>
              {experience.achievements.map((achievement, idx) => (
                <li key={idx} className="whitespace-pre-wrap group/achievement group relative">
                  <span className="inline-flex items-center">
                    <FormattedText
                      text={achievement}
                      fontOptions={fontOptions}
                      onTextChange={(newText) => updateAchievement(experience.id, idx, newText)}
                      isEditing={true}
                      className="inline-block"
                    />
                    <button
                      onClick={() => removeAchievement(experience.id, idx)}
                      className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                      aria-label={`Delete achievement: ${achievement.substring(0, 20)}...`}
                    >
                      <X className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => addAchievement(experience.id)}
              className={`flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${baseTextClasses} mb-1`}
              aria-label="Add achievement"
            >
              <Plus className="w-3 h-3" aria-hidden="true" />
              <span>Add Achievement</span>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 print:hidden">
        <AddSectionButton
          onClick={addExperience}
          text={ADD_EXPERIENCE_TEXT}
          buttonClassName={ADD_EXPERIENCE_BUTTON_CLASS}
          iconClassName={ADD_EXPERIENCE_ICON_SIZE}
          textClassName={SECTION_BUTTON_TEXT_STYLE}
        />
      </div>
    </div>
  );
};

export default ExperienceSection;