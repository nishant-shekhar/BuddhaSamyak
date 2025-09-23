// src/components/ParallaxLayout.jsx
import React from "react";

const ParallaxLayout = ({ children }) => {
  return (
    <div className="relative">
      {/* Fixed global background image */}
      <div
        className="fixed top-0 left-0 w-full h-full z-[-10] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/bgImage.jpeg")' }}
      ></div>

      {/* Scrollable foreground content */}
      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default ParallaxLayout;
