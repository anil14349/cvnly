import { Phone, Mail, Linkedin, Github, MapPin } from "lucide-react";
import { getIcon, SocialType } from "../../utils/iconUtils";
import { IconType } from "../../types/common";

export const renderIcon = (type: SocialType, iconFormat: IconType = "symbol") => {
    const iconClasses = "w-4 h-4 text-gray-500 flex-shrink-0";
    const icons: { [key in SocialType]: JSX.Element } = {
        phone: <Phone className={iconClasses} />,
        email: <Mail className={iconClasses} />,
        linkedin: <Linkedin className={iconClasses} />,
        github: <Github className={iconClasses} />,
        location: <MapPin className={iconClasses} />,
    };

    return iconFormat === "symbol" ? (
        icons[type]
    ) : (
        <span className="text-base text-gray-500 flex-shrink-0 w-5 h-5 flex items-center justify-center">
            {getIcon(type, iconFormat)}
        </span>
    );
};
