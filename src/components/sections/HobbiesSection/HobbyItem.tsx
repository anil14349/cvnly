import React from 'react';
import { X } from 'lucide-react';
import { Hobby } from '../../../types/hobby';
import { FontOptions } from '../../../types/common';

interface HobbyItemProps {
    hobby: Hobby;
    fontOptions: FontOptions;
    onUpdate: (updates: Partial<Hobby>) => void;
    onDelete: () => void;
}

const HobbyItem: React.FC<HobbyItemProps> = ({
    hobby,
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
                {hobby.icon && (
                    <span className="text-lg">{hobby.icon}</span>
                )}
                <input
                    type="text"
                    value={hobby.name}
                    onChange={(e) => onUpdate({ name: e.target.value })}
                    className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} bg-transparent border-none focus:outline-none focus:ring-0 p-0 flex-1 min-w-0`}
                    placeholder="Hobby Name"
                />
                {hobby.description && (
                    <>
                        <span className="text-[var(--text-secondary)]">•</span>
                        <input
                            type="text"
                            value={hobby.description}
                            onChange={(e) => onUpdate({ description: e.target.value })}
                            className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} bg-transparent border-none focus:outline-none focus:ring-0 p-0 flex-1 min-w-0`}
                            placeholder="Description"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default HobbyItem; 