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

export const RESUME_TEMPLATES: TemplateConfig[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional layout with clear sections',
    preview: '📄',
    features: ['Clean lines', 'Professional spacing', 'ATS-friendly'],
    bestFor: ['Corporate jobs', 'Finance', 'Legal', 'Government']
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column with gradient header & sidebar',
    preview: '✨',
    features: ['70/30 split', 'Purple gradient', 'Skills in sidebar'],
    bestFor: ['Tech companies', 'Startups', 'Marketing', 'Design']
  },
  {
    id: 'two-column',
    name: 'Two Column Pro',
    description: 'Dark left sidebar (35/65 split)',
    preview: '📊',
    features: ['Dark sidebar', 'Contact in sidebar', 'Professional split'],
    bestFor: ['IT professionals', 'Engineers', 'Designers', 'Creative tech']
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple, content-focused',
    preview: '⚪',
    features: ['Maximalist white space', 'Focus on content', 'Ultra-clean'],
    bestFor: ['Any industry', 'First jobs', 'Career changers', 'Academics']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Colorful gradient header with accents',
    preview: '🎨',
    features: ['Gradient header', 'Colorful sections', 'Bold typography'],
    bestFor: ['Creative fields', 'Design', 'Media', 'Arts', 'Marketing']
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Centered with decorative borders',
    preview: '👔',
    features: ['Centered layout', 'Decorative lines', 'Premium typography'],
    bestFor: ['Executive roles', 'Board positions', 'Senior leadership', 'VP+']
  }
];

