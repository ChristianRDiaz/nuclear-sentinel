import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
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
    color: "#fbfbfc",
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
    backgroundColor: "#13273d",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  activeFilterTab: {
    backgroundColor: "#575757",
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
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
    backgroundColor: "#13273d",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    flex: 1,
    marginRight: 8,
  },
  cardSector: {
    fontSize: 15,
    color: "#ffffff",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 13,
    color: "#ffffff",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
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
