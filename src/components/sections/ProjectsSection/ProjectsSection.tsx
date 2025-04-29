import React from 'react';
import { Plus, X } from 'lucide-react';
import SectionControls from '../../common/SectionControls';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import { ProjectsSectionProps, Project } from '../../../types/project';
import FormattedText from '../../common/FormattedText';
import { getFontClassNames } from '../../../utils/fontUtils';
import {
  PROJECTS_CONTAINER_CLASS,
  PROJECTS_LIST_CLASS,
  PROJECT_ITEM_CLASS,
  PROJECT_CONTENT_CLASS,
  PROJECT_DETAILS_CLASS,
  PROJECT_DESCRIPTION_CLASS,
  PROJECT_TECHNOLOGIES_CLASS,
  PROJECT_TECH_ITEM_CLASS,
  PROJECT_RESPONSIBILITIES_LIST_CLASS,
  PROJECT_RESPONSIBILITY_ITEM_CLASS,
  INLINE_BLOCK_CLASS,
  DELETE_PROJECT_BUTTON_CLASS,
  ADD_PROJECT_BUTTON_CLASS,
  DELETE_ICON_SIZE,
  DEFAULT_TITLE,
  ADD_PROJECT_TEXT,
  ADD_RESPONSIBILITY_TEXT,
  ADD_TECHNOLOGY_TEXT,
  DELETE_PROJECT_ARIA_LABEL,
  DEFAULT_BG_DARK,
  DEFAULT_BG_LIGHT,
  ADD_PROJECT_ICON_CLASS,
  PROJECT_TEXT_CLASS,
} from './constants';
import AddSectionButton from '../../common/AddSectionButton';

