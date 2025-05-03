import React, { useEffect, useRef, useState } from 'react';
import type { FontOptions, SocialLink, ResumeSection } from '../../types/common';
import { getFontWeightValue } from '../../utils/fontUtils';
import ResumeHeaderName from './ResumeHeaderName';
import ResumeHeaderTitle from './ResumeHeaderTitle';
import ResumeSocialLinks from './ResumeSocialLinks';
import SectionHeaderLine from '../common/SectionHeaderLine';

const PAGE_HEIGHT = 1123; // A4 height at 96 DPI
const PAGE_WIDTH = 794; // A4 width at 96 DPI
const A4_HEIGHT_PX = 1123; // 297mm at 96dpi
const A4_WIDTH_PX = 794;   // 210mm at 96dpi

interface PaginatedResumeProps {
    sections: ResumeSection[];
    sectionTitles: Record<string, string>;
    fontOptions: FontOptions;
    socialLinks: SocialLink[];
    name: string;
    title: string;
    onMoveSection: (fromIndex: number, toIndex: number) => void;
    onAddSocialLink: (type: string) => void;
    onUpdateSocialLink: (index: number, field: string, value: string) => void;
    onDeleteSocialLink: (index: number) => void;
    renderSection: (section: ResumeSection) => React.ReactNode;
    onUpdateName: (name: string) => void;
    onUpdateTitle: (title: string) => void;
}

const getPageBreaks = (contentHeight: number, pageHeight: number) => {
    const breaks = [];
    let curr = pageHeight;
    while (curr < contentHeight) {
        breaks.push(curr);
        curr += pageHeight;
    }
    return breaks;
};

export const PaginatedResume = React.forwardRef<HTMLDivElement, PaginatedResumeProps>((props, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [pages, setPages] = useState<HTMLDivElement[]>([]);

    const getFontStyle = (options: FontOptions) => {
        return {
            '--font-family': options.bodyFont,
            '--font-size': options.bodySize,
            '--font-weight': getFontWeightValue(options.bodyWeight),
            '--line-height': options.bodyLineHeight,
            '--letter-spacing': options.bodyLetterSpacing,
            '--color': options.bodyColor,
            fontStyle: options.bodyItalic ? 'italic' : 'normal',
            textDecoration: options.bodyUnderline ? 'underline' : 'none',
        } as React.CSSProperties;
    };

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [props.sections, props.fontOptions, props.socialLinks, props.name, props.title]);

    const pageBreaks = getPageBreaks(contentHeight, PAGE_HEIGHT);

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
    }, [props.sections, props.fontOptions]);

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <div ref={contentRef} className="hidden">
                {/* Header Section */}
                <div className="mb-8">
                    <ResumeHeaderName
                        name={props.name}
                        fontOptions={props.fontOptions}
                        onUpdate={() => props.onUpdateName(props.name)}
                    />
                    <ResumeHeaderTitle
                        title={props.title}
                        fontOptions={props.fontOptions}
                        onUpdate={() => props.onUpdateTitle(props.title)}
                    />
                    <ResumeSocialLinks
                        socialLinks={props.socialLinks}
                        fontOptions={props.fontOptions}
                        deleteSocialLink={() => {}}
                        updateSocialLink={() => {}}
                    />
                </div>

                {/* Resume Sections */}
                {props.sections.map((section, index) => (
                    <div key={section.type + index} className="section mb-8">
                        <SectionHeaderLine
                            title={props.sectionTitles[section.type]}
                            fontOptions={props.fontOptions}
                        />
                        {props.renderSection(section)}
                    </div>
                ))}
            </div>

            {/* A4 page margin indicator overlay */}
            <div
                className="a4-page-indicator"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: `${A4_WIDTH_PX}px`,
                    height: `${A4_HEIGHT_PX}px`,
                    border: '2px dashed #e74c3c',
                    pointerEvents: 'none',
                    zIndex: 10,
                }}
            />

            {/* Horizontal page break lines */}
            {pageBreaks.map((y, i) => (
                <div
                    key={`page-break-${i}`}
                    style={{
                        position: 'absolute',
                        top: y,
                        left: 0,
                        width: '100%',
                        height: 2,
                        background: '#e74c3c',
                        opacity: 0.3,
                        zIndex: 10,
                        pointerEvents: 'none',
                    }}
                />
            ))}

            <div className="flex flex-col items-center">
                {pages.map((page, index) => (
                    <div key={index} className="resume-page" dangerouslySetInnerHTML={{ __html: page.outerHTML }} />
                ))}
            </div>
        </div>
    );
});