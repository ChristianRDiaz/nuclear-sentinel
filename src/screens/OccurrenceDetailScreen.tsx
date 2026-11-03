import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView , Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Occurrence, AlertLevel, User } from '../types';
import { Button } from '../components/Button';


interface OccurrenceDetailScreenProps {
  occurrence: Occurrence;
  user: User; 
  onBack: () => void;
  onStatusUpdated?: (updatedOccurrence: Occurrence) => void; 
}

const STORAGE_KEY = '@SENTINELA:occurrences';

export const OccurrenceDetailScreen: React.FC<OccurrenceDetailScreenProps> = ({ 
  occurrence: initialOccurrence, 
  user, 
  onBack,
  onStatusUpdated 
}) => {
  const [occurrence, setOccurrence] = useState<Occurrence>(initialOccurrence);
  const isSupervisor = user?.role === 'supervisor';

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

  const handleUpdateStatus = async (novoStatus: Occurrence['status']) => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const listaAtual: Occurrence[] = JSON.parse(stored);
        const listaAtualizada = listaAtual.map((item) =>
          item.id === occurrence.id ? { ...item, status: novoStatus } : item
        );
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listaAtualizada));
      }

      const updated = { ...occurrence, status: novoStatus };
      setOccurrence(updated);
      
      if (onStatusUpdated) {
        onStatusUpdated(updated);
      }

      Alert.alert('Sucesso', `Status alterado para "${novoStatus.toUpperCase()}".`);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o status da ocorrência.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Detalhes da Ocorrência</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Nível de Alerta:</Text>
          <View style={[styles.badge, { backgroundColor: getAlertColor(occurrence.alertLevel) }]}>
            <Text style={styles.badgeText}>{occurrence.alertLevel.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>{occurrence.title}</Text>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Setor / Zona:</Text>
          <Text style={styles.value}>{occurrence.sector}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{occurrence.status.toUpperCase()}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Registrado por:</Text>
          <Text style={styles.value}>{occurrence.author}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Data e Hora:</Text>
          <Text style={styles.value}>
            {new Date(occurrence.createdAt).toLocaleDateString('pt-BR')} às{' '}
            {new Date(occurrence.createdAt).toLocaleTimeString('pt-BR')}
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Descrição Detalhada:</Text>
          <Text style={styles.descriptionText}>{occurrence.description}</Text>
        </View>

        {isSupervisor && (
          <>
            <View style={styles.separator} />
            <Text style={styles.label}>Alterar Status (Supervisor):</Text>
            <View style={styles.supervisorActionsContainer}>
              <View style={styles.actionButtonWrapper}>
                <Button title="Pendente" onPress={() => handleUpdateStatus('pendente' as any)} />
              </View>
              <View style={styles.actionButtonWrapper}>
                <Button title="Em Processo" onPress={() => handleUpdateStatus('em processo' as any)} />
              </View>
              <View style={styles.actionButtonWrapper}>
                <Button title="Resolvido" onPress={() => handleUpdateStatus('resolvido' as any)} />
              </View>
            </View>
          </>
        )}
      </View>

      <Button title="Voltar à Lista" onPress={onBack} type="secondary" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6f9',
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 16,
  },
  infoGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  supervisorActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  actionButtonWrapper: {
    flex: 1,
  },
});