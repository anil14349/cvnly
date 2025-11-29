import DownloadWithPayment from '../payment/DownloadWithPayment';
import { useResumeContext } from '../../contexts/ResumeContext';

interface AppHeaderProps {
  onDownload: () => void;
}

const AppHeader = ({ onDownload }: AppHeaderProps) => {
  const {
    resumeData,
    sections,
    skills,
    experiences,
    educations,
    projects,
    certifications
  } = useResumeContext();

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
            <DownloadWithPayment
              onDownload={onDownload}
              resumeData={{
                name: resumeData.name,
                title: resumeData.title,
                sections,
                skills,
                experiences,
                educations,
                projects,
                certifications
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

