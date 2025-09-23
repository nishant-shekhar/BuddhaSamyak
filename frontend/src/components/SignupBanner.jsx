import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignupBanner = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center py-12 px-8 sm:px-0">
      {/* Outer container */}
      <div className="bg-white border border-gray-200 p-12 w-full max-w-5xl shadow-md">
        <div className="mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-4">
               {t("VisitBannerHeading")}
              </h2>
              <p className="text-gray-700 text-lg">
                {t("VisitBannerDescription")}
              </p>
            </div>
            <Link to="/Travel">
              <button className="bg-black hover:bg-white border text-white hover:text-black font-semibold py-4 px-8 text-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
                {t("VisitBannerButton")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupBanner;
