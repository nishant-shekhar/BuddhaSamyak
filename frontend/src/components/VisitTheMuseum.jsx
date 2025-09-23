import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Enhanced Individual Card Component
const VisitInformationCard = ({ description, imageUrl, heading, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.6, 
      delay: index * 0.15, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }}
    whileHover={{ y: -8 }}
    className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-400 transition-all duration-500 hover:shadow-2xl hover:shadow-white/10"
  >
    {/* Image Container with Overlay */}
    <div className="relative h-52 sm:h-60 md:h-64 w-full overflow-hidden">
      <motion.img
        src={imageUrl}
        alt={heading}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      
      {/* Subtle overlay for better text readability on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Minimalist corner accent */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-gray-300 rounded-full opacity-60 group-hover:bg-white group-hover:opacity-100 transition-all duration-300" />
    </div>

    {/* Content Container */}
    <div className="p-6 relative">
      {/* Title with subtle animation */}
      <motion.h3 
        className="text-lg font-semibold mb-3 text-black group-hover:text-gray-800 transition-colors duration-300 tracking-wide"
        layout
      >
        {heading}
      </motion.h3>
      
      {/* Description with fade-in effect */}
      <motion.p 
        className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
        layout
      >
        {description}
      </motion.p>
      
      {/* Minimalist bottom accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-gray-400 transition-all duration-500" />
    </div>
  </motion.div>
);

// Enhanced Main Component
const VisitTheMuseum = () => {
  const { t } = useTranslation();

  const visitOptions = [
    {
      heading: t("visit_option_ticket_heading1"),
      description: t("visit_option_ticket_desc1"),
      imageUrl: "/gallery.jpeg",
    },
    {
      heading: t("visit_option_verify_heading1"),
      description: t("visit_option_verify_desc1"),
      imageUrl: "/buddhabg3.png",
    },
    {
      heading: t("visit_option_highlights_heading1"),
      description: t("visit_option_highlights_desc1"),
      imageUrl: "library.png",
    },
    {
      heading: t("visit_option_amenities_heading1"),
      description: t("visit_option_amenities_desc1"),
      imageUrl: "/visitorsCenter.jpeg",
    },
  ];

  return (
    <div className="bg-black w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enhanced Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide">
              {t("visit_the_museum_title1")}
            </h2>
            
            {/* Minimalist underline accent */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent absolute -bottom-2 left-0"
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-300 text-lg font-light mt-6 max-w-2xl mx-auto"
          >
            Explore everything our museum has to offer through these curated experiences
          </motion.p>
        </motion.div>

        {/* Enhanced Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {visitOptions.map((option, idx) => (
            <VisitInformationCard
              key={idx}
              index={idx}
              heading={option.heading}
              description={option.description}
              imageUrl={option.imageUrl}
            />
          ))}
        </div>

        {/* Subtle bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-gray-700"
        >
          <p className="text-gray-400 text-sm font-light">
            Each experience is crafted to provide meaningful insights into our collections
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default VisitTheMuseum;
