import React, { useState } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Header } from "../components/Header";
import { saveOccurrence } from "../services/storage";
import { AlertLevel, OccurrenceStatus, User } from "../types";
import { canCreateOccurrence } from "../utils/permissions";
import { styles } from "../styles/OccurrenceCreateScreen.styles";

interface OccurrenceCreateScreenProps {
  user: User;
  onSuccess: () => void;
  onCancel: () => void;
}

export const OccurrenceCreateScreen: React.FC<OccurrenceCreateScreenProps> = ({
  user,
  onSuccess,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sector, setSector] = useState("");
  const [alertLevel, setAlertLevel] = useState<AlertLevel>("normal");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!canCreateOccurrence(user)) {
      Alert.alert(
        "Acesso Negado",
        "Seu perfil não possui permissão para registrar novas ocorrências.",
      );
      return;
    }

    if (!title.trim() || !description.trim() || !sector.trim()) {
      Alert.alert(
        "Erro de Validação",
        "Por favor, preencha todos os campos obrigatórios (Título, Descrição e Setor).",
      );
      return;
    }

    try {
      setLoading(true);
      await saveOccurrence({
        title: title.trim(),
        description: description.trim(),
        sector: sector.trim(),
        alertLevel,
        status: "aberta" as OccurrenceStatus,
        author: user.name,
      });
      setLoading(false);
      Alert.alert("Sucesso", "Ocorrência registrada com sucesso!");
      onSuccess();
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possível salvar a ocorrência.");
    }
  };

  const alertLevels: AlertLevel[] = ["normal", "atípica", "crítica"];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Header
        title="Nova Ocorrência"
        subtitle={`Operador: ${user.name} (${user.role.toUpperCase()})`}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Input
          label="Título da Ocorrência *"
          placeholder="Ex: Oscilação térmica no reator"
          value={title}
          onChangeText={setTitle}
        />

        <Input
          label="Setor / Zona *"
          placeholder="Ex: Setor C - Contenção"
          value={sector}
          onChangeText={setSector}
        />

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nível de Alerta *</Text>
          <View style={styles.radioContainer}>
            {alertLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.radioButton,
                  alertLevel === level && styles.radioSelected,
                ]}
                onPress={() => setAlertLevel(level)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.radioText,
                    alertLevel === level && styles.radioTextSelected,
                  ]}
                >
                  {level.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Input
          label="Descrição Detalhada *"
          placeholder="Descreva o que foi observado..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Salvar Ocorrência"
            onPress={handleSave}
            loading={loading}
            variant="primary"
          />

          <Button title="Cancelar" onPress={onCancel} variant="secondary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
