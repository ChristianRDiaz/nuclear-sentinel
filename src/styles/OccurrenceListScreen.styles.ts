import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
