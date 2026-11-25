import {
  Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain,
  CloudSnow, CloudLightning, Cloudy,
} from 'lucide-react'

const icons = {
  sun: Sun,
  'cloud-sun': CloudSun,
  cloud: Cloud,
  'cloud-fog': CloudFog,
  'cloud-drizzle': CloudDrizzle,
  'cloud-rain': CloudRain,
  'cloud-snow': CloudSnow,
  'cloud-lightning': CloudLightning,
}

export default function WeatherIcon({ type = 'cloud', size = 72, className = '' }) {
  const Icon = icons[type] || Cloudy
  return <Icon size={size} strokeWidth={1.5} className={className} />
}