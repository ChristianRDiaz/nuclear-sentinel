import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Occurrence, User } from "../types";
import { getOccurrences } from "../services/storage";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

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
  const [filter, setFilter] = useState<FilterStatus>("pendente");
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

  const getNormalizedStatus = (status: string) => {
    const s = status ? status.toLowerCase().trim() : "";
    if (s === "resolvida" || s === "resolvido") return "resolvido";
    if (s === "em processo" || s === "processo" || s === "em análise")
      return "em processo";
    return "pendente";
  };

  // Filtragem das ocorrências conforme o filtro selecionado na aba
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

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Header
        title={`Olá, ${user.name}`}
        subtitle={`Perfil: ${user.role.toUpperCase()}`}
        onLogout={onLogout}
      />

      <View style={styles.topActions}>
        <Text style={styles.sectionMainTitle}>Painel de Ocorrências</Text>
        <Button title="+ Nova" onPress={onCreateNew} />
      </View>

      <View style={styles.filterBar}>
        {[
          { id: "pendente", label: "Pendentes" },
          { id: "em processo", label: "Em Processo" },
          { id: "resolvido", label: "Resolvidas" },
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
            {/* Bloco Críticas */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
  },
  topActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  sectionMainTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#004080",
  },
  newButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 4,
  },
  filterBar: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 10,
    gap: 6,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
  },
  activeFilterTab: {
    backgroundColor: "#004080",
  },
  filterTabText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
  },
  activeFilterTabText: {
    color: "#ffffff",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionGroup: {
    marginBottom: 16,
  },
  sectionHeader: {
    backgroundColor: "#e6f0fa",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#004080",
  },
  cardItem: {
    marginBottom: 8,
    padding: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e293b",
    flex: 1,
    marginRight: 8,
  },
  cardSector: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 11,
    color: "#94a3b8",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 14,
    textAlign: "center",
  },
});
