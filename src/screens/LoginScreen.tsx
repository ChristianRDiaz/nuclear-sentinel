import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { authenticateUser } from "../services/storage";
import { User } from "../types";
import { styles } from "../styles/LoginScreen.styles";

interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async () => {
    if (!email.trim()) {
      showAlert("Atenção", "Por favor, insira o seu e-mail.");
      return;
    }

    if (!senha.trim()) {
      showAlert("Atenção", "Por favor, digite a sua senha.");
      return;
    }

    setLoading(true);
    const user = await authenticateUser(email.trim(), senha.trim());
    setLoading(false);

    if (user) {
      onLoginSuccess(user);
    } else {
      Alert.alert(
        "Erro ao autenticar",
        "E-mail ou senha incorretos. Verifique os seus dados.",
      );
    }
  };

  const renderContent = () => (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Header title="Nuclear Sentinel" subtitle="Acesso ao Sistema Nuclear" />

      <Image
        source={require("../../assets/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <View style={styles.form}>
          <Input
            label="E-mail da empresa"
            placeholder="ex: operador@amazul.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input
            label="Senha"
            placeholder="ex: senha123"
            value={senha}
            onChangeText={setSenha}
            autoCapitalize="none"
            secureTextEntry
          />

          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            variant="primary"
          />
        </View>

        <View style={styles.hintContainer}>
          <Text style={styles.hintTitle}>Contas de Teste:</Text>
          <Text style={styles.hintText}>• Operador: operador@amazul.com</Text>
          <Text style={styles.hintText}>• Supervisor: supervisor@amazul.com</Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {Platform.OS === "web" ? (
          renderContent()
        ) : (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {renderContent()}
          </TouchableWithoutFeedback>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};;
