export type GeneratorStatus = 
  | 'Running/Load'
  | 'Running/No Load'
  | 'Stopped/Manual'
  | 'Stopped/Fault'
  | 'Stopped/Stand-by';

export interface GeneratorData {
  id: string;
  name: string;
  status: GeneratorStatus
  totalInstalledPower: string;
}

export interface GeneratorDetail extends GeneratorData {
  parameters: GeneratorParameters;
  history: GeneratorHistory;
}

export interface GeneratorParameters {
  voltage: { V1: string; V2: string; V3: string };
  current: { I1: string; I2: string; I3: string };
  power: { P1: string; P2: string; P3: string };
  apparentPower: { kVA1: string; kVA2: string; kVA3: string };
  frequency: string;
}

export interface GeneratorHistory {
  voltage: number[];
  current: number[];
  power: number[];
  apparentPower: number[];
  frequency: number[];
}
