import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Linking from "expo-linking";
import React, { useState } from "react";

import {
  Dimensions,
  ScrollView,
  StyleSheet,
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

// 🎨 Theme colors (centralized color grading)
const theme = {
  background: "#121212",
  card: "#6a4fb6",
  title: "#ffffff",
  description: "#e2e2e2",
  text: "#f5f5f5",
  border: "#333333",
  icon: "#ffffff",
  iconSecondary: "#fafafa",
  iconMuted: "#efefef",
  shadow: "#000000",
};

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
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {credentials.map((cred, index) => (
          <View key={index} style={styles.block}>
            {/* Title + Description */}
            <Text style={styles.title}>{cred.title}</Text>
            {cred.description ? (
              <Text style={styles.description}>{cred.description}</Text>
            ) : null}

            {cred.link ? (
              <TouchableOpacity onPress={() => Linking.openURL(cred.link!)}>
                <Text style={styles.link}>{cred.link}</Text>
              </TouchableOpacity>
            ) : null}

            {/* Username Row */}
            <View style={styles.row}>
              <Text style={styles.text}>{cred.username}</Text>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => handleCopy("username", cred.username, index)}
              >
                {copied?.type === "username" && copied.index === index ? (
                  <Ionicons
                    name="checkmark-outline"
                    size={18}
                    color={theme.icon}
                  />
                ) : (
                  <Ionicons
                    name="copy-outline"
                    size={18}
                    color={theme.iconSecondary}
                  />
                )}
              </TouchableOpacity>
            </View>

            {/* Password Row */}
            <View style={styles.row}>
              <Text style={styles.text}>
                {showPassword[index]
                  ? cred.password
                  : "*".repeat(cred.password.length)}
              </Text>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => handleCopy("password", cred.password, index)}
              >
                {copied?.type === "password" && copied.index === index ? (
                  <Ionicons
                    name="checkmark-outline"
                    size={18}
                    color={theme.icon}
                  />
                ) : (
                  <Ionicons
                    name="copy-outline"
                    size={18}
                    color={theme.iconMuted}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => toggleShowPassword(index)}
              >
                <Ionicons
                  name={showPassword[index] ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color={theme.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 12,
    width: "100%",
    backgroundColor: theme.background,
  },
  block: {
    backgroundColor: theme.card,
    borderRadius: 10,
    padding: 14,
    flexBasis: isSmall ? "100%" : isMedium ? "48%" : "30%",
    margin: 6,
    // shadowColor: theme.shadow,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.15,
    // shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: isSmall ? 16 : 18,
    fontWeight: "bold",
    color: theme.title,
    marginBottom: 2,
    fontFamily: "Poppins_400Regular",
  },
  description: {
    fontSize: isSmall ? 12 : 13,
    color: theme.description,
    marginBottom: 8,
    fontFamily: "Poppins_400Regular",
  },
  text: {
    color: theme.text,
    fontSize: 14,
    flexShrink: 1,
    fontFamily: "Poppins_400Regular",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  iconBtn: {
    marginLeft: 6,
    padding: 2,
  },
  link: {
    color: "#8ab3ffff",
    fontSize: 13,
    marginTop: 6,
    textDecorationLine: "underline",
    fontFamily: "Poppins_400Regular",
  },
});

export default CredentialBlocks;
