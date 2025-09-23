import { motion } from "framer-motion";

const MessageBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
        duration: 0.2,
      }}
      className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="relative mx-auto w-72 rounded-2xl  bg-white p-4 shadow-lg">
        <p className="text-center text-xs text-gray-700">
         बुद्ध सम्यक दर्शन संग्रहालय की भव्यता, स्थापत्य कला एवं आध्यात्मिक वातावरण को दर्शाने हेतु एक विशेष वीडियो प्रस्तुत किया जा रहा है, जिसमें संग्रहालय के विभिन्न कोणों से लिए गए दृश्य सम्मिलित हैं।

        </p>

        {/* Arrow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rotate-180 transform ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="white"
            stroke=""
            strokeWidth=""
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBox;
