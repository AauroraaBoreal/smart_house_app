import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Datos incompletos', 'Ingresa tu correo y contraseña.');
      return;
    }

    setLoadingLogin(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    setLoadingLogin(false);

    if (error) {
      Alert.alert('Error al iniciar sesión', error.message);
    }
  };

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Datos incompletos', 'Ingresa un correo y una contraseña.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Contraseña muy corta', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoadingRegister(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
    });

    setLoadingRegister(false);

    if (error) {
      Alert.alert('Error al crear cuenta', error.message);
      return;
    }

    if (data.session) {
      Alert.alert('Cuenta creada', 'Tu cuenta fue creada correctamente.');
    } else {
      Alert.alert(
        'Cuenta creada',
        'Revisa tu correo para confirmar tu cuenta, o desactiva la confirmación por correo en Supabase para pruebas.'
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-8"
      >
        <View className="mb-12">
          <Text className="text-white text-4xl font-bold mb-2">
            Smart House
          </Text>
          <Text className="text-zinc-400 text-lg">
            Controla la luz y el techo inteligente de tu maqueta.
          </Text>
        </View>

        <View className="bg-zinc-800 rounded-2xl px-4 py-3">
          <Text className="text-zinc-500 text-xs mb-1">Correo</Text>
          <TextInput
            className="text-white text-base"
            placeholder="correo@ejemplo.com"
            placeholderTextColor="#71717a"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View className="bg-zinc-800 rounded-2xl px-4 py-3 mt-4">
          <Text className="text-zinc-500 text-xs mb-1">Contraseña</Text>
          <TextInput
            className="text-white text-base"
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor="#71717a"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Pressable
          onPress={handleLogin}
          disabled={loadingLogin || loadingRegister}
          className="bg-white rounded-full py-4 mt-8 items-center"
        >
          {loadingLogin ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text className="text-black font-bold text-lg">
              Iniciar sesión
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={handleRegister}
          disabled={loadingLogin || loadingRegister}
          className="border border-zinc-600 rounded-full py-4 mt-4 items-center"
        >
          {loadingRegister ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-lg">
              Crear cuenta
            </Text>
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}