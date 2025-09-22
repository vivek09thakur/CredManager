import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyState: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center py-20">
      <Ionicons name="lock-closed-outline" size={64} color="#dadce0" />
      <Text className="text-gray-500 text-lg mt-4 font-poppins-medium text-center">
        No credentials saved yet
      </Text>
      <Text className="text-gray-600 text-sm mt-2 font-poppins text-center">
        Add your first credential to get started
      </Text>
    </View>
  );
};

export { EmptyState };