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

// Loader for the best UX: measure offscreen, show spinner, then show paginated
const PaginatedResumeLoader: React.FC<PaginatedResumeProps> = (props) => {
  const [pages, setPages] = useState<ResumeSection[][] | null>(null);
  const [timeoutError, setTimeoutError] = useState(false);
  const measureContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const visibleSections = props.sections.filter(s => s.visible);

  // Step 1: Measure offscreen robustly
  useLayoutEffect(() => {
    setTimeoutError(false);
    sectionRefs.current = [];
    setPages(null); // Hide UI until measured
    if (visibleSections.length === 0) {
      setPages([[]]); // Show a blank page
      return;
    }
    // Safety timeout: if measurement takes >2s, show error
    const timer = setTimeout(() => setTimeoutError(true), 2000);
    requestAnimationFrame(() => {
      let accHeight = PAGE_PADDING_PX; // header
      const pages: ResumeSection[][] = [];
      let currentPage: ResumeSection[] = [];
      visibleSections.forEach((section, idx) => {
        const ref = sectionRefs.current[idx];
        if (ref) {
          accHeight += ref.offsetHeight;
          if (accHeight > PAGE_HEIGHT_PX) {
            pages.push(currentPage);
            currentPage = [];
            accHeight = PAGE_PADDING_PX + ref.offsetHeight;
          }
        }
        currentPage.push(section);
      });
      if (currentPage.length) pages.push(currentPage);
      clearTimeout(timer);
      setPages(pages);
    });
    // eslint-disable-next-line
  }, [visibleSections.length, props.sections]);

  // Step 2: Render offscreen for measurement or handle errors/empty
  if (timeoutError) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="text-red-400 text-lg">Pagination failed to complete. Please reload or check your content.</span>
      </div>
    );
  }
  if (!pages) {
    if (visibleSections.length === 0) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="text-gray-400 text-lg">No sections to display.</span>
        </div>
      );
    }
    return (
      <>
        <div style={{ position: 'absolute', left: -9999, top: 0, visibility: 'hidden', pointerEvents: 'none', width: 794 }} ref={measureContainerRef}>
          <ResumeHeader
            resumeData={props.resumeData}
            socialLinks={props.socialLinks}
            deleteSocialLink={() => {}}
            addSocialLink={() => {}}
            updateSocialLink={() => {}}
            fontOptions={props.fontOptions}
          />
          {visibleSections.map((section, idx) => (
            <div key={section.type} ref={el => sectionRefs.current[idx] = el}>
              <ResumeSectionRenderer
                section={section}
                index={idx}
                sectionTitles={props.sectionTitles}
                fontOptions={props.fontOptions}
                sectionsLength={props.sections.length}
                moveSection={props.moveSection}
                deleteSection={props.deleteSection}
                updateSectionTitle={props.updateSectionTitle}
                setSkills={props.setSkills}
                addExperience={props.addExperience}
                deleteExperience={props.deleteExperience}
                updateExperience={props.updateExperience}
                addEducation={props.addEducation}
                deleteEducation={props.deleteEducation}
                addProject={props.addProject}
                deleteProject={props.deleteProject}
                updateProject={props.updateProject}
                addCertification={props.addCertification}
                deleteCertification={props.deleteCertification}
                updateCertification={props.updateCertification}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="text-gray-400 text-lg">Paginating...</span>
        </div>
      </>
    );
  }

  // Step 3: Render paginated pages
  return (
    <div>
      {pages.map((pageSections, pageIdx) => (
        <div key={pageIdx} style={pageStyle} className="resume-page print:break-after-page">
          {pageIdx === 0 && (
            <ResumeHeader
              resumeData={props.resumeData}
              socialLinks={props.socialLinks}
              deleteSocialLink={() => {}}
              addSocialLink={() => {}}
              updateSocialLink={() => {}}
              fontOptions={props.fontOptions}
            />
          )}
          {pageSections.map((section, idx) => (
            <ResumeSectionRenderer
              key={section.type}
              section={section}
              index={idx}
              sectionTitles={props.sectionTitles}
              fontOptions={props.fontOptions}
              sectionsLength={props.sections.length}
              moveSection={props.moveSection}
              deleteSection={props.deleteSection}
              updateSectionTitle={props.updateSectionTitle}
              setSkills={props.setSkills}
              addExperience={props.addExperience}
              deleteExperience={props.deleteExperience}
              updateExperience={props.updateExperience}
              addEducation={props.addEducation}
              deleteEducation={props.deleteEducation}
              addProject={props.addProject}
              deleteProject={props.deleteProject}
              updateProject={props.updateProject}
              addCertification={props.addCertification}
              deleteCertification={props.deleteCertification}
              updateCertification={props.updateCertification}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PaginatedResumeLoader;
