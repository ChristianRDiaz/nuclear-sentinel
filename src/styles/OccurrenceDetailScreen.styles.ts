import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "#13273d",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
  },
  info: {
    fontSize: 15,
    color: "#ffffff",
    marginBottom: 6,
  },
  statusBold: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  description: {
    fontSize: 15,
    color: "#ffffff",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#13273d",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  supervisorSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  supervisorTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  statusButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  statusBtn: {
    flex: 1,
    paddingVertical: 8,
  },
  backButton: {
    marginTop: 10,
  },
});
