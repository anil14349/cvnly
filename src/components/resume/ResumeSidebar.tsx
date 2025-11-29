import { useEffect, useState } from 'react';
import ATSScoreWidget from '../widgets/ATSScoreWidget';
import QuickWinsWidget from '../widgets/QuickWinsWidget';
import FontControlPanelTabbed from '../widgets/FontControlPanelTabbed';
import ProgressTracker from '../widgets/ProgressTracker';
import ContextualTips from '../widgets/ContextualTips';
import LineBreakTool from '../widgets/LineBreakTool';
import ResumeSectionsWidget from '../widgets/ResumeSectionsWidget';
import TemplateSelector from '../widgets/TemplateSelector';
import { useResumeContext } from '../../contexts/ResumeContext';
import { calculateATSScore } from '../../utils/atsScoreCalculator';

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
    addSocialLink,
    selectedTemplate,
    updateTemplate
  } = useResumeContext();

  const [atsScore, setAtsScore] = useState(0);
  const [atsBreakdown, setAtsBreakdown] = useState({
    keywords: 0,
    format: 0,
    sections: 0,
    length: 0,
    readability: 0
  });

  useEffect(() => {
    const result = calculateATSScore({
      name: resumeData.name,
      title: resumeData.title,
      sections,
      skills,
      experiences,
      educations,
      projects
    });
    setAtsScore(result.score);
    setAtsBreakdown(result.breakdown);
  }, [resumeData, sections, skills, experiences, educations, projects]);

  return (
    <div className="col-span-4">
      <div className="space-y-4">
        {/* Template Selector */}
        <div className="widget-container">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateChange={updateTemplate}
          />
        </div>

        {/* Primary: ATS Score Widget */}
        <div className="widget-container">
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
        </div>

        {/* Quick Wins Widget - Show if score < 80 */}
        {atsScore < 80 && (
          <div className="widget-container" data-quick-wins>
            <QuickWinsWidget
              score={atsScore}
              breakdown={atsBreakdown}
              hasExperience={experiences.length > 0}
              hasEducation={educations.length > 0}
              hasProjects={projects.length > 0}
            />
          </div>
        )}

        {/* Progress Tracker - Visual completion indicator */}
        <div className="widget-container">
          <ProgressTracker
            hasName={!!resumeData.name}
            hasTitle={!!resumeData.title}
            hasExperience={experiences.length > 0}
            hasEducation={educations.length > 0}
            hasSkills={skills.length > 0}
            hasProjects={projects.length > 0}
          />
        </div>

        {/* Contextual Tips - Smart suggestions based on score */}
        {atsScore < 85 && (
          <div className="widget-container">
            <ContextualTips score={atsScore} breakdown={atsBreakdown} />
          </div>
        )}

        {/* Appearance Controls - Tabbed Interface */}
        <div className="widget-container">
          <FontControlPanelTabbed
            fontOptions={fontOptions}
            updateFontOption={updateFontOption}
          />
        </div>

        {/* Resume Sections Management */}
        <div className="widget-container">
          <ResumeSectionsWidget
            sections={sections}
            onSectionsChange={setSections}
            socialLinks={socialLinks}
            addSocialLink={addSocialLink}
            resumeHeaderTitle={resumeData.title}
          />
        </div>

        {/* Line Break Tool */}
        <div className="widget-container">
          <LineBreakTool
            fontOptions={fontOptions}
            onFontOptionChange={updateFontOption}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeSidebar;

