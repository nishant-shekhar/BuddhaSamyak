import React, { useState, useRef, useEffect } from "react";
import { FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import LanguageDropdown from "./LanguageDropdown";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useSearch from "../hooks/useSearch";

const Navbar = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    clearSearch,
    hasResults,
  } = useSearch();

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Could implement additional search logic here
    }
  };

  const handleResultClick = (result) => {
    console.log("Clicked result:", result);
    setSearchOpen(false);
    setMobileSearchOpen(false);
    clearSearch();
    // Could implement navigation logic here
  };

  return (
    <nav className="w-full shadow-md bg-black text-white font-sans">
      {/* Main Top Section */}
      <div className="px-4 py-4 md:px-6 md:py-4 border-b border-gray-700/30">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center justify-center h-full md:transform md:translate-y-3">
            <Link
              to="/"
              className="flex items-center gap-2 md:gap-4 md:pl-6 no-underline h-full"
            >
              <div className="flex items-center h-full">
                <img
                  src="/buddha3.png"
                  alt="Logo"
                  className="h-12 md:h-20 w-auto object-contain"
                />
              </div>

              <div className="flex flex-col justify-center h-full font-serif leading-none">
                <h1 className="text-lg md:text-3xl font-light">
                  <span className="text-xl md:text-5xl font-semibold">
                    बुद्ध सम्यक दर्शन
                  </span>
                  <span className="text-sm md:text-2xl block pl-10">
                     संग्रहालय-सह-स्मृति स्तूप, वैशाली
                  </span>
                </h1>
              </div>
            </Link>
          </div>

          {/* Right: Icons + Hamburger */}
          <div className="flex items-center gap-2 md:gap-6 text-gray-300 text-sm font-medium">
            <div className="hidden md:block">
              <LanguageDropdown />
            </div>

            <div className="hidden md:block">
              <Link to="/book-ticket">
                <button
                  style={{ fontFamily: '"Playfair Display", serif' }}
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition inline-flex items-center gap-2 border border-gray-700 hover:border-gray-100 text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("FreeTickets")}
                </button>
              </Link>
            </div>
            {/* Mobile Hamburger */}
            <div className="md:hidden block ml-4">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Nav Links (in same div but shown below icons) */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden md:block"
          } bg-black mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row justify-end md:gap-10 gap-4 font-semibold text-md px-4 md:px-0 pb-4 md:pb-0">

            <div className="flex items-center gap-2 w-full md:hidden">
              <li className="md:hidden">
                <LanguageDropdown />
              </li>
              <li className="md:hidden">
                <Link to="/book-ticket" onClick={() => setMenuOpen(false)}>
                  <button
                    style={{ fontFamily: '"Playfair Display", serif' }}
                    className="bg-black text-white px-7 py-2 rounded-full hover:bg-gray-800 transition inline-flex items-center gap-2 border border-gray-700 hover:border-gray-100 text-sm w-full justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t("FreeTickets")}
                  </button>
                </Link>
              </li>
            </div>

              <Link to="/">
                  <li
                      className="hover:underline underline-offset-8 hover:decoration-white cursor-pointer"
                      onClick={() => {
                          const el = document.getElementById("exhibitions");
                          if (el) {
                              el.scrollIntoView({ behavior: "smooth" });
                              setMenuOpen(false);
                          }
                      }}
                  >
                      {t("Home_navbar")}
                  </li>
              </Link>

            <Link to="/">
              <li
                className="hover:underline underline-offset-8 hover:decoration-white cursor-pointer"
                onClick={() => {
                  const el = document.getElementById("visit");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    setMenuOpen(false);
                  }
                }}
              >
                {t("VisitPlanner")}
              </li>
            </Link>


            <Link to="/gallery">
            <li
              className="hover:underline underline-offset-8 hover:decoration-white cursor-pointer"

            >
              {t("Gallery")}
            </li>

            </Link>
            <Link to="/about-museum">
              <li
                className="hover:underline underline-offset-8 hover:decoration-white cursor-pointer"
                onClick={() => {
                  const el = document.getElementById("learn");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    setMenuOpen(false);
                  }
                }}
              >
                {t("AboutUs")}
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
