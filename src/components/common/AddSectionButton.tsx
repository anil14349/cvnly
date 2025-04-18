import React from 'react';
import { Plus } from 'lucide-react';
import { SECTION_BUTTON_STYLES, SECTION_BUTTON_VARIANTS } from './constants';

type ButtonVariant = keyof typeof SECTION_BUTTON_VARIANTS.primary;

interface AddSectionButtonProps {
    onClick: () => void;
    text: string;
    variant?: ButtonVariant;
    buttonClassName?: string;
    iconClassName?: string;
    textClassName?: string;
}

const AddSectionButton: React.FC<AddSectionButtonProps> = ({
    onClick,
    text,
    variant = 'button',
    buttonClassName,
    iconClassName,
    textClassName
}) => {
    const defaultButtonClass = variant ? SECTION_BUTTON_VARIANTS.primary[variant] : SECTION_BUTTON_STYLES.button;
    const defaultIconClass = SECTION_BUTTON_STYLES.icon;
    const defaultTextClass = SECTION_BUTTON_STYLES.text;

    return (
        <button
            onClick={onClick}
            className={buttonClassName || defaultButtonClass}
            aria-label={text}
        >
            <Plus
                className={iconClassName || defaultIconClass}
                aria-hidden="true"
            />
            <span className={textClassName || defaultTextClass}>
                {text}
            </span>
        </button>
    );
};

export default AddSectionButton; 