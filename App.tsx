import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, ActivityIndicator, View, Platform } from 'react-native';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { User, Occurrence } from './src/types';
import { getSession, clearSession } from './src/services/storage';

// Telas
import { LoginScreen } from './src/screens/LoginScreen';
import { OccurrenceListScreen } from './src/screens/OccurrenceListScreen';
import { OccurrenceCreateScreen } from './src/screens/OccurrenceCreateScreen';
import { OccurrenceDetailScreen } from './src/screens/OccurrenceDetailScreen';

type CurrentScreen = 'login' | 'list' | 'create' | 'detail';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>('login');
  const [selectedOccurrence, setSelectedOccurrence] = useState<Occurrence | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Verifica se já existe uma sessão salva ao iniciar o app
  useEffect(() => {
    const checkUserSession = async () => {
      const activeUser = await getSession();
      if (activeUser) {
        setUser(activeUser);
        setCurrentScreen('list');
      }
      setLoadingSession(false);
    };

    checkUserSession();
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentScreen('list');
  };

  const handleLogout = async () => {
    await clearSession();
    setUser(null);
    setCurrentScreen('login');
  };

  if (loadingSession) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#004080" />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content"/>

      {currentScreen === 'login' && <LoginScreen onLoginSuccess={handleLoginSuccess} />}

      {currentScreen === 'list' && user && (
        <OccurrenceListScreen
          user={user}
          onSelectOccurrence={(occ) => {
            setSelectedOccurrence(occ);
            setCurrentScreen('detail');
          }}
          onNavigateToCreate={() => setCurrentScreen('create')}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'create' && user && (
        <OccurrenceCreateScreen
          user={user}
          onSuccess={() => setCurrentScreen('list')}
          onCancel={() => setCurrentScreen('list')}
        />
      )}

      {currentScreen === 'detail' && selectedOccurrence && (
        <OccurrenceDetailScreen
          occurrence={selectedOccurrence}
          user={user!}
          onBack={() => {
            setSelectedOccurrence(null);
            setCurrentScreen('list');
          }}
        />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});