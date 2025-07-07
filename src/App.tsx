import { useState, useRef, useEffect } from 'react';
import { Download } from 'lucide-react';
import './index.css';
import './styles/index.css';

// Import types
import { FontOptions, ResumeSection, SocialLink } from './types/common';
import { Education } from './types/education';
import { Experience } from './types/experience';
import { Project } from './types/project';
import { Skill } from './types/skill';
import { Certification } from './types/certification';

// Import components
import ResumeHeader from './components/layout/ResumeHeader';
import FontControlPanel from './components/widgets/FontControlPanel';
import ResumeSectionsWidget from './components/widgets/ResumeSectionsWidget';

// Import section components
import SummarySection from './components/sections/SummarySection/SummarySection';
import SkillsSection from './components/sections/SkillsSection/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection/ExperienceSection';
import EducationSection from './components/sections/EducationSection/EducationSection';
import ProjectsSection from './components/sections/ProjectsSection/ProjectsSection';
import CertificationsSection from './components/sections/CertificateSection/CertificationsSection';

// Import hooks
import usePdfGeneration from './hooks/usePdfGeneration';
// import useResumeStats from './hooks/useResumeStats';

// Import utils
import { HEADER_FONTS, BODY_FONTS } from './utils/fontUtils';
import LineBreakTool from './components/widgets/LineBreakTool';
import A4Ruler from './components/layout/A4Ruler';

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
  // Individual section states
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  // Resume sections state
  const [sections, setSections] = useState<ResumeSection[]>([
    { type: 'summary', visible: true, content: {} },
    { type: 'skills', visible: true, content: { skills: [] } },
    { type: 'experience', visible: true, content: { experiences: [] } },
    { type: 'education', visible: true, content: { educations: [] } },
    { type: 'projects', visible: true, content: { projects: [] } },
    { type: 'certifications', visible: true, content: { certifications: [] } },
    { type: 'social', visible: true, content: { socialLinks: [] } }
  ]);

  // Section titles state
  const [sectionTitles, setSectionTitles] = useState({
    summary: 'Summary',
    skills: 'Skills',
    experience: 'Work Experience',
    education: 'Education',
    projects: 'Projects',
    certifications: 'Certifications'
  });

  // Resume container ref for PDF generation and stats
  const resumeRef = useRef<HTMLDivElement>(null);

  // Resume content ref for tracking content height
  const resumeContentRef = useRef<HTMLDivElement>(null);

  // Add state to track resume content height
  const [resumeContentHeight, setResumeContentHeight] = useState<number>(1123);

  // Use custom hooks
  const { generatePdf } = usePdfGeneration();
  // const { resumeStats, atsScore } = useResumeStats(resumeRef, sections.length);

  // Theme state
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  // Font options state
  const [fontOptions, setFontOptions] = useState<FontOptions>(defaultFontOptions);

  // Update social links state with more options
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      id: '1',
      type: 'email',
      value: 'john.doe@example.com'
    },
    {
      id: '2',
      type: 'phone',
      value: '+1 (555) 123-4567'
    },
    {
      id: '3',
      type: 'linkedin',
      value: 'linkedin.com/in/johndoe'
    }
  ]);

  // Add resumeData state
  const [resumeData, setResumeData] = useState({
    name: "Anil Kumar",
    title: "Integration Architect/AI & ML Engineer"
  });

  // Preview mode state
  const [previewMode, setPreviewMode] = useState(false);

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

  // Apply theme on mount
  useEffect(() => {
    applyTheme(activeTheme);
  }, []);

  // Update individual font settings
  const updateFontOption = (option: keyof FontOptions, value: string | boolean) => {
    // Update the state
    setFontOptions(prevOptions => {
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

  // Add missing project management function
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: 'New Project',
      company: 'Company Name',
      period: 'Duration',
      description: 'Project description goes here.',
      responsibilities: ['Responsibility 1', 'Responsibility 2', 'Responsibility 3'],
      technologies: ['Tech 1', 'Tech 2', 'Tech 3']
    };
    setProjects([...projects, newProject]);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'projects');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          projects: [...(sections[sectionIndex].content.projects || []), newProject]
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  // Enhanced theme handling
  const applyTheme = (theme: 'light' | 'dark') => {
    setActiveTheme(theme);

    // Remove all existing theme classes
    document.documentElement.classList.remove('light', 'dark');

    // Add the new theme class
    document.documentElement.classList.add(theme);

    // Handle dark mode class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#1a202c';
      document.body.style.color = '#f7fafc';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1a202c';
    }

    // Update CSS variables for the theme
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--bg-primary', '#1a202c');
      root.style.setProperty('--bg-secondary', '#2d3748');
      root.style.setProperty('--text-primary', '#f7fafc');
      root.style.setProperty('--text-secondary', '#cbd5e0');
      root.style.setProperty('--border-color', '#4a5568');
      root.style.setProperty('--accent-color', '#63b3ed');
      root.style.setProperty('--line-color', '#63b3ed');
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f7fafc');
      root.style.setProperty('--text-primary', '#1a202c');
      root.style.setProperty('--text-secondary', '#4a5568');
      root.style.setProperty('--border-color', '#e2e8f0');
      root.style.setProperty('--accent-color', '#4299e1');
      root.style.setProperty('--line-color', '#4299e1');
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < sections.length) {
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      setSections(newSections);
    }
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: 'New Degree',
      school: 'University Name',
      startDate: 'Start Date',
      endDate: 'End Date',
      details: []
    };
    setEducations([...educations, newEducation]);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'education');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          educations: [...(sections[sectionIndex].content.educations || []), newEducation]
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const deleteEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'education');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          educations: sections[sectionIndex].content.educations?.filter(edu => edu.id !== id) || []
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };


  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: 'New Position',
      company: 'Company Name',
      period: 'Start Date - End Date',
      achievements: ['Achievement 1', 'Achievement 2', 'Achievement 3']
    };
    setExperiences([...experiences, newExperience]);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'experience');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          experiences: [...(sections[sectionIndex].content.experiences || []), newExperience]
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const deleteExperience = (id: string) => {
    // Update experiences state
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    setExperiences(updatedExperiences);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'experience');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          experiences: updatedExperiences
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'projects');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          projects: sections[sectionIndex].content.projects?.filter(project => project.id !== id) || []
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const deleteSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const deleteSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: 'New Certification',
      issuer: 'Issuing Organization',
      date: 'Date'
    };
    setCertifications([...certifications, newCertification]);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'certifications');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          certifications: [...(sections[sectionIndex].content.certifications || []), newCertification]
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const deleteCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'certifications');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          certifications: sections[sectionIndex].content.certifications?.filter(cert => cert.id !== id) || []
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  const updateCertification = (id: string, field: string, value: string) => {
    setCertifications(certifications.map(cert => {
      if (cert.id === id) {
        return {
          ...cert,
          [field]: value
        };
      }
      return cert;
    }));
  };


  // Update the updateExperience function to handle responsibilities
  const updateExperience = (id: string, updatedExperience: Experience) => {
    // Update experiences state
    const updatedExperiences = experiences.map(exp =>
      exp.id === id ? updatedExperience : exp
    );
    setExperiences(updatedExperiences);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'experience');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          experiences: updatedExperiences
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  // Update the updateProject function to handle section content
  const updateProject = (id: string, updatedProject: Project) => {
    // Update projects state
    const updatedProjects = projects.map(project =>
      project.id === id ? updatedProject : project
    );
    setProjects(updatedProjects);

    // Update section content
    const sectionIndex = sections.findIndex(section => section.type === 'projects');
    if (sectionIndex !== -1) {
      const updatedSection = {
        ...sections[sectionIndex],
        content: {
          ...sections[sectionIndex].content,
          projects: updatedProjects
        }
      };
      handleSectionUpdate(sectionIndex, updatedSection);
    }
  };

  // Update section title
  const updateSectionTitle = (index: number, newTitle: string) => {
    setSectionTitles(prev => ({
      ...prev,
      [sections[index].type]: newTitle
    }));
  };

  // Add section update and delete handlers
  const handleSectionUpdate = (index: number, updatedSection: ResumeSection) => {
    const newSections = [...sections];
    newSections[index] = updatedSection;
    setSections(newSections);
  };

  // Add function to add new social link
  const addSocialLink = (type: 'phone' | 'email' | 'linkedin' | 'github' | 'location') => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      type: type,
      value: ''
    };
    setSocialLinks([...socialLinks, newLink]);
  };

  // Update social link value
  const updateSocialLink = (id: string, value: string) => {
    setSocialLinks(socialLinks.map(link =>
      link.id === id ? { ...link, value } : link
    ));
  };

  // Listen for 'add-resume-header-title' event from ResumeSectionsWidget
  useEffect(() => {
    const handler = () => {
      setResumeData(prev => {
        // Only restore if title is empty
        if (!prev.title) {
          return { ...prev, title: "Integration Architect/AI & ML Engineer" };
        }
        return prev;
      });
    };
    window.addEventListener('add-resume-header-title', handler);
    return () => window.removeEventListener('add-resume-header-title', handler);
  }, []);

  useEffect(() => {
    if (resumeContentRef.current) {
      setResumeContentHeight(resumeContentRef.current.scrollHeight);
    }
  }, [sections, skills, experiences, educations, projects, certifications, socialLinks, resumeData, fontOptions]);

  return (
    <div className={`min-h-screen ${activeTheme === 'dark' ? 'dark' : ''} ${previewMode ? 'preview-mode' : ''}`}>
      {/* App Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">CVnly</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => generatePdf(resumeContentRef.current)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={() => setPreviewMode(true)}
                className="ml-2 px-4 py-2 border border-blue-400 text-blue-600 rounded-full bg-white hover:bg-blue-50 transition print:hidden"
              >
                Preview Resume
              </button>
              {previewMode && (
                <button
                  onClick={() => setPreviewMode(false)}
                  className="ml-2 px-4 py-2 border border-gray-400 text-gray-600 rounded-full bg-white hover:bg-gray-50 transition print:hidden"
                >
                  Exit Preview
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Resume content with A4 ruler and page markers */}
          <div className="col-span-8">
            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
              <A4Ruler heightPx={1123} unit="cm" showLabels={true} style={{ marginRight: 0 }} contentHeightPx={resumeContentHeight} />
              <div style={{ position: 'relative', flex: 1 }}>
                <div className={`bg-white rounded-lg shadow-lg p-8`} ref={resumeContentRef} style={{ position: 'relative' }}>
                  {/* Horizontal page break lines over resume content */}
                  {Array.from({ length: Math.floor(resumeContentHeight / 1123) }, (_, i) => (
                    <div
                      key={`resume-page-break-${i}`}
                      style={{
                        position: 'absolute',
                        top: (i + 1) * 1123 - 1,
                        left: 0,
                        width: '100%',
                        height: 2,
                        background: 'var(--line-color, #4299e1)',
                        opacity: 0.3,
                        zIndex: 10,
                        pointerEvents: 'none',
                      }}
                    />
                  ))}
                  <ResumeHeader
                    resumeData={resumeData}
                    setResumeData={previewMode ? (() => {}) : setResumeData}
                    socialLinks={socialLinks}
                    deleteSocialLink={previewMode ? (() => {}) : deleteSocialLink}
                    addSocialLink={previewMode ? (() => {}) : addSocialLink}
                    updateSocialLink={previewMode ? (() => {}) : updateSocialLink}
                    fontOptions={fontOptions}
                  />
                  {sections.map((section, index) => {
                    if (!section.visible) return null;

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
                            onTitleChange={previewMode ? (() => {}) : (newTitle => updateSectionTitle(index, newTitle))}
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
                            onTitleChange={previewMode ? (() => {}) : (newTitle => updateSectionTitle(index, newTitle))}
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
                            onTitleChange={previewMode ? (() => {}) : (newTitle => updateSectionTitle(index, newTitle))}
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
                            onTitleChange={previewMode ? (() => {}) : (newTitle => updateSectionTitle(index, newTitle))}
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
                            onTitleChange={previewMode ? (() => {}) : (newTitle => updateSectionTitle(index, newTitle))}
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
                            onTitleChange={previewMode ? (() => {}) : (newTitle => updateSectionTitle(index, newTitle))}
                            previewMode={previewMode}
                          />
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Hide sidebar controls in preview mode */}
          {!previewMode && (
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
                resumeHeaderTitle={resumeData.title}
              />
            </div>
          )}
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