import React from 'react';
import { Plus, X } from 'lucide-react';
import SectionControls from '../../common/SectionControls';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import { ProjectsSectionProps } from '../../../types/project';
import FormattedText from '../../common/FormattedText';

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
  title = "Projects",
  onTitleChange
}) => {

  // Function to add a new responsibility to a project
  const addResponsibility = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const updatedProject = {
      ...project,
      responsibilities: [...project.responsibilities, 'New responsibility']
    };

    updateProject(projectId, updatedProject);
  };

  // Function to add a new technology to a project
  const addTechnology = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const updatedProject = {
      ...project,
      technologies: [...project.technologies, 'New Tech']
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

      <div className="space-y-6">
        {projects.map(project => (
          <div key={project.id} className="relative group/project space-y-2">
            <button
              onClick={() => deleteProject?.(project.id)}
              className="absolute -right-2 -top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/project:opacity-100 transition-opacity print:hidden"
              aria-label={`Delete project: ${project.name}`}
            >
              <X className="w-3 h-3" aria-hidden="true" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
              <div className="space-y-0.5">
                <h4 className={`${fontOptions.subheaderSize} ${fontOptions.subheaderWeight} ${fontOptions.subheaderColor} font-header-${fontOptions.headerFont.toLowerCase()} ${fontOptions.subheaderItalic ? 'italic' : ''} ${fontOptions.subheaderUnderline ? 'underline' : ''}`}>
                  <FormattedText
                    text={project.name}
                    fontOptions={fontOptions}
                    onTextChange={(newText) => updateProject(project.id, { ...project, name: newText })}
                    isEditing={true}
                    className="inline-block"
                  />
                </h4>
                <div className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
                  <FormattedText
                    text={project.company}
                    fontOptions={fontOptions}
                    onTextChange={(newText) => updateProject(project.id, { ...project, company: newText })}
                    isEditing={true}
                    className="inline-block"
                  />
                </div>
              </div>
              <div className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
                <FormattedText
                  text={project.period}
                  fontOptions={fontOptions}
                  onTextChange={(newText) => updateProject(project.id, { ...project, period: newText })}
                  isEditing={true}
                  className="inline-block"
                />
              </div>
            </div>

            <div className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
              <FormattedText
                text={project.description}
                fontOptions={fontOptions}
                onTextChange={(newText) => updateProject(project.id, { ...project, description: newText })}
                isEditing={true}
                className="inline-block"
              />
            </div>

            <div className="space-y-1">
              <ul className={`list-disc ml-4 space-y-0.5 ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}>
                {project.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="group/responsibility relative">
                    <FormattedText
                      text={responsibility}
                      fontOptions={fontOptions}
                      onTextChange={(newText) => {
                        const updatedResponsibilities = [...project.responsibilities];
                        updatedResponsibilities[idx] = newText;
                        updateProject(project.id, { ...project, responsibilities: updatedResponsibilities });
                      }}
                      isEditing={true}
                      className="inline-block"
                    />
                    <button
                      onClick={() => removeResponsibility(project.id, idx)}
                      className="absolute -right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover/responsibility:opacity-100 transition-opacity print:hidden"
                      aria-label={`Delete responsibility: ${responsibility.substring(0, 20)}...`}
                    >
                      <X className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => addResponsibility(project.id)}
                className={`flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
                aria-label="Add responsibility"
              >
                <Plus className="w-3 h-3" aria-hidden="true" />
                <span>Add Responsibility</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, idx) => (
                  <div key={idx} className="group/tech relative">
                    <div
                      className={`rounded-md transition-colors inline-flex items-center ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
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
                        className="inline-block"
                      />
                    </div>
                    <button
                      onClick={() => removeTechnology(project.id, idx)}
                      className="absolute -right-1 -top-1 text-gray-400 hover:text-red-500 opacity-0 group-hover/tech:opacity-100 transition-opacity print:hidden"
                      aria-label={`Delete technology: ${tech}`}
                    >
                      <X className="w-2.5 h-2.5" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => addTechnology(project.id)}
                className={`flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
                aria-label="Add technology"
              >
                <Plus className="w-3 h-3" aria-hidden="true" />
                <span>Add Technology</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addProject}
        className={`mt-4 flex items-center gap-1 text-xs print:hidden hover:opacity-80 transition-opacity ${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? 'italic' : ''} ${fontOptions.bodyUnderline ? 'underline' : ''}`}
        aria-label="Add project"
      >
        <Plus className="w-3 h-3" aria-hidden="true" />
        <span>Add Project</span>
      </button>
    </div>
  );
};

export default ProjectsSection; 