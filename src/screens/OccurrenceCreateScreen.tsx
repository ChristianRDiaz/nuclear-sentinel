import React, { useState} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Button } from '../components/Button';
import { saveOccurrence } from '../services/storage';
import { AlertLevel, OccurrenceStatus, User } from '../types';

interface OccurrenceCreateScreenProps {
  user: User;
  onSuccess: () => void;
  onCancel: () => void;
}

export const OccurrenceCreateScreen: React.FC<OccurrenceCreateScreenProps> = ({ user, onSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sector, setSector] = useState('');
  const [alertLevel, setAlertLevel] = useState<AlertLevel>('normal');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !description.trim() || !sector.trim()) {
      Alert.alert('Erro de Validação', 'Por favor, preencha todos os campos obrigatórios (Título, Descrição e Setor).');
      return;
    }

    try {
      setLoading(true);
      await saveOccurrence({
        title: title.trim(),
        description: description.trim(),
        sector: sector.trim(),
        alertLevel,
        status: 'aberta' as OccurrenceStatus,
        author: user.name,
      });
      setLoading(false);
      Alert.alert('Sucesso', 'Ocorrência registrada com sucesso!');
      onSuccess();
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível salvar a ocorrência.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nova Ocorrência</Text>
      <Text style={styles.subtitle}>Insira os detalhes do evento na instalação nuclear</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Título da Ocorrência *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Oscilação térmica no reator"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Setor / Zona *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Setor C - Contenção"
          value={sector}
          onChangeText={setSector}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nível de Alerta *</Text>
        <View style={styles.radioContainer}>
          {(['normal', 'atípica', 'crítica'] as AlertLevel[]).map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.radioButton, alertLevel === level && styles.radioSelected]}
              onPress={() => setAlertLevel(level)}
            >
              <Text style={[styles.radioText, alertLevel === level && styles.radioTextSelected]}>
                {level.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição Detalhada *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva o que foi observado..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Salvar Ocorrência" onPress={handleSave} loading={loading} />
        <Button title="Cancelar" onPress={onCancel} type="secondary" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6f9',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 4,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  radioSelected: {
    backgroundColor: '#004080',
    borderColor: '#004080',
  },
  radioText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  radioTextSelected: {
    color: '#fff',
  },
  buttonContainer: {
    marginTop: 10,
  },
});