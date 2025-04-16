import React from 'react';
import { Plus } from 'lucide-react';
import SectionHeaderLine from '../../common/SectionHeaderLine';
import SectionControls from '../../common/SectionControls';
import { AchievementsSectionProps, Achievement } from '../../../types/achievement';
import AchievementItem from './AchievementItem';

const AchievementsSection: React.FC<AchievementsSectionProps> = ({
    index,
    moveSection,
    deleteSection,
    sectionsLength,
    fontOptions,
    achievements,
    addAchievement,
    deleteAchievement,
    updateAchievement = () => { },
    title = "Achievements",
    onTitleChange
}) => {
    const handleUpdateAchievement = (id: string, updates: Partial<Achievement>) => {
        const achievementToUpdate = achievements.find(achievement => achievement.id === id);
        if (achievementToUpdate) {
            updateAchievement(id, { ...achievementToUpdate, ...updates });
        }
    };

    return (
        <div
            style={{
                background: fontOptions.theme === 'dark'
                    ? fontOptions.widgetBgDark || '#181f2a'
                    : fontOptions.widgetBgLight || '#fff',
            }}
        >
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
                {achievements.map((achievement) => (
                    <AchievementItem
                        key={achievement.id}
                        achievement={achievement}
                        fontOptions={fontOptions}
                        onUpdate={(updates) => handleUpdateAchievement(achievement.id, updates)}
                        onDelete={() => deleteAchievement(achievement.id)}
                    />
                ))}
                <button
                    onClick={addAchievement}
                    className="w-full flex items-center justify-center gap-2 p-2 text-[var(--text-secondary)] hover:text-[var(--accent-color)] border border-dashed border-[var(--border-color)] rounded-lg hover:border-[var(--accent-color)] transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Achievement
                </button>
            </div>
        </div>
    );
};

export default AchievementsSection; 