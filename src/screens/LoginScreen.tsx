import React, { useState } from "react";
import {
  View,
  Text,
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

  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);

  const handleLogin = async () => {
    setAuthError(null);
    const newErrors: { email?: string; senha?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Por favor, insira o seu e-mail.";
    }

    if (!senha.trim()) {
      newErrors.senha = "Por favor, digite a sua senha.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const user = await authenticateUser(email.trim(), senha.trim());
      setLoading(false);

      if (user) {
        onLoginSuccess(user);
      } else {
        setAuthError("E-mail ou senha incorretos. Verifique os seus dados.");
      }
    } catch (error) {
      setLoading(false);
      setAuthError("Ocorreu um erro ao tentar autenticar. Tente novamente.");
    }
  };

  const renderContent = () => (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {authError && (
        <Text
          style={{
            color: "#e63946",
            marginBottom: 16,
            fontWeight: "600",
            fontSize: 14,
            textAlign: "center",
          }}
        >
          {authError}
        </Text>
      )}
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
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: undefined }));
              if (authError) setAuthError(null);
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email}
          />

          <Input
            label="Senha"
            placeholder="ex: senha123"
            value={senha}
            onChangeText={(text) => {
              setSenha(text);
              if (errors.senha)
                setErrors((prev) => ({ ...prev, senha: undefined }));
              if (authError) setAuthError(null);
            }}
            autoCapitalize="none"
            secureTextEntry
            error={errors.senha}
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
          <Text style={styles.hintText}>
            • Supervisor: supervisor@amazul.com
          </Text>
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
};
