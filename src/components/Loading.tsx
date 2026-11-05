import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { styles } from "../styles/Loading.styles";

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = "Carregando..." }: LoadingProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1e3a8a" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};
