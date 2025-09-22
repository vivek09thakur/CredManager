import AsyncStorage from "@react-native-async-storage/async-storage";

export type Credential = {
  title: string;
  description?: string;
  username: string;
  password: string;
  link?: string;
};

const CREDENTIALS_STORAGE_KEY = "@user_credentials:";

export const CredentialsService = {
  // Get credentials for a specific user
  getUserCredentials: async (username: string): Promise<Credential[]> => {
    try {
      const storedData = await AsyncStorage.getItem(CREDENTIALS_STORAGE_KEY + username);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Failed to get credentials:", error);
      return [];
    }
  },

  // Add a new credential for a user
  addCredential: async (username: string, credential: Credential): Promise<boolean> => {
    try {
      const currentCredentials = await CredentialsService.getUserCredentials(username);
      const updatedCredentials = [...currentCredentials, credential];
      await AsyncStorage.setItem(
        CREDENTIALS_STORAGE_KEY + username,
        JSON.stringify(updatedCredentials)
      );
      return true;
    } catch (error) {
      console.error("Failed to add credential:", error);
      return false;
    }
  },

  // Import credentials from JSON
  importCredentials: async (username: string, credentials: Credential[]): Promise<boolean> => {
    try {
      const currentCredentials = await CredentialsService.getUserCredentials(username);
      const updatedCredentials = [...currentCredentials, ...credentials];
      await AsyncStorage.setItem(
        CREDENTIALS_STORAGE_KEY + username,
        JSON.stringify(updatedCredentials)
      );
      return true;
    } catch (error) {
      console.error("Failed to import credentials:", error);
      return false;
    }
  },

  // Delete a credential
  deleteCredential: async (username: string, index: number): Promise<boolean> => {
    try {
      const currentCredentials = await CredentialsService.getUserCredentials(username);
      const updatedCredentials = currentCredentials.filter((_, i) => i !== index);
      await AsyncStorage.setItem(
        CREDENTIALS_STORAGE_KEY + username,
        JSON.stringify(updatedCredentials)
      );
      return true;
    } catch (error) {
      console.error("Failed to delete credential:", error);
      return false;
    }
  },
};