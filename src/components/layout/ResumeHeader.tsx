import React from "react";
import { IconType, FontOptions, SocialLink } from "../../types/common";
import ResumeHeaderName from "./ResumeHeaderName";
import ResumeHeaderTitle from "./ResumeHeaderTitle";
import ResumeSocialLinks from "./ResumeSocialLinks";
import ResumeHeaderLine from "./ResumeHeaderLine";

interface ResumeHeaderProps {
  resumeData: {
    name: string;
    title: string;
  };
  setResumeData: (data: any) => void;
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
  setResumeData,
  addSocialLink
}) => {
  const handleRemoveTitle = () => {
    setResumeData((prev: any) => ({ ...prev, title: '' }));
  };

  return (
    <div className="mt-2 ">
      <ResumeHeaderName
        name={resumeData.name}
        fontOptions={fontOptions}
      />
      <ResumeHeaderTitle
        title={resumeData.title}
        fontOptions={fontOptions}
        onDelete={handleRemoveTitle}
      />
      <ResumeSocialLinks
        socialLinks={socialLinks}
        deleteSocialLink={deleteSocialLink}
        updateSocialLink={updateSocialLink}
        fontOptions={fontOptions}
        iconFormat={iconFormat}
      />
      <ResumeHeaderLine
        fontOptions={fontOptions}
      />
    </div>
  );
};

export default ResumeHeader;
