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
