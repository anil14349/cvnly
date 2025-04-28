import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import ResumeHeader from '../layout/ResumeHeader';
import SummarySection from '../sections/SummarySection/SummarySection';
import SkillsSection from '../sections/SkillsSection/SkillsSection';
import ExperienceSection from '../sections/ExperienceSection/ExperienceSection';
import EducationSection from '../sections/EducationSection/EducationSection';
import ProjectsSection from '../sections/ProjectsSection/ProjectsSection';
import CertificationsSection from '../sections/CertificateSection/CertificationsSection';

interface PrintPreviewProps {
    isOpen: boolean;
    onClose: () => void;
    resumeData: { name: string; title: string };
    sectionTitles: { [key: string]: string };
    sections: any[];
    fontOptions: any;
    socialLinks: any[];
    addSkill: any;
    deleteSkill: any;
    updateSkill: any;
    addExperience: any;
    deleteExperience: any;
    updateExperience: any;
    addEducation: any;
    deleteEducation: any;
    updateEducation: any;
    addProject: any;
    deleteProject: any;
    updateProject: any;
    addCertification: any;
    deleteCertification: any;
    updateCertification: any;
    addSocialLink: any;
    deleteSocialLink: any;
    updateSocialLink: any;
}

const PrintPreview: React.FC<PrintPreviewProps> = ({
    isOpen,
    onClose,
    resumeData,
    sectionTitles,
    sections,
    fontOptions,
    socialLinks,
    addSkill,
    deleteSkill,
    updateSkill,
    addExperience,
    deleteExperience,
    updateExperience,
    addEducation,
    deleteEducation,
    updateEducation,
    addProject,
    deleteProject,
    updateProject,
    addCertification,
    deleteCertification,
    updateCertification,
    addSocialLink,
    deleteSocialLink,
    updateSocialLink,
}) => {
    if (!isOpen) return null;

    // Close modal on ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg p-0 w-[21cm] h-[70vh] overflow-y-auto shadow-2xl border border-gray-200" style={{ marginTop: '3rem' }}>
                {/* Print Preview Modal Header */}
                <div className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                        {/* Remove thumbnail from header */}
                        <span className="font-semibold text-lg text-gray-700 dark:text-gray-100">CVnly Print Preview</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {/* Multiple watermarks across the resume */}
                <div className="pointer-events-none select-none z-0 absolute inset-0">
                    {/* Repeat watermark in a grid pattern */}
                    {Array.from({ length: 4 }).map((_, row) => (
                        Array.from({ length: 2 }).map((_, col) => (
                            <div
                                key={`watermark-${row}-${col}`}
                                className="absolute opacity-10"
                                style={{
                                    top: `${15 + row * 30}%`,
                                    left: `${col === 0 ? 20 : 60}%`,
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    color: '#6366f1',
                                    letterSpacing: '0.1em',
                                    transform: 'rotate(-20deg)',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                CVnly.com
                            </div>
                        ))
                    ))}
                </div>
                <div className="bg-white rounded-lg p-8">
                    <div className="flex flex-col items-center">
                        <ResumeHeader
                            resumeData={resumeData}
                            socialLinks={socialLinks}
                            deleteSocialLink={deleteSocialLink}
                            addSocialLink={addSocialLink}
                            updateSocialLink={updateSocialLink}
                            fontOptions={fontOptions}
                        />
                    </div>
                    {sections.map((section, index) => {
                        if (!section.visible) return null;
                        switch (section.type) {
                            case 'summary':
                                return (
                                    <SummarySection
                                        key="summary"
                                        index={index}
                                        moveSection={() => {}}
                                        deleteSection={() => {}}
                                        sectionsLength={sections.length}
                                        fontOptions={fontOptions}
                                        title={sectionTitles.summary}
                                        onTitleChange={() => {}}
                                        summary={section.content.summary || ''}
                                        onSummaryChange={() => {}}
                                        isPreview={true}
                                    />
                                );
                            case 'skills':
                                return (
                                    <SkillsSection
                                        key="skills"
                                        index={index}
                                        moveSection={() => {}}
                                        deleteSection={() => {}}
                                        sectionsLength={sections.length}
                                        fontOptions={fontOptions}
                                        title={sectionTitles.skills}
                                        onTitleChange={() => {}}
                                        skills={section.content.skills || []}
                                        setSkills={() => {}}
                                        addSkill={addSkill}
                                        deleteSkill={deleteSkill}
                                        updateSkill={updateSkill}
                                        isPreview={true}
                                    />
                                );
                            case 'experience':
                                return (
                                    <ExperienceSection
                                        key="experience"
                                        index={index}
                                        moveSection={() => {}}
                                        deleteSection={() => {}}
                                        sectionsLength={sections.length}
                                        fontOptions={fontOptions}
                                        title={sectionTitles.experience}
                                        onTitleChange={() => {}}
                                        experiences={section.content.experiences || []}
                                        addExperience={addExperience}
                                        deleteExperience={deleteExperience}
                                        updateExperience={updateExperience}
                                        isPreview={true}
                                    />
                                );
                            case 'education':
                                return (
                                    <EducationSection
                                        key="education"
                                        index={index}
                                        moveSection={() => {}}
                                        deleteSection={() => {}}
                                        sectionsLength={sections.length}
                                        fontOptions={fontOptions}
                                        title={sectionTitles.education}
                                        onTitleChange={() => {}}
                                        educations={section.content.educations || []}
                                        addEducation={addEducation}
                                        deleteEducation={deleteEducation}
                                        updateEducation={updateEducation}
                                        isPreview={true}
                                    />
                                );
                            case 'projects':
                                return (
                                    <ProjectsSection
                                        key="projects"
                                        index={index}
                                        moveSection={() => {}}
                                        deleteSection={() => {}}
                                        sectionsLength={sections.length}
                                        fontOptions={fontOptions}
                                        title={sectionTitles.projects}
                                        onTitleChange={() => {}}
                                        projects={section.content.projects || []}
                                        addProject={addProject}
                                        deleteProject={deleteProject}
                                        updateProject={updateProject}
                                        isPreview={true}
                                    />
                                );
                            case 'certifications':
                                return (
                                    <CertificationsSection
                                        key="certifications"
                                        index={index}
                                        moveSection={() => {}}
                                        deleteSection={() => {}}
                                        sectionsLength={sections.length}
                                        fontOptions={fontOptions}
                                        title={sectionTitles.certifications}
                                        onTitleChange={() => {}}
                                        certifications={section.content.certifications || []}
                                        addCertification={addCertification}
                                        deleteCertification={deleteCertification}
                                        updateCertification={updateCertification}
                                        isPreview={true}
                                    />
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default PrintPreview;