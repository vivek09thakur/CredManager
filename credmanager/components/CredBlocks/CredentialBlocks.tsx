import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Linking from "expo-linking";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

type Credential = {
  title: string;
  description?: string;
  username: string;
  password: string;
  link?: string;
  color?: string; // Optional color for Google Keep-style theming
};

type CredentialBlocksProps = {
  credentials: Credential[];
};

const { width } = Dimensions.get("window");
const isSmall = width < 400;
const isMedium = width >= 400 && width < 800;

// Google Keep-inspired colors
const CARD_COLORS = [
  "#fc9087e9",
  "#fbbd04e9",
  "#FFF475",
  "#CCFF90",
  "#A7FFEB",
  "#CBF0F8",
  "#AECBFA",
  "#D7AEFB",
  "#FDCFE8",
  "#E6C9A8",
];

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

  const getCardColor = (index: number, customColor?: string) => {
    if (customColor) return customColor;
    return CARD_COLORS[index % CARD_COLORS.length];
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView
      className="flex-1 bg-[#f5f5f5]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView
        contentContainerClassName="px-4 pb-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View
          className={`flex-row flex-wrap justify-center ${isSmall ? "flex-col" : ""}`}
        >
          {credentials.map((cred, index) => (
            <View
              key={index}
              className={`
                rounded-2xl p-4 m-2 shadow-sm border border-gray-200
                ${isSmall ? "w-full" : isMedium ? "w-[48%]" : "w-[30%]"}
              `}
              style={{
                backgroundColor: getCardColor(index, cred.color),
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 3,
              }}
            >
              {/* Color accent bar */}
              <View
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ backgroundColor: getCardColor(index, cred.color) }}
              />

              {/* Title + Description */}
              <View className="mb-3">
                <Text
                  className="text-gray-900 text-lg font-semibold mb-1 font-poppins-semibold"
                  style={{ lineHeight: 22 }}
                >
                  {cred.title}
                </Text>

                {cred.description ? (
                  <Text
                    className="text-gray-700 text-sm font-poppins"
                    style={{ lineHeight: 18 }}
                  >
                    {cred.description}
                  </Text>
                ) : null}
              </View>

              {cred.link ? (
                <TouchableOpacity
                  onPress={() => Linking.openURL(cred.link!)}
                  className="mb-3"
                >
                  <Text className="text-[#1a73e8] text-sm underline font-poppins">
                    {cred.link.replace(/^https?:\/\//, "")}
                  </Text>
                </TouchableOpacity>
              ) : null}

              {/* Credential Fields */}
              <View className="space-y-2">
                {/* Username Field */}
                <View className="flex-row items-center justify-between bg-white/50 rounded-lg p-3">
                  <View className="flex-1">
                    <Text className="text-gray-600 text-xs font-poppins-medium mb-1">
                      Username
                    </Text>
                    <Text
                      className="text-gray-900 text-sm font-poppins"
                      numberOfLines={1}
                    >
                      {cred.username}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="p-2 active:scale-95 ml-2"
                    onPress={() => handleCopy("username", cred.username, index)}
                    activeOpacity={0.7}
                  >
                    {copied?.type === "username" && copied.index === index ? (
                      <Ionicons name="checkmark" size={20} color="#34A853" />
                    ) : (
                      <Ionicons name="copy-outline" size={20} color="#5f6368" />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Password Field */}
                <View className="flex-row items-center justify-between bg-white/50 rounded-lg p-3">
                  <View className="flex-1">
                    <Text className="text-gray-600 text-xs font-poppins-medium mb-1">
                      Password
                    </Text>
                    <Text
                      className="text-gray-900 text-sm font-poppins"
                      numberOfLines={1}
                    >
                      {showPassword[index] ? cred.password : "•".repeat(12)}
                    </Text>
                  </View>

                  <View className="flex-row items-center ml-2">
                    <TouchableOpacity
                      className="p-2 active:scale-95"
                      onPress={() =>
                        handleCopy("password", cred.password, index)
                      }
                      activeOpacity={0.7}
                    >
                      {copied?.type === "password" && copied.index === index ? (
                        <Ionicons name="checkmark" size={20} color="#34A853" />
                      ) : (
                        <Ionicons
                          name="copy-outline"
                          size={20}
                          color="#5f6368"
                        />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="p-2 active:scale-95"
                      onPress={() => toggleShowPassword(index)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={
                          showPassword[index]
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color="#5f6368"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Bottom Actions */}
              <View className="flex-row justify-end items-center mt-3 pt-2 border-t border-white/30">
                <Text className="text-gray-600 text-xs font-poppins mr-2">
                  {new Date().toLocaleDateString()}
                </Text>
                <TouchableOpacity className="p-1">
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={16}
                    color="#5f6368"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {credentials.length === 0 && (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="lock-closed-outline" size={64} color="#dadce0" />
            <Text className="text-gray-500 text-lg mt-4 font-poppins-medium text-center">
              No credentials saved yet
            </Text>
            <Text className="text-gray-600 text-sm mt-2 font-poppins text-center">
              Add your first credential to get started
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CredentialBlocks;
