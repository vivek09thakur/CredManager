import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { StatusBar } from 'expo-status-bar';
import "../global.css";
import LoginScreen from "@/components/LoginScreen";
import OnboardingScreen from "@/components/OnboardingScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('hasSeenOnboarding');
        setHasSeenOnboarding(status === 'true');
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setHasSeenOnboarding(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (hasSeenOnboarding === true) {
      AsyncStorage.setItem('hasSeenOnboarding', 'true');
    }
  }, [hasSeenOnboarding]);

  if (!fontsLoaded || hasSeenOnboarding === null) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      {hasSeenOnboarding ? (
        <LoginScreen />
      ) : (
        <OnboardingScreen onComplete={() => setHasSeenOnboarding(true)} />
      )}
    </>
  );
};

export default Index;