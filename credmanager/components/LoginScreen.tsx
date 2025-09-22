import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useRouter } from "expo-router";
import { useAuth } from "../components/AuthContext";

const Eye = ({ size, color }: { size: number; color: string }) => (
  <Ionicons name="eye" size={size} color={color} />
);
const EyeOff = ({ size, color }: { size: number; color: string }) => (
  <Ionicons name="eye-off" size={size} color={color} />
);

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    setError("");
    
    try {
      const success = await login(username, password);
      if (success) {
        router.push("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-900"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center pb-12 px-8">
          <Text className="text-5xl text-white font-bold mb-2 font-poppins-semibold">
            CredManager
          </Text>
          <Text className="text-gray-400 text-lg font-poppins">
            Secure credential management
          </Text>
        </View>
        <View className="px-8">
          <View className="mb-6">
            <TextInput
              placeholder="Username"
              placeholderTextColor="#9CA3AF"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setError("");
              }}
              className="bg-gray-800 border border-gray-700 text-white p-4 rounded-xl text-base font-poppins text-left"
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor="#8B5FBF"
              textAlign="left"
            />
          </View>
          <View className="mb-6">
            <View className="flex-row items-center bg-gray-800 border border-gray-700 rounded-xl">
              <TextInput
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError("");
                }}
                secureTextEntry={!showPassword}
                className="flex-1 text-white p-4 text-base font-poppins text-left"
                selectionColor="#8B5FBF"
                textAlign="left"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                className="px-4 py-3"
                activeOpacity={0.7}
              >
                {showPassword ? (
                  <EyeOff size={22} color="#9CA3AF" />
                ) : (
                  <Eye size={22} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {error ? (
            <View className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
              <Text className="text-red-400 text-sm font-poppins-medium text-center">
                {error}
              </Text>
            </View>
          ) : null}
          <TouchableOpacity
            className={`bg-purple-600 py-4 rounded-xl items-center mb-6 shadow-lg ${
              isLoading ? "opacity-70" : "active:scale-95"
            }`}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-poppins-semibold">
              {isLoading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center items-center pt-4">
            <Text className="text-gray-400 text-base font-poppins">
              New user?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/register")}
              activeOpacity={0.7}
            >
              <Text className="text-purple-400 text-base font-poppins-medium underline">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="absolute bottom-8 left-0 right-0">
          <Text className="text-gray-600 text-sm text-center font-poppins">
            An app by PINAKA group of developers
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
