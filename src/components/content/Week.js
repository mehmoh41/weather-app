import React, { useContext, useEffect, useState } from "react";
import { CentigradeContext } from "../../context/weather";
import { apiKey } from "../Sidebar";
export default function Week({ latLon }) {
  let lat = latLon.lat;
  let lon = latLon.lon;
  const [week, setWeek] = useState({});
  const [centigrade, setCentigrade] = useContext(CentigradeContext);
  useEffect(() => {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          setWeek(result);
        });
    } catch (error) {
      console.log(error);
    }
  }, [lat, lon]);
  function getDay(unixTimeStamp) {
    var a = new Date(unixTimeStamp * 1000);
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dayOfWeek = days[a.getDay()];
    return dayOfWeek;
  }
  // <img
  //   src={`https://openweathermap.org/img/wn/${weather?.list[0]?.weather[0]?.icon}@${size}x.png`}
  //   alt="icon from openweathermap.org"
  // />

  return (
    <div className="flex items-center gap-6 my-8 flex-wrap">
      {/* giving the weather data from tommorrow not today */}
      {week.daily &&
        week.daily.slice(1, 8).map((daily) => {
          return (
            <div className="flex flex-col items-center justify-between bg-white shadow-md shadow-indigo-100 px-8 py-6">
              <p className="text-lg font-medium">{getDay(daily.dt)}</p>
              <img
                src={`https://openweathermap.org/img/wn/${
                  daily.weather[0]?.icon
                }@${2}x.png`}
                alt="icon from openweathermap.org"
                className="w-10 h-10"
              />
              <p className="flex items-center">
                <span className="font-medium text-md mr-3">
                  {centigrade
                    ? Math.round(daily.temp.max - 273.15) + "°"
                    : Math.round(daily.temp.max) + " K"}
                </span>
                <span className="text-gray-400 text-sm">
                  {centigrade
                    ? Math.round(daily.temp.min - 273.15) + "°"
                    : Math.round(daily.temp.min) + " K"}
                </span>
              </p>
              <p className="text-center text-blue-400 text-medium mt-4 text-xs">
                {daily.weather.map((d) => d.description)}
              </p>
            </div>
          );
        })}
    </div>
  );
}
