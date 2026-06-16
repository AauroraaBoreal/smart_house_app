export type Room = 'Sala' | 'Terraza';

export type DeviceType = 'Light' | 'AC' | 'Fan' | 'Roof';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  room: Room;
  isOn: boolean;
  intensity?: number;
  temperature?: number;
  mode?: 'Cool' | 'Heat' | 'Fan';
  roofState?: 'OPEN' | 'CLOSED';
  rainDetection?: boolean;
  automationEnabled?: boolean;
}

export const mockRooms: Room[] = ['Sala', 'Terraza'];