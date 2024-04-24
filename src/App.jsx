import React, { useEffect, useState } from "react";
import Temperature from "./componenets/Temperature";
import Highlights from "./componenets/Highlights";

function App() {
  const [city, setCity] = useState("New Delhi");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=1206349403194e0e824150447242404&q=${city}&aqi=no`;
   

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not get data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);
  return (
    <div className="bg-slate-800 min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-screen-lg md:flex md:justify-between md:gap-4">
        <div className="w-full md:w-1/2">
          {weatherData && (
            <Temperature
              setCity={setCity}
              stats={{
                temp: weatherData.current.temp_c,
                condition: weatherData.current.condition.text,
                isDay: weatherData.current.is_day,
                location: weatherData.location.name,
                time: weatherData.location.localtime,
              }}
            />
          )}
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <h1 className="text-slate-200 text-2xl text-center mb-4">Today's Highlights</h1>
          <div className="grid grid-cols-2 gap-4">
            {weatherData && (
              <>
                <Highlights
                  stats={{
                    title: "Wind Status",
                    value: weatherData.current.wind_mph,
                    unit: "mph",
                    direction: weatherData.current.wind_dir,
                  }}
                />
                <Highlights
                  stats={{
                    title: "Humidity",
                    value: weatherData.current.humidity,
                    unit: "%",
                  }}
                />
                <Highlights
                  stats={{
                    title: "Visibility",
                    value: weatherData.current.vis_miles,
                    unit: "miles",
                  }}
                />
                <Highlights
                  stats={{
                    title: "Air Pressure",
                    value: weatherData.current.pressure_mb,
                    unit: "mb",
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;