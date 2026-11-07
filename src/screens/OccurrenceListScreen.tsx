import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Occurrence, User } from "../types";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOccurrences } from "../services/storage";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { styles } from "../styles/OccurrenceListScreen.styles";


interface OccurrenceListScreenProps {
  user: User;
  onSelectOccurrence: (occurrence: Occurrence) => void;
  onCreateNew: () => void;
  onLogout: () => void;
}

type FilterStatus = "pendente" | "em processo" | "resolvido" | "todas";

export const OccurrenceListScreen: React.FC<OccurrenceListScreenProps> = ({
  user,
  onSelectOccurrence,
  onCreateNew,
  onLogout,
}) => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("todas");
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setRefreshing(true);
    const data = await getOccurrences();
    setOccurrences(data);
    setRefreshing(false);
  };

  useEffect(() => {
    // Linha mágica: força a limpeza do AsyncStorage e deixa as ocorrencias mockadas.
    // vc pode descomentar essa linha se quiser manter as ocorrencias no AsyncStorage entre reinicios do app.
    //AsyncStorage.removeItem("@nuclear_sentinel_occurrences").then(() => {
      loadData();
    //});
  }, []);

  const getNormalizedStatus = (status: string) => {
    const s = status ? status.toLowerCase().trim() : "";
    if (s === "resolvida" || s === "resolvido") return "resolvida";
    if (s === "em processo" || s === "processo") return "em processo";
    return "pendente";
  };

  const filteredOccurrences = occurrences.filter((item) => {
    const normStatus = getNormalizedStatus(item.status);
    if (filter === "todas") return true;
    return normStatus === filter;
  });

  const getAlertColor = (level: string) => {
    switch (level) {
      case "crítica":
        return "#b52a2a";
      case "atípica":
        return "#d97706";
      default:
        return "#15803d";
    }
  };

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

  const handleResetOccurrences = async () => {
    try {
      await AsyncStorage.removeItem("@nuclear_sentinel_occurrences");
      loadData(); // Recarrega a lista (ela vai voltar limpa ou com os mocks originais limpos do mockData)
      showAlert("Sucesso", "Ocorrências de teste limpas com sucesso!");
    } catch (error) {
      showAlert("Erro", "Não foi possível limpar as ocorrências.");
    }
  };
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <Header
        title={`Olá, ${user.name}`}
        subtitle={`Perfil: ${user.role.toUpperCase()}`}
        onLogout={onLogout}
      />

      <View style={styles.topActions}>
        <Text style={styles.sectionMainTitle}>Painel de Ocorrências</Text>
        <Button title="+ Cadastrar Ocorrência" onPress={onCreateNew} />
      </View>

      <View style={styles.filterBar}>
        {[
          { id: "pendente", label: "Pendentes" },
          { id: "em processo", label: "Em Processo" },
          { id: "resolvida", label: "Resolvidas" },
          { id: "todas", label: "Todas" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.filterTab,
              filter === tab.id && styles.activeFilterTab,
            ]}
            onPress={() => setFilter(tab.id as FilterStatus)}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === tab.id && styles.activeFilterTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
      >
        {filteredOccurrences.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Nenhuma ocorrência encontrada nesta categoria.
            </Text>
          </View>
        ) : filter === "pendente" ? (
          <>
            {filteredOccurrences.filter((i) => i.alertLevel === "crítica")
              .length > 0 && (
              <View style={styles.sectionGroup}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    🚨 OCORRÊNCIAS CRÍTICAS
                  </Text>
                </View>
                {filteredOccurrences
                  .filter((i) => i.alertLevel === "crítica")
                  .map((item) => (
                    <Card
                      key={item.id}
                      onPress={() => onSelectOccurrence(item)}
                      style={styles.cardItem}
                    >
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <View
                          style={[
                            styles.badge,
                            { backgroundColor: getAlertColor(item.alertLevel) },
                          ]}
                        >
                          <Text style={styles.badgeText}>
                            {item.alertLevel.toUpperCase()}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.cardSector}>
                        Setor: {item.sector}
                      </Text>
                      <Text style={styles.cardDate}>
                        {new Date(item.createdAt).toLocaleDateString("pt-BR")}{" "}
                        {new Date(item.createdAt).toLocaleTimeString("pt-BR")}
                      </Text>
                    </Card>
                  ))}
              </View>
            )}

            {filteredOccurrences.filter((i) => i.alertLevel === "atípica")
              .length > 0 && (
              <View style={styles.sectionGroup}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    ⚠️ OCORRÊNCIAS ATÍPICAS
                  </Text>
                </View>
                {filteredOccurrences
                  .filter((i) => i.alertLevel === "atípica")
                  .map((item) => (
                    <Card
                      key={item.id}
                      onPress={() => onSelectOccurrence(item)}
                      style={styles.cardItem}
                    >
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <View
                          style={[
                            styles.badge,
                            { backgroundColor: getAlertColor(item.alertLevel) },
                          ]}
                        >
                          <Text style={styles.badgeText}>
                            {item.alertLevel.toUpperCase()}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.cardSector}>
                        Setor: {item.sector}
                      </Text>
                      <Text style={styles.cardDate}>
                        {new Date(item.createdAt).toLocaleDateString("pt-BR")}{" "}
                        {new Date(item.createdAt).toLocaleTimeString("pt-BR")}
                      </Text>
                    </Card>
                  ))}
              </View>
            )}

            {filteredOccurrences.filter((i) => i.alertLevel === "normal")
              .length > 0 && (
              <View style={styles.sectionGroup}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    ✅ OCORRÊNCIAS NORMAIS
                  </Text>
                </View>
                {filteredOccurrences
                  .filter((i) => i.alertLevel === "normal")
                  .map((item) => (
                    <Card
                      key={item.id}
                      onPress={() => onSelectOccurrence(item)}
                      style={styles.cardItem}
                    >
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <View
                          style={[
                            styles.badge,
                            { backgroundColor: getAlertColor(item.alertLevel) },
                          ]}
                        >
                          <Text style={styles.badgeText}>
                            {item.alertLevel.toUpperCase()}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.cardSector}>
                        Setor: {item.sector}
                      </Text>
                      <Text style={styles.cardDate}>
                        {new Date(item.createdAt).toLocaleDateString("pt-BR")}{" "}
                        {new Date(item.createdAt).toLocaleTimeString("pt-BR")}
                      </Text>
                    </Card>
                  ))}
              </View>
            )}
          </>
        ) : (
          <View style={styles.sectionGroup}>
            {filteredOccurrences.map((item) => (
              <Card
                key={item.id}
                onPress={() => onSelectOccurrence(item)}
                style={styles.cardItem}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: getAlertColor(item.alertLevel) },
                    ]}
                  >
                    <Text style={styles.badgeText}>
                      {item.alertLevel.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={styles.cardSector}>
                  Setor: {item.sector} | Status:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {item.status.toUpperCase()}
                  </Text>
                </Text>
                <Text style={styles.cardDate}>
                  {new Date(item.createdAt).toLocaleDateString("pt-BR")}{" "}
                  {new Date(item.createdAt).toLocaleTimeString("pt-BR")}
                </Text>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
