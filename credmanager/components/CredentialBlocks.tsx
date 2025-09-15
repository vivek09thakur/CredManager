import React, { useState } from "react";
import styles from "./CredentialBlock.module";
import { useFonts } from "@expo-google-fonts/poppins/useFonts";
import { Poppins_400Regular } from "@expo-google-fonts/poppins/400Regular";
import Ionicons from '@expo/vector-icons/Ionicons';

type Credential = {
  username: string;
  password: string;
};

type CredentialBlocksProps = {
  credentials: Credential[];
};

const copyToClipboard = async (text: string) => {
  if (navigator && "clipboard" in navigator) {
    await navigator.clipboard.writeText(text);
  }
};

const CredentialBlocks: React.FC<CredentialBlocksProps> = ({ credentials }) => {
  const [showPassword, setShowPassword] = useState<boolean[]>(
    credentials.map(() => false)
  );

  const toggleShowPassword = (index: number) => {
    setShowPassword((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <div style={styles.container}>
        {credentials.map((cred, index) => (
          <div key={index} style={styles.block}>
            <div style={styles.label}>Username</div>
            <div style={styles.row}>
              <span style={styles.text}>{cred.username}</span>
              <button
                style={styles.copyBtn}
                type="button"
                onClick={() => copyToClipboard(cred.username)}
                aria-label="Copy username"
              >
                <Ionicons name="copy-outline" size={20} />
              </button>
            </div>
            <div style={styles.label}>Password</div>
            <div style={styles.row}></div>
              <span style={styles.text}>
                {showPassword[index]
                  ? cred.password
                  : "*".repeat(cred.password.length)}
              </span>
              <button
                style={styles.copyBtn}
                type="button"
                onClick={() => copyToClipboard(cred.password)}
                aria-label="Copy password"
              >
                <Ionicons name="copy-outline" size={20} />
              </button>
              <button
                style={styles.toggleBtn}
                type="button"
                onClick={() => toggleShowPassword(index)}
                aria-label={showPassword[index] ? "Hide password" : "Show password"}
              >
                <Ionicons
                  name={showPassword[index] ? "eye-off-outline" : "eye-outline"}
                  size={20}
                />
              </button>
            </div>
        ))}
      </div>
    );
  }
};
export default CredentialBlocks;
