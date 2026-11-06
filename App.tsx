import React, { useEffect } from "react";
import { StatusBar, Platform, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigatior";
import { clearSession } from "./src/services/storage";
  
export default function App() {
  useEffect(() => {
    clearSession();
  }, []);
  
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="light" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
