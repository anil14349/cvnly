import { FontOptions } from "../../../types/common";
import FormattedText from "../../common/FormattedText";
import { X } from "lucide-react";
import { getFontClassNames, getFontInlineStyles } from "../../../utils/fontUtils";
import {
    SKILL_LIST_CLASS,
    SKILL_LIST_ITEM_CLASS,
    SKILL_BULLET_CLASS,
    SKILL_TEXT_CONTAINER_CLASS,
    SKILL_DELETE_BUTTON_CLASS,
    SKILL_DELETE_ICON_CLASS,
    FORMATTED_TEXT_CLASS,
    BULLET_POINT,
    ARIA_LABELS
} from "./constants";

export const SkillList = ({
    items,
    onEdit,
    onDelete,
    fontOptions,
}: {
    items: string[];
    onEdit: (index: number, value: string) => void;
    onDelete: (index: number) => void;
    fontOptions: FontOptions;
}) => (
    <ul className={SKILL_LIST_CLASS}>
        {items.map((item, index) => (
            <li key={index} className={SKILL_LIST_ITEM_CLASS}>
                <span
                    className={`${SKILL_BULLET_CLASS} ${getFontClassNames(fontOptions)}`}
                    style={getFontInlineStyles(fontOptions)}
                >
                    {BULLET_POINT}
                </span>
                <div className={SKILL_TEXT_CONTAINER_CLASS}>
                    <FormattedText
                        text={item}
                        fontOptions={fontOptions}
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
