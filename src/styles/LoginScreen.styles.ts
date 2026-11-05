import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  hintContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#e6f0fa",
    borderRadius: 8,
  },
  hintTitle: {
    fontWeight: "bold",
    color: "#004080",
    marginBottom: 4,
  },
  hintText: {
    color: "#333",
    fontSize: 13,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
});
