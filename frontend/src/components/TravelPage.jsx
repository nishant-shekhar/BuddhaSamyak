import React, { useState } from "react";
import {
    FaPlane,
    FaCar,
    FaTrain,
    FaMapMarkerAlt,
    FaClock,
    FaInfoCircle,
    FaDirections,
    FaRoute
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import Navbar from "./Navbar";
import Footer from "./Footer";

const TravelPage = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("airplane");

    const travelData = {
        airplane: {
            title: t("byAir"),
            icon: <FaPlane className="w-5 h-5" />,
            mainHub: "Patna Airport (PAT)",
            distance: "55 km from museum",
            duration: "1 hour to museum",
            description: t("airDescription"),
            routes: [
                {
                    from: t("newDelhi"),
                    duration: "2h 15m",
                    frequency: t("daily"),
                    airlines: "IndiGo, Air India, SpiceJet",
                    bookingTip: t("multipleDailyFlights")
                },
                {
                    from: t("kolkata"),
                    duration: "1h 30m",
                    frequency: t("daily"),
                    airlines: "IndiGo, SpiceJet",
                    bookingTip: t("earlyMorningCheaper")
                },
                {
                    from: t("mumbai"),
                    duration: "2h 45m",
                    frequency: t("daily"),
                    airlines: "Air India, IndiGo",
                    bookingTip: t("connectViaDelhi")
                }
            ],
            alternateHub: {
                name: "Gaya Airport (GAY)",
                distance: "25 km from museum",
                duration: "30 min to museum",
                note: "Limited flights but closer to museum"
            }
        },
        train: {
            title: t("byTrain"),
            icon: <FaTrain className="w-5 h-5" />,
            mainHub: "Patna • Muzaffarpur • Hajipur",
            distance: "Patna: 65 km • Muzaffarpur: 35 km • Hajipur: 45 km",
            duration: "1-2 hours to museum",
            description: t("trainDescription"),
            routes: [
                {
                    from: t("patna"),
                    duration: "65 km from museum",
                    frequency: t("multipleDaiy"),
                    airlines: "Major railway junction - well connected",
                    bookingTip: t("frequentLocalTrains")
                },
                {
                    from: t("muzaffarpur"),
                    duration: "35 km from museum",
                    frequency: t("daily"),
                    airlines: "Direct trains from major cities",
                    bookingTip: "Closest major railway station"
                },
                {
                    from: "Hajipur",
                    duration: "45 km from museum",
                    frequency: t("daily"),
                    airlines: "Good connectivity to eastern states",
                    bookingTip: "Alternative route via this junction"
                }
            ]
        },
        car: {
            title: t("byRoad"),
            icon: <FaCar className="w-5 h-5" />,
            mainHub: "NH 77 & SH 54",
            distance: t("directAccess"),
            duration: "Varies by starting point",
            description: t("roadDescription"),
            routes: [
                {
                    from: t("patna"),
                    duration: "1.5-2 hours",
                    frequency: "65 km via NH 77",
                    airlines: "Well-maintained highway",
                    bookingTip: t("wellMaintainedHighway")
                },
                {
                    from: t("muzaffarpur"),
                    duration: "45-60 minutes",
                    frequency: "35 km via SH 54",
                    airlines: "Shortest road route",
                    bookingTip: t("shortestRoute")
                },
                {
                    from: "Hajipur",
                    duration: "1-1.5 hours",
                    frequency: "45 km via connecting roads",
                    airlines: "Good road connectivity",
                    bookingTip: "Alternative road route"
                }
            ]
        }
    };

    const currentTravel = travelData[activeTab];

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Header Section */}
            <section className="bg-black py-12">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-light mb-4 tracking-wide">
                            {t("howToReach")}
                        </h1>
                        <p className="text-xl text-gray-300 mb-2">
                            {t("buddhaMuseumLocation")}
                        </p>
                        <p className="text-gray-400 flex items-center justify-center gap-2 text-sm">
                            <FaMapMarkerAlt className="w-4 h-4" />
                            {t("museumAddress")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Transport Mode Selection */}
            <section className="py-8 bg-gray-900">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(travelData).map(([key, data]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`
                                    p-4 rounded-xl border transition-all duration-300 text-left backdrop-blur-sm
                                    ${activeTab === key
                                    ? "border-gray-400 bg-gray-800/50 text-white"
                                    : "border-gray-700 bg-gray-800/20 hover:border-gray-600 hover:bg-gray-800/30"
                                }
                                `}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    {data.icon}
                                    <h3 className="text-lg font-medium">{data.title}</h3>
                                </div>
                                <p className={`text-sm ${activeTab === key ? 'text-gray-300' : 'text-gray-400'}`}>
                                    {data.description}
                                </p>
                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <span className="text-gray-300">{data.distance}</span>
                                    <span className="text-gray-300">{data.duration}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Flow */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto px-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Journey Overview */}
                            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <div className="bg-gray-800/50 rounded-lg p-4">
                                        <FaMapMarkerAlt className="w-6 h-6 mx-auto mb-3 text-gray-400" />
                                        <h4 className="font-medium text-sm mb-2 text-white">{t("mainHub")}</h4>
                                        <p className="text-sm text-gray-300">{currentTravel.mainHub}</p>
                                    </div>
                                    <div className="bg-gray-800/50 rounded-lg p-4">
                                        <FaDirections className="w-6 h-6 mx-auto mb-3 text-gray-400" />
                                        <h4 className="font-medium text-sm mb-2 text-white">{t("distance")}</h4>
                                        <p className="text-sm text-gray-300">{currentTravel.distance}</p>
                                    </div>
                                    <div className="bg-gray-800/50 rounded-lg p-4">
                                        <FaClock className="w-6 h-6 mx-auto mb-3 text-gray-400" />
                                        <h4 className="font-medium text-sm mb-2 text-white">{t("travelTime")}</h4>
                                        <p className="text-sm text-gray-300">{currentTravel.duration}</p>
                                    </div>
                                </div>

                                {/* Alternate Hub for Air Travel */}
                                {activeTab === 'airplane' && currentTravel.alternateHub && (
                                    <div className="mt-6 p-4 bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600">
                                        <h4 className="font-medium mb-2 text-white flex items-center gap-2">
                                            <FaRoute className="w-4 h-4" />
                                            {t("alternativeAirport")}
                                        </h4>
                                        <p className="text-sm text-gray-300">
                                            <strong>{currentTravel.alternateHub.name}</strong> - {currentTravel.alternateHub.distance} ({currentTravel.alternateHub.duration})<br />
                                            <em className="text-gray-400">{currentTravel.alternateHub.note}</em>
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Your Journey Routes */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-medium mb-6 text-center text-white flex items-center justify-center gap-3">
                                    <FaRoute className="w-6 h-6 text-gray-400" />
                                    Your Journey Routes
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {currentTravel.routes.map((route, index) => (
                                        <div key={route.from} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300">
                                            <div className="text-center mb-4">
                                                <h3 className="text-xl font-medium text-white mb-2">{route.from}</h3>
                                                <div className="w-12 h-0.5 bg-gray-600 mx-auto"></div>
                                            </div>

                                            <div className="space-y-3 mb-4 text-sm">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400 flex items-center gap-2">
                                                        <FaClock className="w-3 h-3" />
                                                        {t("duration")}:
                                                    </span>
                                                    <span className="text-gray-300 font-medium">{route.duration}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400 flex items-center gap-2">
                                                        <FaDirections className="w-3 h-3" />
                                                        {t("frequency")}:
                                                    </span>
                                                    <span className="text-gray-300">{route.frequency}</span>
                                                </div>
                                                <div className="pt-2 border-t border-gray-600">
                                                    <span className="text-gray-400 text-xs">{t("options")}:</span>
                                                    <p className="text-gray-300 text-sm mt-1">{route.airlines}</p>
                                                </div>
                                            </div>

                                            <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                                                <div className="flex items-start gap-2">
                                                    <FaInfoCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-gray-300">{route.bookingTip}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Next Steps */}
                            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                                <h2 className="text-xl font-medium mb-4 flex items-center gap-3 text-white">
                                    <FaDirections className="text-gray-400" />
                                    Next: Reach the Museum
                                </h2>
                                <p className="text-gray-300 mb-4">
                                    Once you arrive at your chosen hub, you'll need ground transportation to reach Buddha Samyak Darshan Museum in Vaishali.
                                </p>
                                <div className="bg-gray-700/30 rounded-lg p-4">
                                    <p className="text-sm text-gray-400">
                                        Local transportation options are available from all major hubs including auto-rickshaws, taxis, and buses to complete your journey to the museum.
                                    </p>
                                </div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TravelPage;
