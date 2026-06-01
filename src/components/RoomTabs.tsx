import React from 'react';
import { ScrollView, Text, Pressable } from 'react-native';
import { Room, mockRooms } from '../data/mockData';

interface RoomTabsProps {
  selectedRoom: Room;
  onSelectRoom: (room: Room) => void;
}

export function RoomTabs({ selectedRoom, onSelectRoom }: RoomTabsProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="mb-6 mt-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {mockRooms.map((room) => {
        const isSelected = selectedRoom === room;
        return (
          <Pressable 
            key={room} 
            onPress={() => onSelectRoom(room)}
            className="mr-8 py-2"
          >
            <Text className={`text-2xl font-bold ${isSelected ? 'text-white' : 'text-zinc-500'}`}>
              {room}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
