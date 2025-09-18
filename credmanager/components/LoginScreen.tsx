import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
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

const LoginScreen: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fontsLoaded] = useFonts({ Poppins_400Regular });
  const { width } = useWindowDimensions();

  if (!fontsLoaded) return null;

  const handleLogin = () => {
    if (!login(username, password)) setError("Invalid credentials");
  };

  const cardWidth = width > 500 ? 400 : width > 340 ? 320 : "90%";

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#202123]"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", paddingVertical: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <View 
          className="bg-[#202123] p-5 rounded-lg elevation-4"
          style={{ width: cardWidth }}
        >
          <Text className="text-2xl text-white font-bold mb-5 text-center font-poppins">
            Login
          </Text>

          <View className="mb-4">
            <Text className="text-[#bdbdbd] text-xs mb-1 font-poppins">Username</Text>
            <TextInput
              placeholder="Enter username"
              placeholderTextColor="#777"
              value={username}
              onChangeText={setUsername}
              className="bg-[#2b2d31] border border-[#333] text-white p-3 rounded text-base font-poppins"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View className="mb-4">
            <Text className="text-[#bdbdbd] text-xs mb-1 font-poppins">Password</Text>
            <View className="flex-row items-center bg-[#2b2d31] border border-[#333] rounded">
              <TextInput
                placeholder="Enter password"
                placeholderTextColor="#777"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="flex-1 text-white p-3 text-base font-poppins"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                className="px-3"
              >
                {showPassword ? (
                  <EyeOff size={20} color={LABEL} />
                ) : (
                  <Eye size={20} color={LABEL} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {error ? (
            <Text className="text-[#ff4d4f] mb-2 font-bold font-poppins">
              {error}
            </Text>
          ) : null}

          <TouchableOpacity 
            className="bg-[#c8aef1ff] py-3 rounded items-center mb-3"
            onPress={handleLogin}
          >
            <Text className="text-white text-base font-bold font-poppins">
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center" onPress={onSwitch}>
            <Text className="text-[#c8aef1ff] text-sm underline font-poppins">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;