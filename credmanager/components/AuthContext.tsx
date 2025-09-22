import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = "@users";
const USER_SESSION_KEY = "@user_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const savedUser = await AsyncStorage.getItem(USER_SESSION_KEY);
      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.error("Failed to load session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users = usersJson ? JSON.parse(usersJson) : {};
      
      if (users[username] && users[username] === password) {
        await AsyncStorage.setItem(USER_SESSION_KEY, username);
        setUser(username);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users = usersJson ? JSON.parse(usersJson) : {};
      
      if (users[username]) {
        return false; // User already exists
      }

      users[username] = password;
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      await AsyncStorage.setItem(USER_SESSION_KEY, username);
      setUser(username);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_SESSION_KEY);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
