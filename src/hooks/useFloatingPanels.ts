import { useState, useEffect } from 'react';

interface PanelState {
  activePanel: string | null;
}

const useFloatingPanels = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if no input is focused
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.getAttribute('contenteditable') === 'true'
      ) {
        return;
      }

      // Check for Alt key combinations
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'a':
            e.preventDefault();
            togglePanel('ats');
            break;
          case 'q':
            e.preventDefault();
            togglePanel('quick-wins');
            break;
          case 't':
            e.preventDefault();
            togglePanel('template');
            break;
          case 'f':
            e.preventDefault();
            togglePanel('appearance');
            break;
          case 's':
            e.preventDefault();
            togglePanel('sections');
            break;
          case 'h':
            e.preventDefault();
            togglePanel('tips');
            break;
          case 'escape':
            e.preventDefault();
            closePanel();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePanel]);

  const togglePanel = (panelId: string) => {
    setActivePanel(prev => prev === panelId ? null : panelId);
  };

  const closePanel = () => {
    setActivePanel(null);
  };

  const openPanel = (panelId: string) => {
    setActivePanel(panelId);
  };

  return {
    activePanel,
    togglePanel,
    closePanel,
    openPanel,
  };
};

export default useFloatingPanels;

