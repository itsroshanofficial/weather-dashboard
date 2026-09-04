import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CurrentWeatherCard({ place, current, weatherInfo, units }) {
  if (!place || !current) return null;

  const locationLabel = [place.name, place.admin1, place.country]
    .filter(Boolean)
    .slice(0, 2)
    .join(', ');

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{locationLabel}</Text>
      <View style={styles.mainRow}>
        <Ionicons name={weatherInfo.icon} size={64} color="#fff" />
        <Text style={styles.temp}>
          {Math.round(current.temperature)}
          <Text style={styles.unit}>{units.temperature}</Text>
        </Text>
      </View>
      <Text style={styles.description}>{weatherInfo.label}</Text>
      <Text style={styles.feelsLike}>
        Feels like {Math.round(current.apparentTemperature)}
        {units.temperature}
      </Text>

      <View style={styles.statsRow}>
        <Stat icon="water-outline" label="Humidity" value={`${current.humidity}%`} />
        <Stat
          icon="speedometer-outline"
          label="Wind"
          value={`${Math.round(current.windSpeed)} ${units.windSpeed}`}
        />
        <Stat
          icon="rainy-outline"
          label="Precip"
          value={`${current.precipitation ?? 0} mm`}
        />
      </View>
    </View>
  );
}

function Stat({ icon, label, value }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={18} color="rgba(255,255,255,0.85)" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingHorizontal: 16, paddingTop: 20 },
  location: { color: '#fff', fontSize: 20, fontWeight: '600' },
  mainRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 12 },
  temp: { color: '#fff', fontSize: 64, fontWeight: '200' },
  unit: { fontSize: 28, fontWeight: '300' },
  description: { color: 'rgba(255,255,255,0.9)', fontSize: 17, marginTop: 2 },
  feelsLike: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 4 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 16,
  },
  stat: { alignItems: 'center', flex: 1, gap: 4 },
  statValue: { color: '#fff', fontWeight: '600', fontSize: 15 },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
});
