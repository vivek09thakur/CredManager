import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

const slides = [
  {
    icon: 'shield-checkmark-outline',
    title: 'Welcome to BITS Credentials',
    description: 'Your secure vault for managing all your credentials in one place.',
  },
  {
    icon: 'add-circle-outline',
    title: 'Add Credentials',
    description: 'Click the + button to add your website credentials, usernames, and passwords.',
  },
  {
    icon: 'copy-outline',
    title: 'Easy Access',
    description: 'Quickly copy credentials with one tap. Toggle password visibility when needed.',
  },
  {
    icon: 'color-palette-outline',
    title: 'Organize with Colors',
    description: 'Customize card colors to easily identify different categories of credentials.',
  },
  {
    icon: 'warning-outline',
    title: 'Important Notice',
    description: 'All credentials are stored locally on your device only. We are not responsible for any data loss if app data is cleared or device is reset.',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="flex-1 px-6 justify-between">
        {/* Content */}
        <View className="flex-1 justify-center items-center">
          {/* Progress dots */}
          <View className="flex-row space-x-2 mb-12">
            {slides.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${
                  currentSlide === index ? 'w-6 bg-blue-500' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </View>

          {/* Icon */}
          <View className="mb-8 p-6 rounded-full bg-blue-50">
            <Ionicons
              name={slides[currentSlide].icon as any}
              size={64}
              color="#3b82f6"
            />
          </View>

          {/* Text */}
          <Text className="text-2xl font-bold text-center text-gray-900 mb-4 font-poppins-semibold">
            {slides[currentSlide].title}
          </Text>
          <Text className="text-base text-center text-gray-600 px-6 font-poppins">
            {slides[currentSlide].description}
          </Text>
        </View>

        {/* Bottom buttons */}
        <View className="pb-8">
          <View className="mb-8">
            {currentSlide < slides.length - 1 ? (
              <TouchableOpacity
                className="bg-blue-500 rounded-2xl py-4 px-8"
                onPress={handleNext}
              >
                <Text className="text-white text-center text-lg font-poppins-medium">
                  Next
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                className="bg-blue-500 rounded-2xl py-4 px-8"
                onPress={onComplete}
              >
                <Text className="text-white text-center text-lg font-poppins-medium">
                  Get Started
                </Text>
              </TouchableOpacity>
            )}

            {currentSlide < slides.length - 1 ? (
              <TouchableOpacity 
                className="mt-4"
                onPress={onComplete}
              >
                <Text className="text-gray-600 text-center font-poppins">
                  Skip
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Credits */}
          <Text className="text-gray-500 text-xs text-center font-poppins">
            An app by PINAKA group of developers
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}