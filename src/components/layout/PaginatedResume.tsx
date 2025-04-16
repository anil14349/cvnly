import React, { useEffect, useRef, useState } from 'react';
import { FontOptions } from '../../types/common';
import { Section } from '../../types/section';
import { SocialLink } from '../../types/social';
import { getFontWeightValue } from '../../utils/fontUtils';
import ResumeHeaderName from './ResumeHeaderName';
import ResumeHeaderTitle from './ResumeHeaderTitle';
import ResumeSocialLinks from './ResumeSocialLinks';
import SectionHeaderLine from '../common/SectionHeaderLine';

const PAGE_HEIGHT = 1123; // A4 height at 96 DPI
const PAGE_WIDTH = 794; // A4 width at 96 DPI

interface PaginatedResumeProps {
    sections: Section[];
    sectionTitles: Record<string, string>;
    fontOptions: FontOptions;
    socialLinks: SocialLink[];
    resumeData: {
        name: string;
        title: string;
    };
    onUpdateSection: (field: string, value: string) => void;
    onMoveSection: (fromIndex: number, toIndex: number) => void;
    onAddSocialLink: (type: string) => void;
    onUpdateSocialLink: (index: number, field: string, value: string) => void;
    onDeleteSocialLink: (index: number) => void;
    renderSection: (section: Section) => React.ReactNode;
    name: string;
    title: string;
    onUpdateName: (name: string) => void;
    onUpdateTitle: (title: string) => void;
}

export const PaginatedResume: React.FC<PaginatedResumeProps> = ({
    sections,
    sectionTitles,
    fontOptions,
    socialLinks,
    resumeData,
    onUpdateSection,
    onMoveSection,
    onAddSocialLink,
    onUpdateSocialLink,
    onDeleteSocialLink,
    renderSection,
    name,
    title,
    onUpdateName,
    onUpdateTitle,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [pages, setPages] = useState<HTMLDivElement[]>([]);

    const getFontStyle = (options: FontOptions) => {
        return {
            '--font-family': options.fontFamily,
            '--font-size': `${options.fontSize}px`,
            '--font-weight': getFontWeightValue(options.fontWeight),
            '--line-height': options.lineHeight,
            '--letter-spacing': `${options.letterSpacing}px`,
            '--color': options.color,
            fontStyle: options.italic ? 'italic' : 'normal',
            textDecoration: options.underline ? 'underline' : 'none',
        } as React.CSSProperties;
    };

    useEffect(() => {
        const calculatePages = () => {
            if (!contentRef.current) return;

            const content = contentRef.current;
            const contentHeight = content.scrollHeight;
            const pageCount = Math.ceil(contentHeight / PAGE_HEIGHT);
            const newPages: HTMLDivElement[] = [];

            for (let i = 0; i < pageCount; i++) {
                const pageDiv = document.createElement('div');
                pageDiv.className = 'resume-page';
                pageDiv.style.height = `${PAGE_HEIGHT}px`;
                pageDiv.style.width = `${PAGE_WIDTH}px`;
                pageDiv.style.position = 'relative';
                pageDiv.style.overflow = 'hidden';
                pageDiv.style.marginBottom = '2rem';
                pageDiv.style.backgroundColor = 'white';
                pageDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

                const pageContent = content.cloneNode(true) as HTMLDivElement;
                pageContent.style.position = 'absolute';
                pageContent.style.top = `${-i * PAGE_HEIGHT}px`;
                pageContent.style.width = '100%';
                pageContent.style.padding = '0.5in';

                if (i < pageCount - 1) {
                    const breakIndicator = document.createElement('div');
                    breakIndicator.className = 'page-break-indicator';
                    pageDiv.appendChild(breakIndicator);
                }

                pageDiv.appendChild(pageContent);
                newPages.push(pageDiv);
            }

            setPages(newPages);
        };

        calculatePages();
        window.addEventListener('resize', calculatePages);

        return () => {
            window.removeEventListener('resize', calculatePages);
        };
    }, [sections, fontOptions]);

    return (
        <div className="resume-container" style={getFontStyle(fontOptions)}>
            <div ref={contentRef} className="hidden">
                {/* Header Section */}
                <div className="mb-8">
                    <ResumeHeaderName
                        name={name}
                        fontOptions={fontOptions}
                        onUpdate={onUpdateName}
                    />
                    <ResumeHeaderTitle
                        title={title}
                        fontOptions={fontOptions}
                        onUpdate={onUpdateTitle}
                    />
                    <ResumeSocialLinks
                        socialLinks={socialLinks}
                        fontOptions={fontOptions}
                        onAdd={onAddSocialLink}
                        onUpdate={onUpdateSocialLink}
                        onDelete={onDeleteSocialLink}
                    />
                </div>

                {/* Resume Sections */}
                {sections.map((section, index) => (
                    <div key={section} className="section mb-8">
                        <SectionHeaderLine
                            title={sectionTitles[section]}
                            fontOptions={fontOptions}
                            moveSection={onMoveSection}
                            section={section}
                            index={index}
                        />
                        {renderSection(section)}
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center">
                {pages.map((page, index) => (
                    <div key={index} className="resume-page">
                        {page}
                    </div>
                ))}
            </div>
        </div>
    );
}; 