import React from 'react';
import { Plus, X } from 'lucide-react';
import AddSectionButton from '../../common/AddSectionButton';
import { ExperienceSectionProps } from '../../../types/experience';
import SectionControls from '../../common/SectionControls';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import FormattedText from '../../common/FormattedText';
import { getFontClassNames } from '../../../utils/fontUtils';
import {
  ADD_EXPERIENCE_BUTTON_CLASS,
  SECTION_BUTTON_TEXT_STYLE,
  ADD_EXPERIENCE_TEXT,
  ADD_EXPERIENCE_ICON_SIZE,
  DELETE_EXPERIENCE_BUTTON_CLASS,
  DELETE_EXPERIENCE_ICON_SIZE,
  DELETE_EXPERIENCE_BUTTON_PADDING,
  DELETE_ACHIEVEMENT_BUTTON_CLASS,
  DELETE_ACHIEVEMENT_ICON_SIZE,
  ADD_ACHIEVEMENT_BUTTON_CLASS,
  ADD_ACHIEVEMENT_ICON_SIZE,
  EXPERIENCE_CONTAINER_CLASS,
  EXPERIENCE_ITEM_CLASS,
  EXPERIENCE_HEADER_CLASS,
  EXPERIENCE_PERIOD_CLASS,
  ACHIEVEMENT_LIST_CLASS,
  ACHIEVEMENT_ITEM_CLASS,
  ACHIEVEMENT_TEXT_CONTAINER_CLASS,
  DEFAULT_BG_DARK,
  DEFAULT_BG_LIGHT
} from './constants';

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
        marginTop: '0.5rem',
        background: fontOptions.theme === 'dark'
          ? fontOptions.widgetBgDark || DEFAULT_BG_DARK
          : fontOptions.widgetBgLight || DEFAULT_BG_LIGHT,
      }}
      className={EXPERIENCE_CONTAINER_CLASS}
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
          <div key={experience.id} className={EXPERIENCE_ITEM_CLASS}>
            <button
              onClick={() => deleteExperience?.(experience.id)}
              className={DELETE_EXPERIENCE_BUTTON_CLASS}
              aria-label={`Delete experience: ${experience.title}`}
              style={{ padding: DELETE_EXPERIENCE_BUTTON_PADDING }}
            >
              <X className={DELETE_EXPERIENCE_ICON_SIZE} aria-hidden="true" />
            </button>
            <div className={EXPERIENCE_HEADER_CLASS}>
              <div>
                <h3 className={baseTextClasses} contentEditable suppressContentEditableWarning>
                  {experience.title}
                </h3>
                <div className={baseTextClasses} contentEditable suppressContentEditableWarning>
                  {experience.company}
                </div>
              </div>
              <div className={`${baseTextClasses} ${EXPERIENCE_PERIOD_CLASS}`} contentEditable suppressContentEditableWarning>
                {experience.period}
              </div>
            </div>

            <ul className={`${baseTextClasses} ${ACHIEVEMENT_LIST_CLASS}`}>
              {experience.achievements.map((achievement, idx) => (
                <li key={idx} className={ACHIEVEMENT_ITEM_CLASS}>
                  <span className={ACHIEVEMENT_TEXT_CONTAINER_CLASS}>
                    <FormattedText
                      text={achievement}
                      fontOptions={fontOptions}
                      onTextChange={(newText) => updateAchievement(experience.id, idx, newText)}
                      isEditing={true}
                      className="inline-block"
                    />
                    <button
                      onClick={() => removeAchievement(experience.id, idx)}
                      className={DELETE_ACHIEVEMENT_BUTTON_CLASS}
                      aria-label={`Delete achievement: ${achievement.substring(0, 20)}...`}
                    >
                      <X className={DELETE_ACHIEVEMENT_ICON_SIZE} aria-hidden="true" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => addAchievement(experience.id)}
              className={`${ADD_ACHIEVEMENT_BUTTON_CLASS} ${baseTextClasses}`}
              aria-label="Add achievement"
            >
              <Plus className={ADD_ACHIEVEMENT_ICON_SIZE} aria-hidden="true" />
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