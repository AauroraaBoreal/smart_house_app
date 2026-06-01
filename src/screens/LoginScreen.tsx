import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login simply navigates to the Main App
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 justify-center px-8">
        <View className="mb-12">
          <Text className="text-white text-4xl font-bold mb-2">Welcome Home</Text>
          <Text className="text-zinc-400 text-lg">Sign in to manage your devices.</Text>
        </View>

        <View className="space-y-4">
          <View className="bg-zinc-800 rounded-2xl px-4 py-3">
            <Text className="text-zinc-500 text-xs mb-1">Email</Text>
            <TextInput
              className="text-white text-base"
              placeholder="Enter your email"
              placeholderTextColor="#71717a"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View className="bg-zinc-800 rounded-2xl px-4 py-3 mt-4">
            <Text className="text-zinc-500 text-xs mb-1">Password</Text>
            <TextInput
              className="text-white text-base"
              placeholder="Enter your password"
              placeholderTextColor="#71717a"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <Pressable 
          onPress={handleLogin}
          className="bg-white rounded-full py-4 mt-8 items-center"
        >
          <Text className="text-black font-bold text-lg">Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
