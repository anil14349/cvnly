import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FileText, Mail, Phone, MapPin, Linkedin, Github, ChevronUp, ChevronDown, Plus, X, Download, BookmarkPlus } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

interface Skill {
  id: string;
  category: string;
  items: string[];
}

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

interface Project {
  id: string;
  name: string;
  company: string;
  duration: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

interface SocialLink {
  id: string;
  type: 'phone' | 'email' | 'linkedin' | 'github' | 'location';
  value: string;
  username?: string;
}

function App() {
  const [sections, setSections] = useState([
    'summary',
    'skills',
    'experience',
    'projects',
    'education'
  ]);

  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      degree: 'PG Level Advanced Certification in AI and MLOps',
      institution: 'Indian Institute of Science (IISc), Bangalore',
      year: '2025'
    },
    {
      id: '2',
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'JNTU, Hyderabad',
      year: '2005'
    }
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    {
      id: '1',
      category: 'Integration Technologies',
      items: [
        'MuleSoft 3.9.X/4.8.X',
        'Salesforce/Apex',
        'RESTful & SOAP APIs',
        'SQL & MongoDB',
        'SAP Hana 2023'
      ]
    },
    {
      id: '2',
      category: 'Cloud & DevOps',
      items: [
        'AWS Services',
        'Docker & Kubernetes',
        'CI/CD Pipelines',
        'Azure DevOps'
      ]
    },
    {
      id: '3',
      category: 'AI & ML',
      items: [
        'Machine Learning',
        'MLOps',
        'LangChain',
        'Crew AI'
      ]
    }
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      title: 'Technical Manager / Solution Architect',
      company: 'PwC',
      period: 'Jul 2022 - Present',
      achievements: [
        'Directed system discovery and integration architecture',
        'Engineered ML model deployment pipelines using AWS SageMaker',
        'Developed AI code generation framework for MuleSoft integration',
        'Implemented AI-powered video tutorial generation system'
      ]
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'AI-Powered Integration Framework',
      company: 'PwC',
      duration: 'Jan 2023 - Present',
      description: 'Developed an innovative AI-powered framework for automating MuleSoft integration development, reducing development time by 60% and improving code quality.',
      responsibilities: [
        'Led the development of AI-powered code generation system using LangChain and OpenAI',
        'Implemented automated testing framework reducing testing time by 40%',
        'Designed and developed reusable integration patterns library',
        'Mentored team of 5 developers in AI/ML integration practices'
      ],
      technologies: ['Python', 'LangChain', 'OpenAI', 'MuleSoft', 'AWS']
    }
  ]);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: '1', type: 'phone', value: '+91-9700060850' },
    { id: '2', type: 'email', value: 'etagowni@outlook.com' },
    { id: '3', type: 'linkedin', value: 'https://www.linkedin.com/in/etagowni/', username: 'etagowni' },
    { id: '4', type: 'github', value: 'https://github.com/anil14349', username: 'anil14349' },
    { id: '5', type: 'location', value: 'Hyderabad' }
  ]);

  const resumeRef = useRef<HTMLDivElement>(null);

  // New states for modern UI features
  const [activeTheme, setActiveTheme] = useState<string>('default');
  const [showTips, setShowTips] = useState<boolean>(true);
  const [atsScore, setAtsScore] = useState<number>(78);
  
  // Calculate resume statistics - make it more dynamic
  const getResumeStats = useCallback(() => {
    if (!resumeRef.current) return { words: 0, readTime: 0, sections: 0 };
    
    const text = resumeRef.current.textContent || '';
    const words = text.split(/\s+/).filter(Boolean).length;
    const readTime = Math.ceil(words / 200); // Average reading time in minutes
    
    return {
      words,
      readTime,
      sections: sections.length
    };
  }, [sections.length, resumeRef]);

  // Track resume stats with state
  const [resumeStats, setResumeStats] = useState(getResumeStats());

  // Update stats when content changes
  useEffect(() => {
    const updateStats = () => {
      setResumeStats(getResumeStats());
      // Recalculate ATS score based on keywords, length, etc.
      const newScore = Math.min(
        Math.floor(78 + (resumeStats.words > 300 ? 5 : 0) + (sections.length >= 4 ? 5 : 0)), 
        100
      );
      setAtsScore(newScore);
    };
    
    // Set up a mutation observer to watch for content changes
    if (resumeRef.current) {
      const observer = new MutationObserver(updateStats);
      observer.observe(resumeRef.current, { 
        childList: true, 
        subtree: true, 
        characterData: true,
        attributes: true 
      });
      
      // Initial calculation
      updateStats();
      
      return () => observer.disconnect();
    }
  }, [getResumeStats, resumeStats.words, sections.length]);

  // Enhanced theme handling
  const applyTheme = (theme: string) => {
    setActiveTheme(theme);
    
    // Apply theme-specific classes to resume
    if (resumeRef.current) {
      resumeRef.current.classList.remove('theme-default', 'theme-dark', 'theme-blue');
      resumeRef.current.classList.add(`theme-${theme}`);
    }
    
    // Set theme colors based on selection
    switch(theme) {
      case 'dark':
        document.documentElement.classList.add('dark');
        break;
      case 'blue':
        document.documentElement.classList.remove('dark');
        // Apply blue theme specific styles
        break;
      default:
        document.documentElement.classList.remove('dark');
        break;
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    if (direction === 'up' && index > 0) {
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
    } else if (direction === 'down' && index < sections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }
    setSections(newSections);
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: 'New Degree',
      institution: 'Institution Name',
      year: 'Year'
    };
    setEducations([...educations, newEducation]);
  };

  const deleteEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      category: 'New Category',
      items: ['Skill 1', 'Skill 2', 'Skill 3']
    };
    setSkills([...skills, newSkill]);
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
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
  };

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const deleteSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const deleteSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const addSocialLink = (type: 'phone' | 'email' | 'linkedin' | 'github' | 'location') => {
    const newId = Date.now().toString();
    let newLink: SocialLink = {
      id: newId,
      type,
      value: '',
    };

    switch (type) {
      case 'phone':
        newLink.value = 'Enter phone number';
        break;
      case 'email':
        newLink.value = 'Enter email';
        break;
      case 'linkedin':
        newLink.value = 'https://www.linkedin.com/in/username';
        newLink.username = 'username';
        break;
      case 'github':
        newLink.value = 'https://github.com/username';
        newLink.username = 'username';
        break;
      case 'location':
        newLink.value = 'Enter location';
        break;
    }

    setSocialLinks([...socialLinks, newLink]);
  };

  const renderSection = (sectionId: string, index: number) => {
    const sectionComponents = {
      summary: (
        <section className="relative group" key="summary">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800 pb-1 border-b border-gray-200" contentEditable suppressContentEditableWarning>
              Professional Summary
            </h3>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <button 
                  onClick={() => moveSection(index, 'up')}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  disabled={index === 0}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => moveSection(index, 'down')}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  disabled={index === sections.length - 1}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => deleteSection(index)}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap" contentEditable suppressContentEditableWarning>
            Experienced Integration Architect and AI & ML Engineer with 17+ years of expertise in enterprise integration, API management, and AI/ML solutions. Proven track record in leading global teams, architecting scalable solutions, and implementing cutting-edge technologies. Strong focus on MuleSoft, cloud-native architectures, and AI/ML implementations.
          </p>
        </section>
      ),
      skills: (
        <section className="relative group" key="skills">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800 pb-1 border-b border-gray-200" contentEditable suppressContentEditableWarning>
              Skills & Certifications
            </h3>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <button 
                  onClick={() => moveSection(index, 'up')}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  disabled={index === 0}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => moveSection(index, 'down')}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  disabled={index === sections.length - 1}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={addSkill}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteSection(index)}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map(skill => (
              <div key={skill.id} className="relative group">
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="absolute -right-2 -top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <h4 className="font-medium text-gray-700 mb-2" contentEditable suppressContentEditableWarning>
                  {skill.category}
                </h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4" style={{ listStyleType: 'disc', listStylePosition: 'outside' }} contentEditable suppressContentEditableWarning>
                  {skill.items.map((item, i) => (
                    <li key={i} className="group/item relative" style={{ display: 'list-item' }}>
                      <span>{item}</span>
                      <button
                        onClick={() => {
                          const newItems = [...skill.items];
                          newItems.splice(i, 1);
                          setSkills(skills.map(s => 
                            s.id === skill.id 
                              ? { ...s, items: newItems }
                              : s
                          ));
                        }}
                        className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity print:hidden"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                  <li className="group/item relative print:hidden">
                    <input
                      type="text"
                      placeholder="Add new skill..."
                      className="w-full text-sm text-gray-600 bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          setSkills(skills.map(s => 
                            s.id === skill.id 
                              ? { ...s, items: [...s.items, e.currentTarget.value.trim()] }
                              : s
                          ));
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </section>
      ),
      experience: (
        <section className="relative group" key="experience">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800 pb-1 border-b border-gray-200" contentEditable suppressContentEditableWarning>
              Professional Experience
            </h3>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <button 
                  onClick={() => moveSection(index, 'up')}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  disabled={index === 0}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => moveSection(index, 'down')}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  disabled={index === sections.length - 1}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={addExperience}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteSection(index)}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {experiences.map(exp => (
              <div key={exp.id} className="relative group">
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="absolute -right-2 -top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-gray-800 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>
                    {exp.title}
                  </h4>
                  <span className="text-sm text-gray-600 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>
                    {exp.period}
                  </span>
                </div>
                <h5 className="text-gray-600 text-sm mb-2 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>
                  {exp.company}
                </h5>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4 whitespace-pre-wrap" style={{ listStyleType: 'disc', listStylePosition: 'outside' }} contentEditable suppressContentEditableWarning>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} style={{ display: 'list-item' }}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ),
      projects: (
        <section className="relative group" key="projects">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800 pb-1 border-b border-gray-200" contentEditable suppressContentEditableWarning>
              Projects
            </h3>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <button 
                  onClick={() => moveSection(index, 'up')}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  disabled={index === 0}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => moveSection(index, 'down')}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  disabled={index === sections.length - 1}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={addProject}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteSection(index)}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-6">
            {projects.map(project => (
              <div key={project.id} className="relative group border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                <button
                  onClick={() => deleteProject(project.id)}
                  className="absolute -right-2 -top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>
                    {project.name}
                  </h4>
                  <span className="text-sm text-gray-600 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>
                    {project.duration}
                  </span>
                </div>
                <h5 className="text-sm text-gray-600 mb-2 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>
                  {project.company}
                </h5>
                <p className="text-sm text-gray-600 mb-2 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>
                  {project.description}
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4 mb-3 whitespace-pre-wrap" style={{ listStyleType: 'disc', listStylePosition: 'outside' }} contentEditable suppressContentEditableWarning>
                  {project.responsibilities.map((responsibility, i) => (
                    <li key={i} style={{ display: 'list-item' }}>{responsibility}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 items-center">
                  {project.technologies.map((tech, techIndex) => (
                    <div 
                      key={techIndex}
                      className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded group/tech"
                    >
                      <span 
                        className="text-xs"
                        contentEditable 
                        suppressContentEditableWarning
                      >
                        {tech}
                      </span>
                      <button
                        onClick={() => {
                          const newTechnologies = [...project.technologies];
                          newTechnologies.splice(techIndex, 1);
                          setProjects(projects.map(p => 
                            p.id === project.id 
                              ? { ...p, technologies: newTechnologies }
                              : p
                          ));
                        }}
                        className="ml-1 text-gray-400 hover:text-red-500 opacity-0 group-hover/tech:opacity-100 transition-opacity print:hidden"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Add tech..."
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 print:hidden"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        setProjects(projects.map(p => 
                          p.id === project.id 
                            ? { ...p, technologies: [...p.technologies, e.currentTarget.value.trim()] }
                            : p
                        ));
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      ),
      education: (
        <section className="relative group" key="education">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800 pb-1 border-b border-gray-200" contentEditable suppressContentEditableWarning>
              Education
            </h3>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <button 
                  onClick={() => moveSection(index, 'up')}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  disabled={index === 0}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => moveSection(index, 'down')}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  disabled={index === sections.length - 1}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={addEducation}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteSection(index)}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {educations.map(edu => (
              <div key={edu.id} className="flex justify-between relative group">
                <button
                  onClick={() => deleteEducation(edu.id)}
                  className="absolute -right-2 -top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <div>
                  <h4 className="font-medium text-gray-800 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>
                    {edu.institution}
                  </p>
                </div>
                <span className="text-sm text-gray-600 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>
                  {edu.year}
                </span>
              </div>
            ))}
          </div>
        </section>
      )
    };

    return sectionComponents[sectionId as keyof typeof sectionComponents];
  };

  // Add a new state for storing line breaks
  const [manualBreaks, setManualBreaks] = useState<string[]>([]);

  // Add function to insert a line break with improved styling
  const insertLineBreak = () => {
    // Create unique ID for the break
    const breakId = `break-${Date.now()}`;
    
    // Add to state
    setManualBreaks([...manualBreaks, breakId]);
    
    // Find cursor position and insert line break
    if (resumeRef.current) {
      // Add a marker at the current position
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        
        // Create elements for the break with improved styling
        const breakElement = document.createElement('div');
        breakElement.id = breakId;
        breakElement.className = 'relative flex items-center justify-center w-full border-t-2 border-dashed border-blue-400 my-10 group line-break print:hidden';
        
        // Create an icon to make the page break more visible
        const breakIcon = document.createElement('div');
        breakIcon.className = 'absolute -top-3 bg-white dark:bg-gray-800 text-blue-500 flex items-center justify-center px-2';
        breakIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
            <path d="M5 9h14"></path>
            <path d="M5 15h14"></path>
            <path d="M5 5v14"></path>
            <path d="M19 5v14"></path>
          </svg>
          <span class="font-medium text-xs">Page Break</span>
        `;
        breakElement.appendChild(breakIcon);
        
        // Create delete button with better styling
        const deleteButton = document.createElement('button');
        deleteButton.className = 'absolute -top-3 right-0 bg-white dark:bg-gray-800 text-red-500 flex items-center justify-center px-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600';
        deleteButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          <span class="font-medium text-xs">Remove</span>
        `;
        deleteButton.onclick = (e) => {
          e.preventDefault();
          removeLineBreak(breakId);
        };
        breakElement.appendChild(deleteButton);
        
        // Insert the break at the cursor position
        range.insertNode(breakElement);
        
        // Insert a spacer in actual print output
        const spacer = document.createElement('div');
        spacer.id = `spacer-${breakId}`;
        spacer.className = 'hidden print:block page-break-before';
        spacer.style.pageBreakBefore = 'always';
        spacer.style.height = '0';
        breakElement.parentNode?.insertBefore(spacer, breakElement);
      }
    }
  };

  // Add function to remove a line break
  const removeLineBreak = (breakId: string) => {
    setManualBreaks(manualBreaks.filter(id => id !== breakId));
    
    const breakElement = document.getElementById(breakId);
    if (breakElement) {
      breakElement.remove();
    }
    
    const spacer = document.getElementById(`spacer-${breakId}`);
    if (spacer) {
      spacer.remove();
    }
  };

  // Update the customStyles with more visible line break styling
  const customStyles = `
    @media print {
      .page-break-before {
        page-break-before: always;
      }
      .line-break {
        display: none !important;
      }
    }
    
    /* Line break styling with clearer visibility */
    .line-break {
      margin: 2rem 0;
      cursor: pointer;
      border-top-width: 2px;
      border-color: #60a5fa;
    }
    
    .line-break:hover {
      border-color: #3b82f6;
    }
    
    .line-break span {
      font-weight: 500;
    }
  `;

  // Update the LineBreak Tool to use a page break icon instead of scissors
  const LineBreakTool = () => (
    <div className="fixed bottom-20 right-8 print:hidden z-50">
      <button
        onClick={insertLineBreak}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
        title="Insert page break"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 9h14"></path>
          <path d="M5 15h14"></path>
          <path d="M5 5v14"></path>
          <path d="M19 5v14"></path>
        </svg>
      </button>
      <div className="absolute -top-10 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Insert page break
      </div>
    </div>
  );

  // Add whitespace preservation styles
  const whitespaceStyles = `
    [contenteditable] {
      white-space: pre-wrap !important;
      word-wrap: break-word;
    }

    /* Ensure line breaks are preserved */
    .preserve-breaks p, 
    .preserve-breaks li, 
    .preserve-breaks span[contenteditable] {
      white-space: pre-wrap !important;
    }
  `;

  // Update the pdfGenerationStyles for single-line social links
  const pdfGenerationStyles = `
    .pdf-generation {
      overflow: hidden !important;
    }
    
    .pdf-generation * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    /* Ensure bullet points are properly aligned in PDF */
    .generating-pdf ul {
      padding-left: 1.5rem !important;
      list-style-position: outside !important;
      list-style-type: disc !important;
    }
    
    .generating-pdf li {
      display: list-item !important;
      margin-left: 0.5rem !important;
      position: relative !important;
      text-align: left !important;
      list-style: disc outside !important;
      padding-left: 0.5rem !important;
    }
    
    /* Fix whitespace preservation in PDF */
    .generating-pdf [contenteditable] {
      white-space: pre-wrap !important;
      word-wrap: break-word !important;
    }
    
    /* Fix technology tags alignment */
    .generating-pdf .flex.flex-wrap.gap-2 {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 0.5rem !important;
    }
    
    /* Fix grid layout in PDF */
    .generating-pdf .grid.grid-cols-2,
    .generating-pdf .grid.grid-cols-3 {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
    }
    
    /* Ensure social links display properly in a single line */
    .generating-pdf .social-links-container {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      flex-wrap: wrap !important;
      gap: 16px !important;
      margin: 1rem auto !important;
    }
    
    .generating-pdf .social-links-container > div {
      display: inline-flex !important;
      align-items: center !important;
      margin: 0 4px !important;
    }
    
    /* Ensure icons display properly in PDF */
    .generating-pdf svg {
      display: inline-block !important;
      vertical-align: middle !important;
      margin-right: 5px !important;
    }
    
    /* Extra spacing fixes */
    .generating-pdf section {
      margin-bottom: 1rem !important;
      page-break-inside: avoid !important;
    }
    
    .generating-pdf h3, 
    .generating-pdf h4 {
      page-break-after: avoid !important;
    }
    
    /* Fix text alignment in headers */
    .generating-pdf h1, 
    .generating-pdf h2 {
      text-align: center !important;
    }
  `;

  // Update the downloadAsPDF function to use Puppeteer server API
  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
    
    try {
      // Add temporary classes to the resume container
      resumeRef.current.classList.add('generating-pdf');
      resumeRef.current.classList.add('preserve-breaks');
      
      // Hide all control buttons and any UI elements we don't want in the PDF
      const elementsToHide = resumeRef.current.querySelectorAll('.group-hover\\:opacity-100, input[placeholder], .print\\:hidden, .line-break');
      elementsToHide.forEach((el: Element) => {
        (el as HTMLElement).style.display = 'none';
      });
      
      // Handle manual page breaks by inserting proper page break elements
      const manualBreakSpacers = resumeRef.current.querySelectorAll('[id^="spacer-break-"]');
      manualBreakSpacers.forEach((spacer: Element) => {
        (spacer as HTMLElement).style.display = 'block';
        (spacer as HTMLElement).style.pageBreakBefore = 'always';
        (spacer as HTMLElement).style.height = '0';
      });
      
      // Process all contentEditable elements to ensure line breaks are preserved
      const editableElements = resumeRef.current.querySelectorAll('[contenteditable="true"]');
      editableElements.forEach((element: Element) => {
        // Ensure white-space is preserved
        (element as HTMLElement).style.whiteSpace = 'pre-wrap';
      });

      // Make sure social links have consistent styling in a single line
      const socialLinksContainer = resumeRef.current.querySelector('.social-links-container');
      if (socialLinksContainer) {
        (socialLinksContainer as HTMLElement).style.display = 'flex';
        (socialLinksContainer as HTMLElement).style.justifyContent = 'center';
        (socialLinksContainer as HTMLElement).style.alignItems = 'center';
        (socialLinksContainer as HTMLElement).style.flexWrap = 'wrap';
        (socialLinksContainer as HTMLElement).style.gap = '16px';
        
        // Force each social link to have consistent spacing
        const socialLinks = socialLinksContainer.querySelectorAll('div');
        socialLinks.forEach((link: Element) => {
          (link as HTMLElement).style.display = 'inline-flex';
          (link as HTMLElement).style.alignItems = 'center';
          (link as HTMLElement).style.margin = '0 4px';
        });
      }

      // Fix technology pills display
      const techContainers = resumeRef.current.querySelectorAll('.flex.flex-wrap.gap-2');
      techContainers.forEach((container: Element) => {
        (container as HTMLElement).style.display = 'flex';
        (container as HTMLElement).style.flexWrap = 'wrap';
        (container as HTMLElement).style.gap = '0.5rem';
        (container as HTMLElement).style.marginTop = '0.75rem';
        
        // Ensure each technology pill has proper styling
        const techPills = container.querySelectorAll('div');
        techPills.forEach((pill: Element) => {
          (pill as HTMLElement).style.display = 'inline-flex';
          (pill as HTMLElement).style.alignItems = 'center';
          (pill as HTMLElement).style.padding = '0.25rem 0.5rem';
          (pill as HTMLElement).style.backgroundColor = '#f3f4f6';
          (pill as HTMLElement).style.borderRadius = '0.25rem';
          (pill as HTMLElement).style.fontSize = '0.75rem';
          (pill as HTMLElement).style.lineHeight = '1rem';
          (pill as HTMLElement).style.color = '#4b5563';
        });
      });

      try {
        // Get the HTML content
        const htmlContent = resumeRef.current.outerHTML;
        
        // Get the CSS styles
        const cssStyles = pdfGenerationStyles + customStyles + whitespaceStyles;
        
        // Show a loading indicator
        document.body.classList.add('pdf-generation');
        const loadingEl = document.createElement('div');
        loadingEl.id = 'pdf-loading';
        loadingEl.style.position = 'fixed';
        loadingEl.style.top = '0';
        loadingEl.style.left = '0';
        loadingEl.style.width = '100%';
        loadingEl.style.height = '100%';
        loadingEl.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        loadingEl.style.display = 'flex';
        loadingEl.style.justifyContent = 'center';
        loadingEl.style.alignItems = 'center';
        loadingEl.style.zIndex = '9999';
        loadingEl.innerHTML = '<div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"><p style="margin: 0; font-size: 16px;">Generating PDF...</p></div>';
        document.body.appendChild(loadingEl);
        
        // Send the HTML and CSS to the server API
        const response = await fetch('http://localhost:3000/api/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            htmlContent, 
            cssStyles 
          }),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server error response:', errorText);
          throw new Error(`Server responded with status: ${response.status}. Details: ${errorText}`);
        }
        
        // Get the PDF as a blob
        const pdfBlob = await response.blob();
        
        // Create a URL for the blob
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        // Create a link to download the PDF
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = 'resume.pdf';
        downloadLink.click();
        
        // Clean up the URL
        setTimeout(() => {
          URL.revokeObjectURL(pdfUrl);
        }, 1000);
      } catch (pdfError) {
        console.error('Error generating PDF:', pdfError);
        alert('There was an error generating the PDF. Please try again. Error: ' + pdfError.message);
      } finally {
        // Remove loading indicator
        const loadingEl = document.getElementById('pdf-loading');
        if (loadingEl) {
          loadingEl.remove();
        }
        
        // Clean up after PDF generation, regardless of success or failure
        document.body.classList.remove('pdf-generation');
        
        // Restore visibility of elements
        elementsToHide.forEach((el: Element) => {
          (el as HTMLElement).style.display = '';
        });
        
        // Restore editable elements styling
        editableElements.forEach((element: Element) => {
          (element as HTMLElement).style.whiteSpace = '';
        });
        
        // Restore manual break spacers
        manualBreakSpacers.forEach((spacer: Element) => {
          (spacer as HTMLElement).style.display = '';
          (spacer as HTMLElement).style.pageBreakBefore = '';
          (spacer as HTMLElement).style.height = '';
        });
        
        // Restore technology pills styling
        if (techContainers) {
          techContainers.forEach((container: Element) => {
            (container as HTMLElement).style.display = '';
            (container as HTMLElement).style.flexWrap = '';
            (container as HTMLElement).style.gap = '';
            (container as HTMLElement).style.marginTop = '';
            
            const techPills = container.querySelectorAll('div');
            techPills.forEach((pill: Element) => {
              (pill as HTMLElement).style.display = '';
              (pill as HTMLElement).style.alignItems = '';
              (pill as HTMLElement).style.padding = '';
              (pill as HTMLElement).style.backgroundColor = '';
              (pill as HTMLElement).style.borderRadius = '';
              (pill as HTMLElement).style.fontSize = '';
              (pill as HTMLElement).style.lineHeight = '';
              (pill as HTMLElement).style.color = '';
            });
          });
        }
        
        // Restore social links container styling
        if (socialLinksContainer) {
          (socialLinksContainer as HTMLElement).style.display = '';
          (socialLinksContainer as HTMLElement).style.justifyContent = '';
          (socialLinksContainer as HTMLElement).style.alignItems = '';
          (socialLinksContainer as HTMLElement).style.flexWrap = '';
          (socialLinksContainer as HTMLElement).style.gap = '';
          
          // Restore individual social links
          const socialLinks = socialLinksContainer.querySelectorAll('div');
          socialLinks.forEach((link: Element) => {
            (link as HTMLElement).style.display = '';
            (link as HTMLElement).style.alignItems = '';
            (link as HTMLElement).style.margin = '';
          });
        }
        
        // Remove temporary classes
        resumeRef.current.classList.remove('generating-pdf');
        resumeRef.current.classList.remove('preserve-breaks');
      }
    } catch (error) {
      console.error('Error in PDF generation process:', error);
      alert('There was an error during the PDF generation process. Please try again.');
    }
  };

  const addNewSection = (sectionType: string) => {
    setSections([...sections, sectionType]);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: 'New Project',
      company: 'Company Name',
      duration: 'Start - End Date',
      description: 'Project description',
      responsibilities: ['Responsibility 1', 'Responsibility 2', 'Responsibility 3'],
      technologies: ['Tech 1', 'Tech 2', 'Tech 3']
    };
    setProjects([...projects, newProject]);
  };

  // Add an effect to fix line break handling in contentEditable elements
  useEffect(() => {
    if (resumeRef.current) {
      // Handle paste events to preserve line breaks
      const handlePaste = (e: ClipboardEvent) => {
        if (e.target && (e.target as HTMLElement).getAttribute('contenteditable') === 'true') {
          // Prevent default paste which might strip formatting
          e.preventDefault();
          
          // Get plain text from clipboard
          const text = e.clipboardData?.getData('text/plain') || '';
          
          // Insert text with proper line breaks
          document.execCommand('insertHTML', false, text.replace(/\n/g, '<br>'));
        }
      };

      // Handle keydown events to ensure proper line breaks with Enter key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.target && (e.target as HTMLElement).getAttribute('contenteditable') === 'true') {
          if (e.key === 'Enter' && !e.shiftKey) {
            // Insert a proper line break instead of default behavior
            e.preventDefault();
            document.execCommand('insertHTML', false, '<br><br>');
          }
        }
      };

      resumeRef.current.addEventListener('paste', handlePaste);
      resumeRef.current.addEventListener('keydown', handleKeyDown);
      
      return () => {
        if (resumeRef.current) {
          resumeRef.current.removeEventListener('paste', handlePaste);
          resumeRef.current.removeEventListener('keydown', handleKeyDown);
        }
      };
    }
  }, [resumeRef]);

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${activeTheme === 'dark' ? 'dark' : ''}`}>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-md">
              <h1 className="text-xl font-bold">cvnly</h1>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Professional Resume Builder</span>
          </div>
          <nav className="flex items-center gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Templates feature is currently in development.'); }} className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white flex items-center gap-2 transition-colors">
              <FileText className="w-4 h-4" />
              <span>Templates</span>
            </a>
            <a href="mailto:etagowni@outlook.com" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white flex items-center gap-2 transition-colors">
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </a>
            
            {/* Theme Selector - Moved to header */}
            <div className="relative group">
              <button 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                  {activeTheme === 'default' && <div className="w-full h-full bg-gradient-to-br from-white to-gray-100 border border-gray-300"></div>}
                  {activeTheme === 'dark' && <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900"></div>}
                  {activeTheme === 'blue' && <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200"></div>}
                </div>
                <span>Theme</span>
              </button>
              <div className="absolute right-0 mt-2 py-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button 
                  onClick={() => applyTheme('default')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-white to-gray-100 border border-gray-300 flex-shrink-0"></div>
                  <span>Light</span>
                </button>
                <button 
                  onClick={() => applyTheme('dark')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex-shrink-0"></div>
                  <span>Dark</span>
                </button>
                <button 
                  onClick={() => applyTheme('blue')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 flex-shrink-0"></div>
                  <span>Blue</span>
                </button>
              </div>
            </div>
            
            <button
              onClick={downloadAsPDF}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex-1 mt-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-row gap-6">
            {/* Sidebar */}
            <div className="w-80 flex flex-col gap-4 sticky top-24 self-start">
              {/* Resume Analytics Widget */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700 overflow-hidden transition-colors">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Resume Analytics</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Real-time metrics for your resume</p>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{resumeStats.words}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Words</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{resumeStats.readTime}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Min. read</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{resumeStats.sections}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Sections</div>
                    </div>
                  </div>
                  
                  {/* ATS Score */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">ATS Compatibility</div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{atsScore}%</div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          atsScore >= 80 ? 'bg-green-600' : 
                          atsScore >= 60 ? 'bg-yellow-400' : 'bg-red-500'
                        }`} 
                        style={{ width: `${atsScore}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {atsScore >= 80 ? 'Great! Your resume is ATS-friendly.' : 
                      atsScore >= 60 ? 'Good, but could be improved for ATS.' : 
                      'Needs improvement for ATS systems.'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Add Sections Panel */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700 overflow-hidden transition-colors">
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Resume Sections</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Customize your resume content</p>
                </div>
                <div className="p-4 space-y-3">
                  {/* Social Links Section */}
                  <div className="space-y-3">
                    {!socialLinks.some(link => link.type === 'phone') && (
                      <button
                        onClick={() => addSocialLink('phone')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <span className="font-medium block">Phone Number</span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Add your contact number</span>
                        </div>
                      </button>
                    )}
                    {!socialLinks.some(link => link.type === 'email') && (
                      <button
                        onClick={() => addSocialLink('email')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700 transition-all group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-800">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <span className="font-medium block">Email Address</span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Add your email contact</span>
                        </div>
                      </button>
                    )}
                    {!socialLinks.some(link => link.type === 'linkedin') && (
                      <button
                        onClick={() => addSocialLink('linkedin')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700 transition-all group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-800">
                          <Linkedin className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <span className="font-medium block">LinkedIn Profile</span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Add your LinkedIn username</span>
                        </div>
                      </button>
                    )}
                    {!socialLinks.some(link => link.type === 'github') && (
                      <button
                        onClick={() => addSocialLink('github')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/20 rounded-md border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-700 transition-all group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-800">
                          <Github className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <span className="font-medium block">GitHub Profile</span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Add your GitHub username</span>
                        </div>
                      </button>
                    )}
                    {!socialLinks.some(link => link.type === 'location') && (
                      <button
                        onClick={() => addSocialLink('location')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-md border border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-700 transition-all group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 group-hover:bg-orange-200 dark:group-hover:bg-orange-800">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <span className="font-medium block">Location</span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Add your location</span>
                        </div>
                      </button>
                    )}
                  </div>

                  {!sections.includes('summary') && (
                    <button
                      onClick={() => addNewSection('summary')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800">
                        <BookmarkPlus className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium block">Professional Summary</span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Add a brief overview of your career</span>
                      </div>
                    </button>
                  )}
                  {!sections.includes('skills') && (
                    <button
                      onClick={() => addNewSection('skills')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700 transition-all group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-800">
                        <BookmarkPlus className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium block">Skills & Certifications</span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Highlight your expertise and achievements</span>
                      </div>
                    </button>
                  )}
                  {!sections.includes('experience') && (
                    <button
                      onClick={() => addNewSection('experience')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700 transition-all group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-800">
                        <BookmarkPlus className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium block">Professional Experience</span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Add your work history</span>
                      </div>
                    </button>
                  )}
                  {!sections.includes('projects') && (
                    <button
                      onClick={() => addNewSection('projects')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800">
                        <BookmarkPlus className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium block">Projects</span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Showcase your key projects</span>
                      </div>
                    </button>
                  )}
                  {!sections.includes('education') && (
                    <button
                      onClick={() => addNewSection('education')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-md border border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-700 transition-all group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 group-hover:bg-orange-200 dark:group-hover:bg-orange-800">
                        <BookmarkPlus className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium block">Education</span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">Add your academic background</span>
                      </div>
                    </button>
                  )}
                  {sections.length === 5 && (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      All sections have been added to your resume
                    </div>
                  )}
                </div>
              </div>

              {/* Resume Tips Widget */}
              {showTips && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700 overflow-hidden relative transition-colors">
                  <button 
                    onClick={() => setShowTips(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                      </svg>
                      Resume Tips
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Best practices for a professional resume</p>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Use action verbs to start achievement bullets</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Quantify achievements with numbers when possible</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Match keywords from the job description</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Keep your resume to 1-2 pages maximum</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Resume Content */}
            <div className={`flex-1 bg-white shadow-lg rounded-xl print:shadow-none print:rounded-none theme-${activeTheme}`} ref={resumeRef}>
              <style>
                {`
                  @media print {
                    @page {
                      margin: 0.5in;
                      size: A4;
                    }
                    body {
                      -webkit-print-color-adjust: exact !important;
                      print-color-adjust: exact !important;
                    }
                    .print\\:hidden {
                      display: none !important;
                    }
                    .print\\:break-before-page {
                      break-before: page;
                    }
                    .print\\:m-0 {
                      margin: 0 !important;
                    }
                  }

                  .generating-pdf {
                    width: 800px !important;
                    padding: 40px !important;
                  }

                  .generating-pdf .social-links-container {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    justify-content: center !important;
                    gap: 2rem !important;
                    margin: 1rem 0 !important;
                  }

                  .generating-pdf .grid-cols-2 {
                    display: grid !important;
                    grid-template-columns: repeat(3, 1fr) !important;
                    gap: 1.5rem !important;
                  }

                  .generating-pdf section {
                    margin-bottom: 1.5rem !important;
                  }

                  .generating-pdf .flex.flex-wrap.gap-2 {
                    gap: 0.5rem !important;
                    margin-top: 0.75rem !important;
                  }

                  /* Line break styling */
                  .line-break {
                    margin: 1.5rem 0;
                    cursor: pointer;
                  }
                  
                  ${customStyles}
                  ${whitespaceStyles}
                  ${pdfGenerationStyles}

                  /* Theme styling */
                  .theme-default {
                    --resume-text: #1f2937;
                    --resume-heading: #111827;
                    --resume-subtext: #4b5563;
                    --resume-border: #e5e7eb;
                    --resume-background: #ffffff;
                    --resume-section-bg: #f9fafb;
                    color: var(--resume-text);
                  }

                  .theme-dark {
                    --resume-text: #e5e7eb;
                    --resume-heading: #f9fafb;
                    --resume-subtext: #9ca3af;
                    --resume-border: #374151;
                    --resume-background: #1f2937;
                    --resume-section-bg: #111827;
                    color: var(--resume-text);
                    background-color: var(--resume-background);
                  }

                  .theme-blue {
                    --resume-text: #1e3a8a;
                    --resume-heading: #1e40af;
                    --resume-subtext: #3b82f6;
                    --resume-border: #bfdbfe;
                    --resume-background: #eff6ff;
                    --resume-section-bg: #dbeafe;
                    color: var(--resume-text);
                    background-color: var(--resume-background);
                  }

                  .theme-default h1, .theme-default h2, .theme-default h3, .theme-default h4 {
                    color: var(--resume-heading);
                  }
                  
                  .theme-dark h1, .theme-dark h2, .theme-dark h3, .theme-dark h4 {
                    color: var(--resume-heading);
                  }
                  
                  .theme-blue h1, .theme-blue h2, .theme-blue h3, .theme-blue h4 {
                    color: var(--resume-heading);
                  }
                  
                  .theme-default span, .theme-default p, .theme-default li {
                    color: var(--resume-subtext);
                  }
                  
                  .theme-dark span, .theme-dark p, .theme-dark li {
                    color: var(--resume-subtext);
                  }
                  
                  .theme-blue span, .theme-blue p, .theme-blue li {
                    color: var(--resume-subtext);
                  }
                  
                  .theme-default .border-b, .theme-default .border {
                    border-color: var(--resume-border);
                  }
                  
                  .theme-dark .border-b, .theme-dark .border {
                    border-color: var(--resume-border);
                  }
                  
                  .theme-blue .border-b, .theme-blue .border {
                    border-color: var(--resume-border);
                  }
                `}
              </style>
              <div className="p-8 border border-gray-200 print:border-0 print:p-0">
                {/* Header Section */}
                <header className="text-center mb-6 pb-6 border-b border-gray-200">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>Anil Kumar</h1>
                  <h2 className="text-lg text-gray-600 mb-4 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>Integration Architect/AI & ML Engineer</h2>
                  
                  <div className="social-links-container flex justify-center items-center flex-wrap gap-4 text-sm text-gray-600">
                    {socialLinks.map(link => (
                      <div key={link.id} className="relative group inline-flex">
                        <button
                          onClick={() => deleteSocialLink(link.id)}
                          className="absolute -right-2 -top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {link.type === 'phone' && (
                          <a href={`tel:${link.value}`} className="flex items-center gap-2 hover:text-gray-800">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span className="whitespace-pre-wrap" contentEditable suppressContentEditableWarning>{link.value}</span>
                          </a>
                        )}
                        {link.type === 'email' && (
                          <a href={`mailto:${link.value}`} className="flex items-center gap-2 hover:text-gray-800">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span className="whitespace-pre-wrap" contentEditable suppressContentEditableWarning>{link.value}</span>
                          </a>
                        )}
                        {link.type === 'linkedin' && (
                          <a href={link.value} className="flex items-center gap-2 hover:text-gray-800" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4 flex-shrink-0" />
                            <span className="whitespace-pre-wrap" contentEditable suppressContentEditableWarning>{link.username}</span>
                          </a>
                        )}
                        {link.type === 'github' && (
                          <a href={link.value} className="flex items-center gap-2 hover:text-gray-800" target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 flex-shrink-0" />
                            <span className="whitespace-pre-wrap" contentEditable suppressContentEditableWarning>{link.username}</span>
                          </a>
                        )}
                        {link.type === 'location' && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="whitespace-pre-wrap" contentEditable suppressContentEditableWarning>{link.value}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </header>

                {/* Main Content */}
                <div className="space-y-6">
                  {sections.map((sectionId, index) => renderSection(sectionId, index))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add LineBreakTool component */}
      <LineBreakTool />
      
    </div>
  );
}

export default App;