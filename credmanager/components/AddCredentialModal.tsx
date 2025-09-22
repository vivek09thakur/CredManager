import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Credential = {
  title: string;
  description?: string;
  username: string;
  password: string;
  link?: string;
};

interface AddCredentialModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (credential: Credential) => void;
}

export default function AddCredentialModal({
  visible,
  onClose,
  onAdd,
}: AddCredentialModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAdd = () => {
    if (!title || !username || !password) {
      return;
    }

    onAdd({
      title,
      description: description || undefined,
      username,
      password,
      link: link || undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setUsername("");
    setPassword("");
    setLink("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <View className="bg-[#202124] rounded-t-3xl p-6 h-4/5">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-xl font-bold font-poppins-semibold">
                Add New Credential
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="p-2 rounded-full bg-gray-700"
              >
                <Ionicons name="close" size={24} color="#bcbcbcff" />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              className="flex-1"
            >
              <View className="mb-4">
                <Text className="text-gray-400 mb-2 font-poppins">Title *</Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="e.g., Gmail Account"
                  placeholderTextColor="#6B7280"
                  className="bg-gray-700 text-white p-4 rounded-xl font-poppins"
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-400 mb-2 font-poppins">Description</Text>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Optional description"
                  placeholderTextColor="#6B7280"
                  multiline
                  numberOfLines={3}
                  className="bg-gray-700 text-white p-4 rounded-xl font-poppins"
                  textAlignVertical="top"
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-400 mb-2 font-poppins">Username *</Text>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter username or email"
                  placeholderTextColor="#6B7280"
                  className="bg-gray-700 text-white p-4 rounded-xl font-poppins"
                  autoCapitalize="none"
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-400 mb-2 font-poppins">Password *</Text>
                <View className="flex-row bg-gray-700 rounded-xl">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    placeholderTextColor="#6B7280"
                    secureTextEntry={!showPassword}
                    className="flex-1 text-white p-4 font-poppins"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="p-4"
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color="#bcbcbcff"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="mb-6">
                <Text className="text-gray-400 mb-2 font-poppins">Link</Text>
                <TextInput
                  value={link}
                  onChangeText={setLink}
                  placeholder="Optional URL"
                  placeholderTextColor="#6B7280"
                  className="bg-gray-700 text-white p-4 rounded-xl font-poppins"
                  autoCapitalize="none"
                  keyboardType="url"
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              onPress={handleAdd}
              disabled={!title || !username || !password}
              className={`py-4 rounded-xl items-center ${
                !title || !username || !password
                  ? "bg-purple-400/50"
                  : "bg-purple-400"
              }`}
            >
              <Text className="text-white text-lg font-poppins-semibold">
                Add Credential
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
}