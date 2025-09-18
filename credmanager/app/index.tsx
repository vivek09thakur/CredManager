import CredentialBlocks from "@/components/CredBlocks/CredentialBlocks";
import Nav from "@/components/NavBar/Nav";
import { Poppins_400Regular } from "@expo-google-fonts/poppins/400Regular";
import { useFonts } from "@expo-google-fonts/poppins/useFonts";
import { StyleSheet, View } from "react-native";
import Cred from "../cred.json";
import "../global.css";

const Index = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });


  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Nav title="Cred Manager" />
        <CredentialBlocks credentials={Cred} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202123",
  },
});

export default Index;
