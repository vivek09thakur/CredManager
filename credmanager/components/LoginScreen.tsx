import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";
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
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({ 
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  });
  const { width } = useWindowDimensions();

  if (!fontsLoaded) return null;

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!login(username, password)) {
      setError("Invalid username or password");
    }
    setIsLoading(false);
  };

  const cardWidth = width > 500 ? 400 : width > 340 ? 320 : "90%";

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-900"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center items-center py-8 px-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View 
          className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700"
          style={{ width: cardWidth }}
        >
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl text-white font-bold mb-2 font-poppins-semibold">
              Welcome Back
            </Text>
            <Text className="text-gray-400 text-base font-poppins">
              Sign in to your account
            </Text>
          </View>

          {/* Username Field */}
          <View className="mb-6">
            <Text className="text-gray-300 text-sm mb-3 font-poppins-medium">Username</Text>
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor="#9CA3AF"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setError("");
              }}
              className="bg-gray-700 border border-gray-600 text-white p-4 rounded-xl text-base font-poppins"
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor="#8B5FBF"
            />
          </View>

          {/* Password Field */}
          <View className="mb-6">
            <Text className="text-gray-300 text-sm mb-3 font-poppins-medium">Password</Text>
            <View className="flex-row items-center bg-gray-700 border border-gray-600 rounded-xl">
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError("");
                }}
                secureTextEntry={!showPassword}
                className="flex-1 text-white p-4 text-base font-poppins"
                selectionColor="#8B5FBF"
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

          {/* Error Message */}
          {error ? (
            <View className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
              <Text className="text-red-400 text-sm font-poppins-medium text-center">
                {error}
              </Text>
            </View>
          ) : null}

          {/* Login Button */}
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

          {/* Switch to Sign Up */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-400 text-sm font-poppins">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={onSwitch} activeOpacity={0.7}>
              <Text className="text-purple-400 text-sm font-poppins-medium underline">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional Info */}
        <View className="mt-8 px-4">
          <Text className="text-gray-500 text-xs text-center font-poppins">
            Secure your credentials with advanced encryption
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;