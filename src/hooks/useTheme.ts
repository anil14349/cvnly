import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>('light');

  // Apply theme on mount
  useEffect(() => {
    applyTheme(activeTheme);
  }, []);

  const applyTheme = (theme: Theme) => {
    setActiveTheme(theme);

    // Remove all existing theme classes
    document.documentElement.classList.remove('light', 'dark');

    // Add the new theme class
    document.documentElement.classList.add(theme);

    // Handle dark mode class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#1a202c';
      document.body.style.color = '#f7fafc';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1a202c';
    }

    // Update CSS variables for the theme
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
  };

  return {
    activeTheme,
    applyTheme
  };
};

