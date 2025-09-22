import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Linking from "expo-linking";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Credential = {
  title: string;
  description?: string;
  username: string;
  password: string;
  link?: string;
};

type CredentialBlocksProps = {
  credentials: Credential[];
};

const { width } = Dimensions.get("window");
const isSmall = width < 400;
const isMedium = width >= 400 && width < 800;

const CredentialBlocks: React.FC<CredentialBlocksProps> = ({ credentials }) => {
  const [showPassword, setShowPassword] = useState<boolean[]>(
    credentials.map(() => false)
  );
  const [copied, setCopied] = useState<{
    type: "username" | "password";
    index: number;
  } | null>(null);

  const toggleShowPassword = (index: number) => {
    setShowPassword((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleCopy = async (
    type: "username" | "password",
    value: string,
    index: number
  ) => {
    const { setStringAsync } = await import("expo-clipboard");
    await setStringAsync(value);

    setCopied({ type, index });
    setTimeout(() => {
      setCopied((prev) =>
        prev && prev.type === type && prev.index === index ? null : prev
      );
    }, 1500);
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView 
      className="flex-1 bg-gray-900"
      contentContainerClassName="p-4"
      showsVerticalScrollIndicator={false}
    >
      <View className={`flex-row flex-wrap justify-center ${isSmall ? 'flex-col' : ''}`}>
        {credentials.map((cred, index) => (
          <View 
            key={index} 
            className={`
              bg-gray-800 border border-gray-700 rounded-2xl p-5 m-2 shadow-lg
              ${isSmall ? 'w-full' : isMedium ? 'w-[48%]' : 'w-[30%]'}
            `}
          >
            {/* Title + Description */}
            <Text className="text-white text-lg font-bold mb-1 font-poppins-semibold">
              {cred.title}
            </Text>
            
            {cred.description ? (
              <Text className="text-gray-400 text-sm mb-3 font-poppins">
                {cred.description}
              </Text>
            ) : null}

            {cred.link ? (
              <TouchableOpacity 
                onPress={() => Linking.openURL(cred.link!)}
                className="mb-3"
              >
                <Text className="text-purple-400 text-sm underline font-poppins">
                  {cred.link}
                </Text>
              </TouchableOpacity>
            ) : null}

            {/* Username Row */}
            <View className="flex-row items-center justify-between bg-gray-700 rounded-xl p-3 mb-2">
              <Text className="text-white text-base flex-1 font-poppins" numberOfLines={1}>
                {cred.username}
              </Text>
              <TouchableOpacity
                className="p-2 active:scale-95"
                onPress={() => handleCopy("username", cred.username, index)}
                activeOpacity={0.7}
              >
                {copied?.type === "username" && copied.index === index ? (
                  <Ionicons name="checkmark" size={20} color="#10B981" />
                ) : (
                  <Ionicons name="copy-outline" size={20} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            </View>

            {/* Password Row */}
            <View className="flex-row items-center justify-between bg-gray-700 rounded-xl p-3">
              <Text className="text-white text-base flex-1 font-poppins" numberOfLines={1}>
                {showPassword[index] ? cred.password : "•".repeat(8)}
              </Text>
              
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="p-2 active:scale-95"
                  onPress={() => handleCopy("password", cred.password, index)}
                  activeOpacity={0.7}
                >
                  {copied?.type === "password" && copied.index === index ? (
                    <Ionicons name="checkmark" size={20} color="#10B981" />
                  ) : (
                    <Ionicons name="copy-outline" size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="p-2 active:scale-95"
                  onPress={() => toggleShowPassword(index)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword[index] ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Empty State */}
      {credentials.length === 0 && (
        <View className="flex-1 justify-center items-center py-20">
          <Ionicons name="lock-closed-outline" size={64} color="#6B7280" />
          <Text className="text-gray-500 text-lg mt-4 font-poppins-medium text-center">
            No credentials saved yet
          </Text>
          <Text className="text-gray-600 text-sm mt-2 font-poppins text-center">
            Add your first credential to get started
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default CredentialBlocks;