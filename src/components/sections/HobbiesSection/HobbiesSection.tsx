import React from 'react';
import { Plus } from 'lucide-react';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import SectionControls from '../../common/SectionControls';
import { HobbiesSectionProps, Hobby } from '../../../types/hobby';
import HobbyItem from './HobbyItem';

const HobbiesSection: React.FC<HobbiesSectionProps> = ({
    index,
    moveSection,
    deleteSection,
    sectionsLength,
    fontOptions,
    hobbies,
    addHobby,
    deleteHobby,
    updateHobby = () => { },
    title = "Hobbies & Interests",
    onTitleChange
}) => {
    const handleUpdateHobby = (id: string, updates: Partial<Hobby>) => {
        const hobbyToUpdate = hobbies.find(hobby => hobby.id === id);
        if (hobbyToUpdate) {
            updateHobby(id, { ...hobbyToUpdate, ...updates });
        }
    };

    return (
        <div className="mt-2">
            <SectionHeaderLine
                title={title}
                fontOptions={fontOptions}
                onTitleChange={onTitleChange}
                controls={
                    <SectionControls
                        index={index}
                        moveSection={moveSection}
                        deleteSection={deleteSection}
                        sectionsLength={sectionsLength}
                    />
                }
            />

            <div className="space-y-2">
                {hobbies.map((hobby) => (
                    <HobbyItem
                        key={hobby.id}
                        hobby={hobby}
                        fontOptions={fontOptions}
                        onUpdate={(updates) => handleUpdateHobby(hobby.id, updates)}
                        onDelete={() => deleteHobby(hobby.id)}
                    />
                ))}
                <button
                    onClick={addHobby}
                    className="w-full flex items-center justify-center gap-2 p-2 text-[var(--text-secondary)] hover:text-[var(--accent-color)] border border-dashed border-[var(--border-color)] rounded-lg hover:border-[var(--accent-color)] transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Hobby
                </button>
            </div>
        </div>
    );
};

export default HobbiesSection; 