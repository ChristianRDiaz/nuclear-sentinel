import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    position: "relative",
  },
  titleContainer: {
    alignItems: "center", 
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 18, 
    fontWeight: "800",
    color: "#004080", 
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  logoutButton: {
    position: "absolute", 
    right: 16,
    backgroundColor: "#fee2e2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutText: {
    color: "#dc2626",
    fontSize: 15,
    fontWeight: "600",
  },
});
