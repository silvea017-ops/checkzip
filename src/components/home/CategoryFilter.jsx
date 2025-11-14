// components/home/CategoryFilter.jsx
import React from "react";
import { CATEGORIES } from "../../utils/constants";

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-8">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 px-4 sm:px-0">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm transition-all ${
              selectedCategory === category.id
                ? "bg-[#6C63FF] text-white shadow-lg scale-105"
                : "bg-white text-[#666] hover:bg-gray-50 shadow-md"
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
