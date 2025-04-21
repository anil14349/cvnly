import { FontOptions } from '../types/common';

export const defaultFontOptions: FontOptions = {
  headerFont: 'inter',
  headerSize: 'text-2xl',
  headerWeight: 'font-normal',
  headerLineHeight: 'leading-tight',
  headerLetterSpacing: 'tracking-wide',
  headerColor: 'text-gray-700',
  headerAlignment: 'center',
  headerItalic: false,
  headerUnderline: false,
  subheaderFont: 'inter',
  subheaderSize: 'text-sm',
  subheaderWeight: 'font-normal',
  subheaderLineHeight: 'leading-snug',
  subheaderLetterSpacing: 'tracking-wide',
  subheaderColor: 'text-gray-600',
  subheaderItalic: false,
  subheaderUnderline: false,
  sectionHeaderFont: 'inter',
  sectionHeaderSize: 'text-xl',
  sectionHeaderWeight: 'font-normal',
  sectionHeaderLineHeight: 'leading-tight',
  sectionHeaderLetterSpacing: 'tracking-tight',
  sectionHeaderColor: 'text-gray-600',
  sectionHeaderItalic: false,
  sectionHeaderUnderline: false,
  bodyFont: 'inter',
  bodySize: 'text-sm',
  bodyWeight: 'font-normal',
  bodyLineHeight: 'leading-tight',
  bodyLetterSpacing: 'tracking-wide',
  bodyColor: 'text-gray-500',
  bodyItalic: false,
  bodyUnderline: false,
  lineColor: '#4299e1',
};

export function applyTheme(theme: 'light' | 'dark', setActiveTheme: (t: 'light' | 'dark') => void) {
  setActiveTheme(theme);
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#1a202c';
    document.body.style.color = '#f7fafc';
  } else {
    document.documentElement.classList.remove('dark');
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#1a202c';
  }
  const root = document.documentElement;
  if (theme === 'dark') {
    root.style.setProperty('--bg-primary', '#1a202c');
    root.style.setProperty('--bg-secondary', '#2d3748');
    root.style.setProperty('--text-primary', '#f7fafc');
    root.style.setProperty('--text-secondary', '#cbd5e0');
    root.style.setProperty('--border-color', '#4a5568');
    root.style.setProperty('--accent-color', '#63b3ed');
    root.style.setProperty('--line-color', '#63b3ed');
  } else {
    root.style.setProperty('--bg-primary', '#ffffff');
    root.style.setProperty('--bg-secondary', '#f7fafc');
    root.style.setProperty('--text-primary', '#1a202c');
    root.style.setProperty('--text-secondary', '#4a5568');
    root.style.setProperty('--border-color', '#e2e8f0');
    root.style.setProperty('--accent-color', '#4299e1');
    root.style.setProperty('--line-color', '#4299e1');
  }
}
