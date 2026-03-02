export const useGetWeatherIcon = (weatherCondition :string) : string =>{
    const icons : Record<string , string > = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Snow': '❄️',
    'Thunderstorm': '⛈️',
    'Drizzle': '🌦️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️'
    }
    return icons[weatherCondition || "🌤️"]
}