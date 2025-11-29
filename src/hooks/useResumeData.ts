import { useState } from 'react';

export interface ResumeData {
  name: string;
  title: string;
}

export const useResumeData = (initialData: ResumeData = { name: "Anil Kumar", title: "Integration Architect/AI & ML Engineer" }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);

  const updateName = (name: string) => {
    setResumeData(prev => ({ ...prev, name }));
  };

  const updateTitle = (title: string) => {
    setResumeData(prev => ({ ...prev, title }));
  };

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...data }));
  };

  return {
    resumeData,
    setResumeData,
    updateName,
    updateTitle,
    updateResumeData
  };
};

