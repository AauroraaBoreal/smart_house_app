import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, Pressable } from 'react-native';
import { Lightbulb, Fan, Thermometer, Droplets } from 'lucide-react-native';
import { Device } from '../data/mockData';
import { CustomSlider } from './CustomSlider';

interface DeviceTileProps {
  device: Device;
  onToggle: (id: string, isOn: boolean) => void;
  onIntensityChange?: (id: string, intensity: number) => void;
  onTemperatureChange?: (id: string, temp: number) => void;
  isFullWidth?: boolean;
}

export function DeviceTile({ device, onToggle, onIntensityChange, onTemperatureChange, isFullWidth }: DeviceTileProps) {
  const anim = useRef(new Animated.Value(device.isOn ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: device.isOn ? 1 : 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [device.isOn, anim]);

  const activeBgColor = (() => {
    switch (device.type) {
      case 'Light':
        return device.id === '1' ? '#cba6f7' : '#f9e2af';
      case 'AC':
        return '#e0e7ff';
      case 'Fan':
        return '#dcfce7';
      case 'Roof':
        return '#99f2c8';
      default:
        return '#ffffff';
    }
  })();

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#27272a', activeBgColor],
  });

  const textColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#000000'],
  });

  const renderIcon = () => {
    const offOpacity = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    const onOpacity = anim;

    const renderIconComponent = (color: string) => {
      switch (device.type) {
        case 'Light':
          return <Lightbulb size={24} color={color} />;
        case 'Fan':
          return <Fan size={24} color={color} />;
        case 'AC':
          return <Thermometer size={24} color={color} />;
        case 'Roof':
          return <Droplets size={24} color={color} />;
        default:
          return <Lightbulb size={24} color={color} />;
      }
    };

    return (
      <View style={{ width: 24, height: 24, position: 'relative' }}>
        <Animated.View style={{ position: 'absolute', left: 0, top: 0, opacity: offOpacity }}>
          {renderIconComponent('#d4d4d8')}
        </Animated.View>
        <Animated.View style={{ position: 'absolute', left: 0, top: 0, opacity: onOpacity }}>
          {renderIconComponent('#000000')}
        </Animated.View>
      </View>
    );
  };

  const isExpanded = device.isOn;

  return (
    <Pressable
      onPress={() => onToggle(device.id, !device.isOn)}
      className={`${isFullWidth ? 'w-full' : 'w-[45%] aspect-square'} m-2`}
    >
      <Animated.View
        style={{ backgroundColor }}
        className="rounded-[32px] p-5 flex-col justify-between h-full w-full"
      >
        <View className="flex-row justify-between items-start w-full">
          {isFullWidth ? (
            <>
              <Animated.Text
                style={{ color: textColor }}
                className="text-xl font-semibold"
              >
                {device.name}
              </Animated.Text>
              {renderIcon()}
            </>
          ) : (
            renderIcon()
          )}
        </View>

        {device.type === 'Light' && (
          <View className="mt-4 flex-1 justify-end">
            <Animated.Text
              style={{ color: textColor }}
              className="text-base font-semibold mb-2"
            >
              {device.name}
            </Animated.Text>
            {isExpanded && onIntensityChange && (
              <CustomSlider
                value={device.intensity || 0}
                onValueChange={(val) => onIntensityChange(device.id, val)}
              />
            )}
          </View>
        )}

        {device.type === 'AC' && device.isOn && onTemperatureChange && (
          <View className="items-center my-4">
            <View className="flex-row items-center space-x-6">
              <Pressable
                onPress={() => onTemperatureChange(device.id, (device.temperature || 21) - 1)}
                className="w-12 h-12 bg-white rounded-full items-center justify-center"
              >
                <Text className="text-3xl font-medium text-black">-</Text>
              </Pressable>
              <Text className="text-5xl font-bold text-black">{device.temperature}°</Text>
              <Pressable
                onPress={() => onTemperatureChange(device.id, (device.temperature || 21) + 1)}
                className="w-12 h-12 bg-white rounded-full items-center justify-center"
              >
                <Text className="text-3xl font-medium text-black">+</Text>
              </Pressable>
            </View>
            <Text className="text-zinc-600 mt-3 text-base">❄ {device.mode}</Text>
          </View>
        )}

        {device.type === 'Fan' && device.isOn && onIntensityChange && (
          <View className="mt-4">
            <CustomSlider
              minimumValue={0}
              maximumValue={4}
              value={device.intensity || 0}
              onValueChange={(val) => onIntensityChange(device.id, Math.round(val))}
            />
          </View>
        )}

        {device.type === 'Roof' && (
          <View className="mt-4 flex-1 justify-end">
            <Animated.Text
              style={{ color: textColor }}
              className="text-base font-semibold"
            >
              {device.name}
            </Animated.Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}
