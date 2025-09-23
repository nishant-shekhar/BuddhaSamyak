import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import "./carousel.css";
import { useTranslation } from "react-i18next";

// ✅ Slide Card Component (Accept props properly)
const ParallaxCard = ({ title, image }) => (
  <motion.div
    className="relative bg-black rounded-3xl overflow-hidden h-[400px] w-full cursor-pointer"
    whileHover={{ scale: 1.02 }}
  >
    <motion.img
      src={image}
      alt={title}
      className="object-cover w-full h-full transition-transform duration-500"
      whileHover={{ scale: 1.1 }}
    />
    <div className="absolute inset-0 bg-black/30 flex items-end p-4">
      <h3 className="text-white text-xl font-semibold">{title}</h3>
    </div>
  </motion.div>
);

// ✅ Main Carousel
const ExploreCollectionCarousel = () => {
  const { t } = useTranslation();
  const slides = t("Slides", { returnObjects: true });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div id="collection" className="bg-black py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-3xl font-bold">
            {t("ExploreCollectionHeading")}
          </h2>
          <Link
            to="/collection"
            className="text-white hover:underline flex items-center gap-1"
          >
            {t("ExploreCollectionViewAll")}
          </Link>
        </div>

        {/* Swiper Carousel */}
        <div className="relative mb-16">
          <Swiper
            loop
            centeredSlides
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            speed={600}
            spaceBetween={30}
            slidesPerView={1.5}
            breakpoints={{
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
            }}
            modules={[Autoplay, Pagination, Navigation]}
            pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
          >
            {slides.map((slide, idx) => (
              <SwiperSlide
                key={idx}
                className={`transition-opacity duration-500 ${
                  idx === activeIndex ? "opacity-100" : "opacity-50"
                }`}
              >
                <ParallaxCard title={slide.title} image={slide.image} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-swiper-pagination flex justify-center mt-6" />
        </div>
      </div>
    </div>
  );
};

export default ExploreCollectionCarousel;
