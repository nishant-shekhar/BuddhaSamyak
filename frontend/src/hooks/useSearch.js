import { useState, useEffect, useMemo } from "react";

// Import all translation files
import enTranslations from "../../public/locales/en/translation.json";
import hiTranslations from "../../public/locales/hi/translation.json";
import jaTranslations from "../../public/locales/ja/translation.json";
import koTranslations from "../../public/locales/ko/translation.json";
import thTranslations from "../../public/locales/th/translation.json";
import zhTranslations from "../../public/locales/zh/translation.json";

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Combined translations data
  const allTranslations = useMemo(() => {
    const languages = {
      en: { name: "English", data: enTranslations },
      hi: { name: "हिंदी", data: hiTranslations },
      ja: { name: "日本語", data: jaTranslations },
      ko: { name: "한국어", data: koTranslations },
      th: { name: "ไทย", data: thTranslations },
      zh: { name: "中文", data: zhTranslations },
    };

    const searchableContent = [];

    Object.entries(languages).forEach(([langCode, lang]) => {
      Object.entries(lang.data).forEach(([key, value]) => {
        searchableContent.push({
          key,
          value,
          language: lang.name,
          langCode,
          type: "translation",
        });
      });
    });

    return searchableContent;
  }, []);

  // Search function
  const performSearch = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    const results = allTranslations.filter(
      (item) =>
        item.value.toLowerCase().includes(query) ||
        item.key.toLowerCase().includes(query)
    );

    return results.slice(0, 10); // Limit to top 10 results
  }, [searchQuery, allTranslations]);

  useEffect(() => {
    setIsSearching(true);
    const debounceTimer = setTimeout(() => {
      setSearchResults(performSearch);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [performSearch]);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    clearSearch,
    hasResults: searchResults.length > 0,
  };
};

export default useSearch;
