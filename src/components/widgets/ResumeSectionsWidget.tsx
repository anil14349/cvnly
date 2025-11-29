import React from 'react';
import { ResumeSection, SocialLink } from '../../types/common';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Eye, EyeOff, GripVertical, Plus } from 'lucide-react';
import { useResumeContext } from '../../contexts/ResumeContext';
import {
  PANEL_STYLES,
  PANEL_CONTAINER_STYLES
} from './constants';

const ResumeSectionsWidget: React.FC = () => {
    const {
        sections,
        updateSections,
        socialLinks,
        addSocialLink,
        resumeData
    } = useResumeContext();
    
    const resumeHeaderTitle = resumeData?.title || '';
    
    const onSectionsChange = (newSections: ResumeSection[]) => {
        if (updateSections) {
            updateSections(newSections);
        }
    };
    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(sections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        onSectionsChange(items);
    };

    const toggleSectionVisibility = (sectionType: string) => {
        const updatedSections = sections.map((section) => {
            if (section.type === sectionType) {
                return { ...section, visible: !section.visible };
            }
            return section;
        });
        onSectionsChange(updatedSections);
    };

    const getSectionTitle = (type: string): string => {
        const titles: { [key: string]: string } = {
            summary: 'Professional Summary',
            skills: 'Skills',
            experience: 'Experience',
            education: 'Education',
            projects: 'Projects',
            certifications: 'Certifications',
            social: 'Social Links',
            title: 'Resume Header Title'
        };
        return titles[type] || type;
    };

    const getAvailableSocialLinks = () => {
        const allTypes: ('phone' | 'email' | 'linkedin' | 'github' | 'location')[] = ['phone', 'email', 'linkedin', 'github', 'location'];
        return allTypes.filter(type => !socialLinks.some(link => link.type === type));
    };

    // All possible resume sections
    const ALL_SECTIONS: { type: ResumeSection["type"], label: string, icon?: React.ReactNode }[] = [
      { type: 'summary', label: 'Professional Summary' },
      { type: 'skills', label: 'Skills' },
      { type: 'experience', label: 'Experience' },
      { type: 'education', label: 'Education' },
      { type: 'projects', label: 'Projects' },
      { type: 'certifications', label: 'Certifications' },
      { type: 'social', label: 'Social Links' },
      { type: 'title', label: 'Add Resume Header Title' },
    ];

    const activeSectionTypes = sections.map(s => s.type);
    const availableSections = ALL_SECTIONS.filter(sec => !activeSectionTypes.includes(sec.type));

    // Social Links: available only if social section is active
    const socialSectionActive = activeSectionTypes.includes('social');
    const availableSocialLinks = socialSectionActive ? getAvailableSocialLinks() : [];

    // Only show Resume Header Title if it's not already present in sections and resumeHeaderTitle is empty
    const showResumeHeaderTitleButton = !resumeHeaderTitle;

    return (
      <div className={PANEL_STYLES.container}>
        {/* --- Widget Header - Compact --- */}
        <div className="px-4 py-2.5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Resume Sections</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
            Manage sections
          </p>
        </div>

        {/* --- Content - Compact --- */}
        <div className="px-4 py-3 space-y-3">
          {/* --- Available Sections Pool - Compact --- */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Add Section</h3>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {availableSections.length === 0 && availableSocialLinks.length === 0 ? (
              <span className="text-xs text-gray-400">All added</span>
            ) : (
              <>
                {availableSections.filter(section => section.type !== 'title' || showResumeHeaderTitleButton).map(section => (
                  <button
                    key={section.type}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                    onClick={() => {
                      if (section.type === 'title') {
                        // Remove any lingering 'title' section
                        onSectionsChange(sections.filter(s => s.type !== 'title'));
                        if (typeof window !== 'undefined') {
                          window.dispatchEvent(new CustomEvent('add-resume-header-title'));
                        }
                      } else {
                        onSectionsChange([
                          ...sections,
                          {
                            type: section.type,
                            visible: true,
                            content: {}
                          }
                        ]);
                      }
                    }}
                  >
                    {/* Consistent "+" icon for all add buttons */}
                    {section.type === 'title' ? <Plus className="w-3 h-3" /> : section.icon}
                    {section.label}
                  </button>
                ))}
                {availableSocialLinks.map(type => (
                  <button
                    key={type}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                    onClick={() => addSocialLink(type)}
                  >
                    <Plus className="w-3 h-3" />
                    {type}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* --- Active Sections List - Compact --- */}
        <div>
          <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Current Sections</h3>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-1.5"
                >
                  {sections.map((section, index) => (
                    <Draggable
                      key={section.type}
                      draggableId={section.type}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center justify-between bg-white dark:bg-gray-900 p-2 rounded border ${
                            section.visible !== false ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'
                          } ${snapshot.isDragging ? 'shadow-lg' : 'shadow-sm'}`}
                        >
                          <div className="flex items-center gap-2">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="w-3.5 h-3.5 text-gray-400 cursor-grab" />
                            </div>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                              {getSectionTitle(section.type)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggleSectionVisibility(section.type)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                              title={section.visible !== false ? 'Hide section' : 'Show section'}
                            >
                              {section.visible !== false ? (
                                <Eye className="w-3.5 h-3.5 text-blue-500" />
                              ) : (
                                <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        </div>
      </div>
    );
};

export default ResumeSectionsWidget;