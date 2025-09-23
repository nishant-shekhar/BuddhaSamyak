import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Gallery() {
    const { t } = useTranslation();

    const content = [
        {
            url: "/bgImage.jpeg",
        },
        {
            url: "/visitorsCenter.jpeg",
        },
        {
            url: "/gallery9.jpeg",
        },
        {
            url: "/gallery2.jpeg",
        },
        {
            url: "/gallery3.jpeg",
        },
        {
            url: "/gallery4.jpeg",
        },
        {
            url: "/gallery5.jpeg",
        },
        {
            url: "/gallery6.jpeg",
        },
        {
            url: "/gallery7.jpeg",
        },
        {
            url: "/gallery8.jpeg",
        }
    ];

    // Fixed Bento grid layout configuration
    const getBentoLayout = (index) => {
        const layouts = [
            { cols: 8, rows: 2 },  // Large feature
            { cols: 4, rows: 1 },  // Small top right
            { cols: 4, rows: 1 },  // Small bottom right
            { cols: 6, rows: 1 },  // Medium left
            { cols: 6, rows: 1 },  // Medium right
            { cols: 4, rows: 2 },  // Tall left
            { cols: 8, rows: 1 },  // Wide right
            { cols: 8, rows: 1 }, // Full width
            { cols: 6, rows: 1 },  // Medium left
            { cols: 6, rows: 1 }   // Medium right
        ];
        return layouts[index % layouts.length];
    };

    const getItemStyle = (index) => {
        const layout = getBentoLayout(index);
        const heights = {
            1: 'h-[280px]',
            2: 'h-[572px]'  // Reduced from 576px to account for smaller gaps
        };

        return {
            gridColumn: `span ${layout.cols}`,
            gridRow: `span ${layout.rows}`,
            height: heights[layout.rows]
        };
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div className="bg-black text-white py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-thin tracking-wider mb-6"
                    >
                        {t("explore_gallery")}
                        <span className="block font-bold">{t("more")}</span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 100 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-1 bg-white mx-auto mb-8"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="text-xl md:text-2xl font-light text-gray-300 max-w-3xl mx-auto"
                    >
                        {t("galleryDescription")}
                    </motion.p>
                </div>
            </div>

            {/* Bento Grid Gallery */}
            <div className="bg-black py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Fixed Grid Container with Reduced Gap */}
                    <div className="grid grid-cols-12 gap-2 md:gap-5">
                        {content.map((item, index) => {
                            const itemStyle = getItemStyle(index);

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group"
                                    style={{
                                        gridColumn: itemStyle.gridColumn,
                                        gridRow: itemStyle.gridRow
                                    }}
                                >
                                    <div className={`${itemStyle.height} relative rounded-4xl overflow-hidden bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-800`}>
                                        {/* Image - Properly fitted without extra space */}
                                        <img
                                            src={item.url}
                                            alt=""
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Gallery;
