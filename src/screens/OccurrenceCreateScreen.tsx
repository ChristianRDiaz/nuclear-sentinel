import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Header } from "../components/Header";
import { saveOccurrence } from "../services/storage";
import { AlertLevel, OccurrenceStatus, User } from "../types";
import { canCreateOccurrence } from "../utils/permissions";
import { styles } from "../styles/OccurrenceCreateScreen.styles";
import { autoClassifyOccurrence } from "../utils/classification";

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

  const [errors, setErrors] = useState<{
    title?: string;
    sector?: string;
    description?: string;
  }>({});

  const [permissionError, setPermissionError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!canCreateOccurrence(user)) {
      setPermissionError(
        "Seu perfil não possui permissão para registrar novas ocorrências.",
      );
      return;
    }
    setPermissionError(null);

    const newErrors: { title?: string; sector?: string; description?: string } =
      {};

    if (!title.trim()) {
      newErrors.title = "O título é obrigatório.";
    }
    if (!sector.trim()) {
      newErrors.sector = "Informe o setor da ocorrência.";
    }
    if (!description.trim()) {
      newErrors.description = "A descrição não pode ficar em branco.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);
      await saveOccurrence({
        title: title.trim(),
        description: description.trim(),
        sector: sector.trim(),
        alertLevel,
        status: "pendente" as OccurrenceStatus,
        author: user.name,
      });
      setLoading(false);
      onSuccess();
    } catch (error) {
      setLoading(false);
      setPermissionError(
        "Não foi possível salvar a ocorrência. Tente novamente.",
      );
    }
  };

  const getSelectedStyle = (level: AlertLevel) => {
    switch (level) {
      case "normal":
        return styles.radioSelectedNormal;
      case "atípica":
        return styles.radioSelectedAtipica;
      case "crítica":
        return styles.radioSelectedCritica;
      default:
        return {};
    }
  };

  const alertLevels: AlertLevel[] = ["normal", "atípica", "crítica"];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <Header
        title="Nova Ocorrência"
        subtitle={`Operador: ${user.name} (${user.role.toUpperCase()})`}
      />

      {permissionError && (
        <Text
          style={{
            color: "#e63946",
            marginBottom: 16,
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          {permissionError}
        </Text>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Input
          label="Título da Ocorrência *"
          placeholder="Ex: Oscilação térmica no reator"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (errors.title)
              setErrors((prev) => ({ ...prev, title: undefined }));
            // Classifica automaticamente combinando o novo título com a descrição atual
            const level = autoClassifyOccurrence(text, description);
            setAlertLevel(level);
          }}
          error={errors.title}
        />

        <Input
          label="Setor / Zona *"
          placeholder="Ex: Setor C - Contenção"
          value={sector}
          onChangeText={(text) => {
            setSector(text);
            if (errors.sector)
              setErrors((prev) => ({ ...prev, sector: undefined }));
          }}
          error={errors.sector}
        />

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nível de Alerta *</Text>
          <View style={styles.radioContainer}>
            {alertLevels.map((level) => {
              const isSelected = alertLevel === level;
              return (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.radioButton,
                    isSelected && getSelectedStyle(level),
                  ]}
                  onPress={() => setAlertLevel(level)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.radioText,
                      isSelected && styles.radioTextSelected,
                    ]}
                  >
                    {level.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Input
          label="Descrição Detalhada *"
          placeholder="Descreva o que foi observado..."
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            if (errors.description)
              setErrors((prev) => ({ ...prev, description: undefined }));

            const suggestedLevel = autoClassifyOccurrence(title, text);
            setAlertLevel(suggestedLevel);
          }}
          multiline
          numberOfLines={4}
          style={[
            styles.textArea,
            errors.description && { borderColor: "#e63946" },
          ]}
          error={errors.description}
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
