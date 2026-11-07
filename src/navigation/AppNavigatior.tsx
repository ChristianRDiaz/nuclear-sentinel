import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { User, Occurrence } from "../types";
import { getSession , clearSession} from "../services/storage";
import { LoginScreen } from "../screens/LoginScreen";
import { OccurrenceListScreen } from "../screens/OccurrenceListScreen";
import { OccurrenceCreateScreen } from "../screens/OccurrenceCreateScreen";
import { OccurrenceDetailScreen } from "../screens/OccurrenceDetailScreen";

type CurrentScreen = "login" | "list" | "create" | "detail";

export const AppNavigator: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>("login");
  const [selectedOccurrence, setSelectedOccurrence] =
    useState<Occurrence | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      const activeUser = await getSession();
      if (activeUser) {
        setUser(activeUser);
        setCurrentScreen("list");
      }
      setLoadingSession(false);
    };
    checkUserSession();
  }, []);

  if (loadingSession) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#004080" />
      </View>
    );
  }

  return (
    <>
      {currentScreen === "login" && (
        <LoginScreen
          onLoginSuccess={(loggedInUser) => {
            setUser(loggedInUser);
            setCurrentScreen("list");
          }}
        />
      )}

      {currentScreen === "list" && user && (
        <OccurrenceListScreen
          user={user}
          onSelectOccurrence={(occ) => {
            setSelectedOccurrence(occ);
            setCurrentScreen("detail");
          }}
          onCreateNew={() => setCurrentScreen("create")}
          onLogout={async () => {
            try {
              await clearSession(); 
            } catch (error) {
              console.error("Erro ao limpar sessão:", error);
            }
            setUser(null);
            setCurrentScreen("login");
          }}
        />
      )}

      {currentScreen === "create" && user && (
        <OccurrenceCreateScreen
          user={user}
          onSuccess={() => setCurrentScreen("list")}
          onCancel={() => setCurrentScreen("list")}
        />
      )}

      {currentScreen === "detail" && selectedOccurrence && (
        <OccurrenceDetailScreen
          occurrence={selectedOccurrence}
          user={user!}
          onBack={() => {
            setSelectedOccurrence(null);
            setCurrentScreen("list");
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
  },
});
