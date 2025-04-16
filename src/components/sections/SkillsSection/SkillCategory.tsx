import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import type { Skill } from "../../../types/skill";
import type { FontOptions } from "../../../types/common";
import FormattedText from "../../common/FormattedText";

interface SkillCategoryProps {
  category: Skill;
  fontOptions: FontOptions;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({
  category,
  fontOptions,
  updateSkill,
  deleteSkill,
}) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      updateSkill(category.id, {
        items: [...category.items, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleEditSkill = (index: number, value: string) => {
    const updatedItems = [...category.items];
    updatedItems[index] = value;
    updateSkill(category.id, { items: updatedItems });
  };

  const handleDeleteSkill = (index: number) => {
    const updatedItems = category.items.filter((_, i) => i !== index);
    updateSkill(category.id, { items: updatedItems });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSkill(category.id, { category: e.target.value });
  };

  return (
    <div
      className="skill-category relative group/category rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200"
      role="group"
      aria-label={`Skill category: ${category.category}`}
      style={{
        background:
          fontOptions.theme === 'dark'
            ? fontOptions.widgetBgDark || '#1e293b'
            : fontOptions.widgetBgLight || '#fff',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={category.category}
          onChange={handleCategoryChange}
          className="bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded px-0 py-1 w-full font-semibold text-gray-800 dark:text-gray-100"
          style={{
            fontSize: "1.25rem",
            fontFamily: fontOptions.headerFont,
            lineHeight: "1.2",
          }}
          placeholder="Category Title"
          aria-label="Category title"
        />
        <button
          onClick={() => deleteSkill(category.id)}
          className="text-gray-400 hover:text-red-500 opacity-0 group-hover/category:opacity-100 transition-all duration-200 print:hidden ml-2 p-1 rounded hover:bg-red-500/10"
          aria-label={`Delete category: ${category.category}`}
        >
          <X className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>

      <ul className="space-y-2 list-none pl-0" role="list">
        {category.items.map((item: string, index: number) => (
          <li
            key={index}
            className="group/skill relative flex items-center"
            role="listitem"
          >
            <span className="text-blue-500 dark:text-blue-400 mr-2">•</span>
            <div className="flex-1 min-w-0">
              <FormattedText
                text={item}
                fontOptions={{
                  ...fontOptions,
                  bodySize: "1rem",
                  bodyColor: "currentColor",
                }}
                onTextChange={(newText) => handleEditSkill(index, newText)}
                isEditing={true}
                className="block w-full text-gray-600 dark:text-gray-300"
              />
            </div>
            <button
              onClick={() => handleDeleteSkill(index)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover/skill:opacity-100 transition-all duration-200 print:hidden ml-2 p-1 rounded hover:bg-red-500/10"
              aria-label={`Delete skill: ${item}`}
            >
              <X className="w-3 h-3" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center mt-3 group/add">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new skill"
          className="bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded px-2 py-1 w-full text-gray-500 dark:text-gray-400 placeholder-gray-400 dark:placeholder-gray-500"
          style={{
            fontSize: "1rem",
            fontWeight: fontOptions.bodyWeight,
            fontFamily: fontOptions.bodyFont,
            lineHeight: "1.5",
          }}
          aria-label="Add new skill"
        />
        <button
          onClick={handleAddSkill}
          className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200 print:hidden ml-2 p-1 rounded hover:bg-blue-500/10 dark:hover:bg-blue-400/10 opacity-0 group-hover/add:opacity-100"
          aria-label="Add skill"
          disabled={!newSkill.trim()}
        >
          <Plus className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default SkillCategory;
