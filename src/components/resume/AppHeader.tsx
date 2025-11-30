import { Download, FileDown, Loader2 } from 'lucide-react';
import { useResumeContext } from '../../contexts/ResumeContext';

interface AppHeaderProps {
  onDownload: () => void;
  isGenerating?: boolean;
}

const AppHeader = ({ onDownload, isGenerating = false }: AppHeaderProps) => {
  const { resumeData } = useResumeContext();

  return (
    <header className="app-header-enhanced sticky top-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              CVnly
            </h1>
            <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400 font-medium">
              Professional Resume Builder
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Download PDF Button */}
            <button
              onClick={onDownload}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg ${
                isGenerating
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
