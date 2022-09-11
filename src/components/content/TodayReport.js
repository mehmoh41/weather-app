import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import Loader from "../loader/Loader";

export default function TodayReport({ weatherData }) {
  const [airQuality, setAirQuality] = useState({});
  const [UVI, setUVI] = useState();
  const [loader, setLoader] = useState(false);
  var lat = weatherData.city && weatherData.city.coord.lat;
  var lon = weatherData.city && weatherData.city.coord.lon;
  console.log("weatherData from report", weatherData);
  const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&lang=en&appid=d14070f98f6d39fc4f31bc9942b35333`;
  const urlUVI = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&lang=en&appid=d14070f98f6d39fc4f31bc9942b35333`;
  useEffect(() => {
    setLoader(true);
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setAirQuality(result);
        setLoader(false);
      });
  }, [url]);
  useEffect(() => {
    setLoader(true);
    fetch(urlUVI)
      .then((res) => res.json())
      .then((result) => {
        setUVI(result);
        setLoader(false);
      });
  }, [urlUVI]);
  console.log("air quality", airQuality);
  function convertTo12() {
    var output = convertUnixToTime(
      weatherData.city ? weatherData.city.sunset : ""
    );
    return moment(output, ["HH:mm"]).format("hh:mm A");
  }

  function convertUnixToTime(unix_timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    // var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ":" + minutes.substr(-2);

    return formattedTime;
  }

  return (
    <section>
      <h2 className="font-medium text-xl">Today Hightlight</h2>
      <div className="grid grid-cols-12 my-5 gap-4">
        <div className="col-span-6 flex flex-col gap-5 w-full bg-white justify-between items-center p-3">
          <h5 className="font-normal text-gray-400">UV index</h5>
          <h1 className="font-normal text-4xl text-center">
            {UVI && Math.round(UVI.value)}
          </h1>
        </div>
        <div className="col-span-6 flex flex-col gap-5 w-full bg-white justify-between items-center p-3">
          <h5 className="font-normal text-gray-400">Wind Status</h5>
          <h1 className="font-normal text-4xl text-center">
            {weatherData.list ? weatherData.list[0].wind.speed : ""}{" "}
            <span className="text-sm text-gray-300">km/h</span>
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-3 sm:col-span-6 bg-white p-3 ">
          <h5 className="text-gray-400 font-normal mt-3">Sunrise and Sunset</h5>
          <div className="flex items-center gap-6 my-5">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              className="h-10 w-10"
              viewBox="0 0 511.984 511.984"
            >
              <g>
                <path
                  className="fill-current text-[#F6BB42]"
                  d="M95.998,282.643H32c-5.891,0-10.664,4.781-10.664,10.688c0,5.875,4.773,10.656,10.664,10.656h63.998
		c5.89,0,10.663-4.781,10.663-10.656C106.661,287.425,101.888,282.643,95.998,282.643z"
                />
                <path
                  className="fill-current text-[#F6BB42]"
                  d="M479.985,282.643h-63.997c-5.891,0-10.656,4.781-10.656,10.672s4.766,10.672,10.656,10.672h63.997
		c5.891,0,10.656-4.781,10.656-10.656C490.641,287.425,485.876,282.643,479.985,282.643z"
                />
              </g>
              <path
                className="fill-current text-[#FFCE54]"
                d="M406.832,127.39l-45.25,45.257c-4.155,4.164-4.155,10.914,0,15.077
	c4.156,4.172,10.922,4.172,15.094,0l45.249-45.248c4.156-4.164,4.156-10.922,0-15.086
	C417.769,123.226,411.004,123.226,406.832,127.39z"
              />
              <path
                className="fill-current text-[#F6BB42]"
                d="M245.328,69.33v63.998c0,5.891,4.773,10.664,10.664,10.664c5.891,0,10.664-4.773,10.664-10.664V69.33
	c0-5.89-4.773-10.671-10.664-10.671S245.328,63.44,245.328,69.33z"
              />
              <g>
                <path
                  className="fill-current text-[#FFCE54]"
                  d="M90.068,142.476l45.248,45.256c4.164,4.164,10.922,4.164,15.086,0
		c4.164-4.163,4.164-10.921,0-15.085l-45.257-45.257c-4.164-4.164-10.913-4.164-15.077,0
		C85.896,131.555,85.896,138.312,90.068,142.476z"
                />
                <path
                  className="fill-current text-[#FFCE54]"
                  d="M146.426,335.985c-5.305-13.562-7.984-27.89-7.984-42.654c0-64.826,52.732-117.559,117.551-117.559
		c64.812,0,117.559,52.732,117.559,117.559c0,14.765-2.688,29.093-8,42.654H146.426z"
                />
              </g>
              <path
                className="fill-current text-[#F6BB42]"
                d="M255.992,165.1c-70.811,0-128.215,57.405-128.215,128.23c0,19.03,4.148,37.076,11.586,53.311h233.25
	c7.438-16.234,11.594-34.28,11.594-53.311C384.207,222.506,326.803,165.1,255.992,165.1z M358.02,325.329H153.972
	c-3.234-10.296-4.867-21.014-4.867-31.998c0-28.562,11.116-55.405,31.311-75.591c20.188-20.188,47.022-31.304,75.576-31.304
	c28.562,0,55.39,11.116,75.576,31.304c20.202,20.186,31.311,47.029,31.311,75.591C362.879,304.315,361.238,315.033,358.02,325.329z"
              />
              <path
                className="fill-current text-[#ED5564]"
                d="M286.163,393.733l-22.632-22.624l0,0c-1.938-1.938-4.593-3.125-7.539-3.125l0,0
	c-2.938,0-5.602,1.188-7.531,3.109l-0.008,0.016l-22.632,22.624c-4.164,4.156-4.164,10.906,0,15.094
	c2.086,2.063,4.813,3.109,7.547,3.109c2.727,0,5.461-1.047,7.538-3.109l4.422-4.438v38.249c0,5.906,4.773,10.687,10.664,10.687l0,0
	c5.891,0,10.664-4.78,10.664-10.687v-38.249l4.422,4.438c2.07,2.078,4.82,3.125,7.539,3.125c2.733,0,5.468-1.047,7.546-3.125
	C290.335,404.655,290.335,397.889,286.163,393.733z"
              />
              <path
                className="fill-current text-[#656D78]"
                d="M501.328,325.329H10.664C4.773,325.329,0,330.095,0,335.985s4.773,10.656,10.664,10.656h490.664
	c5.875,0,10.656-4.766,10.656-10.656S507.203,325.329,501.328,325.329z"
              />
            </svg>
            <p className="flex flex-col">
              <span className="font-medium text-md leading-tight">
                {convertUnixToTime(
                  weatherData.city ? weatherData.city.sunrise : ""
                )}{" "}
                AM
              </span>
            </p>
          </div>
          <div className="flex items-center gap-6 mb-5">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              className="h-10 w-10"
              viewBox="0 0 511.984 511.984"
            >
              <g>
                <path
                  className="fill-current text-[#F6BB42]"
                  d="M95.998,282.643H32c-5.891,0-10.664,4.781-10.664,10.688c0,5.875,4.773,10.656,10.664,10.656h63.998
		c5.89,0,10.663-4.781,10.663-10.656C106.661,287.425,101.888,282.643,95.998,282.643z"
                />
                <path
                  className="fill-current text-[#F6BB42]"
                  d="M479.985,282.643h-63.997c-5.891,0-10.656,4.781-10.656,10.688c0,5.875,4.766,10.656,10.656,10.656
		h63.997c5.891,0,10.656-4.781,10.656-10.656C490.641,287.425,485.876,282.643,479.985,282.643z"
                />
              </g>
              <path
                className="fill-current text-[#FFCE54]"
                d="M406.832,127.39l-45.25,45.257c-4.155,4.164-4.155,10.914,0,15.085
	c4.156,4.164,10.922,4.164,15.094,0l45.249-45.256c4.156-4.164,4.156-10.922,0-15.086
	C417.754,123.226,411.004,123.226,406.832,127.39z"
              />
              <path
                className="fill-current text-[#F6BB42]"
                d="M245.328,69.33v63.998c0,5.891,4.773,10.664,10.664,10.664c5.891,0,10.664-4.773,10.664-10.664V69.33
	c0-5.89-4.773-10.671-10.664-10.671S245.328,63.44,245.328,69.33z"
              />
              <g>
                <path
                  className="fill-current text-[#FFCE54]"
                  d="M90.068,142.476l45.248,45.256c4.164,4.164,10.922,4.164,15.086,0
		c4.164-4.171,4.164-10.921,0-15.085l-45.257-45.257c-4.164-4.164-10.913-4.164-15.077,0
		C85.896,131.555,85.896,138.312,90.068,142.476z"
                />
                <path
                  className="fill-current text-[#FFCE54]"
                  d="M146.426,335.985c-5.305-13.562-7.984-27.89-7.984-42.654c0-64.826,52.732-117.559,117.551-117.559
		c64.812,0,117.559,52.732,117.559,117.559c0,14.765-2.688,29.093-8,42.654H146.426z"
                />
              </g>
              <path
                className="fill-current text-[#F6BB42]"
                d="M255.992,165.1c-70.811,0-128.215,57.405-128.215,128.23c0,19.03,4.148,37.076,11.586,53.311h233.25
	c7.438-16.234,11.594-34.28,11.594-53.311C384.207,222.506,326.803,165.1,255.992,165.1z M358.02,325.329H153.972
	c-3.234-10.296-4.867-21.014-4.867-31.998c0-28.562,11.116-55.405,31.311-75.591c20.188-20.188,47.022-31.304,75.576-31.304
	c28.562,0,55.39,11.116,75.576,31.304c20.202,20.186,31.311,47.029,31.311,75.591C362.879,304.315,361.238,315.033,358.02,325.329z"
              />
              <path
                className="fill-current text-[#ED5564]"
                d="M225.821,427.561l22.632,22.64c0,0,0,0,0.008,0c1.93,1.921,4.594,3.124,7.531,3.124l0,0
	c2.938,0,5.602-1.203,7.531-3.124h0.008l22.632-22.624c4.172-4.172,4.172-10.938,0-15.094c-2.078-2.094-4.813-3.125-7.546-3.125
	c-2.719,0-5.453,1.031-7.539,3.125l-4.422,4.406V378.64c0-5.875-4.773-10.656-10.664-10.656l0,0
	c-5.891,0-10.664,4.781-10.664,10.656v38.249l-4.422-4.406c-2.077-2.094-4.812-3.125-7.538-3.125c-2.734,0-5.461,1.031-7.547,3.125
	C221.657,416.639,221.657,423.389,225.821,427.561z"
              />
              <path
                className="fill-current text-[#656D78]"
                d="M501.328,325.329H10.664C4.773,325.329,0,330.095,0,335.985s4.773,10.656,10.664,10.656h490.664
	c5.875,0,10.656-4.766,10.656-10.656S507.203,325.329,501.328,325.329z"
              />
            </svg>
            <p className="flex flex-col">
              <span className="font-medium text-md leading-tight">
                {convertTo12()}
              </span>
            </p>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-3 sm:col-span-6 bg-white p-3">
          <div className="flex justify-evenly flex-col gap-6 py-3">
            <h5 className="text-gray-400 font-normal">Humidity</h5>

            <h2 className="text-6xl font-normal">
              {weatherData.list ? weatherData?.list[0]?.main.humidity : ""}{" "}
              <span className="text-base text-gray-400">%</span>
            </h2>
            <p className="text-md">
              Status : <span className="text-blue-500">Good Quality</span>
            </p>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-3 sm:col-span-6 bg-white p-3">
          <div className="flex justify-evenly flex-col gap-6 py-3">
            <h5 className="text-gray-400 font-normal">Visibility</h5>

            <h2 className="text-6xl font-normal">
              {weatherData.list ? weatherData?.list[0]?.visibility / 1000 : ""}{" "}
              <span className="text-base text-gray-400">km/h</span>
            </h2>
            <p className="text-md">
              Status : <span className="text-yellow-500">Average</span>
            </p>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-3 sm:col-span-6 bg-white p-3">
          {loader ? (
            <Loader />
          ) : (
            <div className="flex justify-evenly flex-col gap-6 py-3">
              <h5 className="text-gray-400 font-normal">Air Quality</h5>

              <h2 className="text-6xl font-normal">working on AQI</h2>
              <p className="text-md">
                Status :{" "}
                <span className="text-green-400">Good Air Quality</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
