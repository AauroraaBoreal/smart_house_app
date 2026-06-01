import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoomTabs } from '../components/RoomTabs';
import { DeviceTile } from '../components/DeviceTile';
import { mockDevices, Room } from '../data/mockData';

export function DevicesScreen() {
  const [selectedRoom, setSelectedRoom] = useState<Room>('Bedroom');
  const [devices, setDevices] = useState(mockDevices);

  const roomDevices = devices.filter(d => d.room === selectedRoom);

  const handleToggle = (id: string, isOn: boolean) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, isOn } : d));
  };

  const handleIntensityChange = (id: string, intensity: number) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, intensity } : d));
  };

  const handleTemperatureChange = (id: string, temperature: number) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, temperature } : d));
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="pt-4">
        <RoomTabs selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} />
      </View>
      <ScrollView className="flex-1 px-2" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="flex-row flex-wrap justify-between px-2">
          {roomDevices.map(device => {
            const isFullWidth = device.type === 'AC' || device.type === 'Fan';
            return (
              <DeviceTile 
                key={device.id} 
                device={device} 
                onToggle={handleToggle}
                onIntensityChange={handleIntensityChange}
                onTemperatureChange={handleTemperatureChange}
                isFullWidth={isFullWidth}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
