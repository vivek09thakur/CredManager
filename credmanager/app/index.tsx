import { View, StyleSheet } from "react-native";
import CredentialBlocks from "@/components/CredBlocks/CredentialBlocks";
import { useFonts } from "@expo-google-fonts/poppins/useFonts";
import { Poppins_400Regular } from "@expo-google-fonts/poppins/400Regular";
import Nav from "@/components/NavBar/Nav";

const Index = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  const sampleCredentials = [
    {
      label: "Wipro Email",
      username: "vivek.kumar9@wipro.com",
      password: "Th@kur@090909##"
    },
    {
      label: "BITS Email",
      username: "202419tw021@wilp.bits-pilani.ac.in",
      password: "Wp$29122004"
    },
    {
      label: "Teams",
      username: "202419tw021@wilp.bits-pilani.ac.in",
      password: "Wilp@123"
    },
    {
      label: "eLearning Portal",
      username: "202419tw021@wilp.bits-pilani.ac.in",
      password: "Vivek@090909"
    },
    {
      label: "OpenAthens",
      username: "bitsvkumar049",
      password: "Vivek@090909##"
    },
    {
      label: "Taxila Portal",
      username: "202419tw021@wilp.bits-pilani.ac.in",
      password: "Vivek@090909"
    },
    {
      label: "Mercer | Metti (Exam)",
      username: "202419tw021@wilp.bits-pilani.ac.in",
      password: "Vivek@090909"
    }
  ];

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Nav />
        <CredentialBlocks credentials={sampleCredentials} />
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
