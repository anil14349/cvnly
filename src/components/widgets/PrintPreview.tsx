import React, { useEffect, useRef } from 'react';
import type { ResumeSection, FontOptions, SocialLink } from '../../types/common';
import { getFontWeightValue } from '../../utils/fontUtils';
import ResumeHeaderName from '../layout/ResumeHeaderName';
import ResumeHeaderTitle from '../layout/ResumeHeaderTitle';
import ResumeSocialLinks from '../layout/ResumeSocialLinks';

interface PrintPreviewProps {
    sections: ResumeSection[];
    sectionTitles: Record<string, string>;
    socialLinks: SocialLink[];
    fontOptions: FontOptions;
    onClose: () => void;
    isOpen: boolean;
    resumeData: {
        name: string;
        title: string;
    };
}

const PrintPreview: React.FC<PrintPreviewProps> = ({
    sections,
    sectionTitles,
    socialLinks,
    fontOptions,
    onClose,
    isOpen,
    resumeData,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const content = contentRef.current;
            const pageHeight = 1123; // A4 height at 96 DPI
            content.style.minHeight = `${pageHeight}px`;
        }
    }, [sections]);

    const renderSection = (section: ResumeSection) => {
        switch (section.type) {
            case 'summary':
                return (
                    <div key={section.type} className="mb-6 last:mb-0">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">{sectionTitles[section.type]}</h2>
                        <div className="space-y-4">
                            {/* Summary content will be added when available */}
                        </div>
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.type} className="mb-6 last:mb-0">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">{sectionTitles[section.type]}</h2>
                        <div className="grid grid-cols-2 gap-4 skill-grid">
                            {section.content.skills?.map((skill) => (
                                <div key={skill.id} className="bg-gray-50 p-4 rounded skill-card">
                                    <h3 className="font-medium mb-2">{skill.category}</h3>
                                    <ul className="list-disc list-inside space-y-1 skill-list">
                                        {skill.items.map((item, index) => (
                                            <li key={index} className="text-gray-700">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'experience':
                return (
                    <div key={section.type} className="mb-6 last:mb-0">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">{sectionTitles[section.type]}</h2>
                        <div className="space-y-4">
                            {section.content.experiences?.map((exp) => (
                                <div key={exp.id} className="mb-4 last:mb-0">
                                    <h3 className="font-medium">{exp.title}</h3>
                                    <p className="text-gray-600">{exp.company}</p>
                                    <p className="text-gray-500 text-sm">{exp.period}</p>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        {exp.achievements.map((achievement, index) => (
                                            <li key={index} className="text-gray-700">{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'education':
                return (
                    <div key={section.type} className="mb-6 last:mb-0">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">{sectionTitles[section.type]}</h2>
                        <div className="space-y-4">
                            {section.content.educations?.map((edu) => (
                                <div key={edu.id} className="mb-4 last:mb-0">
                                    <h3 className="font-medium">{edu.degree}</h3>
                                    <p className="text-gray-600">{edu.school}</p>
                                    <p className="text-gray-500 text-sm">{edu.startDate} - {edu.endDate || 'Present'}</p>
                                    <p className="text-gray-600">{edu.location}</p>
                                    {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        {edu.details.map((detail, index) => (
                                            <li key={index} className="text-gray-700">{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.type} className="mb-6 last:mb-0">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">{sectionTitles[section.type]}</h2>
                        <div className="space-y-4">
                            {section.content.projects?.map((project) => (
                                <div key={project.id} className="mb-4 last:mb-0">
                                    <h3 className="font-medium">{project.name}</h3>
                                    <p className="text-gray-700">{project.description}</p>
                                    <p className="text-gray-600 text-sm mt-1">{project.technologies.join(', ')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'certifications':
                return (
                    <div key={section.type} className="mb-6 last:mb-0">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">{sectionTitles[section.type]}</h2>
                        <div className="space-y-4">
                            {section.content.certifications?.map((cert) => (
                                <div key={cert.id} className="mb-4 last:mb-0">
                                    <h3 className="font-medium">{cert.name}</h3>
                                    <p className="text-gray-600">{cert.issuer}</p>
                                    <p className="text-gray-500 text-sm">{cert.date}</p>
                                    {cert.expiryDate && <p className="text-gray-500 text-sm">Expires: {cert.expiryDate}</p>}
                                    {cert.credentialId && <p className="text-gray-600">Credential ID: {cert.credentialId}</p>}
                                    {cert.url && <p className="text-gray-600">URL: {cert.url}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="print-preview fixed inset-0 bg-gray-100 overflow-auto z-50">
            <div className="print-content max-w-[210mm] mx-auto bg-white shadow-lg my-8 resume-container" ref={contentRef}>
                <div className="p-8 print:p-0">
                    <ResumeHeaderName
                        name={resumeData.name}
                        fontOptions={fontOptions}
                        onUpdate={() => { }}
                    />
                    <ResumeHeaderTitle
                        title={resumeData.title}
                        fontOptions={fontOptions}
                        onUpdate={() => { }}
                    />
                    <ResumeSocialLinks
                        socialLinks={socialLinks}
                        fontOptions={fontOptions}
                        deleteSocialLink={() => { }}
                        iconFormat="symbol"
                        updateSocialLink={() => {
                            throw new Error('Function not implemented.');
                        }}
                    />
                    {sections.map((section) => renderSection(section))}
                </div>
            </div>
            <button
                onClick={onClose}
                className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 print:hidden"
            >
                Close
            </button>
        </div>
    );
};

export default PrintPreview;