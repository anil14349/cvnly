import React from "react";
import { X, ExternalLink } from "lucide-react";
import AddSectionButton from "../../common/AddSectionButton";
import {
  CertificationSectionProps,
  Certification,
} from "../../../types/certification";
import SectionHeaderLine from "../../common/SectionHeaderLine";
import SectionControls from "../../common/SectionControls";
import { getFontClassNames } from "../../../utils/fontUtils";
import {
  CERTIFICATION_CONTAINER_CLASS,
  CERTIFICATION_ITEM_CLASS,
  DELETE_BUTTON_CLASS,
  CERTIFICATION_CONTENT_CLASS,
  CERTIFICATION_DATE_CLASS,
  CERTIFICATION_LINK_CLASS,
  ADD_CERTIFICATION_BUTTON_CLASS,
  DEFAULT_TITLE,
  VIEW_CERTIFICATE_TEXT,
  ADD_CERTIFICATION_TEXT,
  DELETE_ICON_SIZE,
  ADD_ICON_SIZE,
  EXTERNAL_LINK_ICON_SIZE,
  CERTIFICATIONS_LIST_CLASS,
  CERTIFICATION_HEADER_CLASS,
  CERTIFICATION_ISSUER_CLASS,
  DEFAULT_BG_DARK,
  DEFAULT_BG_LIGHT,
  CERTIFICATION_TEXT_CLASS,
} from "./constants";

const CertificationsSection: React.FC<CertificationSectionProps> = ({
  certifications,
  fontOptions,
  moveSection,
  deleteSection,
  index,
  sectionsLength,
  addCertification = () => { },
  deleteCertification = () => { },
  updateCertification = () => { },
  title = DEFAULT_TITLE,
  onTitleChange,
}) => {
  const handleBlur = (cert: Certification, field: string, value: string) => {
    updateCertification(cert.id, field, value);
  };

  const baseTextClasses = getFontClassNames(fontOptions);

  return (
    <div
      style={{
        marginTop: '0.5rem',
        background:
          fontOptions.theme === "dark"
            ? fontOptions.widgetBgDark || DEFAULT_BG_DARK
            : fontOptions.widgetBgLight || DEFAULT_BG_LIGHT,
      }}
      className={CERTIFICATION_CONTAINER_CLASS}
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

      <div className={CERTIFICATIONS_LIST_CLASS}>
        {certifications.map((cert) => (
          <div key={cert.id} className={CERTIFICATION_ITEM_CLASS}>
            <button
              onClick={() => deleteCertification(cert.id)}
              className={DELETE_BUTTON_CLASS}
            >
              <X className={DELETE_ICON_SIZE} />
            </button>

            <div className={CERTIFICATION_CONTENT_CLASS}>
              <div>
                <h4
                  className={`${baseTextClasses} ${CERTIFICATION_HEADER_CLASS}`}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleBlur(cert, "name", e.currentTarget.textContent || "")
                  }
                >
                  {cert.name}
                </h4>
                <div
                  className={`${baseTextClasses} ${CERTIFICATION_ISSUER_CLASS}`}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleBlur(
                      cert,
                      "issuer",
                      e.currentTarget.textContent || ""
                    )
                  }
                >
                  {cert.issuer}
                </div>
              </div>
              <div
                className={`${CERTIFICATION_DATE_CLASS} ${baseTextClasses} education-date`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleBlur(cert, "date", e.currentTarget.textContent || "")
                }
              >
                {cert.date}
              </div>
            </div>

            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${CERTIFICATION_LINK_CLASS} ${baseTextClasses}`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleBlur(cert, "url", e.currentTarget.textContent || "")
                }
              >
                <span>{VIEW_CERTIFICATE_TEXT}</span>
                <ExternalLink className={EXTERNAL_LINK_ICON_SIZE} />
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-2 print:hidden">
        <AddSectionButton
          onClick={addCertification}
          text={ADD_CERTIFICATION_TEXT}
          buttonClassName={ADD_CERTIFICATION_BUTTON_CLASS}
          iconClassName={ADD_ICON_SIZE}
          textClassName={CERTIFICATION_TEXT_CLASS}
          fontOptions={fontOptions}
        />
      </div>
    </div>
  );
};

export default CertificationsSection;
