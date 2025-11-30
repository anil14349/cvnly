import React from "react";
import { FontOptions } from "../../types/common";
import { getBodyFontFamily } from "../../utils/fontUtils";

const EditableText: React.FC<{
    text: string;
    fontOptions: FontOptions;
}> = ({ text, fontOptions }) => (
    <span
        className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} ${fontOptions.bodyLineHeight} ${fontOptions.bodyLetterSpacing} ${fontOptions.bodyItalic ? "italic" : ""} ${fontOptions.bodyUnderline ? "underline" : ""}`}
        // eslint-disable-next-line react/forbid-component-props
        style={{ fontFamily: getBodyFontFamily(fontOptions) }}
        contentEditable
        suppressContentEditableWarning
    >
        {text}
    </span>
);

export default EditableText;
