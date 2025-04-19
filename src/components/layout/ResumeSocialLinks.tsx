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
                return "/in/your-profile";
            case "github":
                return "your-username";
            case "location":
                return "Your City, Country";
            default:
                return "N/A";
        }
    };

    // Compose style for font family, size, weight, color from fontOptions
    const fontFamily = fontOptions.bodyFont || 'inherit';
    const fontSize = fontOptions.bodySize || 'inherit';
    const fontWeight = fontOptions.bodyWeight || 'inherit';
    const color = fontOptions.bodyColor || 'inherit';
    const fontStyle = fontOptions.bodyItalic ? 'italic' : 'normal';
    const textDecoration = fontOptions.bodyUnderline ? 'underline' : 'none';

    const inputFontStyle = {
        fontFamily,
        fontSize,
        fontWeight,
        color,
        fontStyle,
        textDecoration,
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
                            className={[
                                fontOptions.bodyFont,
                                fontOptions.bodySize,
                                fontOptions.bodyWeight,
                                fontOptions.bodyLineHeight,
                                fontOptions.bodyLetterSpacing,
                                fontOptions.bodyColor,
                                fontOptions.bodyItalic ? "italic" : "",
                                fontOptions.bodyUnderline ? "underline" : "",
                                SOCIAL_LINK_INPUT_CLASS
                            ].filter(Boolean).join(" ")}
                            style={{
                                width: `calc(${(link.value.length || getDefaultText(link.type).length) + 1}ch)`,
                                minWidth: "10ch",
                                ...inputFontStyle
                            }}
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