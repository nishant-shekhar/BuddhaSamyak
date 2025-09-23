import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function ImgGrid() {
  const { t } = useTranslation();
  
  const images = [
    "https://images.livemint.com/img/2023/04/15/original/Bihar_Museum_5_1681531344757.jpg",
    "https://assets.cntraveller.in/photos/60ba27a40f3a5367ec9feabf/master/w_1600%2Cc_limit/Didarganj-Yakshi-Custom.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/16/64/99/b5/gandhara-bodhisattva.jpg",
    "https://images.livemint.com/img/2023/04/15/original/Bihar_Museum_4_1681529943952.jpg",
    "https://cdn.exoticindia.com/images/products/original/books-2019-004/hac866j.jpg",
    "https://images.livemint.com/img/2023/04/15/original/Narodakini_Bihar_Museum_1681531527538.jpg",
    "https://wanderinganusuya.com/wp-content/uploads/2020/08/Inside-Regional-Art-Gallery-scaled.jpg",
  ];

  // Grid item component with enhanced styling (no borders)
  const GridImage = ({ src, className, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className={`${className} overflow-hidden rounded-lg group relative`}
    >
      <motion.img 
        src={src} 
        alt="Museum Collection"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      
      {/* Subtle overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Minimalist corner accent */}
      <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
    </motion.div>
  );

  return (
    <div className="bg-black px-6 pt-16 pb-20 relative z-0">
      
      {/* Enhanced Section Header - Left Aligned */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-left mb-16"
      >
        <div className="relative inline-block">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide">
            {t("ImgGridHeading")}
          </h2>
          
          {/* Minimalist underline accent */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-gray-400 via-gray-400 to-transparent absolute -bottom-2 left-0"
          />
        </div>
      </motion.div>

      {/* Enhanced Grid Layout */}
      <div className="grid grid-cols-6 grid-rows-12 gap-4 px-2 md:px-6">
        <GridImage 
          src={images[0]} 
          className="col-span-2 row-span-5 col-start-1 row-start-2" 
          index={0}
        />
        <GridImage 
          src={images[1]} 
          className="col-span-2 row-span-5 col-start-3 row-start-1" 
          index={1}
        />
        <GridImage 
          src={images[2]} 
          className="col-span-2 row-span-5 col-start-5 row-start-2" 
          index={2}
        />
        <GridImage 
          src={images[3]} 
          className="col-span-2 row-span-4 col-start-1 row-start-7" 
          index={3}
        />
        <GridImage 
          src={images[4]} 
          className="col-span-2 row-span-4 col-start-3 row-start-6" 
          index={4}
        />
        <GridImage 
          src={images[5]} 
          className="col-span-2 row-span-5 col-start-5 row-start-7" 
          index={5}
        />
        <GridImage 
          src="/Gandhara_Buddha_(tnm).jpeg" 
          className="col-span-2 row-span-3 col-start-3 row-start-10" 
          index={6}
        />
      </div>

      {/* Enhanced Bottom Section with Call-to-Action */}
      <div className="absolute bottom-0 left-0 w-full h-[45rem] bg-gradient-to-t from-black via-black/80 to-transparent z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center"
        >
          
          {/* Enhanced Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            whileHover={{ y: -2 }}
          >
            <Link 
              to="/about-museum"
              className="inline-block bg-white text-black py-3.5 px-8 font-medium text-lg rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group"
            >
              <span className="flex items-center gap-2">
                {t("ImgGridButton")}
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ImgGrid;
