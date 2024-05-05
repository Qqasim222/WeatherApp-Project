/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-expect-error
import { fetchWeatherData, setPlace } from "../redux/reducers/weatherSlice";
import BackgroundLayout from "../components/background-layout/background-layout";
import WeatherCard from "../components/weather-card/weather-card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectCityDropdown from "../components/select-city-dropdown/select-city-dropdown";
import Loader from "../components/loader/loader";
import { ICity } from "../interfaces/city.interface";
import MiniCard from "../components/mini-card/mini-card";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";

interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

const Dashboard = () => {
  const dispatch = useDispatch();
  // @ts-expect-error
  const { data, loading } = useSelector((state: unknown) => state.weather);
  const [foreCast, setForeCast] = useState<WeatherData[]>([]);
  const [todayForeCast, setTodayForeCast] = useState<WeatherData | null>(null);

  const submitCity = (city: ICity) => {
    dispatch(setPlace(city));
    dispatch(fetchWeatherData(city));
  };

  useEffect(() => {
    if (data?.list?.length === 40) {
      setTodayForeCast(data.list[0]);
      setForeCast([data.list[9], data.list[17], data.list[25], data.list[33]]);
    }
  }, [data]);

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="w-full h-full text-white px-4 md:px-8">
        <ToastContainer position="top-right" autoClose={3000} />
        <nav className="w-full p-3 flex flex-col md:flex-col space-y-5 mt-7 md:mt-4 justify-between items-center">
          <h1 className="font-bold tracking-wide text-3xl" data-aos="fade-left">
            Weather App
          </h1>
          <div data-aos="fade-right" className="z-10">
            <SelectCityDropdown setCity={submitCity} />
          </div>
        </nav>
        <div className="">
          <BackgroundLayout
            iconString={
              data.list && data.list[0]?.weather
                ? data.list[0]?.weather[0].main
                : ""
            }
          />
        </div>
        <main className="w-full flex flex-col flex-wrap py-1 items-center justify-center">
          {todayForeCast && (
            <WeatherCard
              place={data?.city?.name}
              country={data?.city?.country}
              windSpeed={todayForeCast.wind.speed}
              humidity={todayForeCast.main.humidity}
              temperature={todayForeCast.main.temp}
              heatIndex={todayForeCast.main.feels_like}
              iconString={todayForeCast.weather[0].main}
              conditions={todayForeCast.weather[0].main}
            />
          )}
          <div className="flex justify-center gap-8 flex-wrap my-10">
            {foreCast?.map((f, index) => (
              <div
                key={index}
                className="mini-card"
                data-aos={
                  index === 0 || index === 1 ? "fade-right" : "fade-left"
                }
              >
                <MiniCard
                  time={f.dt}
                  iconString={f.weather[0].main}
                  temp={f.main.temp}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
