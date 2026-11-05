import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    position: "relative",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  logoutButton: {
    position: "absolute",
    right: 16,
    backgroundColor: "#b52a2a",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
  },
});
