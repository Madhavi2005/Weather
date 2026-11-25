import { Droplets, Wind, Thermometer, CloudRain, Sun, Sunrise, Sunset } from 'lucide-react'

function formatLocalTime(value) {
  const time = value?.split('T')[1]
  if (!time) return '—'
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${period}`
}

export default function WeatherDetails({ weather, temperatureUnit }) {
  const toDisplayedTemperature = (celsius) =>
    temperatureUnit === 'F' ? (celsius * 9) / 5 + 32 : celsius
  const temperatureSymbol = `°${temperatureUnit}`
  const windSpeed = temperatureUnit === 'F'
    ? `${Math.round(weather.current.wind_speed_10m * 0.621371)} mph`
    : `${Math.round(weather.current.wind_speed_10m)} ${weather.units.wind_speed_10m}`
  const details = [
    { key: 'humidity', label: 'Humidity', icon: Droplets, value: `${weather.current.relative_humidity_2m}%`, hint: 'Relative humidity' },
    { key: 'wind', label: 'Wind speed', icon: Wind, value: windSpeed, hint: 'At the moment' },
    { key: 'feels', label: 'Feels like', icon: Thermometer, value: `${Math.round(toDisplayedTemperature(weather.current.apparent_temperature))}${temperatureSymbol}`, hint: 'Perceived temperature' },
    { key: 'rain', label: 'Precipitation', icon: CloudRain, value: `${weather.current.precipitation} ${weather.units.precipitation}`, hint: 'Current amount' },
    { key: 'uv', label: 'UV index', icon: Sun, value: Number.isFinite(weather.current.uv_index) ? weather.current.uv_index.toFixed(1) : '—', hint: 'Current exposure' },
    { key: 'sunrise', label: 'Sunrise', icon: Sunrise, value: formatLocalTime(weather.daily?.sunrise?.[0]), hint: 'Local time' },
    { key: 'sunset', label: 'Sunset', icon: Sunset, value: formatLocalTime(weather.daily?.sunset?.[0]), hint: 'Local time' },
  ]

  return (
    <section className="details-grid" aria-label="Weather details">
      {details.map(({ key, label, icon: Icon, value, hint }) => (
        <article className="detail-card" key={key}>
          <div className="detail-icon"><Icon size={20} /></div>
          <div className="detail-copy">
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{hint}</small>
          </div>
        </article>
      ))}
    </section>
  )
}