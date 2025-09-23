import React, { useEffect, useState } from "react";
import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiThermometer,
} from "react-icons/wi";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Rainbow, CloudRainWind,Wind } from "lucide-react";
import { useTranslation } from "react-i18next";

const WeatherInfo = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Vaishali,in&units=metric&appid=0cf161c37a55bbda470954d39e9fb6cb`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    fetchWeather();
  }, []);

  const temp = weatherData?.main?.temp ?? "28";
  const feelsLike = weatherData?.main?.feels_like ?? "24";
  const humidity = weatherData?.main?.humidity ?? "45";
  const windSpeed = weatherData?.wind?.speed ?? "11";

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-10 pb-10 border-b border-gray-700">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-auto text-white p-4 md:p-6 rounded-3xl shadow-xl space-y-4"
      >
        <div className="weather flex min-h-[8em] md:min-h-[15em] min-w-full md:min-w-[20em] flex-col items-center justify-center gap-[0.5em] rounded-[1.5em] bg-black px-[0.75em] md:px-[1em] py-[0.5em] font-nunito text-white border border-gray-500/30">
          <div className="flex h-fit w-full items-center justify-center gap-[0.75em] md:gap-[1em]">
            <CloudRainWind size={50} className="md:w-[70px] md:h-[70px]" />
            <span className="h-[3em] md:h-[4em] w-[1px] rounded-full bg-gray-500"></span>
            <div className="flex flex-col items-start justify-center">
              <p className="text-[0.65rem] md:text-[0.75rem] font-light">
                Vaishali, Bihar
              </p>
              <p className="text-[1.25em] md:text-[1.5em] font-semibold">
                {temp}°C
              </p>
              <div className="flex items-center justify-center gap-[0.125em]">
                <svg
                  viewBox="0 0 16 17"
                  fill="none"
                  height="17"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 14.26A5.92 5.92 0 1 0 8 2.42a5.92 5.92 0 0 0 0 11.84Z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="#ffffff"
                  />
                  <path
                    d="M8.595 5.716A.589.589 0 0 1 8 6.292a.576.576 0 1 1 .595-.576Zm-1.05 5.363V7.636a.448.448 0 0 1 .629-.425.441.441 0 0 1 .268.425v3.443a.449.449 0 0 1-.896 0Z"
                    fill="#ffffff"
                  />
                </svg>
                <p className="text-[0.500rem] font-light">
                  Don't forget to carry an umbrella!
                </p>
              </div>
            </div>
          </div>

          <div className="h-[0.5px] w-full rounded-full bg-gray-500"></div>

          <div className="flex h-fit w-full items-center justify-between">
            <div className="flex h-fit w-full flex-col items-start justify-between text-[0.75em]">
              <div className="flex items-center gap-2 p-1 text-sm text-gray-200">
  {/* Icon + Label */}
  <div className="flex items-center gap-1">
    <Wind className="w-4 h-4" />
    <span>Wind Speed</span>
  </div>

  {/* Vertical Divider */}
  <div className="w-px h-4 bg-gray-400 opacity-60" />

  {/* Value */}
  <div>{windSpeed} km/hr</div>
</div>

              <div className="flex items-center gap-2 p-1 text-sm text-gray-200">
  {/* Icon + Label */}
  <div className="flex items-center gap-1">
    <svg
      viewBox="0 0 16 16"
      fill="none"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#a)">
        <path
          d="M12.606 7.393c.638.343 1.34.55 2.06.607v1.333a6.247 6.247 0 0 1-2.553-.666h-.053A5.227 5.227 0 0 0 10 8a4.1 4.1 0 0 0-1.867.593h-.04A5.693 5.693 0 0 1 6 9.333V8a5.06 5.06 0 0 0 1.533-.573h.04A5.24 5.24 0 0 1 10 6.667a6.247 6.247 0 0 1 2.553.7l.053.026Zm-.053 2.667A6.247 6.247 0 0 0 10 9.333a5.24 5.24 0 0 0-2.427.72h-.04A5.061 5.061 0 0 1 6 10.667V12a5.695 5.695 0 0 0 2.093-.707h.04A4.098 4.098 0 0 1 10 10.667a5.225 5.225 0 0 1 2.06.606h.053c.79.42 1.66.667 2.553.727v-1.333a5.228 5.228 0 0 1-2.06-.607h-.053Zm.113-5.307V2.667a1.333 1.333 0 0 0-1.333-1.334H4.666a1.333 1.333 0 0 0-1.333 1.334V4.78a6 6 0 0 0-2-.447v1.334a5.48 5.48 0 0 1 1.753.44h.067l.18.08v1.26a6 6 0 0 0-2-.447v1.333c.605.05 1.197.198 1.753.44h.067l.18.06v1.26a5.999 5.999 0 0 0-2-.446v1.333a5.506 5.506 0 0 1 1.753.44h.067l.18.06v1.853a1.333 1.333 0 0 0 1.333 1.334h6.667a1.333 1.333 0 0 0 1.333-1.334v-.46l-.553-.206h-.053c-.254-.114-.494-.22-.727-.307v.973H4.666V2.667h6.667V4.22A4.54 4.54 0 0 0 10 4a5.24 5.24 0 0 0-2.427.72h-.04A5.06 5.06 0 0 1 6 5.333v1.334a5.693 5.693 0 0 0 2.093-.707h.04A4.1 4.1 0 0 1 10 5.333a5.227 5.227 0 0 1 2.06.607h.053c.79.42 1.66.667 2.553.727V5.333c-.7-.053-1.38-.25-2-.58Z"
          fill="#ffffff"
        ></path>
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h16v16H0z" fill="#fff"></path>
        </clipPath>
      </defs>
    </svg>
    <span>AQI</span>
  </div>

  {/* Divider */}
  <div className="w-px h-4 bg-gray-200 opacity-60" />

  {/* Value */}
  <span>32</span>
</div>

              <div className="flex items-center gap-2 p-1">
  <div className="flex items-center gap-1 text-sm text-gray-200">
    <svg
      viewBox="0 0 16 16"
      fill="none"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 14.667c1.719 0 2.666-.9 2.666-2.534 0-2.162-2.158-3.914-2.25-3.987a.667.667 0 0 0-.833 0c-.092.073-2.25 1.825-2.25 3.987 0 1.634.947 2.534 2.667 2.534Zm0-5.093a4.102 4.102 0 0 1 1.333 2.56c0 .74-.223 1.2-1.333 1.2-1.11 0-1.334-.46-1.334-1.2A4.102 4.102 0 0 1 8 9.573ZM4.416 1.479a.667.667 0 0 0-.833 0c-.092.074-2.25 1.826-2.25 3.988C1.333 7.1 2.28 8 4 8c1.719 0 2.666-.9 2.666-2.533 0-2.162-2.158-3.914-2.25-3.988ZM4 6.667c-1.11 0-1.334-.46-1.334-1.2A4.102 4.102 0 0 1 4 2.907a4.102 4.102 0 0 1 1.333 2.56c0 .74-.223 1.2-1.333 1.2Zm8.416-5.188a.667.667 0 0 0-.833 0c-.092.074-2.25 1.826-2.25 3.988C9.333 7.1 10.28 8 12 8c1.719 0 2.666-.9 2.666-2.533 0-2.162-2.158-3.914-2.25-3.988ZM12 6.667c-1.11 0-1.334-.46-1.334-1.2A4.102 4.102 0 0 1 12 2.907a4.102 4.102 0 0 1 1.333 2.56c0 .74-.223 1.2-1.333 1.2Z"
        fill="#ffffff"
      />
    </svg>
    <span>Humidity</span>
  </div>
  <span className="h-4 w-px bg-gray-500"></span>
  <p className="text-sm text-gray-200">{humidity}%</p>
</div>

            </div>
            <div className="flex h-full w-[6rem] flex-col items-center py-[0.25em] text-[0.625em]">
              <div className="group relative z-0 h-[48px] w-[48px]">
                <img
                  src="/FeelLike.svg"
                  alt="Weather Icon"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <span className="absolute bottom-[8px] left-1/2 z-[-1] h-[4px] w-[32px] -translate-x-1/2 bg-[#68082e] blur-[6px] duration-200 ease-linear group-hover:w-[16px] group-hover:blur-[4px]"></span>
              </div>
              <p className="text-center font-light">Feels like {feelsLike}°C</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-[55%] space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
          {t("WeatherHeading")}
        </h1>
        <p className="text-white/80 text-xs leading-relaxed">
         {t("WeatherDescription")}
        </p>
      </motion.div>
    </div>
  );
};

export default WeatherInfo;
