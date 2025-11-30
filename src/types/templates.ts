// Resume Template Types

export type ResumeTemplate = 
  | 'classic'
  | 'modern'
  | 'two-column'
  | 'minimal'
  | 'creative'
  | 'executive';

export interface TemplateConfig {
  id: ResumeTemplate;
  name: string;
  description: string;
  preview: string;
  features: string[];
  bestFor: string[];
}

// Only Classic and Minimal templates are available
export const RESUME_TEMPLATES: TemplateConfig[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional layout',
    preview: '📄',
    features: ['Clean lines', 'Professional spacing', 'ATS-friendly'],
    bestFor: ['Corporate jobs', 'Finance', 'Legal', 'Government', 'Any industry']
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple, content-focused',
    preview: '⚪',
    features: ['Maximum white space', 'Focus on content', 'Ultra-clean'],
    bestFor: ['Any industry', 'First jobs', 'Career changers', 'Academics']
  }
];

