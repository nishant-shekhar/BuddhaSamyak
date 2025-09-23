import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import LeadershipContributors from "../pages/Leadership&Contributors.jsx";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white px-4 md:px-6 lg:px-20 py-12 md:py-24 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Social Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-16 mb-12 md:mb-20">
          <div className="space-y-6 md:space-y-10">
            <h2 className="text-2xl md:text-4xl font-bold">{t("JoinUs")}</h2>
            <div className="flex gap-4 md:gap-8 text-2xl md:text-3xl">
              <a 
                target="_blank" 
                href="https://www.facebook.com/ArtCultureYouth" 
                aria-label="Facebook"
                className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                <FaFacebookF />
              </a>
              <a 
                target="_blank" 
                href="https://x.com/ArtCultureYouth" 
                aria-label="Twitter"
                className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                <FaTwitter />
              </a>
              <a 
                target="_blank" 
                href="https://www.instagram.com/artcultureyouth" 
                aria-label="Instagram"
                className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                <FaInstagram />
              </a>
              <a 
                target="_blank" 
                href="https://www.youtube.com/@ArtCultureYouth" 
                aria-label="YouTube"
                className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* Museum Info & Hours */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-xl md:text-2xl mb-4 md:mb-6">{t("FreeEntry")}</h4>
            <div className="space-y-4">
              <div>
                <p className="text-base md:text-lg font-medium">{t("MuseumName")}</p>
                <p className="text-gray-300 text-sm md:text-base">{t("MuseumLocation")}</p>
                <p className="mt-2 font-semibold text-base md:text-lg">{t("MuseumPhone")}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <p className="font-bold mb-2 text-base md:text-lg">{t("OpeningHours")}</p>
                <p className="text-gray-300 text-sm md:text-base">{t("DailyHours")}</p>
                <p className="text-gray-300 text-sm md:text-base">{t("LastEntry")}</p>
              </div>

              {/* Book Ticket Button */}
              <div className="pt-4">
                <Link 
                  to="/book-ticket"
                  className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
                >
                  {t("BookTickets")}
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xl md:text-2xl mb-4 md:mb-6">{t("Explore_footer")}</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link to="/" className="text-sm md:text-base hover:text-white transition-colors duration-300">
                  {t("ExploreHome")}
                </Link>
              </li>
              <li>
                <Link to="/about-museum" className="text-sm md:text-base hover:text-white transition-colors duration-300">
                  {t("ExploreAbout")}
                </Link>
              </li>

              <li>
                <Link to="/collection" className="text-sm md:text-base hover:text-white transition-colors duration-300">
                  {t("ExploreCollections")}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm md:text-base hover:text-white transition-colors duration-300">
                  {t("ExploreGallery")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit & Support */}
          <div>
            <h4 className="font-bold text-xl md:text-2xl mb-4 md:mb-6">{t("VisitSupport")}</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link to="/travel" className="text-sm md:text-base hover:text-white transition-colors duration-300">
                  {t("VisitReach")}
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-sm md:text-base hover:text-white transition-colors duration-300">
                  {t("VisitContact")}
                </Link>
              </li>
              <li>
                <Link to="/LeadershipContributors" className="text-sm md:text-base hover:text-white transition-colors duration-300">
                  {t("Leadership&Contributors")}
                </Link>
              </li>
                <li>
                    <Link to="/Leadership&Contributors" className="text-sm md:text-base hover:text-white transition-colors duration-300">
                        {t("VisitTeam")}
                    </Link>
                </li>

              <li>
                <Link to="/policy" className="text-sm md:text-base hover:text-white transition-colors duration-300">
                  {t("VisitPolicy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 md:mt-20 border-t border-gray-800 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm md:text-base text-gray-400 text-center md:text-left">
              {t("Copyright")} 
            </p>
            
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/policy" className="hover:text-white transition-colors duration-300">
                {t("FooterPrivacy")}
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/contact-us" className="hover:text-white transition-colors duration-300">
                {t("FooterTerms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
