import React from "react";
import { EducationSectionProps } from "../../../types/education";
import SectionControls from "../../common/SectionControls";
import SectionHeaderLine from "../../common/SectionHeaderLine";
import { X } from "lucide-react";
import FormattedText from "../../common/FormattedText";
import AddSectionButton from "../../common/AddSectionButton"; 
import {
  EDUCATION_CONTAINER_CLASS,
  EDUCATION_LIST_CLASS,
  EDUCATION_ITEM_CLASS,
  EDUCATION_CONTENT_CLASS,
  EDUCATION_DETAILS_CLASS,
  EDUCATION_DETAILS_LIST_CLASS,
  EDUCATION_DETAIL_ITEM_CLASS,
  DELETE_EDUCATION_BUTTON_CLASS,
  DELETE_DETAIL_BUTTON_CLASS,
  ADD_EDUCATION_BUTTON_CLASS,
  DELETE_ICON_SIZE,
  ADD_ICON_SIZE,
  DEFAULT_TITLE,
  ADD_EDUCATION_TEXT,
  PRESENT_TEXT,
  GPA_PREFIX,
  FIELD_SEPARATOR,
  DEFAULT_BG_DARK,
  DEFAULT_BG_LIGHT,
  INLINE_BLOCK_CLASS,
  DATE_SEPARATOR,
  DELETE_EDUCATION_ARIA_LABEL,
  DELETE_DETAIL_ARIA_LABEL,
  DETAIL_SUFFIX,
  EDUCATION_TEXT_CLASS, 
} from "./constants";

