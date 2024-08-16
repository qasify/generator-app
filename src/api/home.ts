import { GeneratorStatus } from "../types/Generator";

interface UserToken {
  token: string;
  userId: string;
}

interface GetGeneratorResponse {
  generators: {
    id: string;
    name: string;
    status: GeneratorStatus;
    totalInstalledPower: string;
  }[];
}

interface NewGenerator extends UserToken {
  name: string;
  code: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AddGeneratorResponse {
  status: GeneratorStatus;
  token: string;
  userId: string;
}

export const getGenerators = async (
  user: UserToken
): Promise<GetGeneratorResponse | null | undefined> => {
  try {
    return GeneratorsData;
  } catch (error) {
    console.error("Error:", error);
    return;
  }
};

export const addGenerator = async (
  newGenerator: NewGenerator
): Promise<GetGeneratorResponse | null | undefined> => {
  try {
    GeneratorsData.generators.push({
      id: `generator_${GeneratorsData.generators.length+1}`,
      name: newGenerator.name,
      status: "Running/No Load",
      totalInstalledPower: `${Math.floor(Math.random() * 1000)} kW`,
    });
    return GeneratorsData;
  } catch (error) {
    console.error("Error:", error);
    return;
  }
};

export const GeneratorsData:GetGeneratorResponse = {
  generators: [
    {
      id: "generator_001",
      name: "Generator Alpha",
      status: "Running/Load",
      totalInstalledPower: "500 kW",
    },
    {
      id: "generator_002",
      name: "Generator Beta",
      status: "Running/No Load",
      totalInstalledPower: "750 kW",
    },
    {
      id: "generator_003",
      name: "Generator Gamma",
      status: "Stopped/Manual",
      totalInstalledPower: "600 kW",
    },
    {
      id: "generator_004",
      name: "Generator Delta",
      status: "Stopped/Fault",
      totalInstalledPower: "850 kW",
    },
    {
      id: "generator_005",
      name: "Generator Epsilon",
      status: "Running/Load",
      totalInstalledPower: "700 kW",
    },
    {
      id: "generator_006",
      name: "Generator Zeta",
      status: "Stopped/Stand-by",
      totalInstalledPower: "950 kW",
    },
    {
      id: "generator_007",
      name: "Generator Eta",
      status: "Running/No Load",
      totalInstalledPower: "800 kW",
    },
    {
      id: "generator_008",
      name: "Generator Theta",
      status: "Stopped/Fault",
      totalInstalledPower: "550 kW",
    },
    {
      id: "generator_009",
      name: "Generator Iota",
      status: "Running/Load",
      totalInstalledPower: "650 kW",
    },
  ],
};
