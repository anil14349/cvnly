import type { Skill } from './skill';
import type { Experience } from './experience';
import type { Education } from './education';
import type { Project } from './project';
import type { Certification } from './certification';

export interface FontOptions {
  // Header font settings
  headerFont: string;
  headerSize: string;
  headerWeight: string;
  headerLineHeight: string;
  headerLetterSpacing: string;
  headerColor: string;
  headerAlignment: string;
  headerItalic: boolean;
  headerUnderline: boolean;

  // Subheader font settings
  subheaderFont: string;
  subheaderSize: string;
  subheaderWeight: string;
  subheaderLineHeight: string;
  subheaderLetterSpacing: string;
  subheaderColor: string;
  subheaderItalic: boolean;
  subheaderUnderline: boolean;

  // Section header font settings
  sectionHeaderFont: string;
  sectionHeaderSize: string;
  sectionHeaderWeight: string;
  sectionHeaderLineHeight: string;
  sectionHeaderLetterSpacing: string;
  sectionHeaderColor: string;
  sectionHeaderItalic: boolean;
  sectionHeaderUnderline: boolean;

  // Body font settings
  bodyFont: string;
  bodySize: string;
  bodyWeight: string;
  bodyLineHeight: string;
  bodyLetterSpacing: string;
  bodyColor: string;
  bodyItalic: boolean;
  bodyUnderline: boolean;

  // Line settings
  lineColor: string;

  // Category title font
  categoryFont?: string;
  categorySize?: string;
  categoryWeight?: string;
  categoryColor?: string;

  // Theme
  theme?: "light" | "dark";
  widgetBgLight?: string; // Light theme widget bg
  widgetBgDark?: string;  // Dark theme widget bg

  // Template/Layout
  skillsColumns?: number;
  categorySpacing?: number;
  showCertifications?: boolean;
  sectionUnderline?: boolean;

  // Add theme types
}

export type IconType = 'emoji' | 'symbol' | 'ascii';

export type TemplateType = 'minimal' | 'classic' | 'modern';

export type ThemeType = 'light' | 'dark';

export type LineType = 'dotted' | 'dashed' | 'solid';

export type SocialLinkType = 'email' | 'phone' | 'address' | 'website' | 'linkedin' | 'github' | 'twitter' | 'facebook' | 'instagram' | 'pinterest' | 'tiktok' | 'youtube' | 'location';

export type SocialIconType = 'email' | 'phone' | 'address' | 'website' | 'linkedin' | 'github' | 'twitter' | 'facebook' | 'instagram' | 'pinterest' | 'tiktok' | 'youtube' | 'location';

export type SocialIconFormatType = 'emoji' | 'symbol' | 'ascii';

export type SocialIconSizeType = 'small' | 'medium' | 'large';

export type SocialIconPositionType = 'left' | 'right';

export type SocialIconAlignmentType = 'left' | 'center' | 'right';

export type SocialIconSpacingType = 'small' | 'medium' | 'large';

export type SocialIconSpacingPositionType = 'left' | 'right';

export type SocialIconSpacingAlignmentType = 'left' | 'center' | 'right';

export type SocialIconSpacingSizeType = 'small' | 'medium' | 'large';

export type SkillTheme = 'classic' | 'card' | 'compact' | 'bubble';

export interface LineOptions {
  color: string;
  length: string;
}

export interface SocialLink {
  id: string;
  type: "phone" | "email" | "linkedin" | "github" | "location";
  value: string;
  username?: string;
}

export interface ResumeSection {
  type: 'summary' | 'skills' | 'experience' | 'education' | 'projects' | 'certifications' | 'social';
  visible: boolean;
  content: {
    skills?: Skill[];
    experiences?: Experience[];
    educations?: Education[];
    projects?: Project[];
    certifications?: Certification[];
    socialLinks?: SocialLink[];
  };
}


