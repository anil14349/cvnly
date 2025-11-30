import { FontOptions } from "../../../types/common";
import { Plus } from "lucide-react";
import { getBodyFontFamily } from "../../../utils/fontUtils";
import {
    NEW_SKILL_CONTAINER_CLASS,
    NEW_SKILL_INPUT_CLASS,
    NEW_SKILL_ADD_BUTTON_CLASS,
    NEW_SKILL_ADD_ICON_CLASS,
    ADD_NEW_SKILL_PLACEHOLDER,
    ARIA_LABELS,
    SKILL_BULLET_CLASS,
    BULLET_POINT
} from "./constants";

export const NewSkillInput = ({
    value,
    onChange,
    onAdd,
    onKeyPress,
    fontOptions,
}: {
    value: string;
    onChange: (val: string) => void;
    onAdd: () => void;
    onKeyPress: React.KeyboardEventHandler;
    fontOptions: FontOptions;
}) => (
    <div className={NEW_SKILL_CONTAINER_CLASS}>
        <span
            className={SKILL_BULLET_CLASS}
            style={{
                fontFamily: getBodyFontFamily(fontOptions),
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
                fontFamily: getBodyFontFamily(fontOptions),
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
