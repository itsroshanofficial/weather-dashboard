// Maps Open-Meteo's WMO weather codes to human-readable text and icons.
// Reference: https://open-meteo.com/en/docs (WMO Weather interpretation codes)

const WEATHER_CODES = {
  0: { label: 'Clear sky', icon: 'sunny', emoji: '☀️', severity: 0 },
  1: { label: 'Mostly clear', icon: 'partly-sunny', emoji: '🌤️', severity: 0 },
  2: { label: 'Partly cloudy', icon: 'partly-sunny', emoji: '⛅', severity: 0 },
  3: { label: 'Overcast', icon: 'cloudy', emoji: '☁️', severity: 0 },
  45: { label: 'Fog', icon: 'cloud-outline', emoji: '🌫️', severity: 1 },
  48: { label: 'Depositing rime fog', icon: 'cloud-outline', emoji: '🌫️', severity: 1 },
  51: { label: 'Light drizzle', icon: 'rainy-outline', emoji: '🌦️', severity: 0 },
  53: { label: 'Moderate drizzle', icon: 'rainy-outline', emoji: '🌦️', severity: 0 },
  55: { label: 'Dense drizzle', icon: 'rainy', emoji: '🌧️', severity: 1 },
  56: { label: 'Light freezing drizzle', icon: 'snow-outline', emoji: '🌨️', severity: 1 },
  57: { label: 'Dense freezing drizzle', icon: 'snow-outline', emoji: '🌨️', severity: 2 },
  61: { label: 'Slight rain', icon: 'rainy-outline', emoji: '🌦️', severity: 0 },
  63: { label: 'Moderate rain', icon: 'rainy', emoji: '🌧️', severity: 1 },
  65: { label: 'Heavy rain', icon: 'rainy', emoji: '🌧️', severity: 2 },
  66: { label: 'Light freezing rain', icon: 'snow-outline', emoji: '🌨️', severity: 2 },
  67: { label: 'Heavy freezing rain', icon: 'snow-outline', emoji: '🌨️', severity: 3 },
  71: { label: 'Slight snow fall', icon: 'snow-outline', emoji: '🌨️', severity: 1 },
  73: { label: 'Moderate snow fall', icon: 'snow', emoji: '❄️', severity: 2 },
  75: { label: 'Heavy snow fall', icon: 'snow', emoji: '❄️', severity: 3 },
  77: { label: 'Snow grains', icon: 'snow-outline', emoji: '🌨️', severity: 1 },
  80: { label: 'Slight rain showers', icon: 'rainy-outline', emoji: '🌦️', severity: 0 },
  81: { label: 'Moderate rain showers', icon: 'rainy', emoji: '🌧️', severity: 1 },
  82: { label: 'Violent rain showers', icon: 'thunderstorm-outline', emoji: '⛈️', severity: 3 },
  85: { label: 'Slight snow showers', icon: 'snow-outline', emoji: '🌨️', severity: 1 },
  86: { label: 'Heavy snow showers', icon: 'snow', emoji: '❄️', severity: 2 },
  95: { label: 'Thunderstorm', icon: 'thunderstorm', emoji: '⛈️', severity: 3 },
  96: { label: 'Thunderstorm w/ slight hail', icon: 'thunderstorm', emoji: '⛈️', severity: 4 },
  99: { label: 'Thunderstorm w/ heavy hail', icon: 'thunderstorm', emoji: '⛈️', severity: 4 },
};

const DEFAULT_CODE = { label: 'Unknown', icon: 'help-circle-outline', emoji: '❓', severity: 0 };

export function getWeatherInfo(code) {
  return WEATHER_CODES[code] || DEFAULT_CODE;
}

export function isDaytime(isDay) {
  return isDay === 1;
}
