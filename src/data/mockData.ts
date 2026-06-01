export type Room = 'Bedroom' | 'Living room' | 'Favorites' | 'Terrace';

export type DeviceType = 'Light' | 'AC' | 'Fan' | 'Roof';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  room: Room;
  isOn: boolean;
  intensity?: number; // For lights (0-100) or Fan (0-4)
  temperature?: number; // For AC
  mode?: 'Cool' | 'Heat' | 'Fan'; // For AC
  rainDetection?: boolean; // For Roof
}

export const mockRooms: Room[] = ['Bedroom', 'Living room', 'Favorites', 'Terrace'];

export const mockDevices: Device[] = [
  // Bedroom
  { id: '1', name: 'Under Bed Light', type: 'Light', room: 'Bedroom', isOn: true, intensity: 80 },
  { id: '2', name: 'Table Light', type: 'Light', room: 'Bedroom', isOn: false, intensity: 0 },
  { id: '3', name: 'Light 2', type: 'Light', room: 'Bedroom', isOn: false, intensity: 0 },
  { id: '4', name: 'Ceiling Light', type: 'Light', room: 'Bedroom', isOn: true, intensity: 100 },
  { id: '5', name: 'AC', type: 'AC', room: 'Bedroom', isOn: true, temperature: 21, mode: 'Cool' },
  // Living room
  { id: '6', name: 'Main Lights', type: 'Light', room: 'Living room', isOn: true, intensity: 50 },
  { id: '7', name: 'TV Backlight', type: 'Light', room: 'Living room', isOn: false, intensity: 0 },
  { id: '8', name: 'Fan', type: 'Fan', room: 'Living room', isOn: true, intensity: 3 },
  // Terrace
  { id: '9', name: 'Roof Device', type: 'Roof', room: 'Terrace', isOn: false, rainDetection: true },
  { id: '10', name: 'Patio Lights', type: 'Light', room: 'Terrace', isOn: false, intensity: 0 },
];
