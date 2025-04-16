import React from 'react';
import { ThemeType, TemplateType, IconType, SkillTheme } from '../../types/common';
import { Palette, Layout, List, Type } from 'lucide-react';

interface TemplateControlPanelProps {
    activeTheme: ThemeType;
    setActiveTheme: (theme: ThemeType) => void;
    activeTemplate: TemplateType;
    setActiveTemplate: (template: TemplateType) => void;
    iconFormat: IconType;
    setIconFormat: (format: IconType) => void;
    skillsTheme: SkillTheme;
    setSkillsTheme: (theme: SkillTheme) => void;
}

const TemplateControlPanel: React.FC<TemplateControlPanelProps> = ({
    activeTheme,
    setActiveTheme,
    activeTemplate,
    setActiveTemplate,
    iconFormat,
    setIconFormat,
    skillsTheme,
    setSkillsTheme,
}) => {
    return (
        <div className="flex items-center space-x-4">
            {/* Theme Selector */}
            <div className="relative group">
                <button
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                    title="Select Theme"
                >
                    <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        {activeTheme === 'light' ? 'Light' : activeTheme === 'dark' ? 'Dark' : 'Blue'}
                    </span>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block">
                    <div className="p-2 space-y-1">
                        <button
                            onClick={() => setActiveTheme('light')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${activeTheme === 'light'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Light Theme
                        </button>
                        <button
                            onClick={() => setActiveTheme('dark')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${activeTheme === 'dark'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Dark Theme
                        </button>
                        <button
                            onClick={() => setActiveTheme('blue')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${activeTheme === 'blue'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Blue Theme
                        </button>
                    </div>
                </div>
            </div>

            {/* Template Selector */}
            <div className="relative group">
                <button
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                    title="Select Template"
                >
                    <Layout className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {activeTemplate}
                    </span>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block">
                    <div className="p-2 space-y-1">
                        <button
                            onClick={() => setActiveTemplate('minimal')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${activeTemplate === 'minimal'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Minimal Template
                        </button>
                        <button
                            onClick={() => setActiveTemplate('classic')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${activeTemplate === 'classic'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Classic Template
                        </button>
                        <button
                            onClick={() => setActiveTemplate('modern')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${activeTemplate === 'modern'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Modern Template
                        </button>
                    </div>
                </div>
            </div>

            {/* Icon Format Selector */}
            <div className="relative group">
                <button
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                    title="Select Icon Format"
                >
                    <Type className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {iconFormat}
                    </span>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block">
                    <div className="p-2 space-y-1">
                        <button
                            onClick={() => setIconFormat('emoji')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${iconFormat === 'emoji'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Emoji Icons
                        </button>
                        <button
                            onClick={() => setIconFormat('symbol')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${iconFormat === 'symbol'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Symbol Icons
                        </button>
                        <button
                            onClick={() => setIconFormat('ascii')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${iconFormat === 'ascii'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            ASCII Icons
                        </button>
                    </div>
                </div>
            </div>

            {/* Skills Theme Selector */}
            <div className="relative group">
                <button
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                    title="Select Skills Theme"
                >
                    <List className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {skillsTheme}
                    </span>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block">
                    <div className="p-2 space-y-1">
                        <button
                            onClick={() => setSkillsTheme('classic')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${skillsTheme === 'classic'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Classic Style
                        </button>
                        <button
                            onClick={() => setSkillsTheme('card')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${skillsTheme === 'card'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Card Style
                        </button>
                        <button
                            onClick={() => setSkillsTheme('compact')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${skillsTheme === 'compact'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Compact Style
                        </button>
                        <button
                            onClick={() => setSkillsTheme('bubble')}
                            className={`w-full px-3 py-2 text-left rounded-md text-sm ${skillsTheme === 'bubble'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Bubble Style
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateControlPanel; 