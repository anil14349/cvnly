import React, { useRef, useLayoutEffect, useState } from 'react';
import ResumeSectionRenderer from './ResumeSectionRenderer';
import ResumeHeader from './layout/ResumeHeader';
import type { ResumeSection } from '../types/common';

const PAGE_HEIGHT_PX = 1122; // A4 at 96dpi
const PAGE_PADDING_PX = 64; // 32px top + 32px bottom

const pageStyle: React.CSSProperties = {
  width: '794px', // 210mm at 96dpi
  minHeight: PAGE_HEIGHT_PX,
  maxHeight: PAGE_HEIGHT_PX,
  margin: '0 auto 24px auto',
  background: 'white',
  boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
  overflow: 'hidden',
  position: 'relative',
  padding: '32px 40px',
  display: 'flex',
  flexDirection: 'column',
};

interface PaginatedResumeProps {
  resumeData: { name: string; title: string };
  socialLinks: any;
  sectionTitles: Record<string, string>;
  fontOptions: any;
  sections: ResumeSection[];
  moveSection: any;
  deleteSection: any;
  updateSectionTitle: any;
  setSkills: any;
  addExperience: any;
  deleteExperience: any;
  updateExperience: any;
  addEducation: any;
  deleteEducation: any;
  addProject: any;
  deleteProject: any;
  updateProject: any;
  addCertification: any;
  deleteCertification: any;
  updateCertification: any;
}

const PaginatedResume: React.FC<PaginatedResumeProps> = (props) => {
  const {
    resumeData, socialLinks, sectionTitles, fontOptions, sections,
    moveSection, deleteSection, updateSectionTitle, setSkills,
    addExperience, deleteExperience, updateExperience,
    addEducation, deleteEducation, addProject, deleteProject, updateProject,
    addCertification, deleteCertification, updateCertification
  } = props;

  // Store refs for each section
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pageBreaks, setPageBreaks] = useState<number[]>([]);

  useLayoutEffect(() => {
    // Measure heights and calculate page breaks
    let accHeight = PAGE_PADDING_PX; // account for header
    const breaks: number[] = [];
    sectionRefs.current.forEach((ref, idx) => {
      if (ref) {
        accHeight += ref.offsetHeight;
        if (accHeight > PAGE_HEIGHT_PX) {
          breaks.push(idx);
          accHeight = PAGE_PADDING_PX + ref.offsetHeight;
        }
      }
    });
    setPageBreaks(breaks);
  }, [sections]);

  // Split sections into pages
  const visibleSections = sections.filter(s => s.visible);
  const pages: ResumeSection[][] = [];
  let currentPage: ResumeSection[] = [];
  visibleSections.forEach((section, idx) => {
    if (pageBreaks.includes(idx)) {
      pages.push(currentPage);
      currentPage = [];
    }
    currentPage.push(section);
  });
  if (currentPage.length) pages.push(currentPage);

  return (
    <div>
      {pages.map((pageSections, pageIdx) => (
        <div key={pageIdx} style={pageStyle} className="resume-page print:break-after-page">
          {pageIdx === 0 && (
            <ResumeHeader
              resumeData={resumeData}
              socialLinks={socialLinks}
              deleteSocialLink={() => {}}
              addSocialLink={() => {}}
              updateSocialLink={() => {}}
              fontOptions={fontOptions}
            />
          )}
          {pageSections.map((section, idx) => (
            <div key={section.type} ref={el => sectionRefs.current[pageIdx === 0 ? idx : pageBreaks[pageIdx - 1] + 1 + idx] = el}>
              <ResumeSectionRenderer
                section={section}
                index={idx}
                sectionTitles={sectionTitles}
                fontOptions={fontOptions}
                sectionsLength={sections.length}
                moveSection={moveSection}
                deleteSection={deleteSection}
                updateSectionTitle={updateSectionTitle}
                setSkills={setSkills}
                addExperience={addExperience}
                deleteExperience={deleteExperience}
                updateExperience={updateExperience}
                addEducation={addEducation}
                deleteEducation={deleteEducation}
                addProject={addProject}
                deleteProject={deleteProject}
                updateProject={updateProject}
                addCertification={addCertification}
                deleteCertification={deleteCertification}
                updateCertification={updateCertification}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PaginatedResume;
