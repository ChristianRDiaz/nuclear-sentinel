import React, { useEffect } from "react";
import { StatusBar, Platform, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigatior";
  
export default function App() {  
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar/>
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