const ProjectsSection: React.FC<ProjectsSectionProps & { previewMode?: boolean }> = ({
  index,
  moveSection,
  deleteSection,
  sectionsLength,
  fontOptions,
  projects,
  addProject,
  deleteProject,
  updateProject,
  title = DEFAULT_TITLE,
  onTitleChange,
  previewMode = false
}) => {
  const baseTextClasses = getFontClassNames(fontOptions);

  return (
    <div
      style={{
        background: fontOptions.theme === 'dark'
          ? fontOptions.widgetBgDark || DEFAULT_BG_DARK
          : fontOptions.widgetBgLight || DEFAULT_BG_LIGHT,
      }}
      className={PROJECTS_CONTAINER_CLASS}
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

      <div className={PROJECTS_LIST_CLASS}>
        {projects.map(project => (
          <div key={project.id} className={`${PROJECT_ITEM_CLASS} mt-2`}>
            <button
              onClick={() => deleteProject?.(project.id)}
              className={DELETE_PROJECT_BUTTON_CLASS}
              aria-label={`${DELETE_PROJECT_ARIA_LABEL}${project.name}`}
            >
              <X className={DELETE_ICON_SIZE} aria-hidden="true" />
            </button>

            <div className={PROJECT_CONTENT_CLASS}>
              <div className={PROJECT_DETAILS_CLASS}>
                <h4 className={baseTextClasses}>
                  <FormattedText
                    text={project.name}
                    fontOptions={fontOptions}
                    onTextChange={(newText) => updateProject?.(project.id, { ...project, name: newText })}
                    isEditing={true}
                    className={INLINE_BLOCK_CLASS}
                  />
                </h4>
                <div className={baseTextClasses}>
                  <FormattedText
                    text={project.company}
                    fontOptions={fontOptions}
                    onTextChange={(newText) => updateProject?.(project.id, { ...project, company: newText })}
                    isEditing={true}
                    className={INLINE_BLOCK_CLASS}
                  />
                </div>
              </div>
              <div className={`${baseTextClasses} experience-period`}>
                <FormattedText
                  text={project.period}
                  fontOptions={fontOptions}
                  onTextChange={(newText) => updateProject?.(project.id, { ...project, period: newText })}
                  isEditing={true}
                  className={INLINE_BLOCK_CLASS}
                />
              </div>
            </div>

            <div className={baseTextClasses}>
              <FormattedText
                text={project.description}
                fontOptions={fontOptions}
                onTextChange={(newText) => updateProject?.(project.id, { ...project, description: newText })}
                isEditing={true}
                className={INLINE_BLOCK_CLASS}
              />
            </div>

            <div className={PROJECT_DESCRIPTION_CLASS}>
              <ul className={`${PROJECT_RESPONSIBILITIES_LIST_CLASS} ${baseTextClasses}`}>
                {project.responsibilities?.map((responsibility, idx) => (
                  <li key={idx} className={PROJECT_RESPONSIBILITY_ITEM_CLASS}>
                    <span className="inline-flex items-center">
                      <FormattedText
                        text={responsibility}
                        fontOptions={fontOptions}
                        onTextChange={(newText) => {
                          const updatedResponsibilities = [...project.responsibilities];
                          updatedResponsibilities[idx] = newText;
                          updateProject?.(project.id, { ...project, responsibilities: updatedResponsibilities });
                        }}
                        isEditing={true}
                        className={INLINE_BLOCK_CLASS}
                      />
                      <button
                        onClick={() => {
                          const updatedResponsibilities = project.responsibilities.filter((_, i) => i !== idx);
                          updateProject?.(project.id, { ...project, responsibilities: updatedResponsibilities });
                        }}
                        className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                        aria-label={`Delete responsibility: ${responsibility.substring(0, 20)}...`}
                      >
                        <X className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  const updatedResponsibilities = [...(project.responsibilities || []), ADD_RESPONSIBILITY_TEXT];
                  updateProject?.(project.id, { ...project, responsibilities: updatedResponsibilities });
                }}
                className={`flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${baseTextClasses} mb-1`}
                aria-label="Add responsibility"
              >
                <Plus className="w-3 h-3" aria-hidden="true" />
                <span>Add Responsibility</span>
              </button>

              {/* Technology Chips - Solid Border, FontOptions Applied */}
              <ul className="flex flex-wrap gap-2 items-center mt-3">
                {project.technologies?.map((tech, idx) => (
                  <li key={idx}>
                    <span
                      className="group flex items-center rounded-full border border-gray-400 bg-white text-gray-500 px-3 py-1 font-medium transition hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 whitespace-nowrap"
                      style={{
                        color: fontOptions.bodyColor,
                        fontFamily: fontOptions.bodyFont,
                        fontSize: fontOptions.bodySize,
                        fontWeight: fontOptions.bodyWeight,
                        minHeight: '1.75rem',
                        lineHeight: 1.3,
                        boxSizing: 'border-box',
                        borderStyle: 'solid', // Ensure solid border
                      }}
                    >
                      <FormattedText
                        text={tech}
                        fontOptions={fontOptions}
                        onTextChange={(newText) => {
                          const updatedTechnologies = [...project.technologies];
                          updatedTechnologies[idx] = newText;
                          updateProject?.(project.id, { ...project, technologies: updatedTechnologies });
                        }}
                        isEditing={true}
                        className={INLINE_BLOCK_CLASS}
                        style={{
                          color: fontOptions.bodyColor,
                          fontFamily: fontOptions.bodyFont,
                          fontSize: fontOptions.bodySize,
                          fontWeight: fontOptions.bodyWeight,
                        }}
                      />
                      <button
                        onClick={() => {
                          const updatedTechnologies = project.technologies.filter((_, i) => i !== idx);
                          updateProject?.(project.id, { ...project, technologies: updatedTechnologies });
                        }}
                        className="ml-0 opacity-0 group-hover:opacity-100 group-hover:ml-2 text-gray-400 hover:text-red-500 transition p-0 h-auto w-auto"
                        aria-label={`Delete technology: ${tech}`}
                        tabIndex={-1}
                        style={{ fontSize: fontOptions.bodySize }}
                      >
                        <X className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </span>
                  </li>
                ))}
                <li>
                  <AddSectionButton
                    onClick={() => {
                      const updatedTechnologies = [...(project.technologies || []), ADD_TECHNOLOGY_TEXT];
                      updateProject?.(project.id, { ...project, technologies: updatedTechnologies });
                    }}
                    text="Add Technology"
                    fontOptions={fontOptions}
                    buttonClassName={ADD_PROJECT_BUTTON_CLASS}
                    iconClassName={ADD_PROJECT_ICON_CLASS}
                    textClassName={PROJECT_TEXT_CLASS}
                  />
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 print:hidden">
        {!previewMode && (
          <AddSectionButton
            onClick={addProject}
            text={ADD_PROJECT_TEXT}
            buttonClassName={ADD_PROJECT_BUTTON_CLASS}
            iconClassName={ADD_PROJECT_ICON_CLASS}
            textClassName={PROJECT_TEXT_CLASS}
            fontOptions={fontOptions}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;