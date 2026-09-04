import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getWeatherInfo } from '../utils/weatherCodes';

function formatHour(isoTime) {
  const date = new Date(isoTime);
  return date.toLocaleTimeString([], { hour: 'numeric' });
}

export default function HourlyForecast({ hourly, units }) {
  if (!hourly || hourly.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Hourly Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {hourly.map((hour, idx) => {
          const info = getWeatherInfo(hour.weatherCode);
          return (
            <View key={hour.time} style={styles.item}>
              <Text style={styles.hourLabel}>{idx === 0 ? 'Now' : formatHour(hour.time)}</Text>
              <Ionicons name={info.icon} size={26} color="#fff" style={{ marginVertical: 8 }} />
              <Text style={styles.temp}>{Math.round(hour.temperature)}°</Text>
              <Text style={styles.precip}>{hour.precipitationProbability}%</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 24 },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  scroll: { paddingLeft: 16 },
  item: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginRight: 10,
    minWidth: 64,
  },
  hourLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '600' },
  temp: { color: '#fff', fontSize: 15, fontWeight: '600' },
  precip: { color: '#8FD3FE', fontSize: 11, marginTop: 2 },
});
