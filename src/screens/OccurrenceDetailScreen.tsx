import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Occurrence, User } from "../types";
import { updateOccurrenceStatus } from "../services/storage";

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
  const [currentStatus, setCurrentStatus] = useState(occurrence.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    try {
      setLoading(true);
      // Chama a função passando o ID exato da ocorrência
      await updateOccurrenceStatus(occurrence.id, newStatus);
      setCurrentStatus(newStatus);
      setLoading(false);

      Alert.alert(
        "Sucesso",
        `Status alterado para "${newStatus.toUpperCase()}".`,
        [
          {
            text: "OK",
            onPress: () => onBack(), // Voltar para a lista já atualizada
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

          {/* ÁREA EXCLUSIVA DO SUPERVISOR */}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f9" },
  scrollContent: { padding: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 12,
  },
  info: { fontSize: 14, color: "#475569", marginBottom: 6 },
  statusBold: { fontWeight: "bold", color: "#004080" },
  description: {
    fontSize: 14,
    color: "#334155",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 6,
  },
  supervisorSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  supervisorTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#475569",
    marginBottom: 10,
  },
  statusButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  statusBtn: { flex: 1, paddingVertical: 8 },
  backButton: { marginTop: 10 },
});
