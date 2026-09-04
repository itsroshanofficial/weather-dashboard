import React from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useWeather } from '../hooks/useWeather';
import SearchBar from '../components/SearchBar';
import AlertBanner from '../components/AlertBanner';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';

// Gradient shifts based on day/night for a small bit of atmosphere.
function getGradient(isDay) {
  return isDay ? ['#4A90D9', '#7FB8E8'] : ['#1B2A4A', '#2E4066'];
}

export default function HomeScreen() {
  const {
    place,
    weather,
    weatherInfo,
    alerts,
    loading,
    error,
    searchCity,
    useDeviceLocation,
    refresh,
  } = useWeather();

  const isDay = weather ? weather.current.isDay === 1 : true;
  const gradient = getGradient(isDay);

  return (
    <LinearGradient colors={gradient} style={styles.flex}>
      <StatusBar style="light" />
      <SearchBar onSearch={searchCity} onUseLocation={useDeviceLocation} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={loading && !!weather} onRefresh={refresh} tintColor="#fff" />
        }
      >
        {loading && !weather && (
          <View style={styles.centerState}>
            <ActivityIndicator color="#fff" size="large" />
            <Text style={styles.centerText}>Fetching forecast…</Text>
          </View>
        )}

        {!loading && error && !weather && (
          <View style={styles.centerState}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.centerText}>Try searching for a city above.</Text>
          </View>
        )}

        {weather && (
          <>
            <AlertBanner alerts={alerts} />
            <CurrentWeatherCard
              place={place}
              current={weather.current}
              weatherInfo={weatherInfo}
              units={weather.units}
            />
            <HourlyForecast hourly={weather.hourly} units={weather.units} />
            <DailyForecast daily={weather.daily} />
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  centerState: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100, gap: 8 },
  centerText: { color: 'rgba(255,255,255,0.85)', fontSize: 14 },
  errorText: { color: '#FFD166', fontSize: 15, fontWeight: '600', textAlign: 'center', paddingHorizontal: 24 },
});
