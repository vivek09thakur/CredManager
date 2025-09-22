import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as DocumentPicker from 'expo-document-picker';
import CredentialBlocks from "@/components/CredBlocks/CredentialBlocks";
import { useAuth } from "@/components/AuthContext";
import AddCredentialModal from "@/components/AddCredentialModal";
import { CredentialsService, type Credential } from "@/services/CredentialsService";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else {
      loadCredentials();
    }
  }, [user]);

  const loadCredentials = async () => {
    if (user) {
      const userCredentials = await CredentialsService.getUserCredentials(user);
      setCredentials(userCredentials);
      setIsLoading(false);
    }
  };

  const handleAddCredential = async (credential: Credential) => {
    if (user) {
      await CredentialsService.addCredential(user, credential);
      loadCredentials();
    }
  };

  const handleImportJSON = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const fileUri = result.assets[0].uri;
      const response = await fetch(fileUri);
      const importedCredentials = await response.json();

      if (user && Array.isArray(importedCredentials)) {
        await CredentialsService.importCredentials(user, importedCredentials);
        loadCredentials();
      }
    } catch (error) {
      console.error("Failed to import JSON:", error);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#202124]">
        <Text className="text-gray-400 text-lg font-poppins">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#202124]">
      <CredentialBlocks credentials={credentials} />
      
      {/* Action Buttons */}
      <View className="absolute bottom-6 right-6 flex-row">
        <TouchableOpacity
          onPress={handleImportJSON}
          className="bg-purple-400 w-12 h-12 rounded-full justify-center items-center mr-4"
        >
          <Ionicons name="document-outline" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          className="bg-purple-400 w-12 h-12 rounded-full justify-center items-center"
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <AddCredentialModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCredential}
      />
    </View>
  );
}