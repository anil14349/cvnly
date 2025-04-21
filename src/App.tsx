import React from 'react';
import { useState, useEffect } from 'react';
import { useResumeSections } from './hooks/useResumeSections';
import { Download } from 'lucide-react';
import './index.css';
import './styles/index.css';

// Import types
import { FontOptions } from './types/common';

// Import components
import ResumeHeader from './components/layout/ResumeHeader';
import FontControlPanel from './components/widgets/FontControlPanel';
import ResumeSectionsWidget from './components/widgets/ResumeSectionsWidget';

// Import section components
import ResumeSectionRenderer from './components/ResumeSectionRenderer';
import PageBreak from './components/PageBreak';

// Import hooks
import usePdfGeneration from './hooks/usePdfGeneration';

// Import utils
import { HEADER_FONTS, BODY_FONTS } from './utils/fontUtils';
import LineBreakTool from './components/widgets/LineBreakTool';
import { applyTheme } from './utils/themeUtils';

// Initialize default font options
const defaultFontOptions: FontOptions = {
  // Header font settings
  headerFont: 'inter',
  headerSize: 'text-2xl',
  headerWeight: 'font-normal',
  headerLineHeight: 'leading-tight',
  headerLetterSpacing: 'tracking-wide',
  headerColor: 'text-gray-700',
  headerAlignment: 'center',
  headerItalic: false,
  headerUnderline: false,

  // Subheader font settings
  subheaderFont: 'inter',
  subheaderSize: 'text-sm',
  subheaderWeight: 'font-normal',
  subheaderLineHeight: 'leading-snug',
  subheaderLetterSpacing: 'tracking-wide',
  subheaderColor: 'text-gray-600',
  subheaderItalic: false,
  subheaderUnderline: false,

  // Section header font settings
  sectionHeaderFont: 'inter',
  sectionHeaderSize: 'text-xl',
  sectionHeaderWeight: 'font-normal',
  sectionHeaderLineHeight: 'leading-tight',
  sectionHeaderLetterSpacing: 'tracking-tight',
  sectionHeaderColor: 'text-gray-600',
  sectionHeaderItalic: false,
  sectionHeaderUnderline: false,

  // Body font settings
  bodyFont: 'inter',
  bodySize: 'text-sm',
  bodyWeight: 'font-normal',
  bodyLineHeight: 'leading-tight',
  bodyLetterSpacing: 'tracking-wide',
  bodyColor: 'text-gray-500',
  bodyItalic: false,
  bodyUnderline: false,

  // Line settings
  lineColor: '#4299e1'
};

