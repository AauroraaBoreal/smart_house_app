import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

export function SettingsScreen() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-6 pt-8">
        <Text className="text-white text-3xl font-bold mb-6">Ajustes</Text>

        <View>
          <Pressable className="bg-zinc-800 rounded-[24px] p-5">
            <Text className="text-white text-lg font-medium">Preferencias de cuenta</Text>
          </Pressable>

          <Pressable className="bg-zinc-800 rounded-[24px] p-5 mt-4">
            <Text className="text-white text-lg font-medium">Notificaciones</Text>
          </Pressable>

          <Pressable className="bg-zinc-800 rounded-[24px] p-5 mt-4">
            <Text className="text-white text-lg font-medium">Gestión del hogar</Text>
          </Pressable>
        </View>

        <Pressable
          className="mt-auto mb-8 bg-red-500/20 rounded-[24px] p-5 items-center"
          onPress={handleSignOut}
        >
          <Text className="text-red-500 text-lg font-bold">Cerrar sesión</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}