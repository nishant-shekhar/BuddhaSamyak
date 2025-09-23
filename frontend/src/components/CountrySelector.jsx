// CountrySelector.js
import React, { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { FaGlobe } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { motion } from "framer-motion";

const CountrySelector = ({ value, onChange, error }) => {
  const options = useMemo(() => countryList().getData(), []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "56px", // Match py-3.5 height
      padding: "0 16px", // Match px-4
      border: state.isFocused 
        ? "1px solid #000000" 
        : error 
          ? "1px solid #ef4444"
          : "1px solid #d1d5db", // border-gray-300
      borderRadius: "12px", // Match rounded-xl
      boxShadow: "none",
      "&:hover": {
        border: state.isFocused 
          ? "1px solid #000000" 
          : error 
            ? "1px solid #ef4444"
            : "1px solid #9ca3af",
      },
      backgroundColor: "#ffffff",
      cursor: "text",
      transition: "all 200ms ease",
    }),
    
    valueContainer: (provided) => ({
      ...provided,
      padding: "0",
      margin: "0",
    }),
    
    input: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
      color: "#000000",
      fontSize: "16px",
    }),
    
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af", // placeholder-gray-400
      fontSize: "16px",
      margin: "0",
    }),
    
    singleValue: (provided) => ({
      ...provided,
      color: "#000000", // text-black
      fontSize: "16px",
      margin: "0",
    }),
    
    indicatorSeparator: () => ({
      display: "none",
    }),
    
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#6b7280", // text-gray-500
      padding: "0",
      "&:hover": {
        color: "#000000",
      },
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 200ms ease",
    }),
    
    menu: (provided) => ({
      ...provided,
      borderRadius: "12px", // Match rounded-xl
      border: "1px solid #d1d5db", // border-gray-300
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
      zIndex: 9999,
    }),
    
    menuList: (provided) => ({
      ...provided,
      padding: "8px",
      maxHeight: "200px",
    }),
    
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? "#000000" 
        : state.isFocused 
          ? "#f9fafb" 
          : "transparent",
      color: state.isSelected ? "#ffffff" : "#000000",
      padding: "12px 16px",
      margin: "2px 0",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: state.isSelected ? "500" : "400",
      "&:active": {
        backgroundColor: state.isSelected ? "#000000" : "#f3f4f6",
      },
    }),
    
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "14px",
      padding: "12px 16px",
    }),
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-black mb-2">
        <FaGlobe className="inline mr-2 text-gray-600" />
        Country *
      </label>
      <Select
        options={options}
        value={options.find((c) => c.label === value) || null}
        onChange={(val) => onChange(val ? val.label : "")}
        styles={customStyles}
        placeholder="Select your country"
        defaultValue={options.find((c) => c.label === "India")}
        isSearchable={true}
        isClearable={false}
        classNamePrefix="country-select"
        menuPortalTarget={document.body}
        menuPosition="fixed"
      />
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 bg-red-50 py-2 px-3 rounded-lg border border-gray-300 text-sm mt-2 flex items-center gap-2"
        >
          <BiError className="text-base flex-shrink-0" />
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default CountrySelector;
