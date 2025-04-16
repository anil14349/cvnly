import React from "react";
import { IconType, FontOptions, SocialLink } from "../../types/common";
import ResumeHeaderName from "./ResumeHeaderName";
import ResumeHeaderTitle from "./ResumeHeaderTitle";
import ResumeSocialLinks from "./ResumeSocialLinks";

interface ResumeHeaderProps {
  resumeData: {
    name: string;
    title: string;
  };
  socialLinks: SocialLink[];
  deleteSocialLink: (id: string) => void;
  addSocialLink: (type: 'phone' | 'email' | 'linkedin' | 'github' | 'location') => void;
  updateSocialLink: (id: string, value: string) => void;
  fontOptions: FontOptions;
  iconFormat?: IconType;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({
  resumeData,
  socialLinks,
  deleteSocialLink,
  updateSocialLink,
  fontOptions,
  iconFormat = "symbol",
}) => {
  return (
    <header className="resume-header">
      <ResumeHeaderName
        name={resumeData.name}
        fontOptions={fontOptions}
      />
      <ResumeHeaderTitle
        title={resumeData.title}
        fontOptions={fontOptions}
      />
      <ResumeSocialLinks
        socialLinks={socialLinks}
        deleteSocialLink={deleteSocialLink}
        updateSocialLink={updateSocialLink}
        fontOptions={fontOptions}
        iconFormat={iconFormat}
      />
    </header>
  );
};

export default ResumeHeader;
