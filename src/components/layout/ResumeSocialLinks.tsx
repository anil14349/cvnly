import React from "react";
import { Phone, Mail, Linkedin, Github, MapPin, X } from "lucide-react";
import { FontOptions, IconType, SocialLink } from "../../types/common";
import { getIcon, SocialType } from "../../utils/iconUtils";
import {
    SOCIAL_LINK_CONTAINER_CLASS,
    SOCIAL_LINK_ITEM_CLASS,
    SOCIAL_LINK_ICON_CLASS,
    SOCIAL_LINK_INPUT_WRAPPER_CLASS,
    SOCIAL_LINK_INPUT_CLASS,
    SOCIAL_LINK_DELETE_BTN_CLASS
} from "./constants";

interface Props {
    socialLinks: SocialLink[];
    deleteSocialLink: (id: string) => void;
    updateSocialLink: (id: string, value: string) => void;
    fontOptions: FontOptions;
    iconFormat?: IconType;
}

const ResumeSocialLinks: React.FC<Props> = ({
    socialLinks,
    deleteSocialLink,
    updateSocialLink,
    fontOptions,
    iconFormat = "symbol",
}) => {
    const renderIcon = (type: SocialType) => {
        const iconClasses = SOCIAL_LINK_ICON_CLASS;
        const icons: { [key in SocialType]: JSX.Element } = {
            phone: <Phone className={iconClasses} />,
            email: <Mail className={iconClasses} />,
            linkedin: <Linkedin className={iconClasses} />,
            github: <Github className={iconClasses} />,
            location: <MapPin className={iconClasses} />,
        };

        return iconFormat === "symbol"
            ? icons[type]
            : (
                <span className="text-base text-gray-500 flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    {getIcon(type, iconFormat)}
                </span>
            );
    };

    const getDefaultText = (type: SocialType) => {
        switch (type) {
            case "phone":
                return "123-456-7890";
            case "email":
                return "your.email@example.com";
            case "linkedin":
                return "linkedin.com/in/yourprofile";
            case "github":
                return "github.com/yourusername";
            case "location":
                return "Your City, Country";
            default:
                return "N/A";
        }
    };

    const containerClasses = `${SOCIAL_LINK_CONTAINER_CLASS}${
        fontOptions.headerAlignment === 'left' ? 'justify-start' :
        fontOptions.headerAlignment === 'right' ? 'justify-end' :
            'justify-center'
        }`;

    return (
        <div className={containerClasses}>
            {socialLinks.map((link) => (
                <div key={link.id} className={SOCIAL_LINK_ITEM_CLASS}>
                    {renderIcon(link.type)}
                    <div className={SOCIAL_LINK_INPUT_WRAPPER_CLASS}>
                        <input
                            type="text"
                            value={link.value}
                            onChange={(e) => updateSocialLink(link.id, e.target.value)}
                            placeholder={getDefaultText(link.type)}
                            className={SOCIAL_LINK_INPUT_CLASS}
                            size={link.value.length || getDefaultText(link.type).length}
                            style={{ width: "auto", minWidth: "5ch" }}
                        />
                    </div>
                    <button
                        onClick={() => deleteSocialLink(link.id)}
                        className={SOCIAL_LINK_DELETE_BTN_CLASS}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ResumeSocialLinks;