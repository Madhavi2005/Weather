# SkyCast — Weather Dashboard

A responsive React weather dashboard built with Vite. It searches for a city and displays current temperature, condition, humidity, wind speed, feels-like temperature and precipitation.

## Features
- Search weather by city name
- Current temperature and weather condition
- Weather icons based on the API condition code
- Humidity, wind speed, feels-like temperature and precipitation
- Loading, error, and empty states
- Refresh button
- Responsive design for mobile and desktop
- No API key required

## API
This project uses the free [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) to find city coordinates and the [Open-Meteo Forecast API](https://open-meteo.com/en/docs) to retrieve current weather.

## Folder structure
```text
weather-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── WeatherDetails.jsx
│   │   └── WeatherIcon.jsx
│   ├── utils/
│   │   └── weather.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Run locally
1. Extract the ZIP file.
2. Open the `weather-dashboard` folder in VS Code.
3. Open the terminal in VS Code.
4. Run:

```bash
npm install
npm run dev
```

5. Open the localhost URL shown in the terminal.

## Create a production build
```bash
npm run build
```
The production website files will be created in the `dist` folder.
