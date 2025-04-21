import { SECTION_BUTTON_STYLES } from "../../common/constants";

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
export const CATEGORY_HEADER_CONTAINER_CLASS = 'skill-category-title flex items-center justify-between mb-0.5';
export const CATEGORY_HEADER_INPUT_CLASS = 'bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/20 rounded px-0 py-0.5 w-full';
export const CATEGORY_DELETE_BUTTON_CLASS = 'opacity-0 group-hover/category:opacity-100 transition-all print:hidden ml-2 p-1 rounded hover:bg-red-500/20 hover:backdrop-blur-sm hover:shadow-sm';
export const CATEGORY_DELETE_ICON_CLASS = 'w-3 h-3';

// Skill List Classes
export const SKILL_LIST_CLASS = 'space-y-0.5 list-none pl-1';
export const SKILL_LIST_ITEM_CLASS = 'group/skill skill-chip relative flex items-center gap-1 bg-transparent';
export const SKILL_BULLET_CLASS = 'select-none';
export const SKILL_TEXT_CONTAINER_CLASS = 'flex-1 min-w-0 inline-flex items-center justify-between gap-2';
export const SKILL_DELETE_BUTTON_CLASS = 'opacity-0 group-hover/skill:opacity-100 transition-all print:hidden p-1 rounded hover:bg-red-500/10';
export const SKILL_DELETE_ICON_CLASS = 'w-2.5 h-2.5';

// New Skill Input Classes
export const NEW_SKILL_CONTAINER_CLASS = 'flex items-center mt-0.5 group/add';
export const NEW_SKILL_INPUT_CLASS = 'bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/20 rounded px-0 py-1 w-full';
export const NEW_SKILL_ADD_BUTTON_CLASS = 'opacity-0 group-hover/add:opacity-100 transition-all print:hidden ml-2 p-1 rounded hover:bg-blue-500/10';
export const NEW_SKILL_ADD_ICON_CLASS = 'w-2.5 h-2.5';

// Add Category Button Classes
export const ADD_SKILL_BUTTON_CLASS = SECTION_BUTTON_STYLES.button;
export const ADD_SKILL_CATEGORY_ICON_CLASS = SECTION_BUTTON_STYLES.icon;
export const ADD_SKILL_LABEL_CLASS = SECTION_BUTTON_STYLES.text;

// Main Container Classes
export const SKILL_CATEGORY_CLASS = 'skill-category-card mt-0 grid grid-cols-1 auto-rows-min gap-0.5 sm:grid-cols-2 md:grid-cols-3';
export const SKILL_CATEGORY_HEADER_CLASS = 'skill-category relative group/category bg-transparent flex flex-col min-h-[80px] mb-3';

export const ADD_SUMMARY_ICON_SIZE = 'w-3 h-3';
export const FORMATTED_TEXT_CLASS = 'inline-block w-full';

export const SKILLS_GRID_CLASS = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0.5 mb-0.5';

// Classic Layout Classes
export const CLASSIC_CATEGORY_CONTAINER_CLASS = 'list-none mb-1 flex items-baseline';
export const CLASSIC_CATEGORY_INPUT_CLASS = 'bg-transparent border-none focus:outline-none font-bold';
export const CLASSIC_CATEGORY_SEPARATOR_CLASS = 'font-bold ml-0 mr-1';
export const CLASSIC_ITEMS_INPUT_CLASS = 'bg-transparent border-none focus:outline-none flex-1';