import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const LeadershipContributors = () => {
    const { t } = useTranslation();

    // Sample data - replace with actual official information
    const officials = [
        {
            id: 1,
            name: "Hon. Shri [Official Name]",
            designation: "Minister of Tourism & Culture",
            department: "Government of Bihar",
            image: "/api/placeholder/400/400", // Replace with actual image path
        }
        // Add more officials here as needed
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.03 }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative z-10 flex items-center justify-center min-h-[50vh] px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center max-w-4xl"
                >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-thin tracking-wide mb-4 md:mb-6">
                        LEADERSHIP &
                        <span className="block font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            CONTRIBUTORS
                        </span>
                    </h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 120 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="h-0.5 bg-white mx-auto mb-4 md:mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                        className="text-base md:text-lg lg:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Honoring the visionary leaders who made the Buddha Samyak Darshan Museum a reality
                    </motion.p>
                </motion.div>
            </div>

            {/* Leadership Cards Section */}
            <section className="py-12 md:py-16 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">

                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-3 tracking-wide">
                            Government Leadership
                        </h2>
                        <div className="w-16 h-px bg-gray-400 mx-auto mb-4"></div>
                        <p className="text-gray-400 text-sm max-w-xl mx-auto">
                            Distinguished officials who provided strategic vision and support for this cultural landmark
                        </p>
                    </motion.div>

                    {/* Officials Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
                    >
                        {officials.map((official, index) => (
                            <motion.div
                                key={official.id}
                                variants={cardVariants}
                                whileHover={{ y: -3 }}
                                className="group relative w-full max-w-xs"
                            >
                                {/* Card Container */}
                                <div className="relative bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-5 hover:border-gray-700/50 transition-all duration-300 shadow-xl">

                                    {/* Decorative Corner */}
                                    <div className="absolute top-0 right-0 w-10 h-10">
                                        <div className="absolute top-3 right-3 w-4 h-px bg-gradient-to-r from-transparent to-gray-600"></div>
                                        <div className="absolute top-3 right-3 w-px h-4 bg-gradient-to-b from-gray-600 to-transparent"></div>
                                    </div>

                                    {/* Profile Image */}
                                    <div className="relative mb-4 flex justify-center">
                                        <motion.div
                                            variants={imageVariants}
                                            initial="rest"
                                            whileHover="hover"
                                            className="relative w-24 h-24"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full"></div>
                                            <img
                                                src={official.image}
                                                alt={official.name}
                                                className="relative z-10 w-full h-full object-cover rounded-full border-2 border-gray-700/50 group-hover:border-gray-600/50 transition-all duration-300"
                                            />
                                            {/* Glow Effect */}
                                            <div className="absolute inset-0 rounded-full bg-white/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </motion.div>
                                    </div>

                                    {/* Official Information */}
                                    <div className="text-center space-y-2">
                                        <h3 className="text-lg font-medium text-white group-hover:text-gray-100 transition-colors duration-300">
                                            {official.name}
                                        </h3>

                                        <div className="space-y-1">
                                            <p className="text-gray-300 text-sm font-medium">
                                                {official.designation}
                                            </p>
                                            <p className="text-gray-500 text-xs">
                                                {official.department}
                                            </p>
                                        </div>

                                        {/* Decorative Divider */}
                                        <div className="pt-3">
                                            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto"></div>
                                        </div>
                                    </div>

                                    {/* Background Pattern */}
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Additional Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >

                    </motion.div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LeadershipContributors;
