import React, { useEffect, useState } from "react";
import { Linkedin, ExternalLink, Users, Award, Star, ChevronDown } from "lucide-react";
import { useTranslation } from 'react-i18next';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PersonProfileCard = ({ name, role, image, linkedin, technologies, delay }) => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`group relative bg-black/20 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-500 transition-all duration-500 transform hover:-translate-y-1 overflow-hidden ${delay ? `animate-fade-in-up` : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ animationDelay: `${delay * 100}ms` }}
        >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative p-4">
                {/* Compact Profile Image */}
                <div className="relative mb-3 mx-auto w-16 h-16">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover rounded-full border-2 border-gray-600 group-hover:border-gray-400 transition-colors duration-300"
                    />
                </div>

                {/* Compact Content */}
                <div className="text-center">
                    <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-gray-200 transition-colors duration-300">
                        {name}
                    </h3>
                    <p className="text-gray-400 text-xs mb-3">
                        {role}
                    </p>

                    {/* Compact Technologies */}
                    <div className="mb-3">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-md p-2 border border-gray-700">
                            <p className="text-xs text-gray-400 font-medium mb-1">{t("technologies")}</p>
                            <p className="text-xs text-gray-200">{technologies}</p>
                        </div>
                    </div>

                    {/* Compact LinkedIn Button */}
                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md transition-all duration-300 text-xs border border-gray-600 hover:border-gray-500"
                        >
                            <Linkedin className="w-3 h-3" />
                            <span>{t("connect")}</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const DevelopersTeam = () => {
    const { t } = useTranslation();
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        // Trigger animations
        setTimeout(() => setIsVisible(true), 300);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const teamLead = [
        {
            name: "Nishant Shekhar",
            role: t("founderRole"),
            image: "https://res.cloudinary.com/dgra109xv/image/upload/v1758271292/nishant_psukr0.jpg",
            show: true,
            linkedin: "https://www.linkedin.com/in/nishantshekhar28/",
            technologies: "React, Node.js, Prisma, AWS",
        },
    ];

    const teamhead = [
        {
            name: "Aditya Kumar",
            role: t("reactDeveloper"),
            image: "https://res.cloudinary.com/dgra109xv/image/upload/v1758271291/adit_s8ojuk.jpg",
            linkedin: "https://www.linkedin.com/in/aditya-kumar-780709320/",
            technologies: "React.js, Tailwind CSS",
        },
        {
            name: "Manish Kumar",
            role: t("frontendDeveloper"),
            image: "https://res.cloudinary.com/dgra109xv/image/upload/v1758271293/manish_ifhf4t.jpg",
            linkedin: "https://www.linkedin.com/in/manish-kumar-b158b4252/",
            technologies: "React.js, Tailwind CSS",
        },
        {
            name: "Abhishek Anand",
            role: t("reactDeveloper"),
            image: "https://res.cloudinary.com/dgra109xv/image/upload/v1758271292/anand_bktdar.jpg",
            linkedin: "https://www.linkedin.com/in/abhishek-anand-094799251/",
            technologies: "React.js, Tailwind CSS",
        },

        {
            name: "Abhinav Kumar",
            role: t("artificialIntelligence"),
            image: "https://res.cloudinary.com/dgra109xv/image/upload/v1758271292/abhinav_ovihtm.jpg",
            linkedin: "https://www.linkedin.com/in/abhinab-kumar-546753279/",
            technologies: "Python, LLMs",
        }
    ];

    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            <Navbar />

            {/* Compact Hero Section */}
            <div className="relative pt-24 pb-12 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <p className="text-sm font-semibold text-gray-400 mb-2 tracking-wider">
                            {t("nsAppsInnovations")}
                        </p>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            {t("developersTeam")}
                        </h1>

                        {/* Compact Company Description */}
                        <div className="max-w-4xl mx-auto mb-8">
                            <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                                {t("companyDescription")}
                            </p>

                            {/* Compact Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                                    <div className="text-xl font-bold text-white mb-1">28+</div>
                                    <div className="text-xs text-gray-400">{t("projectsCompleted")}</div>
                                </div>
                                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                                    <div className="text-xl font-bold text-white mb-1">6</div>
                                    <div className="text-xs text-gray-400">{t("teamMembers")}</div>
                                </div>
                                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                                    <div className="text-xl font-bold text-white mb-1">100%</div>
                                    <div className="text-xs text-gray-400">{t("dedication")}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compact Founder Section */}
            <div className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className={`text-center mb-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="flex items-center justify-center mb-4">
                            <div className="bg-gray-800 p-2 rounded-full mr-3 border border-gray-700">
                                <Award className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">{t("leadership")}</h2>
                        </div>
                        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                            {t("leadershipDescription")}
                        </p>
                    </div>

                    {/* Compact Founder Card */}
                    <div className="flex justify-center">
                        <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl border border-gray-700 p-6 max-w-sm hover:border-gray-500 transition-all duration-500">
                            <div className="text-center">
                                <div className="relative mb-4 mx-auto w-20 h-20">
                                    <img
                                        src={teamLead[0].image}
                                        alt={teamLead[0].name}
                                        className="w-full h-full object-cover rounded-full border-2 border-gray-600"
                                    />
                                    <div className="absolute -top-1 -right-1 bg-white text-black p-1 rounded-full">
                                        <Star className="w-3 h-3" />
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-1">{teamLead[0].name}</h3>
                                <p className="text-gray-400 mb-3 text-sm">{teamLead[0].role}</p>

                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 mb-4 border border-gray-700">
                                    <p className="text-xs text-gray-400 font-medium mb-1">{t("coreTechnologies")}</p>
                                    <p className="text-white text-sm">{teamLead[0].technologies}</p>
                                </div>

                                <a
                                    href={teamLead[0].linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm border border-gray-600"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    <span>{t("connectOnLinkedIn")}</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compact Team Members Section */}
            <div id="team" className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Compact Section Header */}
                    <div className={`text-center mb-8 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="flex items-center justify-center mb-4">
                            <div className="bg-gray-800 p-2 rounded-full mr-3 border border-gray-700">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">{t("developmentTeam")}</h2>
                        </div>
                        <p className="text-gray-400 text-sm max-w-3xl mx-auto">
                            {t("teamDescription")}
                        </p>
                    </div>

                    {/* Compact Team Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teamhead.map((member, index) => (
                            <PersonProfileCard
                                key={index}
                                name={member.name}
                                role={member.role}
                                image={member.image}
                                linkedin={member.linkedin}
                                technologies={member.technologies}
                                delay={index + 1}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Compact Scroll to Top */}
            <div className="fixed bottom-6 right-6">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg border border-gray-600 transition-all duration-300"
                >
                    <ChevronDown className="w-4 h-4 transform rotate-180" />
                </button>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
            <Footer />
        </div>
    );
};

export default DevelopersTeam;
