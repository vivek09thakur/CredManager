import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import { useFonts } from "@expo-google-fonts/poppins/useFonts";
import { Poppins_400Regular } from "@expo-google-fonts/poppins/400Regular";
import { useAuth } from "../components/AuthContext";

const ACCENT = "#c8aef1ff";
const BG = "#202123";
const FG = "#fff";
const LABEL = "#bdbdbd";
const INPUT_BG = "#26282b";

const LoginScreen: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let [fontsLoaded] = useFonts({ Poppins_400Regular });
    const { width } = useWindowDimensions();

    if (!fontsLoaded) return null;

    const handleLogin = () => {
        if (!login(username, password)) {
            setError("Invalid credentials");
        }
    };

    // Responsive card width
    const cardWidth = width > 500 ? 400 : width > 340 ? 320 : "95%";
    const inputWidth = width > 500 ? 400 : width > 340 ? 280 : "95%";

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <View style={[styles.card, { width: cardWidth }]}>
                        <Text style={styles.title}>Sign in</Text>
                        <Text style={styles.subtitle}>to BITS Cred Manager</Text>
                        <View style={styles.inputWrap}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput
                                placeholder="Enter your username"
                                placeholderTextColor="#bbb"
                                value={username}
                                onChangeText={setUsername}
                                style={[styles.input, { width: inputWidth }]}
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType="username"
                                returnKeyType="next"
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                placeholder="Enter your password"
                                placeholderTextColor="#bbb"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                style={[styles.input, { width: inputWidth }]}
                                textContentType="password"
                                returnKeyType="done"
                            />
                        </View>
                        {error ? <Text style={styles.error}>{error}</Text> : null}
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.link} onPress={onSwitch}>
                            <Text style={styles.linkText}>Create account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: BG,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BG,
        minHeight: "100%",
        paddingVertical: 24,
    },
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        // padding: 16,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // backgroundColor: "#232428",
        // padding: 16,
    },
    title: {
        fontSize: 24,
        color: FG,
        fontWeight: "bold",
        marginBottom: 2,
        letterSpacing: 0.5,
        fontFamily: "Poppins_400Regular",
    },
    subtitle: {
        fontSize: 15,
        color: LABEL,
        marginBottom: 18,
        fontFamily: "Poppins_400Regular",
    },
    inputWrap: {
        width: "100%",
        marginBottom: 10,
    },
    label: {
        color: LABEL,
        fontSize: 13,
        marginBottom: 3,
        fontWeight: "bold",
        letterSpacing: 0.2,
        fontFamily: "Poppins_400Regular",
    },
    input: {
        backgroundColor: INPUT_BG,
        borderWidth: 1,
        borderColor: "#444",
        color: FG,
        padding: 12,
        borderRadius: 6,
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        alignSelf: "stretch",
        width: "100%",
    },
    error: {
        color: "#ff4d4f",
        marginBottom: 10,
        fontWeight: "bold",
        alignSelf: "flex-start",
    },
    button: {
        backgroundColor: ACCENT,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 6,
        marginTop: 8,
        marginBottom: 8,
        width: "100%",
        alignItems: "center",
        shadowColor: ACCENT,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        color: FG,
        fontWeight: "bold",
        fontSize: 18,
        letterSpacing: 1,
        fontFamily: "Poppins_400Regular",
    },
    link: {
        marginTop: 8,
        width: "100%",
        alignItems: "flex-end",
    },
    linkText: {
        color: ACCENT,
        fontSize: 15,
        textDecorationLine: "underline",
        fontWeight: "bold",
        fontFamily: "Poppins_400Regular",
    },
});

export default LoginScreen;
