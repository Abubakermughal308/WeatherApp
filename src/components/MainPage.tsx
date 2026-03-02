// // import React, { useEffect, useState } from 'react'
// // import Header from './Header'

// // //  const cities = [
// // //     "Tokyo", "Delhi", "Shanghai", "Mexico City",
// // //     "Cairo", "Mumbai", "Beijing", "Dhaka", "Osaka", "Karachi",
// // //     "Istanbul", "Kolkata", "Lagos",  "Manila", "Tianjin", "Moscow",
// // //     "Los Angeles", "London", "Paris", "New York", "Sydney",
// // //     "Dubai", "Singapore", "Hong Kong", "Bangkok", "Rome",
// // //     "Toronto", "Berlin",
// // //     "Bangkok",
// // //   ];

// // //   const fetchBunch  = ()=>{

// // //       const Allresponse =  cities.map(async(city)=>{
// // //         const response = fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=abfb2d0df2260f489df4e09a01e55f27`)
// // //         return await response.json()
// // //       })

// // //   }
// // // // async function getRandomCitiesWeather(apiKey :string, count = 5) {
// // // //   // List of major cities worldwide
// // // //   const cities = [
// // // //     "Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City",
// // // //     "Cairo", "Mumbai", "Beijing", "Dhaka", "Osaka", "Karachi",
// // // //     "Chongqing", "Istanbul", "Buenos Aires", "Kolkata", "Lagos",
// // // //     "Manila", "Tianjin", "Rio de Janeiro", "Guangzhou", "Moscow",
// // // //     "Los Angeles", "London", "Paris", "New York", "Sydney",
// // // //     "Dubai", "Singapore", "Hong Kong", "Bangkok", "Rome",
// // // //     "Toronto", "Berlin", "Madrid", "Seoul", "Amsterdam",
// // // //     "Vancouver", "Barcelona", "Bangkok", "Kuala Lumpur"
// // // //   ];

// // // //   // Select random cities
// // // //   const randomCities = [...cities]
// // // //     .sort(() => 0.5 - Math.random())
// // // //     .slice(0, count);

// // // //   // Fetch weather for each city
// // // //   const promises = randomCities.map(async(city) => {
// // // //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
// // // //     return fetch(url).then(res => res.json());
// // // //   });

// // // //   try {
// // // //     const results = await Promise.all(promises);
// // // //     return results.filter(data => data.cod === 200); // Filter successful responses
// // // //   } catch (error) {
// // // //     console.error('Error:', error);
// // // //     return [];
// // // //   }
// // // // }

// // interface WeatherData {
// //      name : string;
// //     description : string;
// //     humidity : number;
// //     lon:number;
// //     [key : string] : string[] | string | number | boolean
// // }

// // const MainPage = () => {
// //     const [data , setData] = useState<WeatherData | null>(null)
// //     const [location , setLocation] = useState<string>("lahore")

// //     const fetchData = async (location:string):Promise<void>=>{
// //     const response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=abfb2d0df2260f489df4e09a01e55f27`)
// //     const JSON:WeatherData =( await response).json()
// //     setData(JSON)
// // }
// //   return (
// //     <div>
// //       {/* <Header/> */}

// //     </div>
// //   )
// // }

// // export default MainPage

import axios, { type AxiosResponse } from "axios";
import { Loader, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useGetWeatherIcon } from "./useGetWeatherIcon";

interface WeatherData {
  name: string;
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  coord: {
    lon: number;
    lat: number;
  };
  [key: string]: any;
}

const MainPage = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("Lahore");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const API_KEY: string = "100fa25ba0a213e31b0ea20d1b4d8cb0";

  const fetchData = async (location: string, apiKey: string): Promise<void> => {
    if (!location) {
      alert("Please enter the location");
      return;
    }
    try {
      setIsLoading(true);
      const data: AxiosResponse<WeatherData> = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`,
      );

      setData(data.data);
      if (!data.status || data.status !== 200) {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(location, API_KEY);
  }, []);

  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(location, API_KEY);
  };
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
   
const icon = data?.weather[0]?.main ? useGetWeatherIcon(data.weather[0].main) : "🌤️";
  

 
  return (
    <div className="h-auto w-full flex justify-center mt-5 lg:px-0 px-2 ">
      <div className="lg:w-7/12 w-full h-auto   shadow-2xl rounded-2xl  p-5">
        <form className="w-full flex gap-0.5 " onSubmit={(e) => submitData(e)}>
          <input
            type="text"
            value={location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLocation(e.target.value)
            }
            className="w-full outline-none   p-3 text-xl rounded-md border  border-gray-400 "
            placeholder="Search"
          />
          <button className="bg-blue-500 px-5 rounded-md text-white cursor-pointer">
            Submit
          </button>
        </form>
        <div>
          {isLoading && (
            <div className="flex w-full my-4 justify-center flex-col gap-3 items-center">
              <Loader className="animate-spin  text-blue-500" size={64} />
              <h3>Fetching data, please wait ...</h3>
            </div>
          )}
          {!isLoading && error && (
            <div className="bg-red-200 rounded-md w-full  py-8 my-3  flex items-center flex-col ">
              <h1 className="text-md font-bold">Failed to fetch</h1>
              <p>Please try another city</p>
            </div>
          )}
          {!isLoading && !error && (
            <div>
              <div className=" my-4 bg-blue-500 text-white rounded-2xl  p-4">
                <div>
                  <h3 className="text-2xl font-bold">
                    {data?.name}, {data?.sys.country}
                  </h3>
                  <h4 className="my-1">{date}</h4>
                </div>
                <div className="flex justify-between items-center">
                  <div className="my-2">
                    <h1 className="text-4xl font-bold my-2">
                      {data?.main.temp}°C
                    </h1>
                    <h3>{data?.weather[0]?.description}</h3>
                  </div>
                  <p className="text-5xl">{icon}</p>
                </div>
              </div>
              <div className="grid gap-2 w-full md:grid-cols-2  grid-cols-1  ">
                <WeatherDetailedCard
                  icon="🌡️"
                  title="Feels Like"
                  value={`${Math.round(data?.main.feels_like || 0)}°C`}
                />
                <WeatherDetailedCard
                  icon="💧"
                  title="Humidity"
                  value={`${data?.main.humidity}%`}
                />
                <WeatherDetailedCard
                  icon="💨"
                  title="Wind Speed"
                  value={`${data?.wind.speed} m/s`}
                />
                <WeatherDetailedCard
                  icon="📊"
                  title="Pressure"
                  value={`${data?.main.pressure} hPa`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface WeatherCardProps {
  icon: string;
  title: string;
  value: string;
}

const WeatherDetailedCard = ({ icon, title, value }: WeatherCardProps) => {
  return (
    <div className="flex items-center justify-center h-24 min-w-60 gap-3 shadow-md bg-gray-100 p-3 rounded-lg">
      <div className="text-2xl">{icon}</div>
      <div className="flex flex-col gap-2">
        <h4 className="text-md">{title}</h4>
        <p className="text-2xl font-bold text-black">{value}</p>
      </div>
    </div>
  );
};

export default MainPage;