function App() {
  // Use custom hook for all section-related state
  const {
    skills, setSkills,
    sections, setSections,
    sectionTitles,
    socialLinks,
    resumeRef,
    handleSectionUpdate,
    addProject,
    deleteProject,
    addEducation,
    deleteEducation,
    addExperience,
    deleteExperience,
    addCertification,
    deleteCertification,
    updateCertification,
    updateExperience,
    updateProject,
    updateSectionTitle,
    moveSection,
    deleteSection,
    addSocialLink,
    deleteSocialLink,
    updateSocialLink
  } = useResumeSections();

  // Use custom hooks
  const { generatePdf } = usePdfGeneration();

  // Theme state
  const storedTheme = localStorage.getItem('theme');
const initialTheme: 'light' | 'dark' = storedTheme === 'dark' ? 'dark' : 'light';
const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>(initialTheme);

  // Font options state
  const storedFontOptions = localStorage.getItem('fontOptions') as string | null;
  const [fontOptions, setFontOptions] = useState<FontOptions>(
    storedFontOptions ? JSON.parse(storedFontOptions) : defaultFontOptions
  );

  // PDF preview toggle state
  const [showPdfPreview, setShowPdfPreview] = React.useState(false);

  // Initialize CSS variables on mount
  useEffect(() => {
    const root = document.documentElement;

    // Set initial CSS variables
    Object.entries(fontOptions).forEach(([key, value]) => {
      if (key.startsWith('line')) {
        root.style.setProperty(`--${key}`, value);
      }
    });

    // Set variables for all section headers
    document.querySelectorAll('[class*="section-header-"]').forEach(section => {
      const sectionElement = section as HTMLElement;
      Object.entries(fontOptions).forEach(([key, value]) => {
        if (key.startsWith('line')) {
          sectionElement.style.setProperty(`--${key}`, value);
        }
      });
    });
  }, []); // Run once on mount

  // Apply theme on mount and whenever activeTheme changes
  useEffect(() => {
    applyTheme(activeTheme, setActiveTheme);
  }, [activeTheme, setActiveTheme]);

  // Update individual font settings
  const updateFontOption = (option: keyof FontOptions, value: string | boolean) => {
    // Update the state
    setFontOptions((prevOptions: FontOptions) => {
      const newOptions = {
        ...prevOptions,
        [option]: value
      };

      // Update CSS variables
      const root = document.documentElement;

      // Handle line color
      if (option === 'lineColor') {
        // Only set --line-color if value looks like a valid CSS color (hex or rgb or color name)
        if (typeof value === 'string' && (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl') || /^[a-zA-Z]+$/.test(value))) {
          root.style.setProperty('--line-color', value as string);
        }
      }

      // Get the resume container
      const resumeContainer = resumeRef.current;
      if (!resumeContainer) return newOptions;

      // Handle font family options
      if (option === 'headerFont') {
        const headerFontClass = HEADER_FONTS[(value as string).toLowerCase().replace(/\s+/g, '') as keyof typeof HEADER_FONTS] || HEADER_FONTS.inter;
        resumeContainer.classList.remove(...Object.values(HEADER_FONTS));
        resumeContainer.classList.add(headerFontClass);
      }

      if (option === 'subheaderFont') {
        const subheaderFontClass = HEADER_FONTS[(value as string).toLowerCase().replace(/\s+/g, '') as keyof typeof HEADER_FONTS] || HEADER_FONTS.inter;
        resumeContainer.classList.remove(...Object.values(HEADER_FONTS));
        resumeContainer.classList.add(subheaderFontClass);
      }

      if (option === 'sectionHeaderFont') {
        const sectionHeaderFontClass = HEADER_FONTS[(value as string).toLowerCase().replace(/\s+/g, '') as keyof typeof HEADER_FONTS] || HEADER_FONTS.inter;
        resumeContainer.classList.remove(...Object.values(HEADER_FONTS));
        resumeContainer.classList.add(sectionHeaderFontClass);
      }

      if (option === 'bodyFont') {
        const bodyFontClass = BODY_FONTS[(value as string).toLowerCase().replace(/\s+/g, '') as keyof typeof BODY_FONTS] || BODY_FONTS.inter;
        resumeContainer.classList.remove(...Object.values(BODY_FONTS));
        resumeContainer.classList.add(bodyFontClass);
      }

      return newOptions;
    });
  };

  // Add useEffect to sync skills with section content
  useEffect(() => {
    const sectionIndex = sections.findIndex(section => section.type === 'skills');
    if (sectionIndex !== -1) {
      const updatedSections = [...sections];
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        content: {
          ...updatedSections[sectionIndex].content,
          skills: skills
        }
      };
      handleSectionUpdate(sectionIndex, updatedSections[sectionIndex]);
    }
  }, [skills, sections, handleSectionUpdate]);

  return (
    <div className={`min-h-screen ${activeTheme === 'dark' ? 'dark' : ''}`}>
      {/* App Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">CVnly</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => generatePdf(resumeRef.current)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Resume content */}
          <div className="col-span-8">
            <div className={`bg-white rounded-lg shadow-lg p-8`} ref={resumeRef}>
              <ResumeHeader
                resumeData={{
                  name: "Anil Kumar",
                  title: "Integration Architect/AI & ML Engineer"
                }}
                socialLinks={socialLinks}
                deleteSocialLink={deleteSocialLink}
                addSocialLink={addSocialLink}
                updateSocialLink={updateSocialLink}
                fontOptions={fontOptions}
              />
              {(() => {
  // Get only visible sections
  const visibleSections = sections.filter(section => section.visible);
  return visibleSections.map((section, index) => (
    <ResumeSectionRenderer
      key={section.type}
      section={section}
      index={index}
      sectionTitles={sectionTitles}
      fontOptions={fontOptions}
      sectionsLength={visibleSections.length}
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
  ));
})()}
            </div>
          </div>

          {/* Left sidebar with controls */}
          <div className="col-span-4 space-y-4">
            <FontControlPanel
              fontOptions={fontOptions}
              updateFontOption={updateFontOption}
            />
            <LineBreakTool
              fontOptions={fontOptions}
              onFontOptionChange={updateFontOption}
            />
            <ResumeSectionsWidget
              sections={sections}
              onSectionsChange={setSections}
              socialLinks={socialLinks}
              addSocialLink={addSocialLink}
            />
          </div>
        </div>
      </div>

      {/* Update theme colors */}
      <style>
        {`
          :root {
            --bg-primary: #ffffff;
            --bg-secondary: #f3f4f6;
            --text-primary: #111827;
            --text-secondary: #4b5563;
            --accent-color: #3b82f6;
            --border-color: #e5e7eb;
          }

          .dark {
            --bg-primary: #1f2937;
            --bg-secondary: #111827;
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --accent-color: #60a5fa;
            --border-color: #374151;
          }
        `}
      </style>
    </div>
  );
} 
export default App;