export const DEFAULT_SKILLS_TITLE = 'Skills & Certifications';
export const ADD_SKILL_CATEGORY_LABEL = 'Add Category';
export const ADD_CATEGORY_LABEL = 'Add Category';
export const CATEGORY_TITLE_PLACEHOLDER = 'Category Title';
export const ADD_NEW_SKILL_PLACEHOLDER = 'Add new skill';

// ARIA Labels
export const ARIA_LABELS = {
  categoryTitle: 'Category title',
  deleteCategory: 'Delete category',
  deleteSkill: 'Delete skill',
  addSkill: 'Add skill',
  addNewSkill: 'Add new skill'
} as const;

// Bullet Point
export const BULLET_POINT = '•';

// Category Header Classes
export const CATEGORY_HEADER_CONTAINER_CLASS = 'flex items-center justify-between mb-2';
export const CATEGORY_HEADER_INPUT_CLASS = 'bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/20 rounded px-0 py-1 w-full';
export const CATEGORY_DELETE_BUTTON_CLASS = 'opacity-0 group-hover/category:opacity-100 transition-all print:hidden ml-2 p-1 rounded hover:bg-red-500/10';
export const CATEGORY_DELETE_ICON_CLASS = 'w-3 h-3';

// Skill List Classes
export const SKILL_LIST_CLASS = 'space-y-1.5 list-none pl-0';
export const SKILL_LIST_ITEM_CLASS = 'group/skill relative flex items-center';
export const SKILL_BULLET_CLASS = 'mr-2 select-none';
export const SKILL_TEXT_CONTAINER_CLASS = 'flex-1 min-w-0';
export const SKILL_DELETE_BUTTON_CLASS = 'opacity-0 group-hover/skill:opacity-100 transition-all print:hidden ml-2 p-1 rounded hover:bg-red-500/10';
export const SKILL_DELETE_ICON_CLASS = 'w-2.5 h-2.5';

// New Skill Input Classes
export const NEW_SKILL_CONTAINER_CLASS = 'flex items-center mt-2 group/add';
export const NEW_SKILL_INPUT_CLASS = 'bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/20 rounded px-0 py-1 w-full';
export const NEW_SKILL_ADD_BUTTON_CLASS = 'opacity-0 group-hover/add:opacity-100 transition-all print:hidden ml-2 p-1 rounded hover:bg-blue-500/10';
export const NEW_SKILL_ADD_ICON_CLASS = 'w-2.5 h-2.5';

// Add Category Button Classes
export const ADD_SKILL_CATEGORY_ICON_CLASS = 'w-4 h-4 mx-auto opacity-60 group-hover/add:opacity-100 transition-colors';
export const ADD_SKILL_LABEL_CLASS = 'mt-1 block text-sm opacity-60 group-hover/add:opacity-100 transition-colors';
export const ADD_SKILL_BUTTON_CLASS = 'flex items-center justify-center h-full min-h-[100px] border border-dashed border-current/30 rounded hover:border-current/50 transition-colors group/add bg-transparent print:hidden';

// Main Container Classes
export const SKILL_CATEGORY_CLASS = 'mt-4 grid grid-cols-1 auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]';
export const SKILL_CATEGORY_HEADER_CLASS = 'skill-category relative group/category rounded bg-transparent flex flex-col min-h-[120px]';

export const ADD_SUMMARY_ICON_SIZE = 'w-3 h-3';
export const FORMATTED_TEXT_CLASS = 'inline-block w-full';