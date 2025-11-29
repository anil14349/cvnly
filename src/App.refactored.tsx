import { useState, useRef, useEffect } from 'react';
import './index.css';
import './styles/index.css';

// Import context provider
import { ResumeProvider } from './contexts/ResumeProvider';

// Import new modular components
import AppHeader from './components/resume/AppHeader';
import ResumeContainer from './components/resume/ResumeContainer';
import ResumeSidebar from './components/resume/ResumeSidebar';

// Import hooks
import usePdfGeneration from './hooks/usePdfGeneration';

function App() {
  // Preview mode state
  const [previewMode, setPreviewMode] = useState(false);
  
  // PDF generation hook
  const { generatePdf } = usePdfGeneration();
  
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
      generatePdf(resumeContentRef.current);
    }
  };

  const handleResumeContentRefChange = (ref: HTMLDivElement | null) => {
    resumeContentRef.current = ref;
  };

  return (
    <ResumeProvider>
      <div className={`min-h-screen ${previewMode ? 'preview-mode' : ''}`}>
        {/* App Header */}
        <AppHeader 
          onDownload={handleDownload}
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
        />

        {/* Main content area */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Resume content */}
            <ResumeContainer 
              previewMode={previewMode}
              onResumeContentRefChange={handleResumeContentRefChange}
            />

            {/* Sidebar controls - hidden in preview mode */}
            {!previewMode && <ResumeSidebar />}
          </div>
        </div>

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
    </ResumeProvider>
  );
}

export default App;

