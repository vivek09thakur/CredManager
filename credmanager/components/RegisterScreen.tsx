import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useAuth } from "../components/AuthContext";

const ACCENT = "#c8aef1ff";
const BG = "#202123";
const FG = "#fff";
const LABEL = "#bdbdbd";
const INPUT_BG = "#2b2d31";
const Eye = (props: { size: number; color: string }) => (
    <Ionicons name="eye" size={props.size} color={props.color} />
);
const EyeOff = (props: { size: number; color: string }) => (
    <Ionicons name="eye-off" size={props.size} color={props.color} />
);

const RegisterScreen: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fontsLoaded] = useFonts({ Poppins_400Regular });
  const { width } = useWindowDimensions();

  if (!fontsLoaded) return null;

  const handleRegister = () => {
    if (!register(username, password)) {
      setError("Username already exists");
    }
  };

  const cardWidth = width > 500 ? 400 : width > 340 ? 320 : "90%";

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.card, { width: cardWidth }]}>
          <Text style={styles.title}>Create Account</Text>

          <View style={styles.inputWrap}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              placeholder="Choose a username"
              placeholderTextColor="#777"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Create a password"
                placeholderTextColor="#777"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={[styles.input, { flex: 1 }]}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={20} color={LABEL} />
                ) : (
                  <Eye size={20} color={LABEL} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link} onPress={onSwitch}>
            <Text style={styles.linkText}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BG },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  card: {
    backgroundColor: "#1c1d20",
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    color: FG,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  inputWrap: { marginBottom: 15 },
  label: {
    color: LABEL,
    fontSize: 13,
    marginBottom: 5,
    fontFamily: "Poppins_400Regular",
  },
  input: {
    backgroundColor: INPUT_BG,
    borderWidth: 1,
    borderColor: "#333",
    color: FG,
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: INPUT_BG,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 6,
  },
  eyeIcon: { paddingHorizontal: 12 },
  error: {
    color: "#ff4d4f",
    marginBottom: 10,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
  },
  button: {
    backgroundColor: ACCENT,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: FG,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
  },
  link: { alignItems: "center" },
  linkText: {
    color: ACCENT,
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: "Poppins_400Regular",
  },
});

export default RegisterScreen;
