import React, { useRef, useState, useEffect } from "react";
import { FaInfoCircle, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MessageBox from "./MessageBox";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const [showMessage, setShowMessage] = useState(false);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; // start muted
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const openMap = () => {
    window.open(
      "https://www.google.com/maps/place/Buddha+Samyak+Darshan+Museum+%26+Stupa/@25.9942639,85.1175337,959m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39ed391d4d1060ad:0x60961d6b8f33c717!8m2!3d25.9942639!4d85.1201086!16s%2Fg%2F11rbrwj7s7?entry=ttu",
      "_blank"
    );
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full h-screen max-h-[40rem] overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dnjmxt0kz/video/upload/v1754050043/homeVideo_xigt30.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Black Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-10" />

        {/* Left Info Panel */}
       <div className="hidden lg:block absolute bottom-6 left-4 z-20 w-[380px] bg-white text-black  px-6 py-8 transition-all duration-300 group hover:bg-black hover:text-white">
  <h2
    style={{ fontFamily: '"Playfair Display", serif' }}
    className="text-xl font-bold"
  >
    {t("Welcome")}
  </h2>
  
  <p
    style={{ fontFamily: '"Playfair Display", serif' }}
    className="text-sm leading-relaxed mt-4 mb-6"
  >
    {t("MuseumDescription")}
  </p>
  
  <Link to="/gallery">
    <button
      style={{ fontFamily: '"Playfair Display", serif' }}
      className="text-sm font-semibold px-5 py-2 border-2 border-black bg-black text-white transition-all duration-300 group-hover:bg-white group-hover:text-black"
    >
      {t("Explore")} →
    </button>
  </Link>
</div>


{/* Button Controls - Bottom Right */}
<div className="absolute bottom-5 right-5 sm:right-10 md:right-15 z-30 flex items-end gap-4">
  {/* 🔊 Sound Toggle */}
  <button
    onClick={toggleMute}
    className="bg-white/20 backdrop-blur-md text-white rounded-full p-3 shadow-md hover:bg-gray-200 transition"
    title={isMuted ? "Unmute" : "Mute"}
  >
    {isMuted ? (
      <FaVolumeMute size={22} />
    ) : (
      <FaVolumeUp size={22} />
    )}
  </button>

  {/* ℹ️ Info Hover Box */}
  <div
    className="relative flex flex-col items-center hidden lg:block"
    onMouseEnter={() => setShowMessage(true)}
    onMouseLeave={() => setShowMessage(false)}
  >
    <button
      className="bg-white/20 backdrop-blur-md text-white rounded-full p-3 shadow-md hover:bg-gray-200 transition"
      title="Info"
    >
      <FaInfoCircle size={22} />
    </button>
    <AnimatePresence>{showMessage && <MessageBox />}</AnimatePresence>
  </div>

  {/* 📍 Location */}
  <button
    onClick={openMap}
    className="bg-white/20 backdrop-blur-md text-white rounded-full p-3 shadow-md hover:bg-gray-200 transition"
    title="Open in Google Maps"
  >
    <FaRoute size={22} />
  </button>
</div>

      </div>
    </>
  );
};

export default Home;