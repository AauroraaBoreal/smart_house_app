import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

type RoofPreference = {
  user_id: string;
  device_id: string;
  rain_detected: boolean;
  roof_state: 'OPEN' | 'CLOSED' | null;
  automation_enabled: boolean;
};

export function AutomationsScreen() {
  const [roof, setRoof] = useState<RoofPreference | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadRoofPreference = async () => {
    setLoading(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      Alert.alert('Error', 'No se pudo obtener el usuario actual.');
      setLoading(false);
      return;
    }

    const currentUserId = userData.user.id;
    setUserId(currentUserId);

    await supabase.rpc('create_default_preferences_for_current_user');

    const { data, error } = await supabase
      .from('user_device_preferences')
      .select('user_id, device_id, rain_detected, roof_state, automation_enabled')
      .eq('user_id', currentUserId)
      .eq('device_id', 'terrace_roof')
      .single();

    if (error) {
      Alert.alert('Error cargando techo', error.message);
      setLoading(false);
      return;
    }

    setRoof(data as RoofPreference);
    setLoading(false);
  };

  useEffect(() => {
    loadRoofPreference();
  }, []);

  const toggleRainDetection = async () => {
    if (!roof || !userId) return;

    const nextRainDetected = !roof.rain_detected;

    const { error } = await supabase
      .from('user_device_preferences')
      .update({
        rain_detected: nextRainDetected,
        roof_state: nextRainDetected ? 'CLOSED' : 'OPEN',
        is_on: nextRainDetected,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('device_id', 'terrace_roof');

    if (error) {
      Alert.alert('Error al actualizar lluvia', error.message);
      return;
    }

    await loadRoofPreference();
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator color="#ffffff" />
        <Text className="text-white mt-4">Cargando automatización...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 px-6 pt-8">
        <Text className="text-white text-3xl font-bold mb-6">Automatización</Text>

        <View className="bg-zinc-800 rounded-[32px] p-6 mb-4">
          <Text className="text-white text-xl font-bold mb-2">Techo corredizo</Text>

          <Text className="text-zinc-400 mb-4 leading-5">
            Cada usuario conserva su propia preferencia de lluvia y estado del techo.
          </Text>

          <Text className="text-white mb-2">
            Estado del techo: {roof?.roof_state === 'CLOSED' ? 'Cerrado' : 'Abierto'}
          </Text>

          <Text className="text-white mb-6">
            Lluvia: {roof?.rain_detected ? 'Detectada' : 'No detectada'}
          </Text>

          <View className="flex-row items-center justify-between mt-auto">
            <Text className="text-white font-medium text-lg">Simular lluvia</Text>

            <Pressable
              onPress={toggleRainDetection}
              className={`w-12 h-7 rounded-full flex-row items-center px-1 ${
                roof?.rain_detected ? 'bg-[#99f2c8] justify-end' : 'bg-zinc-600 justify-start'
              }`}
            >
              <View className="w-5 h-5 bg-white rounded-full shadow-sm" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}