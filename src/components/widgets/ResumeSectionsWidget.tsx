import React from 'react';
import { ResumeSection, SocialLink } from '../../types/common';
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { EyeOff, GripVertical, Plus } from 'lucide-react';
import {
  PANEL_STYLES,
  PANEL_CONTAINER_STYLES
} from './constants';

interface ResumeSectionsWidgetProps {
    sections: ResumeSection[];
    onSectionsChange: (sections: ResumeSection[]) => void;
    socialLinks: SocialLink[];
    addSocialLink: (type: 'phone' | 'email' | 'linkedin' | 'github' | 'location') => void;
}

const ResumeSectionsWidget: React.FC<ResumeSectionsWidgetProps> = ({
    sections,
    onSectionsChange,
    socialLinks,
    addSocialLink,
}) => {
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(sections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        onSectionsChange(items);
    };

    const getSectionTitle = (type: string): string => {
        const titles: { [key: string]: string } = {
            summary: 'Professional Summary',
            skills: 'Skills',
            experience: 'Experience',
            education: 'Education',
            projects: 'Projects',
            certifications: 'Certifications',
            social: 'Social Links'
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
    ];

    const activeSectionTypes = sections.map(s => s.type);
    const availableSections = ALL_SECTIONS.filter(sec => !activeSectionTypes.includes(sec.type));

    // Social Links: available only if social section is active
    const socialSectionActive = activeSectionTypes.includes('social');
    const availableSocialLinks = socialSectionActive ? getAvailableSocialLinks() : [];

    return (
      <div className={PANEL_STYLES.container} style={sections && sections.length && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? PANEL_CONTAINER_STYLES.dark : PANEL_CONTAINER_STYLES.light}>
        {/* --- Available Sections Pool (including Social Links if active) --- */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">Add Section</h3>
          <div className="flex flex-wrap gap-2">
            {availableSections.length === 0 && availableSocialLinks.length === 0 ? (
              <span className="text-xs text-gray-400">All sections are added</span>
            ) : (
              <>
                {availableSections.map((sec) => (
                  <button
                    key={sec.type}
                    className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                    onClick={() => {
                      // Add the section to the end of the list, marked as visible
                      onSectionsChange([...sections, { type: sec.type, visible: true, content: {} }]);
                    }}
                  >
                    {sec.icon}
                    {sec.label}
                  </button>
                ))}
                {availableSocialLinks.map((type) => (
                  <button
                    key={type}
                    onClick={() => addSocialLink(type)}
                    className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900 transition"
                  >
                    <Plus className="w-4 h-4" />
                    Add {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* --- Active Sections List (Draggable) --- */}
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
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center justify-between bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="w-4 h-4 text-gray-400" />
                          </div>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                            {getSectionTitle(section.type)}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            // Remove from active list (appears in pool)
                            onSectionsChange(sections.filter(s => s.type !== section.type));
                          }}
                          className="p-1 hover:bg-red-50 dark:hover:bg-red-900 rounded border border-transparent focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800"
                          title="Remove section"
                        >
                          <EyeOff className="w-4 h-4 text-red-400" />
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
    );
};

export default ResumeSectionsWidget;