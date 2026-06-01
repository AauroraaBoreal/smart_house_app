import React, { useEffect, useRef } from 'react';
import { Pressable, Animated, Text, View } from 'react-native';

interface LabeledToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export function LabeledToggle({ value, onValueChange, disabled }: LabeledToggleProps) {
  const slideAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, slideAnim]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 18],
  });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      className="flex-row items-center bg-white rounded-full px-3 py-1 space-x-2"
    >
      <Text className="text-xs font-semibold text-black">{value ? 'on' : 'off'}</Text>
      <View className={`w-9 h-5 rounded-full flex-row items-center ${value ? 'bg-black' : 'bg-zinc-300'} ${disabled ? 'opacity-50' : ''}`}>
        <Animated.View
          className="w-4 h-4 rounded-full bg-white shadow-sm"
          style={{ transform: [{ translateX }] }}
        />
      </View>
    </Pressable>
  );
}
