import { useEffect, useState } from 'react'
import { MapPin, RefreshCw, Clock3, CloudSun, Sparkles } from 'lucide-react'
import SearchBar from './components/SearchBar.jsx'
import WeatherIcon from './components/WeatherIcon.jsx'
import WeatherDetails from './components/WeatherDetails.jsx'
import { fetchWeather, getWeatherDescription } from './utils/weather.js'

export default function App() {
  const [cityInput, setCityInput] = useState('London')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')
  const [temperatureUnit, setTemperatureUnit] = useState('C')

  async function searchWeather(city = cityInput) {
    const cleanCity = city.trim()
    if (!cleanCity) {
      setError('Please enter a city name to search.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const result = await fetchWeather(cleanCity)
      setWeather(result)
      setCityInput(cleanCity)
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchWeather('London')
  }, [])

  const condition = weather ? getWeatherDescription(weather.current.weather_code) : null
  const isDay = weather?.current.is_day === 1
  const temperature = weather
    ? temperatureUnit === 'F'
      ? (weather.current.temperature_2m * 9) / 5 + 32
      : weather.current.temperature_2m
    : null

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="/" aria-label="SkyCast home">
          <span className="brand-mark"><CloudSun size={23} /></span>
          <span>sky<span>cast</span></span>
        </a>
        <div className="live-pill"><span className="live-dot" /> LIVE WEATHER</div>
      </header>

      <section className="intro">
        <div className="eyebrow"><Sparkles size={14} /> YOUR WEATHER, BEAUTIFULLY CLEAR</div>
        <h1>Forecasts that feel<br /><span>like sunshine.</span></h1>
        <p>Explore the weather anywhere in the world, right now.</p>
        <SearchBar value={cityInput} onChange={setCityInput} onSearch={() => searchWeather()} loading={loading} />
        <div className="quick-searches" aria-label="Popular cities">
          <span>Try</span>
          {['Tokyo', 'New York', 'Paris', 'Sydney'].map((city) => (
            <button type="button" key={city} onClick={() => searchWeather(city)} disabled={loading}>{city}</button>
          ))}
        </div>
      </section>

      {error && (
        <div className="state-message error-state" role="alert">
          <span>⚠</span>
          <div><strong>Unable to get weather</strong><p>{error}</p></div>
          <button onClick={() => searchWeather()} type="button">Try again</button>
        </div>
      )}

      {loading && !weather && (
        <div className="state-message loading-state"><span className="spinner" /> Fetching the latest weather...</div>
      )}

      {weather && (
        <>
          <section className={`weather-hero ${isDay ? 'day' : 'night'}`}>
            <div className="hero-orb orb-a" /><div className="hero-orb orb-b" />
            <div className="hero-topline">
              <div className="location"><MapPin size={17} /><span>{weather.city}{weather.region ? `, ${weather.region}` : ''}{weather.country ? `, ${weather.country}` : ''}</span></div>
              <button className="refresh-button" onClick={() => searchWeather(weather.city)} disabled={loading} aria-label="Refresh weather">
                <RefreshCw size={16} className={loading ? 'spin-icon' : ''} /> <span>{loading ? 'Refreshing' : 'Refresh'}</span>
              </button>
            </div>
            <div className="hero-content">
              <div className="temperature-block">
                <div className="condition-label">{condition.label}</div>
                <div className="temperature">{Math.round(temperature)}<span>°{temperatureUnit}</span></div>
                <div className="hero-subtitle">A little snapshot of your sky</div>
              </div>
              <div className="weather-art">
                <div className="weather-glow" />
                <WeatherIcon type={condition.icon} size={116} className="main-weather-icon" />
              </div>
            </div>
            <div className="hero-footer">
              <span><Clock3 size={14} /> Local time · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>Updated at {lastUpdated || '—'}</span>
            </div>
          </section>

          <div className="section-heading">
            <div><span className="section-kicker">AT A GLANCE</span><h2>Today's conditions</h2></div>
            <div className="weather-options">
              <div className="unit-switch" role="group" aria-label="Temperature units">
                {['C', 'F'].map((unit) => (
                  <button
                    type="button"
                    key={unit}
                    className={temperatureUnit === unit ? 'active' : ''}
                    aria-pressed={temperatureUnit === unit}
                    onClick={() => setTemperatureUnit(unit)}
                  >
                    °{unit}
                  </button>
                ))}
              </div>
              <span className="unit-note">LIVE DATA</span>
            </div>
          </div>
          <WeatherDetails weather={weather} temperatureUnit={temperatureUnit} />
        </>
      )}

      {!weather && !loading && !error && (
        <div className="empty-state"><CloudSun size={48} /><h2>Find your forecast</h2><p>Search for a city to see its current weather conditions.</p></div>
      )}

      <footer className="footer">
        <span>Made for brighter days <span className="footer-sun">✦</span></span>
        <span>Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a></span>
      </footer>
    </main>
  )
}