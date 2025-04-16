// utils/iconUtils.ts

import { IconType } from "../types/common"; // Adjust path based on your structure

// Supported social types
export type SocialType = "phone" | "email" | "linkedin" | "github" | "location";

// Returns icon representation based on type and format
export const getIcon = (
  type: SocialType,
  iconFormat: IconType = "symbol"
): string => {
  const iconMap: Record<SocialType, Record<IconType, string>> = {
    phone: {
      emoji: "📱",
      symbol: "☎",
      ascii: "(T)",
    },
    email: {
      emoji: "📧",
      symbol: "✉",
      ascii: "@",
    },
    linkedin: {
      emoji: "🔗",
      symbol: "🔗",
      ascii: "in/",
    },
    github: {
      emoji: "🐙",
      symbol: "⟁",
      ascii: "GH/",
    },
    location: {
      emoji: "📍",
      symbol: "⌖",
      ascii: "[L]",
      },
    
  };

  return iconMap[type]?.[iconFormat] || iconMap[type]?.emoji || "";
};
