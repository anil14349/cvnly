import { Skill } from "../../../types/skill";
import { X } from "lucide-react";
import { FontOptions } from "../../../types/common";
import { getSubheaderFontLineStyles, getSubheaderFontFamily } from "../../../utils/fontUtils";
import {
    CATEGORY_HEADER_CONTAINER_CLASS,
    CATEGORY_HEADER_INPUT_CLASS,
    CATEGORY_DELETE_BUTTON_CLASS,
    CATEGORY_DELETE_ICON_CLASS,
    CATEGORY_TITLE_PLACEHOLDER,
    ARIA_LABELS
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
            className={`${CATEGORY_HEADER_INPUT_CLASS} ${fontOptions.subheaderSize} ${fontOptions.subheaderWeight} ${fontOptions.subheaderColor} ${fontOptions.subheaderItalic ? 'italic' : ''} ${fontOptions.subheaderUnderline ? 'underline' : ''}`}
            style={{
                ...getSubheaderFontLineStyles(fontOptions),
                fontFamily: getSubheaderFontFamily(fontOptions)
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
