import React from 'react';
import { ResumeSection, SocialLink } from '../../types/common';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Eye, EyeOff, GripVertical, Plus } from 'lucide-react';
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
            social: 'Social Links'
        };
        return titles[type] || type;
    };

    const getAvailableSocialLinks = () => {
        const allTypes: ('phone' | 'email' | 'linkedin' | 'github' | 'location')[] = ['phone', 'email', 'linkedin', 'github', 'location'];
        return allTypes.filter(type => !socialLinks.some(link => link.type === type));
    };

    const socialSection = sections.find(section => section.type === 'social');
    const showSocialLinks = socialSection?.visible ?? false;

    return (
        <div className={PANEL_STYLES.container} style={sections && sections.length && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? PANEL_CONTAINER_STYLES.dark : PANEL_CONTAINER_STYLES.light}>
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
                                                onClick={() => toggleSectionVisibility(section.type)}
                                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
                                            >
                                                {section.visible ? (
                                                    <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                ) : (
                                                    <EyeOff className="w-4 h-4 text-gray-500 dark:text-gray-400" />
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

            {/* Social Links Management */}
            {showSocialLinks && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-2">Add Social Links</h3>
                    <div className="space-y-2">
                        {getAvailableSocialLinks().map((type) => (
                            <button
                                key={type}
                                onClick={() => addSocialLink(type)}
                                className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            >
                                <Plus className="w-4 h-4" />
                                Add {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeSectionsWidget; 