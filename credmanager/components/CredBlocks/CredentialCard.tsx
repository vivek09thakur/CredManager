import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CredentialCardProps {
  credential: {
    title: string;
    description?: string;
    username: string;
    password: string;
    link?: string;
    color?: string;
  };
  index: number;
  showPassword: boolean;
  onTogglePassword: (index: number) => void;
  onCopy: (type: 'username' | 'password', value: string, index: number) => void;
  copied: { type: 'username' | 'password'; index: number } | null;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({
  credential,
  index,
  showPassword,
  onTogglePassword,
  onCopy,
  copied,
}) => {
  return (
    <View
      className="rounded-lg p-4 m-2"
      style={{
        backgroundColor: credential.color || '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        // Border removed as requested
      }}
    >
      {/* Header - Title with pin icon */}
      <View className="flex-row justify-between items-start mb-2">
        <Text
          className="text-gray-900 text-base font-poppins-medium flex-1 mr-2"
          style={{ lineHeight: 20 }}
          numberOfLines={2}
        >
          {credential.title}
        </Text>
        <TouchableOpacity className="p-1 opacity-60">
          <Ionicons name="push-outline" size={16} color="#5f6368" />
        </TouchableOpacity>
      </View>

      {/* Description */}
      {credential.description ? (
        <Text
          className="text-gray-700 text-sm font-poppins mb-3"
          style={{ lineHeight: 18 }}
          numberOfLines={3}
        >
          {credential.description}
        </Text>
      ) : null}

      {/* Link */}
      {credential.link ? (
        <TouchableOpacity
          onPress={() => Linking.openURL(credential.link!)}
          className="mb-3 flex-row items-center"
        >
          <Ionicons name="link-outline" size={14} color="#1a73e8" />
          <Text className="text-[#1a73e8] text-sm font-poppins ml-1">
            {credential.link.replace(/^https?:\/\/(www\.)?/, '')}
          </Text>
        </TouchableOpacity>
      ) : null}

      {/* Credential Fields - Minimal Keep Style */}
      <View className="space-y-2">
        {/* Username Field */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-gray-900 text-sm font-poppins" numberOfLines={1}>
              {credential.username}
            </Text>
            <Text className="text-gray-500 text-xs mt-1 font-poppins-medium">Username</Text>
          </View>
          <TouchableOpacity
            className="p-2 ml-2 rounded-full active:bg-gray-200"
            onPress={() => onCopy('username', credential.username, index)}
          >
            {copied?.type === 'username' && copied.index === index ? (
              <Ionicons name="checkmark" size={18} color="#34A853" />
            ) : (
              <Ionicons name="copy-outline" size={18} color="#5f6368" />
            )}
          </TouchableOpacity>
        </View>

        {/* Password Field */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-gray-900 text-sm font-poppins font-mono" numberOfLines={1}>
              {showPassword ? credential.password : '•'.repeat(12)}
            </Text>
            <Text className="text-gray-500 text-xs mt-1 font-poppins-medium">Password</Text>
          </View>
          <View className="flex-row items-center ml-2">
            <TouchableOpacity
              className="p-2 rounded-full active:bg-gray-200"
              onPress={() => onCopy('password', credential.password, index)}
            >
              {copied?.type === 'password' && copied.index === index ? (
                <Ionicons name="checkmark" size={18} color="#34A853" />
              ) : (
                <Ionicons name="copy-outline" size={18} color="#5f6368" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2 rounded-full active:bg-gray-200"
              onPress={() => onTogglePassword(index)}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color="#5f6368"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};