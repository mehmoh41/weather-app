import { createContext, useState } from "react";
export const WeatherContext = createContext();
export const LatLonContext = createContext();
export const CentigradeContext = createContext();
export const WeatherProvider = (props) => {
  const [weatherCity, setWeatherCity] = useState({
    cityName: "",
  });
  return (
    <WeatherContext.Provider value={[weatherCity, setWeatherCity]}>
      {props.children}
    </WeatherContext.Provider>
  );
};
export const LatLonProvider = (props) => {
  const [latLon, setLatLon] = useState({
    lat: "",
    lon: "",
  });
  return (
    <LatLonContext.Provider value={[latLon, setLatLon]}>
      {props.children}
    </LatLonContext.Provider>
  );
};

export const CentrigradeProvider = (props) => {
  const [centigrade, setCentigrade] = useState(true);
  return (
    <CentigradeContext.Provider value={[centigrade, setCentigrade]}>
      {props.children}
    </CentigradeContext.Provider>
  );
};
