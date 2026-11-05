import React, { useState } from "react";
import { View, Text, ScrollView, Alert ,Platform} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Occurrence, OccurrenceStatus, User } from "../types";
import { updateOccurrenceStatus } from "../services/storage";
import { styles } from "../styles/OccurrenceDetailScreen.styles";

interface OccurrenceDetailScreenProps {
  occurrence: Occurrence;
  user: User;
  onBack: () => void;
}

export const OccurrenceDetailScreen: React.FC<OccurrenceDetailScreenProps> = ({
  occurrence,
  user,
  onBack,
}) => {
  const [currentStatus, setCurrentStatus] = useState<OccurrenceStatus>(
    occurrence.status,
  );
  const [loading, setLoading] = useState(false);

  // Função auxiliar para exibir alertas compatíveis com Mobile e Web
  const showAlert = (title: string, message: string, onOk?: () => void) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(title, message, [
        {
          text: "OK",
          onPress: () => {
            if (onOk) onOk();
          },
        },
      ]);
    }
  };

  const handleStatusChange = async (newStatus: OccurrenceStatus) => {
    try {
      setLoading(true);
      await updateOccurrenceStatus(occurrence.id, newStatus);
      setCurrentStatus(newStatus);
      setLoading(false);

      showAlert(
        "Sucesso",
        `Status alterado para "${newStatus.toUpperCase()}".`,
        () => onBack(),
      );
    } catch (error) {
      setLoading(false);
      showAlert("Erro", "Não foi possível alterar o status.");
    }
  };

  const isSupervisor = user.role.toLowerCase() === "supervisor";

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <Header
        title="Detalhes da Ocorrência"
        subtitle={`SETOR: ${occurrence.sector.toUpperCase()}`}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>{occurrence.title}</Text>
          <Text style={styles.info}>Setor / Zona: {occurrence.sector}</Text>
          <Text style={styles.info}>
            Status Atual:{" "}
            <Text style={styles.statusBold}>{currentStatus.toUpperCase()}</Text>
          </Text>
          <Text style={styles.info}>Registrado por: {occurrence.author}</Text>
          <Text style={styles.description}>{occurrence.description}</Text>

          {isSupervisor && (
            <View style={styles.supervisorSection}>
              <Text style={styles.supervisorTitle}>
                Alterar Status (Supervisor):
              </Text>
              <View style={styles.statusButtonsRow}>
                <Button
                  title="Pendente"
                  onPress={() => handleStatusChange("aberta")}
                  variant="primary"
                  style={styles.statusBtn}
                  disabled={loading}
                />
                <Button
                  title="Processo"
                  onPress={() => handleStatusChange("em análise")}
                  variant="primary"
                  style={styles.statusBtn}
                  disabled={loading}
                />
                <Button
                  title="Resolvido"
                  onPress={() => handleStatusChange("resolvida")}
                  variant="primary"
                  style={styles.statusBtn}
                  disabled={loading}
                />
              </View>
            </View>
          )}
        </View>

        <Button
          title="Voltar à Lista"
          onPress={onBack}
          variant="primary"
          style={styles.backButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
