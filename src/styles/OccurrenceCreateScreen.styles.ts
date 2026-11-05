import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
  },
  scrollContent: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
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
    backgroundColor: "#ffffff",
  },
  radioSelected: {
    backgroundColor: "#004080",
    borderColor: "#004080",
  },
  radioText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
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
    backgroundColor: "#f8fafc",
    fontSize: 16,
    color: "#0f172a",
  },
  buttonContainer: {
    marginTop: 5,
    gap: 12,
  },
});
