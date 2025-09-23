import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Slide data
const allSlides = [
  {
    title: "Seated Buddha - Sarnath",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGZYBl8_WD_mWUjAXWlTHwyRmyF8lknHcGhw&s",
    description: "An iconic seated Buddha sculpture from Sarnath, symbolizing enlightenment.",
  },
  {
    title: "Bodhisattva Avalokiteshvara",
    image: "https://cdn.britannica.com/57/133057-050-AC74BBA2/Avalokiteshvara-bodhisattva-compassion-Mount-Jiuhua-China-province.jpg",
    description: "The compassionate Bodhisattva Avalokiteshvara carved in stone.",
  },
  {
    title: "Amaravati Stupa Panel",
    image: "https://tricycle.org/wp-content/uploads/2025/06/Amaravati_Stupa_relief_at_Museum%E2%80%94-Amaravati-Maha-Stupa-relief-at-Museum-in-Chennai-India-scaled.jpg",
    description: "Intricate relief panel from the Amaravati Stupa.",
  },
  {
    title: "Birth of Buddha - Gandhara Style",
    image: "https://www.shutterstock.com/image-photo/osaka-japan-december-4-2023-260nw-2401947087.jpg",
    description: "Gandhara art depicting the birth of Buddha with Greco-Roman influence.",
  },
  {
    title: "Buddha Head - Mathura",
    image: "https://images.metmuseum.org/CRDImages/as/original/DP267831.jpg",
    description: "A red sandstone Buddha head from Mathura.",
  },
  {
    title: "Buddha's First Sermon - Sarnath",
    image: "https://images.metmuseum.org/CRDImages/as/original/4%20DP314867r4_61A.jpg",
    description: "Depiction of Buddha’s first sermon at Sarnath.",
  },
  {
    title: "Buddhist Carving - Ajanta Caves",
    image: "https://static.toiimg.com/photo/37961229.cms",
    description: "Stone carvings from Ajanta Caves illustrating Jataka tales.",
  },
  {
    title: "Golden Buddha - Thailand",
    image: "https://thaizer.smugmug.com/Thailand/Bangkok/i-HWw5rmM/0/L/Wat_Traimit_Golden_Buddha_Bangkok-16-L.jpg",
    description: "A majestic golden Buddha statue from Thailand.",
  },
];

// Card Component
const CollectionCard = ({ title, image, description }) => (
  <motion.div
    className="relative bg-black rounded-3xl overflow-hidden h-[400px] w-full cursor-pointer group"
    whileHover={{ scale: 1.02 }}
  >
    {/* Image */}
    <img
      src={image}
      alt={title}
      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/70" />

    {/* Text content */}
    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
      <h3 className="text-white text-xl font-semibold">{title}</h3>
      <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {description}
      </p>
    </div>
  </motion.div>
);

// Page Component
const  AllCollectionPage = () => {
  return (
    <>
    <Navbar />
    <div className="bg-black py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-white text-3xl font-bold mb-10">Full Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allSlides.map((item, index) => (
            <CollectionCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AllCollectionPage;
