import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Breadcrumbs from "./Breadcrumbs";

import Footer from "./Footer";
const exhibitionCards = [
  {
  title: "बुद्ध सम्यक् दर्शन संग्रहालय का उद्घाटन",
  subtitle: "माननीय मुख्यमंत्री, बिहार द्वारा",
  description: "बिहार की सांस्कृतिक धरोहर को समर्पित इस संग्रहालय का उद्घाटन आज दिनांक 29 जुलाई 2025 को माननीय मुख्यमंत्री, बिहार सरकार द्वारा संपन्न हुआ। यह संग्रहालय बुद्ध की शिक्षाओं, जीवन दर्शन एवं ऐतिहासिक विरासत का जीवंत प्रतीक है।",
  date: "29 जुलाई 2025",
  image: "/buddhabg3.png",
}

 
];

const ExhibitionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black text-white px-6 md:px-16 py-12 font-sans">
        <Breadcrumbs />
        <div className=" gap-12 pb-12">
          {/* Left Description */}
          <div className="mb-8 flex flex-col items-start">
            <h2 className="text-4xl font-semibold mb-2 mt-2">
              प्रदर्शनी एवं कार्यक्रम
            </h2>
          </div>

      <div className="grid md:grid-cols-3 gap-10 w-full">
  {exhibitionCards.map((item, index) => (
    <div
      key={index}
      className="group overflow-hidden rounded-xl bg-black shadow-xl transition-transform duration-300 hover:scale-[1.01] border border-white/10"
    >
      <div className="flex flex-col md:flex-row">
        {/* Text Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col gap-4 transition-all duration-300 group-hover:bg-white">
          <div>
            <h3 className="text-white group-hover:text-black text-2xl font-bold">
              {item.title}
            </h3>
            <p className="text-gray-300 group-hover:text-black mt-1 text-lg">
              {item.subtitle}
            </p>
            {item.description && (
              <p className="text-gray-400 group-hover:text-black mt-3 text-sm leading-relaxed border-b border-gray-500/40 pb-4">
                {item.description}
              </p>
            )}
          </div>

          <div className="pt-2">
            <p className="text-sm group-hover:text-black text-gray-400">
              कार्यक्रम
            </p>
            <p className="text-sm group-hover:text-black text-gray-300 mt-1">
              {item.date}
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 max-h-[300px] md:max-h-full overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover rounded-b-xl md:rounded-r-xl md:rounded-b-none transform transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExhibitionPage;
