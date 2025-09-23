
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // for cross icon
import Calendar from "./Calendar";
import { useTranslation } from "react-i18next";


const MembershipBanner = () => {
  const { t } = useTranslation();
   const [showModal, setShowModal] = useState(false);
      const modalVariants = {
      hidden: { y: "100%", opacity: 0 },
      visible: {
        y: "5%",
        opacity: 1,
        transition: { duration: 0.25, ease: "easeOut" },
      },
      exit: {
        y: "100%",
        opacity: 0,
        transition: { duration: 0.2, ease: "easeIn" },
      },
    };
  return (
    <div className="flex justify-center items-center min-h-[300px] py-12 px-4">
      {/* Larger transparent container */}
      <div className="bg-white backdrop-blur-md border border-gray-200/50 p-10 w-full max-w-5xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t("TravelPlanHeading")}</h2>
              <p className="text-gray-700 text-lg mb-6">
                {t("TravelPlanDescription")}
                </p>
            </div>
            <button
            onClick={() => setShowModal(true)}
            id="visit"
            className="bg-black hover:bg-white border text-white hover:text-black font-semibold py-4 px-8  text-lg transition-all duration-300 hover:scale-105 whitespace-nowrap scroll-mt-28">
              {t("TravelPlanButton")}
            </button>
          </div>
        </div>
      </div>
      {/* Slide-up Modal */}
          <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white w-[100%] h-[100%] rounded-3xl p-6 shadow-lg relative overflow-y-auto overflow-x-hidden"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <X size={20} className="text-white bg-black rounded-full p-1 transform ease-in-out duration-300 hover:scale-110" />
              </button>

              {/* Modal Content */}
            <Calendar />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MembershipBanner;