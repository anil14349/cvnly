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
  ADD_PROJECT_ICON_SIZE,
  PROJECT_TEXT_CLASS,
} from './constants';
import AddSectionButton from '../../common/AddSectionButton';

const ProjectsSection: React.FC<ProjectsSectionProps & { isPreview?: boolean }> = ({
  index,
  moveSection,
  deleteSection,
  sectionsLength,
  fontOptions,
  projects,
  addProject,
  deleteProject,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateProject = (_id: string, _project: Project) => { },
  title = DEFAULT_TITLE,
  onTitleChange,
  isPreview = false
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

      <div className={PROJECTS_LIST_CLASS}>
        {projects.map(project => (
          <div key={project.id} className={PROJECT_ITEM_CLASS}>
            {!isPreview && (
              <button
                onClick={() => deleteProject?.(project.id)}
                className={DELETE_PROJECT_BUTTON_CLASS}
                aria-label={`${DELETE_PROJECT_ARIA_LABEL}${project.name}`}
              >
                <X className={DELETE_ICON_SIZE} aria-hidden="true" />
              </button>
            )}
            <div className={PROJECT_CONTENT_CLASS}>
              <div className={PROJECT_DETAILS_CLASS}>
                <h4 className={baseTextClasses}>{project.name}</h4>
                <div className={baseTextClasses}>{project.company}</div>
              </div>
              <div className={baseTextClasses}>{project.period}</div>
            </div>
            <div className={baseTextClasses}>{project.description}</div>
            <ul className={`${PROJECT_RESPONSIBILITIES_LIST_CLASS} ${baseTextClasses}`}>
              {project.responsibilities?.map((responsibility, idx) => (
                <li key={idx} className={PROJECT_RESPONSIBILITY_ITEM_CLASS}>
                  <span className="inline-flex items-center">
                    {responsibility}
                    {!isPreview && (
                      <button
                        onClick={() => {
                          const updatedResponsibilities = project.responsibilities.filter((_, i) => i !== idx);
                          updateProject(project.id, { ...project, responsibilities: updatedResponsibilities });
                        }}
                        className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                        aria-label={`Delete responsibility: ${responsibility.substring(0, 20)}...`}
                      >
                        <X className="w-3 h-3" aria-hidden="true" />
                      </button>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            {!isPreview && (
              <button
                onClick={() => {
                  const updatedResponsibilities = [...(project.responsibilities || []), ADD_RESPONSIBILITY_TEXT];
                  updateProject(project.id, { ...project, responsibilities: updatedResponsibilities });
                }}
                className={`flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${baseTextClasses} mb-1`}
                aria-label="Add responsibility"
              >
                <Plus className="w-3 h-3" aria-hidden="true" />
                <span>Add Responsibility</span>
              </button>
            )}
            <ul className={`${PROJECT_TECHNOLOGIES_CLASS} ${baseTextClasses}`}>
              {project.technologies?.map((tech, idx) => (
                <li key={idx} className={PROJECT_TECH_ITEM_CLASS}>
                  <span className="inline-flex items-center">
                    {tech}
                    {!isPreview && (
                      <button
                        onClick={() => {
                          const updatedTechnologies = project.technologies.filter((_, i) => i !== idx);
                          updateProject(project.id, { ...project, technologies: updatedTechnologies });
                        }}
                        className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                        aria-label={`Delete technology: ${tech}`}
                      >
                        <X className="w-3 h-3" aria-hidden="true" />
                      </button>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            {!isPreview && (
              <button
                onClick={() => {
                  const updatedTechnologies = [...(project.technologies || []), ADD_TECHNOLOGY_TEXT];
                  updateProject(project.id, { ...project, technologies: updatedTechnologies });
                }}
                className={`flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${baseTextClasses} mb-1`}
                aria-label="Add technology"
              >
                <Plus className="w-3 h-3" aria-hidden="true" />
                <span>Add Technology</span>
              </button>
            )}
          </div>
        ))}
      </div>
      {!isPreview && (
        <div className="mt-4 print:hidden">
          <AddSectionButton
            onClick={addProject}
            text={ADD_PROJECT_TEXT}
            buttonClassName={ADD_PROJECT_BUTTON_CLASS}
            iconClassName={ADD_PROJECT_ICON_SIZE}
            textClassName={PROJECT_TEXT_CLASS}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;