import ATSScoreWidget from '../widgets/ATSScoreWidget';
import FontControlPanel from '../widgets/FontControlPanel';
import LineBreakTool from '../widgets/LineBreakTool';
import ResumeSectionsWidget from '../widgets/ResumeSectionsWidget';
import { useResumeContext } from '../../contexts/ResumeContext';

const ResumeSidebar = () => {
  const {
    resumeData,
    sections,
    skills,
    experiences,
    educations,
    projects,
    fontOptions,
    updateFontOption,
    setSections,
    socialLinks,
    addSocialLink
  } = useResumeContext();

  return (
    <div className="col-span-4 space-y-6">
      <ATSScoreWidget
        resumeData={{
          name: resumeData.name,
          title: resumeData.title,
          sections,
          skills,
          experiences,
          educations,
          projects
        }}
      />
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
  );
};

export default ResumeSidebar;

