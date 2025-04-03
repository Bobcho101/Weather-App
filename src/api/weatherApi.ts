import { useState } from "react";
import { API_KEY } from "../constants";

interface WeatherResponse {
    coord: object;
    weather: Weather[];
    base: string;
    main: WeatherMain;
    visibility: number;
    wind: object;
    clouds: object;
    dt: number;
    sys: object;
    timezone: number;
    id: number;
    name: string;
    cod: number;
};

interface WeatherMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number; 
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export const useGetCityInfo = () => {
    const [cityTemp, setCityTemp] = useState<number>();
    const [cityDescription, setCityDescription] = useState<string>('');

    const getCityTemp = async (city: string) => {
        const response: Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data: WeatherResponse = await response.json();
        setCityTemp(data.main.temp);
        const description = 
            data.weather[0].description.split(" ")
            .map((word) => word.charAt(0) 
            .toUpperCase() + word.slice(1)).join(" ");

        setCityDescription(description);
    }; 

    return { cityTemp, cityDescription, getCityTemp };
}