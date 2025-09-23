import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    Check,
    AlertCircle
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ContactUs = () => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);

            // Reset form after success
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                setSubmitStatus(null);
            }, 3000);
        }, 2000);
    };

    const contactInfo = [
        {
            icon: Phone,
            title: t("phoneNumber"),
            value: t("phoneValue"),
            subtitle: t("phoneSubtitle")
        },
        {
            icon: Mail,
            title: t("emailAddress"),
            value: t("emailValue"),
            subtitle: t("emailSubtitle")
        },
        {
            icon: MapPin,
            title: t("visitUs"),
            value: t("visitValue"),
            subtitle: t("visitSubtitle")
        },
        {
            icon: Clock,
            title: t("openingHours_contact"),
            value: t("hoursValue"),
            subtitle: t("hoursSubtitle")
        }
    ];

    return (
        <div className="bg-black min-h-screen relative overflow-hidden">
            <Navbar />

            {/* Background Elements */}
            <div className="absolute top-20 right-20 w-96 h-96 border border-gray-800 rounded-full opacity-20"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 border border-gray-800 rounded-full opacity-10"></div>

            <div className="relative z-10 container mx-auto px-6 py-20">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin text-white mb-8 tracking-wider">
                        {t("getIn")}
                        <span className="block font-bold">{t("touch")}</span>
                    </h1>
                    <div className="h-1 bg-white mx-auto mb-8 w-32"></div>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {t("contactDescription")}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-white mb-8">{t("contactInformation")}</h2>

                        {contactInfo.map((item, index) => (
                            <div
                                key={item.title}
                                className="bg-black rounded-3xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-2xl">
                                        <item.icon className="w-6 h-6 text-black" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                                        <p className="text-white text-lg mb-1">{item.value}</p>
                                        <p className="text-gray-400 text-sm">{item.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Additional Info */}
                        <div className="bg-white rounded-3xl p-8 mt-12">
                            <h3 className="text-black font-bold text-xl mb-4">{t("quickResponsePromise")}</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {t("responsePromiseText")}
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-black rounded-3xl p-8 lg:p-10 border border-gray-800">
                        <h2 className="text-3xl font-bold text-white mb-8">{t("sendMessage")}</h2>

                        {submitStatus === 'success' ? (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check className="w-10 h-10 text-black" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{t("messageSent")}</h3>
                                <p className="text-gray-400">{t("messageSentDescription")}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Name and Email Row */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            {t("fullName")} <span className="text-gray-300">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-white focus:outline-none"
                                            placeholder={t("enterFullName_contact")}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            {t("emailAddress")} <span className="text-gray-300">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-white focus:outline-none"
                                            placeholder={t("enterEmail")}
                                        />
                                    </div>
                                </div>

                                {/* Phone and Subject Row */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-medium mb-2">{t("phoneNumberLabel")}</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-white focus:outline-none"
                                            placeholder={t("enterPhone")}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            {t("subject")} <span className="text-gray-300">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-white focus:outline-none"
                                            placeholder={t("subjectPlaceholder")}
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        {t("yourMessage")} <span className="text-gray-300">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-white focus:outline-none resize-none"
                                        placeholder={t("messagePlaceholder")}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-white text-black py-4 px-8 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                            {t("sending")}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            {t("sendMessageButton")}
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-20">
                    <div className="inline-flex items-center gap-3 bg-gray-800 rounded-full px-8 py-4 border border-gray-700">
                        <AlertCircle className="w-5 h-5 text-white" />
                        <span className="text-white font-medium">
              {t("immediateAssistance")}
            </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;
