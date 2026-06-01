import React from 'react';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';

interface CustomSliderProps {
  value: number;
  onValueChange: (val: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  disabled?: boolean;
}

export function CustomSlider({ value, onValueChange, minimumValue = 0, maximumValue = 100, disabled }: CustomSliderProps) {
  return (
    <View className="w-full mt-2 justify-center">
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#00000020"
        thumbTintColor="#000000"
      />
    </View>
  );
}
