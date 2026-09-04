import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getWeatherInfo } from '../utils/weatherCodes';

function formatDay(isoDate, idx) {
  if (idx === 0) return 'Today';
  const date = new Date(isoDate);
  return date.toLocaleDateString([], { weekday: 'short' });
}

export default function DailyForecast({ daily }) {
  if (!daily || daily.length === 0) return null;

  // Use the week's min/max to size the temperature range bars proportionally.
  const allLows = daily.map((d) => d.tempMin);
  const allHighs = daily.map((d) => d.tempMax);
  const weekMin = Math.min(...allLows);
  const weekMax = Math.max(...allHighs);
  const span = Math.max(1, weekMax - weekMin);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>7-Day Forecast</Text>
      <View style={styles.card}>
        {daily.map((day, idx) => {
          const info = getWeatherInfo(day.weatherCode);
          const leftPct = ((day.tempMin - weekMin) / span) * 100;
          const widthPct = ((day.tempMax - day.tempMin) / span) * 100;
          return (
            <View
              key={day.date}
              style={[styles.row, idx === daily.length - 1 && { borderBottomWidth: 0 }]}
            >
              <Text style={styles.day}>{formatDay(day.date, idx)}</Text>
              <Ionicons name={info.icon} size={20} color="#fff" style={styles.icon} />
              <Text style={styles.precip}>{day.precipitationProbability}%</Text>
              <Text style={styles.low}>{Math.round(day.tempMin)}°</Text>
              <View style={styles.barTrack}>
                <View
                  style={[styles.barFill, { left: `${leftPct}%`, width: `${widthPct}%` }]}
                />
              </View>
              <Text style={styles.high}>{Math.round(day.tempMax)}°</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 24, paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 10 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  day: { color: '#fff', fontSize: 14, fontWeight: '600', width: 48 },
  icon: { width: 30 },
  precip: { color: '#8FD3FE', fontSize: 12, width: 36 },
  low: { color: 'rgba(255,255,255,0.7)', fontSize: 13, width: 28, textAlign: 'right' },
  barTrack: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginHorizontal: 8,
    position: 'relative',
  },
  barFill: {
    position: 'absolute',
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFD166',
  },
  high: { color: '#fff', fontSize: 13, fontWeight: '600', width: 28, textAlign: 'right' },
});
