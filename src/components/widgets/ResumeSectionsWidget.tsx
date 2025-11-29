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
        setSections,
        socialLinks,
        addSocialLink,
        resumeData
    } = useResumeContext();
    
    const resumeHeaderTitle = resumeData?.title || '';
    
    const onSectionsChange = (newSections: ResumeSection[]) => {
        setSections(newSections);
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
                const newVisible = section.visible === false ? true : false;
                return { ...section, visible: newVisible };
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
      <div className="p-5">
        {/* NO HEADER - Panel already shows "Resume Sections" */}
        
        <div className="space-y-4">
          {/* Add Section */}
          <div>
            <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-3">Add Section</h3>
          <div className="flex flex-wrap gap-2">
            {availableSections.length === 0 && availableSocialLinks.length === 0 ? (
              <span className="text-xs text-gray-500 dark:text-gray-400 italic">All sections added</span>
            ) : (
              <>
                {availableSections.filter(section => section.type !== 'title' || showResumeHeaderTitleButton).map(section => (
                  <button
                    key={section.type}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm"
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
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm capitalize"
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

        {/* Current Sections List */}
        <div>
          <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-3">Current Sections</h3>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
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
                          className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                            section.visible !== false 
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-600' 
                              : 'border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 opacity-60'
                          } ${snapshot.isDragging ? 'shadow-xl scale-105' : 'shadow-sm hover:shadow-md'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                              <GripVertical className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            </div>
                            <span className={`text-sm font-semibold ${
                              section.visible !== false 
                                ? 'text-gray-900 dark:text-white' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {getSectionTitle(section.type)}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSectionVisibility(section.type);
                            }}
                            className="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors"
                            title={section.visible !== false ? 'Hide section' : 'Show section'}
                          >
                            {section.visible !== false ? (
                              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            )}
                          </button>
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