import { GeneratorData } from "../types";
import { GeneratorsData } from "./home";

interface GeneratorRequestData {
  token: string;
  userId: string;
  generatorId: string;
}

interface GeneratorResponse {
  id: string;
  name: string;
  parameters: {
    voltage: { V1: string; V2: string; V3: string };
    current: { I1: string; I2: string; I3: string };
    power: { P1: string; P2: string; P3: string };
    apparentPower: { kVA1: string; kVA2: string; kVA3: string };
    frequency: string;
  };
  history: {
    voltage: number[];
    current: number[];
    power: number[];
    apparentPower: number[];
    frequency: number[];
  };
}

export const getGeneratorDetails = async (
  generatorRequestData: GeneratorRequestData
): Promise<GeneratorResponse | null | undefined> => {
  try {
    return generatorDetail;
  } catch (error) {
    console.error("Error:", error);
    return;
  }
};

export const getGenerator = async (
  generatorRequestData: GeneratorRequestData
): Promise<GeneratorData | null | undefined> => {
  try {
    return GeneratorsData.generators.find(
      (item) => item.id === generatorRequestData.generatorId
    );
  } catch (error) {
    console.error("Error:", error);
    return;
  }
};

const generatorDetail: GeneratorResponse = {
  id: "generator_001",
  name: "Generator Alpha",
  parameters: {
    voltage: { V1: "230V", V2: "220V", V3: "240V" },
    current: { I1: "50A", I2: "45A", I3: "50A" },
    power: { P1: "150kW", P2: "152kW", P3: "155kW" },
    apparentPower: { kVA1: "200kVA", kVA2: "199kVA", kVA3: "201kVA" },
    frequency: "56Hz",
  },
  history: {
    voltage: [230, 240, 220, 235, 250, 215, 230, 245, 225, 255, 220, 235, 245, 230, 240],
    current: [50, 60, 45, 55, 65, 40, 50, 58, 48, 62, 45, 55, 58, 50, 60],
    power: [150, 165, 140, 160, 170, 135, 150, 168, 142, 175, 138, 160, 165, 150, 165],
    apparentPower: [200, 220, 180, 210, 230, 175, 200, 225, 185, 235, 180, 210, 220, 200, 215],
    frequency: [50, 51, 49, 52, 48, 53, 50, 52, 49, 51, 50, 53, 49, 50, 52],
  },
};
