import React, { useContext, useEffect, useState } from "react";
import { CentigradeContext, ToggleWeekly } from "../../context/weather";
import { apiKey } from "../Sidebar";
export default function Week({ latLon }) {
  let lat = latLon.lat;
  let lon = latLon.lon;
  const [week, setWeek] = useState({});
  const [centigrade, setCentigrade] = useContext(CentigradeContext);
  const [toggleWeekly, setToggleWeekly] = useContext(ToggleWeekly);
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
    toggleWeekly && (
      <>
        <h2 className="text-2xl border-b-2 border-blue-400 font-bold inline-block mt-8 mb-4">
          Weekly Report
        </h2>
        <div className="grid grid-cols-12 items-center gap-6 my-8 flex-wrap">
          {/* giving the weather data from tommorrow not today */}
          {week.daily &&
            week.daily.slice(1, 8).map((daily) => {
              return (
                <div className="col-span-3 items-center justify-between bg-white shadow-md shadow-indigo-100 px-8 py-6">
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
                        ? Math.round(daily.temp.max - 273.15) + " °C"
                        : Math.round(((daily.temp.max - 273.15) * 9) / 5 + 32) +
                          " °F"}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {centigrade
                        ? Math.round(daily.temp.min - 273.15) + " °C"
                        : Math.round(((daily.temp.max - 273.15) * 9) / 5 + 32) +
                          " °F"}
                    </span>
                  </p>
                  <p className="text-center text-blue-400 text-medium mt-4 text-xs">
                    {daily.weather.map((d) => d.description)}
                  </p>
                </div>
              );
            })}
        </div>
      </>
    )
  );
}
