import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, type = 'primary', loading = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, type === 'secondary' && styles.secondary, type === 'danger' && styles.danger]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, type === 'secondary' && styles.secondaryText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#004080',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#004080',
  },
  danger: {
    backgroundColor: '#b52a2a',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryText: {
    color: '#004080',
  },
});