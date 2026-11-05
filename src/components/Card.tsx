import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { styles } from "../styles/Card.styles";

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card = ({ children, onPress, style }: CardProps) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
};
