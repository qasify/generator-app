import React, { useCallback, useEffect, useState } from "react";
import { GeneratorData } from "../../types";
import { useAuth } from "../../authentication/AuthProvider";
import GeneratorCard from "../../components/GeneratorCard";
import { Button } from "../../components";
import AddGeneratorModal from "../../components/AddGeneratorModal";
import { addGenerator, getGenerators } from "../../api";
import SearchBar from "../../components/SearchBar";

const Home: React.FC = () => {
  const { authenticatedUser } = useAuth();
  const [generators, setGenerators] = useState<GeneratorData[]>([])
  const [isAddModal, setIsAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
      const response = await addGenerator({ name: name, code: code, userId: authenticatedUser.userId, token: authenticatedUser.token })
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

  const filteredGenerators = generators.filter((gen) =>
    gen.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col items-center p-2 sm:px-12 sm:py-6 h-screen justify-self-center gap-0">
      <div className="py-6 pb-2 sm:pb-4 shrink-0 flex flex-col lg:flex-row relative w-full justify-center items-center gap-4">
        <h1 className="text-3xl">Generators</h1>
        <div className="flex xl:absolute right-0 gap-2 w-full lg:w-fit ">
          <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <Button onClick={() => setIsAddModal(true)} className="rounded-3xl shrink-0">
            Add Generator
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap w-full gap-1 sm:gap-2 overflow-y-auto ">
        {
          filteredGenerators && filteredGenerators.length? filteredGenerators.map((generator) => (
            <GeneratorCard key={generator.id} data={generator} />
          ))
          :
          <p className='font-light w-full text-center'>No generator found.</p>
        }
      </div>
      {isAddModal && <AddGeneratorModal isVisible={isAddModal} onCancel={handleAddClose} onClose={handleAddClose} onConfirm={handleAddConfirm} />}
    </div>
  );
};

export default Home;
