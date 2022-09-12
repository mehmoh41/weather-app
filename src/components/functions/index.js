export const getDatafor7days = async (lat, lon, api) => {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api}`;
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log("data", data);
  } catch (error) {
    console.log(error);
  }
};
