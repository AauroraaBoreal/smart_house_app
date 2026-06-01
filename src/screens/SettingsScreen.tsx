import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function SettingsScreen({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-6 pt-8">
        <Text className="text-white text-3xl font-bold mb-6">Settings</Text>
        
        <View className="space-y-4">
          <Pressable className="bg-zinc-800 rounded-[24px] p-5">
            <Text className="text-white text-lg font-medium">Account Preferences</Text>
          </Pressable>
          <Pressable className="bg-zinc-800 rounded-[24px] p-5 mt-4">
            <Text className="text-white text-lg font-medium">Notifications</Text>
          </Pressable>
          <Pressable className="bg-zinc-800 rounded-[24px] p-5 mt-4">
            <Text className="text-white text-lg font-medium">Home Management</Text>
          </Pressable>
        </View>

        <Pressable 
          className="mt-auto mb-8 bg-red-500/20 rounded-[24px] p-5 items-center"
          onPress={() => navigation.replace('Login')}
        >
          <Text className="text-red-500 text-lg font-bold">Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
