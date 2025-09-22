import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CredentialCard } from './CredentialCard';
import { EmptyState } from './EmptyState';

type Credential = {
  title: string;
  description?: string;
  username: string;
  password: string;
  link?: string;
  color?: string;
};

type CredentialBlocksProps = {
  credentials: Credential[];
};

const { width } = Dimensions.get('window');
const isSmall = width < 400;
const isMedium = width >= 400 && width < 800;

// Google Keep-inspired colors
const CARD_COLORS = [
  '#fc9087e9',
  '#fbbd04e9',
  '#FFF475',
  '#CCFF90',
  '#A7FFEB',
  '#CBF0F8',
  '#AECBFA',
  '#D7AEFB',
  '#FDCFE8',
  '#E6C9A8',
];

export default function CredentialBlocks({ credentials }: CredentialBlocksProps) {
  const [showPassword, setShowPassword] = useState<boolean[]>(
    credentials.map(() => false)
  );
  const [copied, setCopied] = useState<{
    type: 'username' | 'password';
    index: number;
  } | null>(null);

  const toggleShowPassword = (index: number) => {
    setShowPassword((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleCopy = async (
    type: 'username' | 'password',
    value: string,
    index: number
  ) => {
    const { setStringAsync } = await import('expo-clipboard');
    await setStringAsync(value);

    setCopied({ type, index });
    setTimeout(() => {
      setCopied((prev) =>
        prev && prev.type === type && prev.index === index ? null : prev
      );
    }, 1500);
  };

  const getCardColor = (index: number, customColor?: string) => {
    if (customColor) return customColor;
    return CARD_COLORS[index % CARD_COLORS.length];
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;

  if (credentials.length === 0) {
    return <EmptyState />;
  }

  return (
    <SafeAreaView
      className="flex-1 bg-[#202124]"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView
        contentContainerClassName="px-4 pb-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View
          className={`flex-row flex-wrap justify-center ${isSmall ? 'flex-col' : ''}`}
        >
          {credentials.map((cred, index) => (
            <CredentialCard
              key={index}
              credential={{
                ...cred,
                color: getCardColor(index, cred.color),
              }}
              index={index}
              showPassword={showPassword[index]}
              onTogglePassword={toggleShowPassword}
              onCopy={handleCopy}
              copied={copied}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
