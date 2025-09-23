import React from "react";
import { FaLinkedin } from "react-icons/fa";

const PersonProfileCard = ({ image, name, role, animationDelay, linkedin, technologies }) => {
  return (
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      data-aos="fade-up"
      data-aos-delay={animationDelay}
      className="relative block w-full max-w-[280px] bg-white/70 backdrop-blur-md rounded-3xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] group overflow-hidden p-6"
    >
      {/* Profile Image */}
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md transition-all duration-300 group-hover:scale-105">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="text-center mt-4">
      {/* Name */}
      <h3 className="mt-4 text-lg font-bold text-gray-800 group-hover:text-[#303462] transition-colors duration-300">
        {name}
      </h3>

      {/* Role */}
      <p className="text-sm text-[#303462] group-hover:text-gray-700 transition duration-300">
        {role}
      </p>

      {/* Tech Stack */}
      <p className="text-xs text-gray-600 mt-1">
        {technologies}
      </p>
      </div>  

      {/* LinkedIn Icon */}
      <div className="absolute top-3 right-3 text-black  transition">
        <FaLinkedin  size={20} />
      </div>
    </a>
  );
};

export default PersonProfileCard;
