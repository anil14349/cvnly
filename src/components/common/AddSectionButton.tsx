
import { Plus } from 'lucide-react';
import { SECTION_BUTTON_STYLES, SECTION_BUTTON_TEXT_STYLE } from './constants';

interface AddSectionButtonProps {
    onClick: () => void;
    text: string;
    buttonClassName?: string;
    iconClassName?: string;
    textClassName?: string;
}

export const AddSectionButton = ({
    onClick,
    text,
    buttonClassName,
    iconClassName,
    textClassName
}: AddSectionButtonProps) => {
    const defaultButtonClass = SECTION_BUTTON_STYLES.button;
    const defaultIconClass = SECTION_BUTTON_STYLES.icon;
    const defaultTextClass = SECTION_BUTTON_TEXT_STYLE;

    return (
        <button
            onClick={onClick}
            className={`${defaultButtonClass} ${buttonClassName || ''}`}
        >
            <Plus className={`${defaultIconClass} ${iconClassName || ''}`} />
            <span className={`${defaultTextClass} ${textClassName || ''}`}>
                {text}
            </span>
        </button>
    );
};

export default AddSectionButton; 