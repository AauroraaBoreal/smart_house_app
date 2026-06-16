import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log('SUPABASE URL:', supabaseUrl ? 'OK' : 'FALTA');
console.log('SUPABASE KEY:', supabaseKey ? 'OK' : 'FALTA');

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan variables de Supabase. Revisa tu archivo .env');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});