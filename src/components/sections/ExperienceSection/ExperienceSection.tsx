import React from 'react';
import { Plus, X } from 'lucide-react';
import { ExperienceSectionProps } from '../../../types/experience';
import SectionControls from '../../common/SectionControls';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import FormattedText from '../../common/FormattedText';
import { ADD_EXPERIENCE_BUTTON_CLASS } from './constants';

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
          <div key={experience.id} className="relative group/experience space-y-2">
            <button
              onClick={() => deleteExperience?.(experience.id)}
              className={ADD_EXPERIENCE_BUTTON_CLASS}
              aria-label={`Delete experience: ${experience.title}`}
            >
              <X className="w-3 h-3" aria-hidden="true" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h3
                  className={`${fontOptions.subheaderSize} ${fontOptions.subheaderWeight} ${fontOptions.subheaderColor} font-header-${fontOptions.headerFont.toLowerCase()} ${fontOptions.subheaderItalic ? 'italic' : ''} ${fontOptions.subheaderUnderline ? 'underline' : ''}`}
                  contentEditable
                  suppressContentEditableWarning
                >
                  {experience.title}
                </h3>
                <div
                  className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
                  contentEditable
                  suppressContentEditableWarning
                >
                  {experience.company}
                </div>
              </div>
              <div
                className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} text-right ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
                contentEditable
                suppressContentEditableWarning
              >
                {experience.period}
              </div>
            </div>

            <ul className={`${fontOptions.bodySize} text-gray-700 dark:text-gray-500 space-y-1.5 list-disc ml-5 font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
              {experience.achievements.map((achievement, idx) => (
                <li key={idx} className="whitespace-pre-wrap group/achievement relative">
                  <FormattedText
                    text={achievement}
                    fontOptions={fontOptions}
                    onTextChange={(newText) => updateAchievement(experience.id, idx, newText)}
                    isEditing={true}
                    className="inline-block"
                  />
                  <button
                    onClick={() => removeAchievement(experience.id, idx)}
                    className="absolute -right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover/achievement:opacity-100 transition-opacity print:hidden"
                    aria-label={`Delete achievement: ${achievement.substring(0, 20)}...`}
                  >
                    <X className="w-3 h-3" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => addAchievement(experience.id)}
              className={`flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
              aria-label="Add achievement"
            >
              <Plus className="w-3 h-3" aria-hidden="true" />
              <span>Add Achievement</span>
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addExperience}
        className={`mt-6 flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
        aria-label="Add experience"
      >
        <Plus className="w-3 h-3" aria-hidden="true" />
        <span>Add Experience</span>
      </button>
    </div>
  );
};

export default ExperienceSection; 