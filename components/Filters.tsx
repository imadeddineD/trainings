"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterSection from "./FilterSection";


const filterKeys = {
  category: "Category",
  subCategory: "Sub Category",
  location: "Location",
  duration: "Duration",
};

const Filters = () => {
  const searchParams = useSearchParams();
const router = useRouter();
  const [isHidden, setIsHidden] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    subCategory: true,
    location: true,
    duration: true,
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  const filters = {
    location: [
      "London",
      "Paris",
      "Damascus",
      "Manchester",
      "Istanbul",
      "Amsterdam",
      "Rome",
      "Madrid",
      "Barcelona",
      "Athens",
      "Dubai",
      "Sharm El Sheikh",
    ],
    duration: ["One week", "Two weeks"],
  };

  const getCurrentFilters = () => {
    return {
      category: searchParams.get("category") || null,
      subCategory: searchParams.get("subCategory") || null,
      location: searchParams.get("city") || null,
      duration: searchParams.get("duration") || null,
    };
  };

  const selectedFilters:any = getCurrentFilters();

  // Update URL parameters
  const updateUrlParams = (updates:any) => {
    const currentParams = new URLSearchParams(searchParams.toString());

  Object.entries(updates).forEach(([key, value]:any) => {
    if (value === null || value === "") {
      currentParams.delete(key);
    } else {
      currentParams.set(key, value);
    }
  });

  currentParams.set("page", "1"); // Reset pagination if needed

  router.replace(`?${currentParams.toString()}`);
  };

  // Fetch categories on mount
  const VITE_API_LINK="https://api.euptc.com"
  useEffect(() => {
    fetch(`${VITE_API_LINK}/api/courses/main-category`)
      .then((res) => res.json())
      .then((data) => {
        const categoryNames = data.map((cat:any) => cat.category);
        setCategories(categoryNames);
      })
      .catch((err) => {
        console.error("Failed to fetch categories", err);
        setCategories([]);
      });
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    const currentCategory  = selectedFilters.category;

    if (!currentCategory) {
      setSubCategories([]);
      setLoadingSubCategories(false);
      return;
    }

    setLoadingSubCategories(true);
    fetch(
      `${
        VITE_API_LINK
      }/api/courses/category/${encodeURIComponent(currentCategory)}`
    )
      .then((res) => res.json())
      .then((data) => {
        const subCategoryList = data.map((item:any) => item.sub_category);
        setSubCategories(subCategoryList);
      })
      .catch((err) => {
        console.error("Failed to fetch subcategories", err);
        setSubCategories([]);
      })
      .finally(() => {
        setLoadingSubCategories(false);
      });
  }, [selectedFilters.category]);

  const toggleSection = useCallback((sectionName:any) => {
    setExpandedSections((prev:any) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  }, []);

  const handleOptionClick = (sectionName:any, option:any) => {
    const currentValue = selectedFilters[sectionName];
    let updates:any = {}; // Toggle the filter (deselect if already selected)
    if (currentValue === option) {
      // Deselecting current option
      if (sectionName === "location") {
        updates.city = null;
      } else if (sectionName === "duration") {
        updates.duration = null;
      } else {
        updates[sectionName] = null;
      }
    } else {
      // Selecting new option
      if (sectionName === "location") {
        updates.city = option; // Map location to city for backend
      } else if (sectionName === "duration") {
        updates.duration = option;
      } else {
        updates[sectionName] = option;
      }
    }

    // Reset subCategory if category is changed
    if (sectionName === "category") {
      updates.subCategory = null;
    }

    updateUrlParams(updates);
  };

  const toggleFilter = useCallback(() => {
    setIsHidden((prev) => !prev);
  }, []);

  return (
    <div className="flex min-[1100px]:flex-col gap-6 max-[1100px]:mt-5">
      <h4 className="text-[18px] font-bold text-[#21272A] max-[1100px]:hidden">
        Filter by
      </h4>
      <h4
        className="text-[18px] font-bold text-[#21272A] cursor-pointer w-fit h-fit select-none min-[1100px]:hidden text-nowrap"
        onClick={toggleFilter}
      >
        {isHidden ? "Show Filters" : "Hide Filters"}{" "}
        <span>{isHidden ? "▼" : "▲"}</span>
      </h4>

      <div
        className={`max-[1100px]:${
          isHidden ? "hidden" : "visible"
        } flex min-[1100px]:flex-col [&>*]:flex-1 gap-6 max-[1100px]:justify-evenly max-[1100px]:mt-5 w-full`}
      >

        {/* Category Filter */}
        <FilterSection
          title={filterKeys.category}
          options={categories}
          isExpanded={expandedSections.category}
          toggle={() => toggleSection("category")}
          selectedOption={selectedFilters.category}
          onOptionClick={(option:any) => handleOptionClick("category", option)}
        />

        {/* SubCategory Filter */}
        {selectedFilters.category && (
          <FilterSection
            title={filterKeys.subCategory}
            options={subCategories}
            isExpanded={expandedSections.subCategory}
            toggle={() => toggleSection("subCategory")}
            selectedOption={selectedFilters.subCategory}
            onOptionClick={(option:any) => handleOptionClick("subCategory", option)}
          
          />
        )}

        {/* Location Filter */}
        <FilterSection
          title={filterKeys.location}
          options={filters.location}
          isExpanded={expandedSections.location}
          toggle={() => toggleSection("location")}
          selectedOption={selectedFilters.location}
          onOptionClick={(option:any) => handleOptionClick("location", option)}
        />

        {/* Duration Filter */}
        <FilterSection
          title={filterKeys.duration}
          options={filters.duration}
          isExpanded={expandedSections.duration}
          toggle={() => toggleSection("duration")}
          selectedOption={selectedFilters.duration}
          onOptionClick={(option:any) => handleOptionClick("duration", option)}
        />
      </div>
    </div>
  );
};

export default Filters;
