"use client"

import React, { useMemo } from "react";

const FILTER_INITIAL_VISIBLE = 4;

type FilterSectionProps = {
  title: any;
  options: any;
  isExpanded: any;
  toggle: () => any;
  selectedOption: any;
  onOptionClick: (option: any) => any;
  variant?: any;
};

const FilterSection: React.FC<FilterSectionProps>  = ({
  title,
  options,
  isExpanded,
  toggle,
  selectedOption,
  onOptionClick,
  variant = "checkbox", // default style
}) => {
  // Ensure options is always an array of strings (safe guard)
  const visibleOptions = useMemo(() => {
    if (!Array.isArray(options)) return [];
    // Filter out non-string options just in case
    return options.filter(opt => typeof opt === "string");
  }, [options]);

  return (
    <div className="text-gray-600">
      <h6
        className="capitalize mb-3 text-[#343A3F] cursor-pointer select-none"
        onClick={toggle}
      >
        {title}
      </h6>

      <div className={variant === "buttons" ? "flex flex-col gap-2" : ""}>
        {visibleOptions.map((option) => {
          if (typeof option !== "string") return null;          const cleanOption = option.replace(/\s*\(\d+,?\d*\)$/, "");
          // Case-insensitive comparison for options
          const isSelected = selectedOption && 
            (selectedOption.toLowerCase() === cleanOption.toLowerCase());

          if (variant === "buttons") {
            return (
              <button
                key={option}
                type="button"
                onClick={() => onOptionClick(cleanOption)}
                className={`text-sm border rounded-md px-2 py-1 text-left w-full transition ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                }`}
              >
                {cleanOption}
              </button>
            );
          }

          // Default (checkbox-style)
          return (
            <div
              className="form-check text-[14px] mb-[10px] flex gap-[10px]"
              key={option}
            >
              <input
                className="size-4 border border-[#121619] shrink-0"
                type="checkbox"
                id={`${title}-${option}`}
                checked={isSelected}
                onChange={() => onOptionClick(cleanOption)}
              />
              <label className="form-check-label" htmlFor={`${title}-${option}`}>
                {option}
              </label>
            </div>
          );
        })}
      </div>

      {/* {Array.isArray(options) && options.length > FILTER_INITIAL_VISIBLE && (
        <button
          onClick={toggle}
          className="mt-2 text-[12px] underline text-[#21272A] cursor-pointer"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )} */}
    </div>
  );
};

export default FilterSection;
