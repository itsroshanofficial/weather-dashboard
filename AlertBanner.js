import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SEVERITY_STYLE = {
  info: { bg: '#2E5AAC', icon: 'information-circle' },
  watch: { bg: '#C77F1A', icon: 'alert-circle' },
  warning: { bg: '#C0392B', icon: 'warning' },
};

export default function AlertBanner({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <View style={styles.container}>
      {alerts.map((alert) => {
        const style = SEVERITY_STYLE[alert.severity] || SEVERITY_STYLE.info;
        return (
          <View key={alert.id} style={[styles.card, { backgroundColor: style.bg }]}>
            <Ionicons name={style.icon} size={20} color="#fff" style={{ marginTop: 1 }} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.title}>{alert.title}</Text>
              <Text style={styles.message}>{alert.message}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, marginTop: 12, gap: 8 },
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 12,
  },
  title: { color: '#fff', fontWeight: '700', fontSize: 14, marginBottom: 2 },
  message: { color: 'rgba(255,255,255,0.9)', fontSize: 13, lineHeight: 18 },
});
