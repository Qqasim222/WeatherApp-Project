import { FC, useEffect, useState } from "react";
import sun from "../../assets/icons/sun.png";
import cloud from "../../assets/icons/cloud.png";
import fog from "../../assets/icons/fog.png";
import rain from "../../assets/icons/rain.png";
import snow from "../../assets/icons/snow.png";
import storm from "../../assets/icons/storm.png";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import "../../index.css";

interface WeatherCardProps {
  temperature: number;
  windSpeed: number;
  humidity: number;
  place: string;
  heatIndex: number;
  iconString: string;
  conditions: string;
  country: string;
}

const WeatherCard: FC<WeatherCardProps> = ({
  temperature,
  windSpeed,
  humidity,
  place,
  iconString,
  heatIndex,
  conditions,
  country,
}) => {
  const [icon, setIcon] = useState(rain);

  useEffect(() => {
    if (iconString) {
      const imageString = iconString;

      if (imageString?.toLowerCase().includes("clear")) {
        setIcon(sun);
      } else if (imageString?.toLowerCase().includes("cloud")) {
        setIcon(cloud);
      } else if (
        imageString?.toLowerCase().includes("rain") ||
        imageString?.toLowerCase().includes("shower")
      ) {
        setIcon(rain);
      } else if (imageString?.toLowerCase().includes("snow")) {
        setIcon(snow);
      } else if (imageString?.toLowerCase().includes("fog")) {
        setIcon(fog);
      } else if (
        imageString?.toLowerCase().includes("thunder") ||
        imageString?.toLowerCase().includes("storm")
      ) {
        setIcon(storm);
      } else if (imageString?.toLowerCase().includes("haze")) {
        setIcon(fog);
      }
    } else {
      setIcon(sun);
    }
  }, [iconString]);

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <div
      className="w-80 md:w-[22rem] md:min-w-[22rem] glassCard px-8 py-4 md:mt-6"
      data-aos="zoom-in"
    >
      <div className="flex w-full	items-center gap-4 mt-8 mb-8">
        <img src={icon} alt="weather_icon" />
        <p className="font-bold text-3xl md:ml-4 md:text-4xl flex justify-center items-center">
          <p className="mr-2">{`${(temperature - 273.15).toFixed(2)}`} </p>
          <p className="relative">
            <span className="absolute">
              <span className="relative flex">
                <span className="animate-ping absolute inline-flex w-[7px] h-[7px] rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full w-[7px] h-[7px] bg-white"></span>
              </span>
            </span>
            <p>C</p>
          </p>
        </p>
      </div>
      <div className="font-bold text-center text-xl">
        <p className="text-sm md:text-normal md:font-normal">Right now in </p>
        {`${place} - ${country}`}
      </div>
      <div className="w-full flex justify-between items-center mt-4 gap-4">
        <p className="flex-1 text-center p-2 text-sm md:text-md font-bold bg-blue-600 shadow rounded-lg">
          Wind Speed <p className="font-normal">{windSpeed} km/h</p>
        </p>
        <p className="flex-1 text-center p-2 text-sm md:text-md font-bold rounded-lg bg-green-600">
          Humidity <p className="font-normal">{humidity} gm/m&#179;</p>
        </p>
      </div>
      <div className="w-full p-3 mt-4 flex justify-between items-center">
        <p className="font-semibold text-lg">Heat Index</p>
        <p className="text-lg">{heatIndex ? heatIndex : "N/A"}</p>
      </div>
      <hr className="bg-slate-600" />
      <div className="w-full p-4 flex justify-center items-center text-3xl font-semibold">
        {conditions}
      </div>
    </div>
  );
};

export default WeatherCard;
