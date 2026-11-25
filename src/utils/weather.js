// Open-Meteo is a free weather API and does not require an API key.
export function getWeatherDescription(code) {
  if (code === 0) return { label: 'Clear sky', icon: 'sun' }
  if ([1, 2].includes(code)) return { label: 'Mainly clear', icon: 'cloud-sun' }
  if (code === 3) return { label: 'Overcast', icon: 'cloud' }
  if ([45, 48].includes(code)) return { label: 'Foggy', icon: 'cloud-fog' }
  if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Drizzle', icon: 'cloud-drizzle' }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: 'Rain showers', icon: 'cloud-rain' }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snowfall', icon: 'cloud-snow' }
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: 'cloud-lightning' }
  return { label: 'Current conditions', icon: 'cloud' }
}

export async function fetchWeather(city) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  const geoResponse = await fetch(geoUrl)
  if (!geoResponse.ok) throw new Error('Could not search for this city. Please try again.')
  const geoData = await geoResponse.json()
  const place = geoData.results?.[0]
  if (!place) throw new Error('City not found. Check the spelling and try another city.')

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,uv_index&daily=sunrise,sunset&timezone=auto`
  const weatherResponse = await fetch(weatherUrl)
  if (!weatherResponse.ok) throw new Error('Weather information is unavailable right now. Please refresh.')
  const weatherData = await weatherResponse.json()

  return {
    city: place.name,
    region: place.admin1 || place.country || '',
    country: place.country || '',
    timezone: weatherData.timezone,
    current: weatherData.current,
    units: weatherData.current_units,
    daily: weatherData.daily,
    dailyUnits: weatherData.daily_units,
    updatedAt: new Date(),
  }
}