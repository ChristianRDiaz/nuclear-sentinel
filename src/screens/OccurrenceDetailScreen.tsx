import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

  const handleStatusChange = async (newStatus: OccurrenceStatus) => {
    try {
      setLoading(true);
      await updateOccurrenceStatus(occurrence.id, newStatus);
      setCurrentStatus(newStatus);
      setLoading(false);

      Alert.alert(
        "Sucesso",
        `Status alterado para "${newStatus.toUpperCase()}".`,
        [
          {
            text: "OK",
            onPress: () => onBack(),
          },
        ],
      );
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possível alterar o status.");
    }
  };

  const isSupervisor = user.role.toLowerCase() === "supervisor";

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
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
