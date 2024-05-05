import React, { FC, useEffect, useState } from "react";
import sun from "../../assets/icons/sun.png";
import cloud from "../../assets/icons/cloud.png";
import fog from "../../assets/icons/fog.png";
import rain from "../../assets/icons/rain.png";
import snow from "../../assets/icons/snow.png";
import storm from "../../assets/icons/storm.png";
import wind from "../../assets/icons/windy.png";

interface MiniCardProps {
  time: number;
  temp: number;
  iconString: string;
}

const MiniCard: FC<MiniCardProps> = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState<string>();

  useEffect(() => {
    if (iconString) {
      if (iconString?.toLowerCase().includes("cloud")) {
        setIcon(cloud);
      } else if (iconString?.toLowerCase().includes("rain")) {
        setIcon(rain);
      } else if (iconString?.toLowerCase().includes("clear")) {
        setIcon(sun);
      } else if (iconString?.toLowerCase().includes("thunder")) {
        setIcon(storm);
      } else if (iconString?.toLowerCase().includes("fog")) {
        setIcon(fog);
      } else if (iconString?.toLowerCase().includes("snow")) {
        setIcon(snow);
      } else if (iconString?.toLowerCase().includes("wind")) {
        setIcon(wind);
      }
    }
  }, [iconString]);
  return (
    <div className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col">
      <p className="text-center pb-2">
        {
          new Date(time * 1000)
            .toLocaleTimeString("en", { weekday: "long" })
            .split(" ")[0]
        }
      </p>
      <hr />
      <div className="w-full flex justify-center items-center flex-1">
        <img
          src={icon}
          alt="forecast not available"
          className="w-[4rem] h-[4rem]"
        />
      </div>
      <p className="font-bold flex justify-center items-center">
        <p className="text-center font-bold">{`${(temp - 273.15).toFixed(
          2
        )}`}</p>
        <p className="relative ml-1">
          <span className="absolute">
            <span className="relative flex">
              <span className="animate-ping absolute inline-flex w-[4px] h-[4px] rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full w-[4px] h-[4px] bg-white"></span>
            </span>
          </span>
          <p>C</p>
        </p>
      </p>
    </div>
  );
};

export default MiniCard;
