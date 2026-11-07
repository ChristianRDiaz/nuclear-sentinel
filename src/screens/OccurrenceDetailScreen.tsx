import React, { useState } from "react";
import { View, Text, ScrollView, Alert ,Platform} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [shouldGoBackOnClose, setShouldGoBackOnClose] = useState(false);

  const handleStatusChange = async (newStatus: OccurrenceStatus) => {
    try {
      setLoading(true);
      await updateOccurrenceStatus(occurrence.id, newStatus);
      setCurrentStatus(newStatus);
      setLoading(false);
      setModalTitle("Sucesso");
      setModalMessage(`Status alterado para "${newStatus.toUpperCase()}".`);
      setShouldGoBackOnClose(true);
      setModalVisible(true);
    } catch (error) {
      setLoading(false);
      setModalTitle("Erro");
      setModalMessage("Não foi possível alterar o status.");
      setShouldGoBackOnClose(false);
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (shouldGoBackOnClose) {
      onBack(); 
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
                  onPress={() => handleStatusChange("pendente")}
                  variant="primary"
                  style={styles.statusBtn}
                  disabled={
                    loading ||
                    occurrence.status === "em processo" ||
                    occurrence.status === "resolvida"
                  }
                />

                <Button
                  title="Em Processo"
                  onPress={() => handleStatusChange("em processo")}
                  variant="primary"
                  style={styles.statusBtn}
                  disabled={
                    loading ||
                    occurrence.status === "em processo" ||
                    occurrence.status === "resolvida"
                  }
                />
                <Button
                  title="Resolvida"
                  onPress={() => handleStatusChange("resolvida")}
                  variant="primary"
                  style={styles.statusBtn}
                  disabled={loading || occurrence.status === "resolvida"}
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
      <Modal
        visible={modalVisible}
        title={modalTitle}
        message={modalMessage}
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
        confirmText="Entendido"
      />
    </SafeAreaView>
  );
};
