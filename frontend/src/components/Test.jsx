import React from 'react';

const Test = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-8">
      <div className="w-full max-w-xl relative flex flex-col items-center">
        {/* Image with text overlay */}
        <div className="relative w-full top-10">
          <img
            src={"/airways3.svg"}
            alt="Airways"
            className="w-full h-auto rounded-3xl"
          />
          <div className="absolute inset-0 flex flex-col justify-start items-center pt-8 z-10">
            <h1 className="text-[100px] font-bold text-white drop-shadow-xl text-center">
              Airways
            </h1>
            <span className="text-lg text-white font-medium mt-2">
              reach Patna via airways
            </span>
          </div>
        </div>

        {/* Bottom empty section if needed */}
        <div className="absolute left-0 bottom-8 z-20 w-full">
          {/* Optional content */}
        </div>
      </div>

      {/* Description section */}
      <div className="mt-12 max-w-xl w-full rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-3">How to reach Patna by Air</h2>
        <ul className="text-lg text-gray-800 leading-relaxed list-disc pl-6">
          <li>Patna Airport (Jay Prakash Narayan International Airport) is well connected to major Indian cities.</li>
          <li>Direct flights available from Delhi, Mumbai, Kolkata, Bangalore, and other metros.</li>
          <li>The airport is about 5 km from the city center.</li>
          <li>Prepaid taxis, app cabs, and auto-rickshaws are available at the airport for easy city access.</li>
        </ul>
      </div>
    </div>
  );
};

export default Test;
