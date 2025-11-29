import React, { useEffect, useState } from 'react';
import { useResumeContext } from '../../contexts/ResumeContext';
import { calculateATSScore } from '../../utils/atsScoreCalculator';

// Widget Components
import ATSScoreWidgetFloating from '../widgets/ATSScoreWidgetFloating';
import QuickWinsWidget from '../widgets/QuickWinsWidget';
import TemplateSelector from '../widgets/TemplateSelector';
import FontControlPanelTabbed from '../widgets/FontControlPanelTabbed';
import ResumeSectionsWidget from '../widgets/ResumeSectionsWidget';
import ContextualTips from '../widgets/ContextualTips';

interface FloatingWidgetWrapperProps {
  widgetId: string;
}

const FloatingWidgetWrapper: React.FC<FloatingWidgetWrapperProps> = ({ widgetId }) => {
  const { 
    resumeData,
    sections,
    skills,
    experiences,
    educations,
    projects
  } = useResumeContext();

  const [atsData, setAtsData] = useState<ReturnType<typeof calculateATSScore> | null>(null);

  useEffect(() => {
    const data = {
      name: resumeData.name || '',
      title: resumeData.title || '',
      sections,
      skills,
      experiences,
      educations,
      projects
    };
    const result = calculateATSScore(data);
    setAtsData(result);
  }, [resumeData, sections, skills, experiences, educations, projects]);

  switch (widgetId) {
    case 'ats':
      return atsData ? (
        <ATSScoreWidgetFloating 
          resumeData={{
            name: resumeData.name || '',
            title: resumeData.title || '',
            sections,
            skills,
            experiences,
            educations,
            projects
          }}
        />
      ) : null;

    case 'quick-wins':
      return atsData ? (
        <QuickWinsWidget 
          score={atsData.score}
          breakdown={atsData.breakdown}
          hasExperience={experiences.length > 0}
          hasEducation={educations.length > 0}
          hasProjects={projects.length > 0}
        />
      ) : null;

    case 'template':
      return <TemplateSelector />;

    case 'appearance':
      return <FontControlPanelTabbed />;

    case 'sections':
      return <ResumeSectionsWidget />;

    case 'tips':
      return atsData ? (
        <ContextualTips 
          score={atsData.score}
          breakdown={atsData.breakdown}
        />
      ) : null;

    default:
      return null;
  }
};

export default FloatingWidgetWrapper;

