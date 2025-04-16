import React from 'react';
import { X } from 'lucide-react';
import { Achievement } from '../../../types/achievement';
import { FontOptions } from '../../../types/common';

interface AchievementItemProps {
    achievement: Achievement;
    fontOptions: FontOptions;
    onUpdate: (updates: Partial<Achievement>) => void;
    onDelete: () => void;
}

const AchievementItem: React.FC<AchievementItemProps> = ({
    achievement,
    fontOptions,
    onUpdate,
    onDelete
}) => {
    return (
        <div className="relative group flex items-center gap-2 bg-[var(--bg-primary)] dark:bg-[var(--bg-secondary)] rounded-lg px-3 py-2 border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow duration-200">
            <button
                onClick={onDelete}
                className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
            >
                <X className="w-4 h-4" />
            </button>

            <div className="flex-1 flex items-center gap-2 min-w-0">
                <input
                    type="text"
                    value={achievement.title}
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} bg-transparent border-none focus:outline-none focus:ring-0 p-0 flex-1 min-w-0`}
                    placeholder="Achievement Title"
                />
                {achievement.organization && (
                    <>
                        <span className="text-[var(--text-secondary)]">•</span>
                        <input
                            type="text"
                            value={achievement.organization}
                            onChange={(e) => onUpdate({ organization: e.target.value })}
                            className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} bg-transparent border-none focus:outline-none focus:ring-0 p-0 flex-1 min-w-0`}
                            placeholder="Organization"
                        />
                    </>
                )}
                {achievement.date && (
                    <>
                        <span className="text-[var(--text-secondary)]">•</span>
                        <input
                            type="text"
                            value={achievement.date}
                            onChange={(e) => onUpdate({ date: e.target.value })}
                            className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} bg-transparent border-none focus:outline-none focus:ring-0 p-0 flex-1 min-w-0`}
                            placeholder="Date"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AchievementItem; 