const EducationSection: React.FC<EducationSectionProps> = ({
  educations,
  fontOptions,
  moveSection,
  deleteSection,
  index,
  sectionsLength,
  addEducation,
  deleteEducation,
  updateEducation,
  title = DEFAULT_TITLE,
  onTitleChange,
}) => {
  const updateDetail = (
    educationId: string,
    detailIndex: number,
    newText: string
  ) => {
    const education = educations.find((edu) => edu.id === educationId);
    if (!education) return;

    const updatedDetails = [...education.details];
    updatedDetails[detailIndex] = newText;

    updateEducation?.(educationId, "details", JSON.stringify(updatedDetails));
  };

  return (
    <div
      className={`mt-2 ${EDUCATION_CONTAINER_CLASS}`}
      style={{
        background:
          fontOptions.theme === "dark"
            ? fontOptions.widgetBgDark || DEFAULT_BG_DARK
            : fontOptions.widgetBgLight || DEFAULT_BG_LIGHT,
      }}
    >
      <SectionHeaderLine
        title={title}
        fontOptions={fontOptions}
        onTitleChange={onTitleChange}
        controls={
          <SectionControls
            index={index}
            moveSection={moveSection}
            deleteSection={deleteSection}
            sectionsLength={sectionsLength}
          />
        }
      />

      <div className={EDUCATION_LIST_CLASS}>
        {educations.map((edu) => (
          <div key={edu.id} className={EDUCATION_ITEM_CLASS}>
            <button
              onClick={() => deleteEducation?.(edu.id)}
              className={DELETE_EDUCATION_BUTTON_CLASS}
              aria-label={`${DELETE_EDUCATION_ARIA_LABEL}${edu.school}`}
            >
              <X className={DELETE_ICON_SIZE} aria-hidden="true" />
            </button>

            <div className={EDUCATION_CONTENT_CLASS}>
              <div className={EDUCATION_DETAILS_CLASS}>
                <h3
                  className={`${fontOptions.subheaderSize} ${
                    fontOptions.subheaderWeight
                  } ${
                    fontOptions.subheaderColor
                  } font-header-${fontOptions.headerFont.toLowerCase()} ${
                    fontOptions.subheaderItalic ? "italic" : ""
                  } ${fontOptions.subheaderUnderline ? "underline" : ""}`}
                >
                  <FormattedText
                    text={edu.school}
                    fontOptions={fontOptions}
                    onTextChange={(newText) =>
                      updateEducation?.(edu.id, "school", newText)
                    }
                    isEditing={true}
                    className={INLINE_BLOCK_CLASS}
                  />
                </h3>
                <div
                  className={`${fontOptions.bodySize} ${
                    fontOptions.bodyWeight
                  } ${
                    fontOptions.bodyColor
                  } font-body-${fontOptions.bodyFont.toLowerCase()} ${
                    fontOptions.bodyItalic ? "italic" : ""
                  } ${fontOptions.bodyUnderline ? "underline" : ""}`}
                >
                  <FormattedText
                    text={edu.degree}
                    fontOptions={fontOptions}
                    onTextChange={(newText) =>
                      updateEducation?.(edu.id, "degree", newText)
                    }
                    isEditing={true}
                    className={INLINE_BLOCK_CLASS}
                  />
                  {edu.field && (
                    <>
                      {FIELD_SEPARATOR}
                      <FormattedText
                        text={edu.field}
                        fontOptions={fontOptions}
                        onTextChange={(newText) =>
                          updateEducation?.(edu.id, "field", newText)
                        }
                        isEditing={true}
                        className={INLINE_BLOCK_CLASS}
                      />
                    </>
                  )}
                </div>
              </div>
              <div
                className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${
                  fontOptions.bodyColor
                } font-body-${fontOptions.bodyFont.toLowerCase()} ${
                  fontOptions.bodyItalic ? "italic" : ""
                } ${fontOptions.bodyUnderline ? "underline" : ""}`}
              >
                <FormattedText
                  text={edu.startDate}
                  fontOptions={fontOptions}
                  onTextChange={(newText) =>
                    updateEducation?.(edu.id, "startDate", newText)
                  }
                  isEditing={true}
                  className={INLINE_BLOCK_CLASS}
                />
                {DATE_SEPARATOR}
                <FormattedText
                  text={edu.endDate || PRESENT_TEXT}
                  fontOptions={fontOptions}
                  onTextChange={(newText) =>
                    updateEducation?.(edu.id, "endDate", newText)
                  }
                  isEditing={true}
                  className={INLINE_BLOCK_CLASS}
                />
              </div>
            </div>

            {edu.gpa && (
              <div
                className={`${fontOptions.bodySize} ${fontOptions.bodyWeight} ${
                  fontOptions.bodyColor
                } font-body-${fontOptions.bodyFont.toLowerCase()} ${
                  fontOptions.bodyItalic ? "italic" : ""
                } ${fontOptions.bodyUnderline ? "underline" : ""}`}
              >
                {GPA_PREFIX}
                <FormattedText
                  text={edu.gpa}
                  fontOptions={fontOptions}
                  onTextChange={(newText) =>
                    updateEducation?.(edu.id, "gpa", newText)
                  }
                  isEditing={true}
                  className={INLINE_BLOCK_CLASS}
                />
              </div>
            )}

            {edu.details && edu.details.length > 0 && (
              <ul
                className={`${EDUCATION_DETAILS_LIST_CLASS} ${
                  fontOptions.bodySize
                } ${fontOptions.bodyWeight} ${
                  fontOptions.bodyColor
                } font-body-${fontOptions.bodyFont.toLowerCase()} ${
                  fontOptions.bodyItalic ? "italic" : ""
                } ${fontOptions.bodyUnderline ? "underline" : ""}`}
              >
                {edu.details.map((detail, idx) => (
                  <li key={idx} className={EDUCATION_DETAIL_ITEM_CLASS}>
                    <FormattedText
                      text={detail}
                      fontOptions={fontOptions}
                      onTextChange={(newText) =>
                        updateDetail(edu.id, idx, newText)
                      }
                      isEditing={true}
                      className={INLINE_BLOCK_CLASS}
                    />
                    <button
                      onClick={() => {
                        const updatedDetails = edu.details.filter(
                          (_, i) => i !== idx
                        );
                        updateEducation?.(
                          edu.id,
                          "details",
                          JSON.stringify(updatedDetails)
                        );
                      }}
                      className={DELETE_DETAIL_BUTTON_CLASS}
                      aria-label={`${DELETE_DETAIL_ARIA_LABEL}${detail.substring(
                        0,
                        20
                      )}${DETAIL_SUFFIX}`}
                    >
                      <X className={DELETE_ICON_SIZE} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 print:hidden">
        <AddSectionButton
          onClick={addEducation}
          text={ADD_EDUCATION_TEXT}
          buttonClassName={ADD_EDUCATION_BUTTON_CLASS}
          iconClassName={ADD_ICON_SIZE}
          textClassName={EDUCATION_TEXT_CLASS}
        />
      </div>
    </div>
  );
};

export default EducationSection;
