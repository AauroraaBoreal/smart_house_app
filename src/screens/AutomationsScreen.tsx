import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function AutomationsScreen() {
  const [rainOn, setRainOn] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 px-6 pt-8">
        <Text className="text-white text-3xl font-bold mb-6">Automations</Text>
        
        <View className="bg-zinc-800 rounded-[32px] p-6 mb-4">
          <Text className="text-white text-xl font-bold mb-2">Terrace Roof</Text>
          <Text className="text-zinc-400 mb-6 leading-5">Automatically close the roof when rain is detected using the external sensors.</Text>
          <View className="flex-row items-center justify-between mt-auto">
             <Text className="text-white font-medium text-lg">Rain Detection</Text>
             <Pressable 
                onPress={() => setRainOn(!rainOn)}
                className={`w-12 h-7 rounded-full flex-row items-center px-1 ${rainOn ? 'bg-[#99f2c8] justify-end' : 'bg-zinc-600 justify-start'}`}>
               <View className="w-5 h-5 bg-white rounded-full shadow-sm" />
             </Pressable>
          </View>
        </View>

        <View className="bg-zinc-800 rounded-[32px] p-6 mb-4 opacity-50">
          <Text className="text-white text-xl font-bold mb-2">Morning Routine</Text>
          <Text className="text-zinc-400 leading-5">Open blinds and turn on Living room lights at 7:00 AM based on time of day.</Text>
        </View>
        
        <View className="bg-zinc-800 rounded-[32px] p-6 mb-4 opacity-50">
          <Text className="text-white text-xl font-bold mb-2">Light Sensors</Text>
          <Text className="text-zinc-400 leading-5">Adjust internal room lights based on natural light from outside.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
