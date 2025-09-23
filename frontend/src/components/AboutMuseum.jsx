import React, { useRef, useState } from "react";
import { Instagram, Twitter, Mail, PhoneCall, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Navbar from "./Navbar";
import { useTranslation } from 'react-i18next';
import Footer from "./Footer";

function AboutMuseum() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const { t } = useTranslation();

  const StayConnected = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-black to-gray-900 rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between shadow-lg border border-gray-800 max-w-7xl mx-auto"
    >
      <div className="text-center lg:text-left mb-6 lg:mb-0 flex-1">
        <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-bold mb-4 text-white">
          {t("stay_connected_title")}
        </h2>
        <p className="text-gray-300 text-sm md:text-sm lg:text-sm leading-relaxed max-w-2xl">
          {t("follow_us_description")}
        </p>
      </div>
      
      <div className="flex gap-4 md:gap-6 lg:gap-8 flex-shrink-0">
        {[
          { icon: Instagram, color: "hover:text-pink-500", label: "Instagram" },
          { icon: Twitter, color: "hover:text-blue-400", label: "Twitter" },
          { icon: Mail, color: "hover:text-yellow-400", label: "Email" },
          { icon: PhoneCall, color: "hover:text-green-400", label: "Phone" }
        ].map(({ icon: Icon, color, label }, index) => (
          <motion.a
            key={label}
            href="#"
            aria-label={label}
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className={`w-8 h-8 md:w-8 md:h-18 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-white ${color} transition-all duration-300 hover:bg-white/20`}
          >
            <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/topView.jpeg"
            alt="Museum Overview"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-wider mb-6 md:mb-8">
              ABOUT THE
              <span className="block font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                MUSEUM
              </span>
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="h-1 bg-white mx-auto mb-6 md:mb-8"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 font-light leading-relaxed"
            >
              {t("explore_section_title")}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white text-black">
        
        {/* Stay Connected Section */}
        <div className="py-16 md:py-20 px-4 md:px-6 lg:px-8">
          <StayConnected />
        </div>

        {/* Content Blocks with Alternating Layout */}
        <div className="pb-16 md:pb-20 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 lg:space-y-20">
            
            {/* Block 1: Text Left, Video Right */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch"
            >
              {/* Text Block */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] flex flex-col justify-center p-6 md:p-8 lg:p-10 border border-gray-100 min-h-[400px] lg:min-h-[500px]">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-bold mb-4 md:mb-6 text-gray-900 leading-tight">
                    {t("historical_background_title")}
                  </h2>
                  <div className="w-16 h-1 bg-black mb-4 md:mb-6 rounded-full"></div>
                  <p className="text-md md:text-md lg:text-md text-gray-700 leading-relaxed font-normal text-justify" style={{ whiteSpace: 'pre-line' }}>
                    {t("historical_background_description")}
                  </p>
                </motion.div>
              </div>

              {/* Video Block */}
              <div className="lg:col-span-2 bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] relative group min-h-[300px] lg:min-h-[500px]">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="https://res.cloudinary.com/dnjmxt0kz/video/upload/v1754050153/sec4stupa_lap6sb.mov" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
            </motion.div>

            {/* Block 2: Image Left, Text Right */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch"
            >
              {/* Image Block */}
              <div className="lg:col-span-2 bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] relative group min-h-[300px] lg:min-h-[500px]">
                <img
                  src="vc.jpeg"
                  alt="Government Initiative"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>

              {/* Text Block */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] flex flex-col justify-center p-6 md:p-8 lg:p-10 border border-gray-100 min-h-[400px] lg:min-h-[500px]">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-bold mb-4 md:mb-6 text-gray-900 leading-tight">
                    {t("gov_initiative_title")}
                  </h2>
                  <div className="w-16 h-1 bg-black mb-4 md:mb-6 rounded-full"></div>
                  <p className="text-md md:text-md lg:text-md text-gray-700 leading-relaxed font-normal text-justify" style={{ whiteSpace: 'pre-line' }}>
                    {t("gov_initiative_description")}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Block 3: Text Left, Image Right */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch"
            >
              {/* Text Block */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] flex flex-col justify-center p-6 md:p-8 lg:p-10 border border-gray-100 min-h-[400px] lg:min-h-[500px]">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-bold mb-4 md:mb-6 text-gray-900 leading-tight">
                    {t("significance_title")}
                  </h2>
                  <div className="w-16 h-1 bg-black mb-4 md:mb-6 rounded-full"></div>
                  <p className="text-md md:text-md lg:text-md text-gray-700 leading-relaxed font-normal text-justify" style={{ whiteSpace: 'pre-line' }}>
                    {t("significance_description")}
                  </p>
                </motion.div>
              </div>

              {/* Image Block */}
              <div className="lg:col-span-2 bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] relative group min-h-[300px] lg:min-h-[500px]">
                <img
                  src="gallery.jpeg"
                  alt="Cultural Significance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default AboutMuseum;
