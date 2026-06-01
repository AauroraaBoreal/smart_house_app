import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Layers, Lightbulb, Settings as SettingsIcon } from 'lucide-react-native';

import { LoginScreen } from './src/screens/LoginScreen';
import { DevicesScreen } from './src/screens/DevicesScreen';
import { AutomationsScreen } from './src/screens/AutomationsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Devices"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#52525b',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        }
      }}
    >
      <Tab.Screen 
        name="Automations" 
        component={AutomationsScreen} 
        options={{
          title: 'Scenes',
          tabBarIcon: ({ color }) => <Layers size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Devices" 
        component={DevicesScreen} 
        options={{
          title: 'Devices',
          tabBarIcon: ({ color }) => <Lightbulb size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          title: 'Secondary',
          tabBarIcon: ({ color }) => <SettingsIcon size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
