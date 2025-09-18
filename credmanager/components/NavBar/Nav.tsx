import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import React from "react";
import { StyleSheet, Text, View } from "react-native";


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

const Nav: React.FC<{ title: string }> = ({ title }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.nav}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    backgroundColor: theme.background,
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 40,
  },
    title: {
    color: theme.title,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
    },  
});

export default Nav;
