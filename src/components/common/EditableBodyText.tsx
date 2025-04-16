import React from "react";
import { FontOptions } from "../../types/common";

const EditableText: React.FC<{
    text: string;
    fontOptions: FontOptions;
}> = ({ text, fontOptions }) => (
    <span
        className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${fontOptions.bodyColor} ${fontOptions.bodyLineHeight} ${fontOptions.bodyLetterSpacing} font-body-${fontOptions.bodyFont.toLowerCase()} ${fontOptions.bodyItalic ? "italic" : ""} ${fontOptions.bodyUnderline ? "underline" : ""}`}
        contentEditable
        suppressContentEditableWarning
    >
        {text}
    </span>
);

export default EditableText;
