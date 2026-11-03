import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Occurrence, User, AlertLevel } from '../types';
import { getOccurrences } from '../services/storage';

interface OccurrenceListScreenProps {
  user: User;
  onSelectOccurrence: (occurrence: Occurrence) => void;
  onNavigateToCreate: () => void;
  onLogout: () => void;
}

export const OccurrenceListScreen: React.FC<OccurrenceListScreenProps> = ({
  user,
  onSelectOccurrence,
  onNavigateToCreate,
  onLogout,
}) => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setRefreshing(true);
    const data = await getOccurrences();
    setOccurrences(data);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getAlertColor = (level: AlertLevel) => {
    switch (level) {
      case 'crítica':
        return '#b52a2a';
      case 'atípica':
        return '#d97706';
      case 'normal':
      default:
        return '#15803d';
    }
  };

  const renderItem = ({ item }: { item: Occurrence }) => (
    <TouchableOpacity style={styles.card} onPress={() => onSelectOccurrence(item)}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={[styles.badge, { backgroundColor: getAlertColor(item.alertLevel) }]}>
          <Text style={styles.badgeText}>{item.alertLevel.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.cardSector}>Setor: {item.sector}</Text>
      <Text style={styles.cardDate}>
        {new Date(item.createdAt).toLocaleDateString('pt-BR')} {new Date(item.createdAt).toLocaleTimeString('pt-BR')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Olá, {user.name}</Text>
          <Text style={styles.roleText}>Perfil: {user.role.toUpperCase()}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionRow}>
        <Text style={styles.sectionTitle}>Ocorrências Registradas</Text>
        <TouchableOpacity style={styles.createButton} onPress={onNavigateToCreate}>
          <Text style={styles.createButtonText}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={occurrences}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma ocorrência registrada até o momento.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  roleText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: '#b91c1c',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
  },
  createButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardSector: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 11,
    color: '#94a3b8',
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 40,
    fontSize: 14,
  },
});