import React, { useCallback, useEffect, useState } from "react";
import { GeneratorData } from "../../types";
import { useAuth } from "../../authentication/AuthProvider";
import GeneratorCard from "../../components/GeneratorCard";
import { Button } from "../../components";
import AddGeneratorModal from "../../components/AddGeneratorModal";
import { AddGenerator, getGenerators } from "../../api";

const Home: React.FC = () => {
  const { authenticatedUser } = useAuth();
  const [generators, setGenerators] = useState<GeneratorData[]>([])
  const [isAddModal, setIsAddModal] = useState(false);

  const fetchGenerators = useCallback(async () => {
    if (authenticatedUser) {
      const response = await getGenerators(authenticatedUser)
      if (response) {
        setGenerators(response.generators)
      }
    }
  }, [authenticatedUser])

  const handleAddClose = () => {
    setIsAddModal(false)
  }

  const handleAddConfirm = useCallback(async (name: string, code: string) => {
    if (authenticatedUser) {
      const response = await AddGenerator({ name: name, code: code, userId: authenticatedUser.userId, token: authenticatedUser.token })
      if (response) {
        setGenerators(response.generators)
        setIsAddModal(false)
      } else {
        return 'error'
      }
    }
  }, [authenticatedUser])

  useEffect(() => {
    fetchGenerators()
  }, [fetchGenerators])

  return (
    <div className="w-full flex flex-col items-center p-2 sm:px-12 sm:py-6 h-screen justify-self-center gap-2">
      <div className="py-6 pb-4 shrink-0 flex flex-row relative w-full justify-center">
        <h1 className="text-3xl">Generators</h1>
        <div className="hidden sm:flex absolute right-0">
          <Button onClick={() => setIsAddModal(true)}>
            Add Generator
          </Button>
        </div>

      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap w-full gap-1 sm:gap-2 overflow-y-auto">
        {
          generators && generators.map((generator) => (
            <GeneratorCard key={generator.id} data={generator} />
          ))
        }
      </div>
      <div className="self-end flex-1 flex items-end sm:hidden">
        <Button onClick={() => setIsAddModal(true)}>
          Add Generator
        </Button>
      </div>
      {isAddModal && <AddGeneratorModal isVisible={isAddModal} onCancel={handleAddClose} onClose={handleAddClose} onConfirm={handleAddConfirm} />}
    </div>
  );
};

export default Home;
