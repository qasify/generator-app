import React, { useCallback, useEffect, useState } from "react";
import { GeneratorData } from "../../types";
import { getGenerators } from "../../api/home";
import { useAuth } from "../../authentication/AuthProvider";
import GeneratorCard from "../../components/GeneratorCard";
import { Button } from "../../components";

const Home: React.FC = () => {
  const { authenticatedUser } = useAuth();
  const [generators, setGenerators] = useState<GeneratorData[]>([])

  const fetchGenerators = useCallback(async () => {
    if (authenticatedUser) {
      const response = await getGenerators(authenticatedUser)
      if (response) {
        setGenerators(response.generators)
      }
    }
  }, [])

  useEffect(() => {
    fetchGenerators()
  }, [])


  return (
    <div className="w-full flex flex-col items-center p-2 h-screen justify-self-center gap-6">
      <h1 className="text-3xl pt-6 shrink-0">Generators</h1>
      <div className="flex flex-col sm:flex-row sm:flex-wrap w-full gap-1 sm:gap-2 overflow-y-auto">
        {
          generators && generators.map((generator) => (
            <GeneratorCard key={generator.id} data={generator} />
          ))
        }
      </div>
      <Button className="h-12 w-full self-end ">
        Add Generator
      </Button>
    </div>
  );
};

export default Home;
