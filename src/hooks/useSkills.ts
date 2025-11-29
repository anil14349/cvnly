import { useState } from 'react';
import { Skill } from '../types/skill';

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  return {
    skills,
    setSkills
  };
};

