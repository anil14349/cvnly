import { useState, useCallback, useEffect, RefObject } from 'react';

export interface ResumeStats {
  words: number;
  readTime: number;
  sections: number;
}

const useResumeStats = (
  resumeRef: RefObject<HTMLElement>, 
  sectionsCount: number
) => {
  const [resumeStats, setResumeStats] = useState<ResumeStats>({
    words: 0,
    readTime: 0,
    sections: sectionsCount
  });
  
  const [atsScore, setAtsScore] = useState<number>(78);

  const calculateStats = useCallback(() => {
    if (!resumeRef.current) return { words: 0, readTime: 0, sections: sectionsCount };
    
    const text = resumeRef.current.textContent || '';
    const words = text.split(/\s+/).filter(Boolean).length;
    const readTime = Math.ceil(words / 200); // Average reading time in minutes
    
    return {
      words,
      readTime,
      sections: sectionsCount
    };
  }, [resumeRef, sectionsCount]);

  const updateStats = useCallback(() => {
    const newStats = calculateStats();
    setResumeStats(newStats);
    
    // Recalculate ATS score based on keywords, length, etc.
    const newScore = Math.min(
      Math.floor(78 + (newStats.words > 300 ? 5 : 0) + (sectionsCount >= 4 ? 5 : 0)), 
      100
    );
    setAtsScore(newScore);
  }, [calculateStats, sectionsCount]);

  useEffect(() => {
    updateStats();
    
    // Set up a mutation observer to watch for content changes
    if (resumeRef.current) {
      const observer = new MutationObserver(updateStats);
      observer.observe(resumeRef.current, { 
        childList: true, 
        subtree: true, 
        characterData: true,
        attributes: true 
      });
      
      return () => observer.disconnect();
    }
  }, [resumeRef, updateStats]);

  return { resumeStats, atsScore };
};

export default useResumeStats; 