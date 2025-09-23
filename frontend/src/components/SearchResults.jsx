import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes, FaGlobe } from "react-icons/fa";

const SearchResults = ({
  searchQuery,
  searchResults,
  isSearching,
  onClear,
  onResultClick,
  isVisible,
  isMobile = false, // New prop to determine if it's mobile context
}) => {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 mt-2 max-h-80 md:max-h-96 overflow-hidden ${
          isMobile ? "w-full" : "w-screen md:w-auto -mx-4 md:mx-0"
        }`}
      >
        {/* Header */}
        <div className="px-3 md:px-4 py-2 md:py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaSearch className="text-gray-500 text-xs md:text-sm" />
            <span className="text-xs md:text-sm text-gray-700 truncate">
              {isSearching
                ? "Searching..."
                : searchResults.length > 0
                ? `${searchResults.length} result${
                    searchResults.length !== 1 ? "s" : ""
                  } for "${searchQuery}"`
                : searchQuery.trim()
                ? `No results for "${searchQuery}"`
                : "Start typing to search..."}
            </span>
          </div>
          <button
            onClick={onClear}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <FaTimes className="text-xs md:text-sm" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-64 md:max-h-80 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center py-6 md:py-8">
              <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-gray-600"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-1 md:py-2">
              {searchResults.map((result, index) => (
                <motion.div
                  key={`${result.langCode}-${result.key}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 md:px-4 py-2 md:py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => onResultClick(result)}
                >
                  <div className="flex items-start justify-between gap-2 md:gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs md:text-sm font-medium text-gray-900 truncate">
                        {result.value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Key: {result.key}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                      <FaGlobe className="text-gray-400 text-xs" />
                      <span className="text-xs text-gray-500 bg-gray-100 px-1 md:px-2 py-1 rounded">
                        {result.language}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : searchQuery.trim() ? (
            <div className="py-6 md:py-8 text-center text-gray-500 px-4">
              <FaSearch className="mx-auto text-xl md:text-2xl mb-2 opacity-50" />
              <p className="text-xs md:text-sm">No matches found</p>
              <p className="text-xs mt-1">
                Try different keywords or check spelling
              </p>
            </div>
          ) : (
            <div className="py-6 md:py-8 text-center text-gray-500 px-4">
              <FaSearch className="mx-auto text-xl md:text-2xl mb-2 opacity-50" />
              <p className="text-xs md:text-sm">Search across all languages</p>
              <p className="text-xs mt-1">
                Type to find content in English, Hindi, Japanese, Korean, Thai,
                or Chinese
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchResults;
