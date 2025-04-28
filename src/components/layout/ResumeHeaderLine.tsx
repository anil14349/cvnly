import React from "react";
import { FontOptions } from "../../types/common";

interface ResumeHeaderLineProps {
    fontOptions: FontOptions;
}

const ResumeHeaderLine: React.FC<ResumeHeaderLineProps> = ({ fontOptions }) => {
    // Use a lighter, more subtle color for the header line
    const getHeaderLineColor = () => {
        // If dark mode, use lighter colors
        if (fontOptions.theme === 'dark') {
            return 'rgba(229, 231, 235, 0.93)'; // Light gray with low opacity for dark mode
        }
        // For light mode, use subtle gray
        return 'rgba(232, 234, 238, 0.97)'; // Gray-400 with low opacity
    };

    return (
        <div
            className="w-full h-[1px] mt-1"
            style={{
                backgroundColor: getHeaderLineColor(),
                boxShadow: '0 0.5px 0 rgba(0, 0, 0, 0.05)'
            }}
        />
    );
};

export default ResumeHeaderLine; 