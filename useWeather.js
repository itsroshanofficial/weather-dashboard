import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { fetchWeather, geocodeCity } from '../api/weatherApi';
import { getWeatherInfo } from '../utils/weatherCodes';
import { deriveAlerts } from '../utils/alerts';

export function useWeather() {
  const [place, setPlace] = useState(null); // { name, latitude, longitude, ... }
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWeatherFor = useCallback(async (candidate) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(candidate.latitude, candidate.longitude);
      setPlace(candidate);
      setWeather(data);
    } catch (e) {
      setError(e.message || 'Something went wrong fetching the forecast.');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCity = useCallback(
    async (query) => {
      if (!query || !query.trim()) return;
      setLoading(true);
      setError(null);
      try {
        const results = await geocodeCity(query.trim());
        // Take the first/best match. A future version could let the user
        // pick between ambiguous matches (e.g. multiple "Springfield"s).
        await loadWeatherFor(results[0]);
      } catch (e) {
        setError(e.message || 'Could not find that location.');
        setLoading(false);
      }
    },
    [loadWeatherFor]
  );

  const useDeviceLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Location permission was denied. Search for a city instead.');
      }
      const position = await Location.getCurrentPositionAsync({});
      const [place_] = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      await loadWeatherFor({
        name: place_?.city || place_?.subregion || 'Current Location',
        admin1: place_?.region,
        country: place_?.country,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (e) {
      setError(e.message || 'Could not get your location.');
      setLoading(false);
    }
  }, [loadWeatherFor]);

  // On first mount, try the device's location; fall back silently so the
  // app still opens to a search box if permission is denied.
  useEffect(() => {
    useDeviceLocation().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = useCallback(() => {
    if (place) loadWeatherFor(place);
  }, [place, loadWeatherFor]);

  const weatherInfo = weather ? getWeatherInfo(weather.current.weatherCode) : null;
  const alerts = weather
    ? deriveAlerts({ current: weather.current, daily: weather.daily, weatherInfo })
    : [];

  return {
    place,
    weather,
    weatherInfo,
    alerts,
    loading,
    error,
    searchCity,
    useDeviceLocation,
    refresh,
  };
}
