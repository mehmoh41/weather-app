import { createContext, useState } from "react";
export const WeatherContext = createContext();
export const WeatherProvider = (props) => {
  const [weatherData, setWeatherData] = useState({});
  return (
    <WeatherContext.Provider value={[weatherData, setWeatherData]}>
      {props.children}
    </WeatherContext.Provider>
  );
};
