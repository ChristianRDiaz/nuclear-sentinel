import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Button } from "../components/Button";
import { authenticateUser } from "../services/storage";
import { User } from "../types";

interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Atenção", "Por favor, insira o seu e-mail.");
      return;
    }

    if (!senha.trim()) {
      Alert.alert("Atenção", "Por favor, digite a sua senha.");
      return;
    }
    
    setLoading(true);
    const user = await authenticateUser(email.trim(),senha.trim());
    setLoading(false);

    if (user) {
      onLoginSuccess(user);
    } else {
      Alert.alert(
        "Erro ao autenticar",
        "E-mail ou senha incorretos. Verifique os seus dados."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuclear Sentinel</Text>
      <Text style={styles.subtitle}>Acesso ao Sistema Nuclear</Text>

      <View style={styles.form}>
        <Text style={styles.label}>E-mail da empresa</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: operador@amazul.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: senha123"
          value={senha}
          onChangeText={setSenha}
          autoCapitalize="none"
          keyboardType="default"
          secureTextEntry
        />

        <Button title="Entrar" onPress={handleLogin} loading={loading} />
      </View>

      <View style={styles.hintContainer}>
        <Text style={styles.hintTitle}>Contas de Teste:</Text>
        <Text style={styles.hintText}>• Operador: operador@amazul.com</Text>
        <Text style={styles.hintText}>• Supervisor: supervisor@amazul.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f4f6f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#004080",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
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
});
