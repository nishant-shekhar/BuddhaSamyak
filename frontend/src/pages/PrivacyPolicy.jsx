import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import {
    Shield,
    Eye,
    Lock,
    Globe,
    Users,
    FileText,
    Mail,
    Calendar,
    ChevronDown,
    ChevronRight,
    Scale
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
    const { t } = useTranslation();
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (sectionId) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId);
    };

    const CollapsibleSection = ({ id, icon: Icon, title, children }) => {
        const isExpanded = expandedSection === id;

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/20 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden mb-4"
            >
                <button
                    onClick={() => toggleSection(id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-all duration-300"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-medium text-white">{title}</h3>
                    </div>
                    {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                </button>

                <motion.div
                    initial={false}
                    animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="px-6 pb-6">
                        {children}
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    const InfoCard = ({ icon: Icon, title, items }) => (
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-medium text-white text-sm">{title}</h4>
            </div>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-300">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-black py-16">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">
                            {t("privacyPolicy")}
                        </h1>
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-32 mx-auto mb-6" />
                        <p className="text-gray-300 text-lg font-light max-w-3xl mx-auto mb-8">
                            Your privacy is sacred to us. This policy explains how we protect and handle your personal information.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{t("effectiveDate")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span>{t("lastUpdated")}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-6">

                    {/* Who We Are */}
                    <CollapsibleSection id="who-we-are" icon={Users} title={t("whoWeAre")}>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-gray-300 leading-relaxed mb-4">
                                {t("whoWeAreText")}
                            </p>
                            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium text-white">Contact:</span>
                                </div>
                                <span className="text-sm text-gray-300">nsappsinnovation@gmail.com</span>
                            </div>
                        </div>
                    </CollapsibleSection>

                    {/* What We Collect */}
                    <CollapsibleSection id="what-we-collect" icon={Eye} title={t("whatWeCollect")}>
                        <div className="space-y-4">
                            <p className="text-gray-300 mb-4">{t("whatWeCollectText")}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoCard
                                    icon={Users}
                                    title="Personal Information"
                                    items={[
                                        t("fullName_privacy"),
                                        t("phone"),
                                        t("email"),
                                        t("country")
                                    ]}
                                />
                                <InfoCard
                                    icon={Calendar}
                                    title="Booking Information"
                                    items={[
                                        t("date"),
                                        t("adults_privacy"),
                                        t("children_privacy")
                                    ]}
                                />
                            </div>
                            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                                <p className="text-sm text-gray-300">{t("technicalDataText")}</p>
                            </div>
                        </div>
                    </CollapsibleSection>

                    {/* How We Collect */}
                    <CollapsibleSection id="how-we-collect" icon={Globe} title={t("howWeCollect")}>
                        <div className="space-y-4">
                            <div className="grid gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-300 text-sm">{t("howWeCollectText1")}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-300 text-sm">{t("howWeCollectText2")}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-300 text-sm">{t("howWeCollectText3")}</span>
                                </div>
                            </div>
                        </div>
                    </CollapsibleSection>

                    {/* Why We Use Your Data */}
                    <CollapsibleSection id="why-we-use" icon={FileText} title={t("whyWeUse")}>
                        <div className="grid gap-3">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <div key={num} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-300 text-sm">{t(`whyWeUseText${num}`)}</span>
                                </div>
                            ))}
                        </div>
                    </CollapsibleSection>

                    {/* Legal Bases */}
                    <CollapsibleSection id="legal-bases" icon={Scale} title={t("legalBases")}>
                        <div className="space-y-4">
                            <p className="text-gray-300 mb-4">{t("legalBasesText")}</p>
                            <div className="grid gap-3">
                                {[1, 2, 3].map((num) => (
                                    <div key={num} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-300 text-sm">{t(`legalBasesText${num}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CollapsibleSection>

                    {/* Security Measures */}
                    <CollapsibleSection id="security" icon={Lock} title={t("securityMeasures")}>
                        <div className="space-y-4">
                            <p className="text-gray-300 mb-4">{t("securityMeasuresText")}</p>
                            <div className="grid gap-3">
                                {[1, 2, 3, 4].map((num) => (
                                    <div key={num} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-300 text-sm">{t(`securityMeasuresText${num}`)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                                <p className="text-sm text-blue-200">{t("securityNote")}</p>
                            </div>
                        </div>
                    </CollapsibleSection>

                    {/* Your Rights */}
                    <CollapsibleSection id="your-rights" icon={Shield} title={t("yourRights")}>
                        <div className="space-y-4">
                            <p className="text-gray-300 mb-4">{t("yourRightsText")}</p>
                            <div className="grid gap-3">
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <div key={num} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-300 text-sm">{t(`yourRightsText${num}`)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                                <p className="text-sm text-gray-300">{t("exerciseRights")}</p>
                            </div>
                        </div>
                    </CollapsibleSection>

                    {/* Contact Section */}
                    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8 mt-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Mail className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-4">{t("contact")}</h3>
                            <div className="space-y-2 text-gray-300">
                                <p className="font-medium">{t("contactText")}</p>
                                <p>{t("contactEmail")}</p>
                                <p className="text-sm">{t("contactSubject")}</p>
                                <p className="text-xs text-gray-400 mt-4">{t("contactNote")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
