import React, { useEffect, useState } from 'react';
import { 
  ChartBarIcon, 
  SparklesIcon, 
  AdjustmentsHorizontalIcon,
  RectangleStackIcon,
  DocumentTextIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { useResumeContext } from '../../contexts/ResumeContext';
import { calculateATSScore } from '../../utils/atsScoreCalculator';

interface ToolbarItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  shortLabel: string;
  shortcut?: string;
}

interface FloatingToolbarProps {
  activePanel: string | null;
  onTogglePanel: (panelId: string) => void;
}

const toolbarItems: ToolbarItem[] = [
  { id: 'ats', icon: ChartBarIcon, label: 'ATS Score', shortLabel: 'ATS', shortcut: 'A' },
  { id: 'quick-wins', icon: SparklesIcon, label: 'Quick Wins', shortLabel: 'Tips', shortcut: 'Q' },
  { id: 'template', icon: DocumentTextIcon, label: 'Templates', shortLabel: 'Style', shortcut: 'T' },
  { id: 'appearance', icon: AdjustmentsHorizontalIcon, label: 'Appearance', shortLabel: 'Look', shortcut: 'F' },
  { id: 'sections', icon: RectangleStackIcon, label: 'Sections', shortLabel: 'Add', shortcut: 'S' },
  { id: 'tips', icon: LightBulbIcon, label: 'Tips & Help', shortLabel: 'Help', shortcut: 'H' },
];

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ activePanel, onTogglePanel }) => {
  const { 
    resumeData,
    sections,
    skills,
    experiences,
    educations,
    projects
  } = useResumeContext();
  
  const [atsScore, setAtsScore] = useState(85);

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
    setAtsScore(result.score);
  }, [resumeData, sections, skills, experiences, educations, projects]);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20';
    if (score >= 60) return 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20';
    return 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20';
  };
  
  return (
    <div className="floating-toolbar-with-labels">
      <div className="toolbar-items-labeled">
        {toolbarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;
          
          return (
            <button
              key={item.id}
              className={`toolbar-item-labeled ${isActive ? 'active' : ''}`}
              onClick={() => onTogglePanel(item.id)}
              title={`${item.label} ${item.shortcut ? `(${item.shortcut})` : ''}`}
              aria-label={item.label}
            >
              <Icon className="toolbar-icon-small" />
              <span className="toolbar-label">{item.shortLabel}</span>
              {isActive && <div className="active-indicator-labeled" />}
            </button>
          );
        })}
      </div>
      
      {/* Mini ATS Badge - Always visible */}
      <div className="mini-ats-badge-labeled">
        <span className={`badge-score-labeled bg-gradient-to-br ${getScoreBg(atsScore)} ${getScoreColor(atsScore)}`}>
          {atsScore}%
        </span>
      </div>
    </div>
  );
};

export default FloatingToolbar;
