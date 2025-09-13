import {  View } from "react-native";
import { StyleSheet } from "react-native";
import CredentialBlocks from "@/components/CredentialBlocks";

const Index = () => {
  const sampleCredentials = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
  ];

  return (
    <View style={styles.container}>
      <CredentialBlocks credentials={sampleCredentials} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202123",
  },
});

export default Index;