import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = 'Carregando...' }: LoadingProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1e3a8a" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
});