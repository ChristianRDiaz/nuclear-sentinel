import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/Header.styles";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onLogout?: () => void;
}

export const Header = ({ title, subtitle, onLogout }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {onLogout && (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
