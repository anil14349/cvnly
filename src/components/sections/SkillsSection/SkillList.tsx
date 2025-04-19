import { FontOptions } from "../../../types/common";
import FormattedText from "../../common/FormattedText";
import { X } from "lucide-react";
import {
    SKILL_TEXT_CONTAINER_CLASS,
    SKILL_DELETE_BUTTON_CLASS,
    SKILL_DELETE_ICON_CLASS,
    FORMATTED_TEXT_CLASS,
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
    <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
            <span key={index} className="skill-chip">
                <span className={SKILL_TEXT_CONTAINER_CLASS}>
                    <FormattedText
                        text={item}
                        fontOptions={fontOptions}
                        onTextChange={(newText) => onEdit(index, newText)}
                        isEditing
                        className={FORMATTED_TEXT_CLASS}
                    />
                </span>
                <button
                    onClick={() => onDelete(index)}
                    className={SKILL_DELETE_BUTTON_CLASS}
                    aria-label={ARIA_LABELS.deleteSkill}
                    style={{ marginLeft: '0.25em' }}
                >
                    <X className={SKILL_DELETE_ICON_CLASS} />
                </button>
            </span>
        ))}
    </div>
);
