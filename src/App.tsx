import { useState, useRef, useEffect } from 'react';
import './index.css';
import './styles/index.css';

// Import context provider
import { ResumeProvider } from './contexts/ResumeProvider';
import { useResumeContext } from './contexts/ResumeContext';

// Import new modular components
import AppHeader from './components/resume/AppHeader';
import ResumeContainer from './components/resume/ResumeContainer';

// Import floating UI components
import FloatingToolbar from './components/floating/FloatingToolbar';
import FloatingPanel from './components/floating/FloatingPanel';
import FloatingWidgetWrapper from './components/floating/FloatingWidgets';

// Import hooks
import usePdfGeneration from './hooks/usePdfGeneration';
import useFloatingPanels from './hooks/useFloatingPanels';

function AppContent() {
  // PDF generation hook
  const { generatePdf } = usePdfGeneration();
  
  // Floating panels hook
  const { activePanel, togglePanel, closePanel } = useFloatingPanels();
  
  // Get font options and data from context
  const { 
    fontOptions, 
    resumeData
  } = useResumeContext();
  
  // Ref to track resume content for PDF generation
  const resumeContentRef = useRef<HTMLDivElement | null>(null);

  // Listen for 'add-resume-header-title' event from ResumeSectionsWidget
  useEffect(() => {
    const handler = () => {
      // This event is now handled within the context
    };
    window.addEventListener('add-resume-header-title', handler);
    return () => window.removeEventListener('add-resume-header-title', handler);
  }, []);

  const handleDownload = () => {
    if (resumeContentRef.current) {
      // Pass fontOptions to generatePdf for proper CSS rendering in PDF
      generatePdf(resumeContentRef.current, {
        filename: `${resumeData.name?.replace(/\s+/g, '_') || 'resume'}.pdf`,
        fontOptions: fontOptions
      });
    }
  };

  const handleResumeContentRefChange = (ref: HTMLDivElement | null) => {
    resumeContentRef.current = ref;
  };

  return (
    <div className="min-h-screen app-container">
      {/* App Header */}
      <AppHeader 
        onDownload={handleDownload}
      />

      {/* Main content area - Full width for resume */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center">
          {/* Resume content - Full width */}
          <div className="w-full max-w-[8.5in]">
            <ResumeContainer 
              previewMode={false}
              onResumeContentRefChange={handleResumeContentRefChange}
            />
          </div>
        </div>
      </div>
      
      {/* Floating Toolbar */}
      <FloatingToolbar 
        activePanel={activePanel}
        onTogglePanel={togglePanel}
      />
      
      {/* Floating Panels */}
      {['ats', 'quick-wins', 'template', 'appearance', 'sections', 'tips'].map((id) => {
        const panelConfigs = {
          'ats': { title: 'ATS Score', width: 400, height: undefined },
          'quick-wins': { title: 'Quick Wins', width: 380, height: undefined },
          'template': { title: 'Templates', width: 380, height: undefined },
          'appearance': { title: 'Appearance', width: 420, height: 600 },
          'sections': { title: 'Resume Sections', width: 380, height: undefined },
          'tips': { title: 'Tips & Help', width: 380, height: undefined },
        };
        
        const config = panelConfigs[id as keyof typeof panelConfigs];
        
        return (
          <FloatingPanel
            key={id}
            id={id}
            title={config.title}
            isOpen={activePanel === id}
            onClose={closePanel}
            defaultPosition={{ x: window.innerWidth - (config.width + 20), y: 100 + (20 * Object.keys(panelConfigs).indexOf(id)) }}
            width={config.width}
            height={config.height}
          >
            <FloatingWidgetWrapper widgetId={id} />
          </FloatingPanel>
        );
      })}

      {/* Theme colors */}
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

function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;

