import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
  },
  scrollContent: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 17,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  radioButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#13273d",
  },
  radioSelected: {
    backgroundColor: "#575757",
    borderColor: "#cbd5e1",
  },
  radioText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fafafa",
  },
  radioTextSelected: {
    color: "#ffffff",
  },
  textArea: {
    minHeight: 140,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#13273d",
    fontSize: 16,
    color: "#ffffff",
  },
  buttonContainer: {
    marginTop: 5,
    gap: 12,
  },
  radioSelectedNormal: {
    backgroundColor: "#2e7d32",
    borderColor: "#2e7d32",
    fontWeight: "800",
  },
  radioSelectedAtipica: {
    backgroundColor: "#e67e22", 
    borderColor: "#e67e22",
    fontWeight: "800",
  },
  radioSelectedCritica: {
    backgroundColor: "#c0392b",
    borderColor: "#c0392b",
    fontWeight: "800",
  },
});
