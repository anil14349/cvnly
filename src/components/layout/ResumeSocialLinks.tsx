import React from "react";
import { Phone, Mail, Linkedin, Github, MapPin, X } from "lucide-react";
import { FontOptions, IconType, SocialLink } from "../../types/common";
import { getIcon, SocialType } from "../../utils/iconUtils";

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
        const iconClasses = "w-4 h-4 text-gray-500 flex-shrink-0";

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

    const containerClasses = `social-links mt-2 flex flex-wrap gap-x-1 gap-y-0.5 ${
        fontOptions.headerAlignment === 'left' ? 'justify-start' :
        fontOptions.headerAlignment === 'right' ? 'justify-end' :
        'justify-center'
    }`;

    return (
        <div className={containerClasses}>
            {socialLinks.map((link) => (
                <div key={link.id} className="flex items-center space-x-1 group">
                    {renderIcon(link.type)}
                    <div className="inline-block min-w-0">
                        <input
                            type="text"
                            value={link.value}
                            onChange={(e) => updateSocialLink(link.id, e.target.value)}
                            placeholder={getDefaultText(link.type)}
                            className="text-sm text-gray-900 dark:text-gray-300 bg-transparent border-none focus:outline-none focus:ring-0 px-0"
                            size={link.value.length || getDefaultText(link.type).length}
                            style={{ width: "auto", minWidth: "5ch" }}
                        />
                    </div>
                    <button
                        onClick={() => deleteSocialLink(link.id)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hidden group-hover:inline-block transition-opacity duration-200"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ResumeSocialLinks;