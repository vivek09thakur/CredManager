
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../components/AuthContext";
import React, { useState } from "react";
import LoginScreen from "../components/LoginScreen";
import RegisterScreen from "../components/RegisterScreen";


function AuthGate() {
  const { user } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return showRegister ? (
      <RegisterScreen onSwitch={() => setShowRegister(false)} />
    ) : (
      <LoginScreen onSwitch={() => setShowRegister(true)} />
    );
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
