import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { RESUME_TEMPLATES } from '../../types/templates';
import { useResumeContext } from '../../contexts/ResumeContext';

const TemplateSelectorFloating: React.FC = () => {
  const { selectedTemplate, updateTemplate } = useResumeContext();
  
  const onTemplateChange = (templateId: string) => {
    updateTemplate(templateId as any);
  };

  const currentTemplate = RESUME_TEMPLATES.find(t => t.id === selectedTemplate);

  return (
    <div className="p-5">
      {/* NO HEADER - Panel already shows "Templates" */}
      
      {/* Current Template Display */}
      <div className="mb-6 p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{currentTemplate?.preview || '📄'}</div>
          <div className="flex-1">
            <div className="text-xs text-purple-100 mb-1">Current Template</div>
            <div className="text-lg font-bold">{currentTemplate?.name || 'Classic'}</div>
            <div className="text-xs text-purple-100 mt-1">
              {currentTemplate?.description || 'Traditional layout'}
            </div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <h3 className="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-4">
        Choose a Style
      </h3>

      {/* Template Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {RESUME_TEMPLATES.map((template) => {
          const isSelected = selectedTemplate === template.id;
          
          return (
            <button
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-500 dark:border-purple-600 shadow-lg'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md'
              }`}
            >
              {/* Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Template Preview Icon */}
              <div className={`text-4xl transition-transform ${isSelected ? 'scale-110' : 'scale-100'}`}>
                {template.preview}
              </div>

              {/* Template Name */}
              <div className={`text-sm font-bold text-center transition-colors ${
                isSelected
                  ? 'text-purple-700 dark:text-purple-300'
                  : 'text-gray-800 dark:text-gray-200'
              }`}>
                {template.name}
              </div>

              {/* Template Description */}
              <div className={`text-xs text-center leading-snug transition-colors ${
                isSelected
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {template.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Boxes */}
      <div className="space-y-3">
        {/* ATS Friendly Info */}
        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-green-900 dark:text-green-100 mb-0.5">
                All Templates are ATS-Friendly
              </p>
              <p className="text-xs text-green-700 dark:text-green-300">
                Designed to pass Applicant Tracking Systems
              </p>
            </div>
          </div>
        </div>

        {/* Customization Info */}
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-bold text-purple-900 dark:text-purple-100 mb-0.5">
                Fully Customizable
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Use the Appearance panel to adjust fonts, colors, and layout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Template Descriptions */}
      <div className="mt-5 p-4 bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-3">Template Guide</h4>
        <div className="space-y-2">
          {RESUME_TEMPLATES.map((template) => (
            <div key={template.id} className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">{template.preview}</span>
              <div>
                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                  {template.name}:
                </span>
                <span className="text-xs text-gray-700 dark:text-gray-200 ml-1">
                  {template.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectorFloating;

