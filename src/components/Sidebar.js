import React, { useContext, useEffect, useState } from "react";
import {
  CentigradeContext,
  LatLonContext,
  WeatherContext,
} from "../context/weather";
import Loader from "./loader/Loader";
export const apiKey = "d14070f98f6d39fc4f31bc9942b35333";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast";

export default function Sidebar() {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState("Quetta");
  const [loading, setLoading] = useState(false);
  const [toggleStorage, setToggleStorage] = useState(false);
  const [weatherCity, setWeatherCity] = useContext(WeatherContext);
  const [latLon, setLatLon] = useContext(LatLonContext);
  const [centigrade, setCentigrade] = useContext(CentigradeContext);
  function cityChangeHandler(enteredCity) {
    let city = enteredCity.target.value;
    setCity(city);
    // setToggleStorage(false);
  }
  console.log("centigrade from sidebar", centigrade);
  useEffect(() => {
    setLoading(true);

    fetch(`${apiUrl}?q=${city}&appid=${apiKey}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setWeatherCity({ cityName: result.city.name });
        // setWeatherData(result);
        setLatLon({ lat: result.city.coord.lat, lon: result.city.coord.lon });
        setLoading(false);
      });
  }, []);

  async function fetchData(e) {
    setLoading(true);
    e.preventDefault();
    await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setLatLon({ lat: result.city.coord.lat, lon: result.city.coord.lon });
        setLoading(false);
        setToggleStorage(false);
      });
  }
  // var iconName = weather?.list[0]?.weather[0]?.icon;
  var size = 4;

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const getCurrentDateTime = () => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var today = new Date();

    // var date =
    //   today.getFullYear() +
    //   "-" +
    //   (today.getMonth() + 1) +
    //   "-" +
    //   today.getDate();

    // var time = " " + today.getHours() + ":" + today.getMinutes();

    var day = weekday[today.getDay()];
    var dateTime = day;
    return dateTime;
  };

  function saveToLocalStorage(city) {
    // localStorage.setItem("cities", JSON.stringify(city));
    let cities;
    if (localStorage.getItem("cities") === null) {
      cities = [];
    } else {
      cities = JSON.parse(localStorage.getItem("cities"));
    }
    // const stringified = JSON.stringify(city);
    if (!cities.includes(city)) {
      cities.push(city);
      setToggleStorage(false);
    }
    localStorage.setItem("cities", JSON.stringify(cities));
  }
  const deleteCity = (cityName) => {
    console.log("cityName", cityName);
    setToggleStorage(false);
    let cities = JSON.parse(localStorage.getItem("cities"));
    var index = cities.indexOf(cityName);
    if (index > -1) {
      cities.splice(index, 1);
    }
    localStorage.setItem("cities", JSON.stringify(cities));
  };
  let savedCities = JSON.parse(localStorage.getItem("cities"));
  console.log("sidebar", weather);
  return (
    <aside className="col-span-12 lg:col-span-3 sm:col-span-4 bg-blue-50 flex flex-col px-10">
      <form method="POST" className="my-5" onSubmit={fetchData}>
        <div className="relative text-gray-600 focus-within:text-gray-400 mx-auto w-full text-center">
          <span className="absolute inset-y-0 left-0 flex items-center pl-1 pt-5">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="q"
            className="py-3 mt-5 text-sm text-gray-700 bg-gray-50 rounded-md pl-10 focus:outline-none w-full"
            placeholder="Search places..."
            autocomplete="off"
            value={city}
            onChange={cityChangeHandler}
          />
        </div>
      </form>
      {/* <Loader /> */}
      {
        // weather && city && city === weather.city?.name ? (
        city === " " ? (
          <div className="text-red-400 font-medium">
            Please provide a city name.
          </div>
        ) : !loading ? (
          weather ? (
            weather.cod !== "404" ? (
              <section>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-regular tracking-wider my-5">
                    {weather.city?.name + ", " + weather.city?.country}
                  </h2>

                  <button
                    className="px-2 py-1 bg-green-400 text-white text-left my-2 rounded-lg disabled:cursor-not-allowed"
                    onClick={() => saveToLocalStorage(city)}
                    // disabled={cityExist ? true : false}
                  >
                    Save Location
                  </button>
                </div>
                <section className="max-w-screen-sm">
                  <div
                    className="flex justify-between items-center my-3 bg-yellow-50 p-2 cursor-pointer"
                    onClick={() => setToggleStorage(!toggleStorage)}
                  >
                    <h5 className="font-medium">
                      Click to show saved locations
                    </h5>
                    {!toggleStorage ? (
                      <svg
                        className="w-8 h-8"
                        viewBox="0 -16 544 544"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>show</title>
                        <path d="M272 400Q205 400 151 361 96 322 64 256 96 190 151 151 205 112 272 112 336 112 392 153 448 193 480 256 448 319 392 360 336 400 272 400ZM272 352Q312 352 340 324 368 296 368 256 368 216 340 188 312 160 272 160 232 160 204 188 176 216 176 256 176 296 204 324 232 352 272 352ZM272 312Q249 312 233 296 216 279 216 256 216 233 233 217 249 200 272 200 295 200 312 217 328 233 328 256 328 279 312 296 295 312 272 312Z" />
                      </svg>
                    ) : (
                      <svg
                        className="h-8 w-8"
                        viewBox="0 -16 544 544"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>hide</title>
                        <path d="M108 60L468 420 436 452 362 378Q321 400 272 400 208 400 154 361 99 322 64 256 79 229 102 202 124 174 144 160L76 92 108 60ZM368 256Q368 216 340 188 312 160 272 160L229 117Q254 112 272 112 337 112 392 152 446 192 480 256 474 269 461 288 448 307 434 322L368 256ZM272 352Q299 352 322 338L293 309Q283 312 272 312 249 312 233 296 216 279 216 256 216 247 220 236L190 206Q176 229 176 256 176 296 204 324 232 352 272 352Z" />
                      </svg>
                    )}
                  </div>
                  {toggleStorage && (
                    <div className="flex gap-x-2 justify-evenly items-center flex-wrap">
                      {savedCities.length > 0 ? (
                        savedCities.map((savedCity) => {
                          return (
                            <>
                              <div className="flex items-center justify-between  bg-blue-200 px-2 py-2 hover:bg-blue-300 cursor-pointer rounded-sm">
                                <p
                                  className="w-20"
                                  onClick={() => setCity(savedCity)}
                                >
                                  {savedCity}
                                </p>
                                <svg
                                  className="w-8 h-8 mt-2 float-right hover:fill-red-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => deleteCity(savedCity)}
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
                                  />
                                </svg>
                              </div>
                            </>
                          );
                        })
                      ) : (
                        <div className="text-red-500 text-sm">
                          Sorry, you do not have any saved location.
                        </div>
                      )}
                    </div>
                  )}
                </section>
                <div className="icon my-10 mx-auto">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather?.list[0]?.weather[0]?.icon}@${size}x.png`}
                    alt="icon from openweathermap.org"
                  />
                </div>
                <div className="text border-b-2 border-indigo-200">
                  <h2 className="text-2xl font-medium flex items-center gap-4">
                    <p className="flex items-center">
                      <span className="inline-block font-normal tracking-wide text-5xl">
                        {weather && centigrade
                          ? Math.round(weather?.list[0]?.main.temp - 273.15)
                          : Math.round(
                              ((weather?.list[0]?.main.temp - 273.15) * 9) / 5 +
                                32
                            )}
                      </span>
                      {centigrade ? (
                        <svg
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 25.924 25.924"
                          className="w-8 h-8 ml-1"
                        >
                          <g>
                            <path
                              d="M4.699,2.278C2.107,2.278,0,4.386,0,6.977c0,2.593,2.107,4.698,4.699,4.698s4.7-2.106,4.699-4.698
    C9.398,4.386,7.291,2.278,4.699,2.278z M4.699,9.327c-1.295,0-2.35-1.054-2.35-2.35c0-1.294,1.055-2.35,2.35-2.35
    s2.35,1.055,2.35,2.35C7.049,8.273,5.994,9.327,4.699,9.327z M21.324,19.971c-3.91,0-6.227-2.463-6.227-6.369
    c0-4.342,2.721-6.456,6.195-6.456c1.592,0,2.836,0.349,3.703,0.725l0.928-3.475c-0.782-0.435-2.52-0.869-4.807-0.869
    c-5.904,0-10.652,3.678-10.652,10.336c0,5.558,3.475,9.783,10.221,9.783c2.346,0,4.198-0.464,4.979-0.841l-0.637-3.473
    C24.131,19.709,22.683,19.971,21.324,19.971z"
                            />
                          </g>
                        </svg>
                      ) : (
                        <span className="text-4xl  ml-1"> °F</span>
                      )}
                    </p>
                    <p className="flex items-center mt-4">
                      <span className="inline-block font-normal tracking-wide text-xl text-gray-400">
                        {weather && centigrade
                          ? Math.round(
                              weather?.list[0]?.main.feels_like - 273.15
                            )
                          : Math.round(
                              ((weather?.list[0]?.main.feels_like - 273.15) *
                                9) /
                                5 +
                                32
                            )}
                      </span>
                      {centigrade ? (
                        <svg
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 25.924 25.924"
                          className="w-4 h-4 ml-1 fill-current text-gray-400"
                        >
                          <g>
                            <path
                              d="M4.699,2.278C2.107,2.278,0,4.386,0,6.977c0,2.593,2.107,4.698,4.699,4.698s4.7-2.106,4.699-4.698
    C9.398,4.386,7.291,2.278,4.699,2.278z M4.699,9.327c-1.295,0-2.35-1.054-2.35-2.35c0-1.294,1.055-2.35,2.35-2.35
    s2.35,1.055,2.35,2.35C7.049,8.273,5.994,9.327,4.699,9.327z M21.324,19.971c-3.91,0-6.227-2.463-6.227-6.369
    c0-4.342,2.721-6.456,6.195-6.456c1.592,0,2.836,0.349,3.703,0.725l0.928-3.475c-0.782-0.435-2.52-0.869-4.807-0.869
    c-5.904,0-10.652,3.678-10.652,10.336c0,5.558,3.475,9.783,10.221,9.783c2.346,0,4.198-0.464,4.979-0.841l-0.637-3.473
    C24.131,19.709,22.683,19.971,21.324,19.971z"
                            />
                          </g>
                        </svg>
                      ) : (
                        <span className="text-4xl text-gray-500 ml-1"> °F</span>
                      )}
                    </p>
                  </h2>
                  <h4 className="my-3 tracking-wider">
                    <span className="font-bold mr-4">
                      {getCurrentDateTime()},
                    </span>{" "}
                    {formatAMPM(new Date())}
                  </h4>
                </div>
                <div className="report">
                  <div className="flex items-center my-5">
                    <img
                      src={`https://openweathermap.org/img/wn/${
                        weather?.list[0]?.weather[0]?.icon
                      }@${2}x.png`}
                      alt="icon from openweathermap.org"
                      className="w-16 h-16"
                    />
                    <h5 className="ml-5 font-light tracking-wider">
                      {weather?.list[0]?.weather[0]?.description}
                    </h5>
                  </div>
                  <div className="flex items-center my-5">
                    {weather?.rain && (
                      <>
                        <svg
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 159.705 159.705"
                          className="w-16 h-16"
                        >
                          <g>
                            <circle
                              className="fill-current text-[#A3DCE2]"
                              cx="79.853"
                              cy="79.852"
                              r="79.853"
                            />
                            <g>
                              <path
                                className="fill-current text-[#F0F0F0]"
                                d="M120.438,67.047c-1.53-14.711-13.965-26.182-29.081-26.182c-2.813,0-5.531,0.406-8.106,1.148
        c11.244,3.251,19.699,13.07,20.943,25.033c6.231,2.43,10.649,8.23,10.649,15.322c0,9.233-7.486,16.463-16.719,16.463
        c9.243,0,16.033,0,16.241,0c9.233,0,16.719-7.229,16.719-16.463C131.085,75.277,126.667,69.477,120.438,67.047z"
                              />
                              <path
                                className="fill-current text-[#FFFFFF]"
                                d="M114.844,82.369c0-7.092-4.418-13.021-10.649-15.451c-1.244-11.962-9.699-21.717-20.943-24.969
        c-5.203,1.5-9.813,4.434-13.389,8.309c-2.148-0.838-4.483-1.287-6.928-1.287c-9.83,0-17.919,7.438-18.971,16.986
        c-8.589,0.7-15.344,7.637-15.344,16.408c0,9.232,7.485,16.467,16.719,16.467c0.456,0,32.523,0,52.786,0
        C107.357,98.832,114.844,91.603,114.844,82.369z"
                              />
                              <path
                                className="fill-current text-[#FFFFFF]"
                                d="M112.049,114.717c0,3.05-2.473,5.521-5.521,5.521c-3.05,0-5.522-2.472-5.522-5.521
        c0-3.05,5.522-8.621,5.522-8.621S112.049,111.667,112.049,114.717"
                              />
                              <path
                                className="fill-current text-[#F7F7F7]"
                                d="M106.527,106.096v14.143c3.049,0,5.521-2.472,5.521-5.521
        C112.049,111.667,106.527,106.096,106.527,106.096"
                              />
                              <path
                                className="fill-current text-[#FFFFFF]"
                                d="M86.975,114.717c0,3.05-2.473,5.521-5.521,5.521c-3.05,0-5.521-2.472-5.521-5.521
        c0-3.05,5.521-8.621,5.521-8.621S86.975,111.667,86.975,114.717"
                              />
                              <path
                                className="fill-current text-[#F7F7F7]"
                                d="M81.453,106.096v14.143c3.049,0,5.521-2.472,5.521-5.521
        C86.975,111.667,81.453,106.096,81.453,106.096"
                              />
                              <path
                                className="fill-current text-[#FFFFFF]"
                                d="M61.9,114.717c0,3.05-2.473,5.521-5.521,5.521c-3.05,0-5.521-2.472-5.521-5.521
        c0-3.05,5.521-8.621,5.521-8.621S61.9,111.667,61.9,114.717"
                              />
                              <path
                                className="fill-current text-[#F7F7F7]"
                                d="M56.379,106.096v14.143c3.049,0,5.521-2.472,5.521-5.521
        C61.9,111.667,56.379,106.096,56.379,106.096"
                              />
                            </g>
                          </g>
                        </svg>
                        <h5 className="ml-5 font-light tracking-wider">
                          {weather?.rain ? `Rain: ${weather.rain["3h"]}` : ""}
                        </h5>
                      </>
                    )}
                  </div>
                </div>
                <div className="image my-5">
                  <div className="relative">
                    <img
                      src="images/cloudy.jpg"
                      alt=""
                      className="w-64 h-36 shadow-md rounded-2xl"
                    />
                    <p className="absolute top-2 left-2 text-white">
                      {weather.city?.name + ", " + weather.city?.country}
                    </p>
                  </div>
                </div>
              </section>
            ) : (
              <div className="text-red-400 font-medium">{weather.message}</div>
            )
          ) : (
            // <div className="text-red-400 font-medium">{weather.message}</div>
            "there is some problem"
          )
        ) : (
          <Loader />
        )
        // ) : (
        //   "Please enter city name."
        // )
      }
    </aside>
  );
}
