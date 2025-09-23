import React from "react";
import { FaClock, FaTicketAlt, FaBell } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WeatherInfo from "./WeatherInfo";
import { useTranslation } from "react-i18next";

const MuseumShowcase = () => {
  const { t } = useTranslation();

  const DepartmentLogo = () => (
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      src="/DepartmentofArtandCultureLogo.jpeg"
      alt="Department of Art and Culture Logo"
      className="h-16 w-auto object-contain"
    />
  );

  return (
    <div className="bg-black text-white px-6 md:px-16 py-12 font-sans">
      {/* Clean Top Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6 pb-8 border-b border-gray-700"
      >
        {/* Left Side: Logo and Content */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 flex-1">
          <DepartmentLogo />
          
          <div>
            <h1 className="text-2xl md:text-4xl font-semibold leading-tight text-white max-w-lg">
              {t("art&culture")}
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-1">
              {t("art&culture_description")}
            </p>
          </div>
        </div>

        {/* Clean Vertical Divider */}
        <div className="hidden md:block w-px bg-gray-600 self-stretch mx-6" />

        {/* Right Side: Clean Action Cards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:min-w-[280px] md:max-w-[300px] space-y-3"
        >
          {/* Clean Ticket Booking Card */}
          <Link to="/book-ticket" className="block">
            <motion.div 
              whileHover={{ y: -2 }}
              className="group cursor-pointer border border-gray-600 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <FaTicketAlt className="text-white text-lg group-hover:rotate-[-5deg] transition-transform duration-300" />
                <span className="font-semibold text-white text-sm">
                  {t("TicketBooking")}
                </span>
                <svg 
                  className="w-4 h-4 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </Link>

          {/* Clean Info Cards */}
          <div className="space-y-2">
            <div className="border border-gray-600 rounded-lg p-3 bg-white/5">
              <div className="flex items-center gap-3">
                <FaBell className="text-white text-sm" />
                <span className="text-white text-xs">
                  {t("Notification")}
                </span>
              </div>
            </div>

            <div className="border border-gray-600 rounded-lg p-3 bg-white/5">
              <div className="flex items-center gap-3">
                <FaClock className="text-white text-sm" />
                <span className="text-white text-xs">
                  {t("Time")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Clean Weather Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6"
      >
        <WeatherInfo />
      </motion.div>
    </div>
  );
};

export default MuseumShowcase;
