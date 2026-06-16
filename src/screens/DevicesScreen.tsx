import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoomTabs } from '../components/RoomTabs';
import { DeviceTile } from '../components/DeviceTile';
import { Device, Room } from '../data/mockData';
import { supabase } from '../lib/supabase';

type DeviceCatalogRow = {
  id: string;
  name: string;
  type: 'LIGHT' | 'ROOF';
  room: Room;
};

type PreferenceRow = {
  user_id: string;
  device_id: string;
  is_on: boolean;
  intensity: number;
  roof_state: 'OPEN' | 'CLOSED' | null;
  rain_detected: boolean;
  automation_enabled: boolean;
};

function mapToDevice(device: DeviceCatalogRow, preference: PreferenceRow): Device {
  return {
    id: device.id,
    name: device.name,
    type: device.type === 'LIGHT' ? 'Light' : 'Roof',
    room: device.room,
    isOn: device.type === 'ROOF'
      ? preference.roof_state === 'CLOSED'
      : preference.is_on,
    intensity: preference.intensity,
    roofState: preference.roof_state ?? undefined,
    rainDetection: preference.rain_detected,
    automationEnabled: preference.automation_enabled,
  };
}

export function DevicesScreen() {
  const [selectedRoom, setSelectedRoom] = useState<Room>('Sala');
  const [devices, setDevices] = useState<Device[]>([]);
  const [preferences, setPreferences] = useState<PreferenceRow[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const roomDevices = devices.filter(d => d.room === selectedRoom);

  const loadUserPreferences = async () => {
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

    const { data: catalogData, error: catalogError } = await supabase
      .from('devices')
      .select('id, name, type, room')
      .order('id', { ascending: true });

    if (catalogError) {
      Alert.alert('Error cargando dispositivos', catalogError.message);
      setLoading(false);
      return;
    }

    const { data: preferencesData, error: preferencesError } = await supabase
      .from('user_device_preferences')
      .select('*')
      .eq('user_id', currentUserId);

    if (preferencesError) {
      Alert.alert('Error cargando preferencias', preferencesError.message);
      setLoading(false);
      return;
    }

    const catalog = catalogData as DeviceCatalogRow[];
    const prefs = preferencesData as PreferenceRow[];

    setPreferences(prefs);

    const mergedDevices = catalog
      .map(device => {
        const pref = prefs.find(p => p.device_id === device.id);
        if (!pref) return null;
        return mapToDevice(device, pref);
      })
      .filter(Boolean) as Device[];

    setDevices(mergedDevices);
    setLoading(false);
  };

  useEffect(() => {
    loadUserPreferences();
  }, []);

  const updatePreference = async (
    deviceId: string,
    changes: Partial<PreferenceRow>
  ) => {
    if (!userId) return;

    const { error } = await supabase
      .from('user_device_preferences')
      .update({
        ...changes,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('device_id', deviceId);

    if (error) {
      Alert.alert('Error al guardar preferencia', error.message);
      return;
    }

    await loadUserPreferences();
  };

  const handleToggle = (id: string, isOn: boolean) => {
    const pref = preferences.find(p => p.device_id === id);
    const device = devices.find(d => d.id === id);

    if (!pref || !device) return;

    if (device.type === 'Light') {
      updatePreference(id, {
        is_on: isOn,
        intensity: isOn ? Math.max(pref.intensity, 50) : 0,
      });
    }

    if (device.type === 'Roof') {
      updatePreference(id, {
        is_on: isOn,
        roof_state: isOn ? 'CLOSED' : 'OPEN',
      });
    }
  };

  const handleIntensityChange = (id: string, intensity: number) => {
    const roundedIntensity = Math.round(intensity);

    updatePreference(id, {
      intensity: roundedIntensity,
      is_on: roundedIntensity > 0,
    });
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator color="#ffffff" />
        <Text className="text-white mt-4">Cargando tus preferencias...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="pt-4">
        <RoomTabs selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} />
      </View>

      <ScrollView className="flex-1 px-2" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="flex-row flex-wrap justify-between px-2">
          {roomDevices.map(device => (
            <DeviceTile
              key={device.id}
              device={device}
              onToggle={handleToggle}
              onIntensityChange={handleIntensityChange}
              isFullWidth={device.type === 'Roof'}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}