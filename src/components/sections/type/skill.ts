export type SkillItem = string;

export type SkillCategoryType = {
  id: string;
  category: string;
  items: SkillItem[];
};

export type SkillTheme = 'classic';

export type FontOptions = {
  // Font Families
  headerFont: string;
  bodyFont: string;
  
  // Font Sizes
  headerSize: string;
  subheaderSize: string;
  sectionHeaderSize: string;
  bodySize: string;
  
  // Font Weights
  headerWeight: string;
  subheaderWeight: string;
  sectionHeaderWeight: string;
  bodyWeight: string;
  
  // Line Heights
  headerLineHeight: string;
  subheaderLineHeight: string;
  sectionHeaderLineHeight: string;
  bodyLineHeight: string;
  
  // Letter Spacing
  headerLetterSpacing: string;
  subheaderLetterSpacing: string;
  sectionHeaderLetterSpacing: string;
  bodyLetterSpacing: string;
  
  // Line Options
  lineWidth: string;
  lineColor: string;
};

export type SkillsSectionProps = {
  index: number;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
  sectionsLength: number;
  fontOptions: FontOptions;
  skills: SkillCategoryType[];
  addSkill: () => void;
  deleteSkill: (id: string) => void;
  updateSkill?: (id: string, updatedCategory: SkillCategoryType) => void;
  skillsTheme?: SkillTheme;
};

export type SkillCategoryProps = {
  category: SkillCategoryType;
  fontOptions: FontOptions;
  updateSkill: (id: string, updatedCategory: SkillCategoryType) => void;
  deleteSkill: (id: string) => void;
  skillsTheme: SkillTheme;
};

export type SkillItemProps = {
  skill: SkillItem;
  index: number;
  category: SkillCategoryType;
  updateSkill: (id: string, updatedCategory: SkillCategoryType) => void;
  skillsTheme: SkillTheme;
  fontOptions: FontOptions;
};
