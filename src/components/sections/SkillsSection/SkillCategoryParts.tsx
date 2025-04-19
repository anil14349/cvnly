import React from "react";
import { X, Plus } from "lucide-react";
import { Skill } from "../../../types/skill";
import { FontOptions } from "../../../types/common";
import FormattedText from "../../common/FormattedText";
import { getSubheaderFontLineStyles } from "../../../utils/fontUtils";
import {
  FORMATTED_TEXT_CLASS,
  CATEGORY_HEADER_CONTAINER_CLASS,
  CATEGORY_HEADER_INPUT_CLASS,
  CATEGORY_DELETE_BUTTON_CLASS,
  CATEGORY_DELETE_ICON_CLASS,
  SKILL_LIST_CLASS,
  SKILL_LIST_ITEM_CLASS,
  SKILL_BULLET_CLASS,
  SKILL_TEXT_CONTAINER_CLASS,
  SKILL_DELETE_BUTTON_CLASS,
  SKILL_DELETE_ICON_CLASS,
  NEW_SKILL_CONTAINER_CLASS,
  NEW_SKILL_INPUT_CLASS,
  NEW_SKILL_ADD_BUTTON_CLASS,
  NEW_SKILL_ADD_ICON_CLASS,
  CATEGORY_TITLE_PLACEHOLDER,
  ADD_NEW_SKILL_PLACEHOLDER,
  ARIA_LABELS,
  BULLET_POINT,
} from "./constants";

export const CategoryHeader = ({
  category,
  onChange,
  deleteCategory,
  fontOptions,
}: {
  category: Skill;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  deleteCategory: () => void;
  fontOptions: FontOptions;
}) => (
  <div className={CATEGORY_HEADER_CONTAINER_CLASS}>
    <input
      type="text"
      value={category.category}
      onChange={onChange}
      className={`${CATEGORY_HEADER_INPUT_CLASS} ${fontOptions.subheaderSize} ${fontOptions.subheaderWeight} ${fontOptions.subheaderColor} font-header-${fontOptions.subheaderFont.toLowerCase()} ${fontOptions.subheaderItalic ? 'italic' : ''} ${fontOptions.subheaderUnderline ? 'underline' : ''}`}
      style={{
        ...getSubheaderFontLineStyles(fontOptions),
        fontFamily: `'${fontOptions.subheaderFont}', sans-serif`
      }}
      placeholder={CATEGORY_TITLE_PLACEHOLDER}
      aria-label={ARIA_LABELS.categoryTitle}
    />
    <button
      onClick={deleteCategory}
      className={CATEGORY_DELETE_BUTTON_CLASS}
      aria-label={ARIA_LABELS.deleteCategory}
    >
      <X className={CATEGORY_DELETE_ICON_CLASS} />
    </button>
  </div>
);

export const SkillList = ({
  items,
  onEdit,
  onDelete,
  fontOptions,
  baseTextClasses
}: {
  items: string[];
  onEdit: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  fontOptions: FontOptions;
  baseTextClasses: string;
}) => (
  <ul className={SKILL_LIST_CLASS}>
    {items.map((item, index) => (
      <li key={index} className={SKILL_LIST_ITEM_CLASS + ' ' + baseTextClasses}>
        <span
          className={SKILL_BULLET_CLASS}
          style={{
            fontFamily: fontOptions.bodyFont,
            fontSize: fontOptions.bodySize,
            lineHeight: fontOptions.bodyLineHeight,
            fontWeight: fontOptions.bodyWeight,
            color: fontOptions.bodyColor,
            letterSpacing: fontOptions.bodyLetterSpacing,
            fontStyle: fontOptions.bodyItalic ? 'italic' : 'normal',
            textDecoration: fontOptions.bodyUnderline ? 'underline' : 'none',
          }}
        >
          {BULLET_POINT}
        </span>
        <div className={SKILL_TEXT_CONTAINER_CLASS}>
          <FormattedText
            text={item}
            fontOptions={{
              ...fontOptions,
              bodySize: fontOptions.bodySize,
              bodyColor: fontOptions.bodyColor,
              bodyFont: fontOptions.bodyFont,
              bodyLineHeight: fontOptions.bodyLineHeight,
              bodyWeight: fontOptions.bodyWeight,
              bodyLetterSpacing: fontOptions.bodyLetterSpacing,
              bodyItalic: fontOptions.bodyItalic,
              bodyUnderline: fontOptions.bodyUnderline,
            }}
            onTextChange={(newText) => onEdit(index, newText)}
            isEditing
            className={FORMATTED_TEXT_CLASS}
          />
        </div>
        <button
          onClick={() => onDelete(index)}
          className={SKILL_DELETE_BUTTON_CLASS}
          aria-label={ARIA_LABELS.deleteSkill}
        >
          <X className={SKILL_DELETE_ICON_CLASS} />
        </button>
      </li>
    ))}
  </ul>
);

export const NewSkillInput = ({
  value,
  onChange,
  onAdd,
  onKeyPress,
  fontOptions,
  baseTextClasses
}: {
  value: string;
  onChange: (val: string) => void;
  onAdd: () => void;
  onKeyPress: React.KeyboardEventHandler;
  fontOptions: FontOptions;
  baseTextClasses: string;
}) => (
  <div className={NEW_SKILL_CONTAINER_CLASS + ' ' + baseTextClasses}>
    <span
      className={SKILL_BULLET_CLASS}
      style={{
        fontFamily: fontOptions.bodyFont,
        fontSize: fontOptions.bodySize,
        lineHeight: fontOptions.bodyLineHeight,
        fontWeight: fontOptions.bodyWeight,
        color: fontOptions.bodyColor,
        letterSpacing: fontOptions.bodyLetterSpacing,
        fontStyle: fontOptions.bodyItalic ? 'italic' : 'normal',
        textDecoration: fontOptions.bodyUnderline ? 'underline' : 'none',
      }}
    >
      {BULLET_POINT}
    </span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={onKeyPress}
      placeholder={ADD_NEW_SKILL_PLACEHOLDER}
      className={NEW_SKILL_INPUT_CLASS}
      style={{
        fontFamily: fontOptions.bodyFont,
        fontSize: fontOptions.bodySize,
        lineHeight: fontOptions.bodyLineHeight,
        fontWeight: fontOptions.bodyWeight,
        color: fontOptions.bodyColor,
        letterSpacing: fontOptions.bodyLetterSpacing,
        fontStyle: fontOptions.bodyItalic ? 'italic' : 'normal',
        textDecoration: fontOptions.bodyUnderline ? 'underline' : 'none',
      }}
      aria-label={ARIA_LABELS.addNewSkill}
    />
    <button
      onClick={onAdd}
      className={NEW_SKILL_ADD_BUTTON_CLASS}
      aria-label={ARIA_LABELS.addSkill}
      disabled={!value.trim()}
    >
      <Plus className={NEW_SKILL_ADD_ICON_CLASS} />
    </button>
  </div>
);
