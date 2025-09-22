
import { Poppins_400Regular } from "@expo-google-fonts/poppins/400Regular";
import { useFonts } from "@expo-google-fonts/poppins/useFonts";
import { StatusBar } from 'expo-status-bar';
import "../global.css";
import LoginScreen from "@/components/LoginScreen";

const Index = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <StatusBar style="light" />
      <LoginScreen />
    </>
  );
};

export default Index;
