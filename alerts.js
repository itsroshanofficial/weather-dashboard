// Open-Meteo's free tier doesn't include official government weather
// alerts. This module derives practical "heads up" style alerts from the
// forecast data itself (extreme heat/cold, high wind, storms, heavy
// precipitation). If you need OFFICIAL alerts (e.g. NWS Tornado Warnings
// in the US), swap this out for a provider like api.weather.gov/alerts
// or a paid service that includes government alert feeds.

const HEAT_THRESHOLD_C = 35;
const COLD_THRESHOLD_C = -10;
const WIND_THRESHOLD_KMH = 50;
const GUST_THRESHOLD_KMH = 70;
const HIGH_PRECIP_PROB = 80;
const HIGH_UV = 8;

function makeAlert(id, severity, title, message) {
  // severity: 'info' | 'watch' | 'warning'
  return { id, severity, title, message };
}

/**
 * Build a list of alerts from current conditions + today's daily summary.
 */
export function deriveAlerts({ current, daily, weatherInfo }) {
  const alerts = [];
  const today = daily && daily[0];

  if (current) {
    if (current.temperature >= HEAT_THRESHOLD_C) {
      alerts.push(
        makeAlert(
          'heat',
          'warning',
          'Extreme Heat',
          `Current temperature is ${Math.round(current.temperature)}°. Stay hydrated and limit time outdoors.`
        )
      );
    }
    if (current.temperature <= COLD_THRESHOLD_C) {
      alerts.push(
        makeAlert(
          'cold',
          'warning',
          'Extreme Cold',
          `Current temperature is ${Math.round(current.temperature)}°. Risk of frostbite in prolonged exposure.`
        )
      );
    }
    if (current.windGusts >= GUST_THRESHOLD_KMH) {
      alerts.push(
        makeAlert(
          'gusts',
          'warning',
          'High Wind Gusts',
          `Gusts up to ${Math.round(current.windGusts)} km/h reported. Secure loose outdoor items.`
        )
      );
    } else if (current.windSpeed >= WIND_THRESHOLD_KMH) {
      alerts.push(
        makeAlert(
          'wind',
          'watch',
          'Windy Conditions',
          `Sustained winds near ${Math.round(current.windSpeed)} km/h.`
        )
      );
    }
    if (weatherInfo && weatherInfo.severity >= 3) {
      alerts.push(
        makeAlert(
          'severe-wx',
          'warning',
          weatherInfo.label,
          'Severe weather is occurring in your area right now. Consider postponing outdoor plans.'
        )
      );
    }
  }

  if (today) {
    if (today.precipitationProbability >= HIGH_PRECIP_PROB) {
      alerts.push(
        makeAlert(
          'precip',
          'watch',
          'Heavy Precipitation Likely',
          `${today.precipitationProbability}% chance of precipitation today.`
        )
      );
    }
    if (today.uvIndexMax >= HIGH_UV) {
      alerts.push(
        makeAlert(
          'uv',
          'info',
          'High UV Index',
          `UV index reaching ${Math.round(today.uvIndexMax)} today. Wear sunscreen.`
        )
      );
    }
  }

  return alerts;
}
