import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { ResumeTemplate, RESUME_TEMPLATES } from '../../types/templates';
import { useResumeContext } from '../../contexts/ResumeContext';

const TemplateSelector: React.FC = () => {
  const { selectedTemplate, selectTemplate } = useResumeContext();
  const [expanded, setExpanded] = useState(false);
  
  const onTemplateChange = (template: ResumeTemplate) => {
    if (selectTemplate) {
      selectTemplate(template.id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Templates</h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Choose a style
            </p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline"
          >
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        {/* Current Template */}
        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Current Template
          </div>
          {RESUME_TEMPLATES.filter(t => t.id === selectedTemplate).map((template) => (
            <div
              key={template.id}
              className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
            >
              <span className="text-2xl">{template.preview}</span>
              <div className="flex-1">
                <div className="text-xs font-bold text-gray-900 dark:text-white">
                  {template.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {template.description}
                </div>
              </div>
              <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
          ))}
        </div>

        {/* Template Grid */}
        {expanded && (
          <div>
            <div className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Choose Template
            </div>
            <div className="grid grid-cols-2 gap-2">
              {RESUME_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    onTemplateChange(template.id);
                    setExpanded(false);
                  }}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-xs ${
                    selectedTemplate === template.id
                      ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-500 shadow-md'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
                  }`}
                  title={template.description}
                >
                  <span className="text-2xl">{template.preview}</span>
                  <span className={`font-semibold ${
                    selectedTemplate === template.id
                      ? 'text-purple-700 dark:text-purple-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {template.name}
                  </span>
                  {selectedTemplate === template.id && (
                    <Check className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Template Info */}
            <div className="mt-3 p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-xs text-purple-900 dark:text-purple-200">
                <span className="font-bold">💡 Tip:</span> All templates are ATS-friendly and can be customized with fonts and colors.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;

