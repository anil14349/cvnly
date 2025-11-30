import { useRef, useState, useEffect } from 'react';
import ResumeHeader from '../layout/ResumeHeader';
import SummarySection from '../sections/SummarySection/SummarySection';
import SkillsSection from '../sections/SkillsSection/SkillsSection';
import ExperienceSection from '../sections/ExperienceSection/ExperienceSection';
import EducationSection from '../sections/EducationSection/EducationSection';
import ProjectsSection from '../sections/ProjectsSection/ProjectsSection';
import CertificationsSection from '../sections/CertificateSection/CertificationsSection';
import TemplateWrapper from '../templates/TemplateWrapper';
import { useResumeContext } from '../../contexts/ResumeContext';

interface ResumeContainerProps {
  previewMode: boolean;
  onResumeContentRefChange: (ref: HTMLDivElement | null) => void;
}

const ResumeContainer = ({ previewMode, onResumeContentRefChange }: ResumeContainerProps) => {
  const resumeContentRef = useRef<HTMLDivElement>(null);
  const [resumeContentHeight, setResumeContentHeight] = useState<number>(1123);

  const {
    resumeData,
    setResumeData,
    sections,
    sectionTitles,
    updateSectionTitle,
    skills,
    setSkills,
    experiences,
    addExperience,
    deleteExperience,
    updateExperience,
    educations,
    addEducation,
    deleteEducation,
    projects,
    addProject,
    deleteProject,
    updateProject,
    certifications,
    addCertification,
    deleteCertification,
    updateCertification,
    socialLinks,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    fontOptions,
    moveSection,
    deleteSection,
    selectedTemplate
  } = useResumeContext();

  // Update parent ref when resumeContentRef changes
  useEffect(() => {
    if (resumeContentRef.current) {
      onResumeContentRefChange(resumeContentRef.current);
    }
  }, [resumeContentRef.current, onResumeContentRefChange]);

  // Track content height
  useEffect(() => {
    if (resumeContentRef.current) {
      setResumeContentHeight(resumeContentRef.current.scrollHeight);
    }
  }, [sections, skills, experiences, educations, projects, certifications, socialLinks, resumeData, fontOptions]);

  return (
    <div className="col-span-8">
      <div style={{ width: '100%' }}>
        <div 
          className="resume-container-enhanced resume-print-ready" 
          ref={resumeContentRef} 
          style={{ position: 'relative' }}
        >
          <TemplateWrapper
              template={selectedTemplate}
              resumeData={resumeData}
              socialLinks={socialLinks}
              fontOptions={fontOptions}
              sections={sections}
              sectionTitles={sectionTitles}
              setResumeData={setResumeData}
              deleteSocialLink={deleteSocialLink}
              addSocialLink={addSocialLink}
              updateSocialLink={updateSocialLink}
              previewMode={previewMode}
              // Additional props for Modern template sidebar components
              skills={skills}
              setSkills={previewMode ? undefined : setSkills}
              certifications={certifications}
              addCertification={previewMode ? undefined : addCertification}
              deleteCertification={previewMode ? undefined : deleteCertification}
              updateCertification={previewMode ? undefined : updateCertification}
              moveSection={previewMode ? undefined : moveSection}
              deleteSection={previewMode ? undefined : (index: number) => deleteSection(index)}
              onSectionTitleChange={previewMode ? undefined : (sectionType: string, newTitle: string) => {
                const sectionIndex = sections.findIndex(s => s.type === sectionType);
                if (sectionIndex !== -1) {
                  updateSectionTitle(sections, sectionIndex, newTitle);
                }
              }}
              renderSection={(section) => {
                const index = sections.findIndex(s => s.type === section.type);
                
                switch (section.type) {
                  case 'summary':
                  return (
                    <SummarySection
                      key="summary"
                      index={index}
                      moveSection={previewMode ? (() => {}) : moveSection}
                      deleteSection={previewMode ? (() => {}) : (() => deleteSection(index))}
                      sectionsLength={sections.length}
                      fontOptions={fontOptions}
                      title={sectionTitles.summary}
                      onTitleChange={previewMode ? (() => {}) : (newTitle => updateSectionTitle(sections, index, newTitle))}
                      previewMode={previewMode}
                    />
                  );
                case 'skills':
                  return (
                    <SkillsSection
                      key="skills"
                      index={index}
                      moveSection={previewMode ? (() => {}) : moveSection}
                      deleteSection={previewMode ? (() => {}) : (() => deleteSection(index))}
                      sectionsLength={sections.length}
                      fontOptions={fontOptions}
                      skills={skills}
                      setSkills={previewMode ? (() => {}) : setSkills}
                      title={sectionTitles.skills}
                      onTitleChange={previewMode ? (() => {}) : (newTitle => updateSectionTitle(sections, index, newTitle))}
                      previewMode={previewMode}
                    />
                  );
                case 'experience':
                  return (
                    <ExperienceSection
                      key="experience"
                      index={index}
                      moveSection={previewMode ? (() => {}) : moveSection}
                      deleteSection={previewMode ? (() => {}) : (() => deleteSection(index))}
                      sectionsLength={sections.length}
                      fontOptions={fontOptions}
                      experiences={experiences}
                      addExperience={previewMode ? (() => {}) : addExperience}
                      deleteExperience={previewMode ? (() => {}) : deleteExperience}
                      updateExperience={previewMode ? (() => {}) : updateExperience}
                      title={sectionTitles.experience}
                      onTitleChange={previewMode ? (() => {}) : (newTitle => updateSectionTitle(sections, index, newTitle))}
                      previewMode={previewMode}
                    />
                  );
                case 'education':
                  return (
                    <EducationSection
                      key="education"
                      index={index}
                      moveSection={previewMode ? (() => {}) : moveSection}
                      deleteSection={previewMode ? (() => {}) : (() => deleteSection(index))}
                      sectionsLength={sections.length}
                      fontOptions={fontOptions}
                      educations={educations}
                      addEducation={previewMode ? (() => {}) : addEducation}
                      deleteEducation={previewMode ? (() => {}) : deleteEducation}
                      title={sectionTitles.education}
                      onTitleChange={previewMode ? (() => {}) : (newTitle => updateSectionTitle(sections, index, newTitle))}
                      previewMode={previewMode}
                    />
                  );
                case 'projects':
                  return (
                    <ProjectsSection
                      key="projects"
                      index={index}
                      moveSection={previewMode ? (() => {}) : moveSection}
                      deleteSection={previewMode ? (() => {}) : (() => deleteSection(index))}
                      sectionsLength={sections.length}
                      fontOptions={fontOptions}
                      projects={projects}
                      addProject={previewMode ? (() => {}) : addProject}
                      deleteProject={previewMode ? (() => {}) : deleteProject}
                      updateProject={previewMode ? (() => {}) : updateProject}
                      title={sectionTitles.projects}
                      onTitleChange={previewMode ? (() => {}) : (newTitle => updateSectionTitle(sections, index, newTitle))}
                      previewMode={previewMode}
                    />
                  );
                case 'certifications':
                  return (
                    <CertificationsSection
                      key="certifications"
                      index={index}
                      moveSection={previewMode ? (() => {}) : moveSection}
                      deleteSection={previewMode ? (() => {}) : (() => deleteSection(index))}
                      sectionsLength={sections.length}
                      fontOptions={fontOptions}
                      certifications={certifications}
                      addCertification={previewMode ? (() => {}) : addCertification}
                      deleteCertification={previewMode ? (() => {}) : deleteCertification}
                      updateCertification={previewMode ? (() => {}) : updateCertification}
                      title={sectionTitles.certifications}
                      onTitleChange={previewMode ? (() => {}) : (newTitle => updateSectionTitle(sections, index, newTitle))}
                      previewMode={previewMode}
                    />
                  );
                  default:
                    return null;
                }
              }}
            />
        </div>
      </div>
    </div>
  );
};

export default ResumeContainer;

