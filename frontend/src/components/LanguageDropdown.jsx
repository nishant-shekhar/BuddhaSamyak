import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const languages = [
    { code: "en", label: "English", native: "English" },
    { code: "hi", label: "हिन्दी", native: "हिन्दी(Hindi)" },
    { code: "th", label: "ไทย", native: "ไทย(Thai)" },
    { code: "ja", label: "日本語", native: "日本語(Japanese)" },
    { code: "zh", label: "中文", native: "中文(Chinese)" },
    { code: "ko", label: "한국어", native: "한국어(Korean)" },
];

// Custom Chevron Icon Component
const ChevronDown = ({ className }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const LanguageDropdown = () => {
    const { i18n } = useTranslation();
    const [selected, setSelected] = useState("English");
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageChange = (lang) => {
        setSelected(lang.label);
        i18n.changeLanguage(lang.code);
        setOpen(false);
    };

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95,
            y: -8,
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.15,
                ease: "easeOut",
                staggerChildren: 0.02,
                delayChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            x: -8,
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.15,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    const chevronVariants = {
        rest: { rotate: 0 },
        open: { rotate: 180 }
    };

    return (
        <div className="relative flex items-center" ref={dropdownRef}>
            <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setOpen(!open)}
                className="relative bg-white/20 backdrop-blur-md px-4 py-3 rounded-full text-xs text-white font-medium shadow-lg border border-white/20 cursor-pointer hover:bg-white/30 transition-all duration-200"
                style={{ fontFamily: '"Playfair Display", serif' }}
            >
                <div className="flex items-center gap-1.5">
                    <span>{selected}</span>
                    <motion.div
                        variants={chevronVariants}
                        animate={open ? "open" : "rest"}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-3 h-3 text-white/80" />
                    </motion.div>
                </div>
            </motion.div>

            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className="fixed inset-0 z-20"
                            onClick={() => setOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute top-10 left-0 z-30 w-44 bg-white/10 backdrop-blur-xl rounded-lg shadow-2xl border border-white/20 overflow-hidden"
                        >
                            <div className="py-1">
                                {languages.map((lang) => (
                                    <motion.div
                                        key={lang.code}
                                        variants={itemVariants}
                                        whileHover={{
                                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                                            x: 2,
                                            transition: { duration: 0.1 }
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleLanguageChange(lang)}
                                        className={`relative px-3 py-2 cursor-pointer text-xs transition-all duration-150 ${
                                            selected === lang.label
                                                ? "bg-white/20 text-white font-medium"
                                                : "text-white/90 hover:text-white"
                                        }`}
                                    >
                                        <span>{lang.native}</span>

                                        {/* Active indicator */}
                                        {selected === lang.label && (
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                className="absolute left-0 bottom-0 h-px bg-white/60"
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageDropdown;
