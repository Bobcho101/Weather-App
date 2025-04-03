import { useState } from "react";
import { useGetCityInfo } from "../api/weatherApi"

export const AppContainer: React.FC = () => {
    const [ inputValue, setInputValue ] = useState<string>("");
    const { cityTemp, cityDescription, loading, error, getCityTemp } = useGetCityInfo();
    const [ unit, setUnit ] = useState<string>("celsius");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const searchBtnHandler = () => {
        if(inputValue.trim() === "") return;
        getCityTemp(inputValue);
    }

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUnit(e.target.value);
    };

    return(
    <>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-96">
                <h1 className="text-2xl font-semibold text-center text-white mb-6">Weather App</h1>

                <div className="mb-6">
                <label htmlFor="city" className="block text-lg text-gray-400 mb-2">
                    Enter City:
                </label>
                <input
                    id="city"
                    type="text"
                    placeholder="City Name"
                    className="w-full p-2 border border-gray-600 rounded-lg text-white bg-gray-700 text-lg"
                    onChange={handleInputChange}
                    value={inputValue}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="unit" className="block text-lg text-gray-400 mb-2">
                        Select Unit:
                    </label>
                    <select
                        id="unit"
                        className="w-full p-2 border border-gray-600 rounded-lg text-white bg-gray-700 text-lg"
                        value={unit}
                        onChange={handleUnitChange}
                    >
                        <option value="celsius">Celsius (°C)</option>
                        <option value="fahrenheit">Fahrenheit (°F)</option>
                    </select>
                </div>

                <div className="mb-6">
                    <button
                        onClick={searchBtnHandler}
                        className="w-full cursor-pointer py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Get Info
                    </button>
                </div>
                

                {loading
                ?<div className="flex justify-center items-center">
                    <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>
                : <div className="text-center">
                    {error 
                    ? <div className="text-xl text-gray-400">Invalid City!</div> 
                    : cityTemp && <><div className="text-3xl font-semibold text-white">
                        { unit === "celsius" 
                            ? `${(cityTemp - 273.15).toFixed(1)}°C` 
                            : `${cityTemp.toFixed(1)}°F`}
                        </div>
                        <div className="text-xl text-gray-400">{cityDescription}</div>
                    </>
                    }
                    
                </div>
                }

                
            </div>
        </div>
    </>)
}