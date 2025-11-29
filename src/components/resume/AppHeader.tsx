import DownloadWithPayment from '../payment/DownloadWithPayment';
import { useResumeContext } from '../../contexts/ResumeContext';

interface AppHeaderProps {
  onDownload: () => void;
  previewMode: boolean;
  setPreviewMode: (mode: boolean) => void;
}

const AppHeader = ({ onDownload, previewMode, setPreviewMode }: AppHeaderProps) => {
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
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">CVnly</h1>
          </div>
          <div className="flex items-center gap-4">
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
  );
};

export default AppHeader;

