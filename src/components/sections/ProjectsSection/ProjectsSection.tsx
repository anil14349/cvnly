import React from 'react';
import { Plus, X } from 'lucide-react';
import SectionControls from '../../common/SectionControls';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import { ProjectsSectionProps } from '../../../types/project';
import FormattedText from '../../common/FormattedText';
import {
  PROJECTS_CONTAINER_CLASS,
  PROJECTS_LIST_CLASS,
  PROJECT_ITEM_CLASS,
  PROJECT_CONTENT_CLASS,
  PROJECT_DETAILS_CLASS,
  PROJECT_DESCRIPTION_CLASS,
  PROJECT_TECHNOLOGIES_CLASS,
  PROJECT_TECH_LIST_CLASS,
  PROJECT_TECH_ITEM_CLASS,
  PROJECT_TECH_BADGE_CLASS,
  PROJECT_RESPONSIBILITIES_LIST_CLASS,
  PROJECT_RESPONSIBILITY_ITEM_CLASS,
  INLINE_BLOCK_CLASS,
  DELETE_PROJECT_BUTTON_CLASS,
  DELETE_RESPONSIBILITY_BUTTON_CLASS,
  DELETE_TECH_BUTTON_CLASS,
  ADD_RESPONSIBILITY_BUTTON_CLASS,
  ADD_TECHNOLOGY_BUTTON_CLASS,
  ADD_PROJECT_BUTTON_CLASS,
  DELETE_ICON_SIZE,
  DELETE_TECH_ICON_SIZE,
  ADD_ICON_SIZE,
  DEFAULT_TITLE,
  ADD_PROJECT_TEXT,
  ADD_RESPONSIBILITY_TEXT,
  ADD_TECHNOLOGY_TEXT,
  NEW_RESPONSIBILITY_TEXT,
  NEW_TECH_TEXT,
  DELETE_PROJECT_ARIA_LABEL,
  DELETE_RESPONSIBILITY_ARIA_LABEL,
  DELETE_TECH_ARIA_LABEL,
  DETAIL_SUFFIX,
  DEFAULT_BG_DARK,
  DEFAULT_BG_LIGHT,
  ADD_PROJECT_ICON_SIZE,
  SECTION_BUTTON_TEXT_STYLE,
} from './constants';
import AddSectionButton from '../../common/AddSectionButton';

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  index,
  moveSection,
  deleteSection,
  sectionsLength,
  fontOptions,
  projects,
  addProject,
  deleteProject,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateProject = (id, project) => { }, // Default empty implementation
  title = DEFAULT_TITLE,
  onTitleChange
}) => {

  // Function to add a new responsibility to a project
  const addResponsibility = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const updatedProject = {
      ...project,
      responsibilities: [...project.responsibilities, NEW_RESPONSIBILITY_TEXT]
    };

    updateProject(projectId, updatedProject);
  };

  // Function to add a new technology to a project
  const addTechnology = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const updatedProject = {
      ...project,
      technologies: [...project.technologies, NEW_TECH_TEXT]
    };

    updateProject(projectId, updatedProject);
  };

  const removeTechnology = (projectId: string, techIndex: number) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const updatedTechnologies = project.technologies.filter((_, index) => index !== techIndex);
    const updatedProject = { ...project, technologies: updatedTechnologies };

    updateProject(projectId, updatedProject);
  };

  const removeResponsibility = (projectId: string, responsibilityIndex: number) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const updatedResponsibilities = project.responsibilities.filter((_, index) => index !== responsibilityIndex);
    const updatedProject = { ...project, responsibilities: updatedResponsibilities };

    updateProject(projectId, updatedProject);
  };

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
          <div key={project.id} className={PROJECT_ITEM_CLASS}>
            <button
              onClick={() => deleteProject?.(project.id)}
              className={DELETE_PROJECT_BUTTON_CLASS}
              aria-label={`${DELETE_PROJECT_ARIA_LABEL}${project.name}`}
            >
              <X className={DELETE_ICON_SIZE} aria-hidden="true" />
            </button>

            <div className={PROJECT_CONTENT_CLASS}>
              <div className={PROJECT_DETAILS_CLASS}>
                <h4 className={`${fontOptions.subheaderSize} ${fontOptions.subheaderWeight} ${fontOptions.subheaderColor} font-header-${fontOptions.headerFont.toLowerCase()} ${fontOptions.subheaderItalic ? 'italic' : ''} ${fontOptions.subheaderUnderline ? 'underline' : ''}`}>
                  <FormattedText
                    text={project.name}
                    fontOptions={fontOptions}
                    onTextChange={(newText) => updateProject(project.id, { ...project, name: newText })}
                    isEditing={true}
                    className={INLINE_BLOCK_CLASS}
                  />
                </h4>
                <div className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
                  <FormattedText
                    text={project.company}
                    fontOptions={fontOptions}
                    onTextChange={(newText) => updateProject(project.id, { ...project, company: newText })}
                    isEditing={true}
                    className={INLINE_BLOCK_CLASS}
                  />
                </div>
              </div>
              <div className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
                <FormattedText
                  text={project.period}
                  fontOptions={fontOptions}
                  onTextChange={(newText) => updateProject(project.id, { ...project, period: newText })}
                  isEditing={true}
                  className={INLINE_BLOCK_CLASS}
                />
              </div>
            </div>

            <div className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
              <FormattedText
                text={project.description}
                fontOptions={fontOptions}
                onTextChange={(newText) => updateProject(project.id, { ...project, description: newText })}
                isEditing={true}
                className={INLINE_BLOCK_CLASS}
              />
            </div>

            <div className={PROJECT_DESCRIPTION_CLASS}>
              <ul className={`${PROJECT_RESPONSIBILITIES_LIST_CLASS} ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
                {project.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className={PROJECT_RESPONSIBILITY_ITEM_CLASS}>
                    <FormattedText
                      text={responsibility}
                      fontOptions={fontOptions}
                      onTextChange={(newText) => {
                        const updatedResponsibilities = [...project.responsibilities];
                        updatedResponsibilities[idx] = newText;
                        updateProject(project.id, { ...project, responsibilities: updatedResponsibilities });
                      }}
                      isEditing={true}
                      className={INLINE_BLOCK_CLASS}
                    />
                    <button
                      onClick={() => removeResponsibility(project.id, idx)}
                      className={DELETE_RESPONSIBILITY_BUTTON_CLASS}
                      aria-label={`${DELETE_RESPONSIBILITY_ARIA_LABEL}${responsibility.substring(0, 20)}${DETAIL_SUFFIX}`}
                    >
                      <X className={DELETE_ICON_SIZE} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => addResponsibility(project.id)}
                className={`${ADD_RESPONSIBILITY_BUTTON_CLASS} ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
                aria-label={ADD_RESPONSIBILITY_TEXT}
              >
                <Plus className={ADD_ICON_SIZE} aria-hidden="true" />
                <span>{ADD_RESPONSIBILITY_TEXT}</span>
              </button>
            </div>

            <div className={PROJECT_TECHNOLOGIES_CLASS}>
              <div className={PROJECT_TECH_LIST_CLASS}>
                {project.technologies.map((tech, idx) => (
                  <div key={idx} className={PROJECT_TECH_ITEM_CLASS}>
                    <div
                      className={`${PROJECT_TECH_BADGE_CLASS} ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
                      style={{
                        backgroundColor: `${fontOptions.lineColor}10`,
                        border: `1px solid ${fontOptions.lineColor}`,
                        padding: '0.15rem 0.5rem',
                      }}
                    >
                      <FormattedText
                        text={tech}
                        fontOptions={{
                          ...fontOptions,
                          bodySize: 'text-xs'
                        }}
                        onTextChange={(newText) => {
                          const updatedTechnologies = [...project.technologies];
                          updatedTechnologies[idx] = newText;
                          updateProject(project.id, { ...project, technologies: updatedTechnologies });
                        }}
                        isEditing={true}
                        className={INLINE_BLOCK_CLASS}
                      />
                    </div>
                    <button
                      onClick={() => removeTechnology(project.id, idx)}
                      className={DELETE_TECH_BUTTON_CLASS}
                      aria-label={`${DELETE_TECH_ARIA_LABEL}${tech}`}
                    >
                      <X className={DELETE_TECH_ICON_SIZE} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => addTechnology(project.id)}
                className={`${ADD_TECHNOLOGY_BUTTON_CLASS} ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
                aria-label={ADD_TECHNOLOGY_TEXT}
              >
                <Plus className={ADD_ICON_SIZE} aria-hidden="true" />
                <span>{ADD_TECHNOLOGY_TEXT}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 print:hidden">
      <AddSectionButton
        onClick={addProject}
        text={ADD_PROJECT_TEXT}
        buttonClassName={ADD_PROJECT_BUTTON_CLASS}
        iconClassName={ADD_PROJECT_ICON_SIZE}
        textClassName={SECTION_BUTTON_TEXT_STYLE}
      />
      </div>
    </div>
  );
};

export default ProjectsSection; 