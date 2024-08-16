import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../../authentication/AuthProvider';
import { GeneratorDetail } from '../../types/Generator';
import { getGenerator, getGeneratorDetails } from '../../api';
import GeneratorHistoryChart from '../../components/GeneratorHistoryChart/GeneratorHistoryChart';
import GeneratorDetailsItem from '../../components/GeneratorDetailsItem';
import { COLORS } from './utils/constants/colors';
import RadioButton from '../../components/RadioButton';

const Generator = () => {
    const { authenticatedUser } = useAuth();
    const { generatorId } = useParams();
    const navigate = useNavigate()
    const [generatorDetail, setGeneratorDetail] = useState<GeneratorDetail>()
    const [isRunning, setIsRunning] = useState(false);

    const handleRadioChange = (value: boolean) => {
        setIsRunning(value);
    };

    const handleBack = () => {
        navigate(-1)
    }

    const fetchGeneratorDetails = useCallback(async () => {
        if (authenticatedUser && generatorId) {
            const response = await getGeneratorDetails({ ...authenticatedUser, generatorId: generatorId })
            if (response) {
                const generatorData = await getGenerator({ ...authenticatedUser, generatorId: generatorId })
                if (generatorData) {
                    const details: GeneratorDetail = {
                        ...response,
                        ...generatorData
                    }
                    setGeneratorDetail(details)
                    setIsRunning(generatorData.status.split('/')[0] === 'Running' ? true : false)
                }
            }
        }
    }, [authenticatedUser, generatorId])

    useEffect(() => {
        fetchGeneratorDetails()
    }, [fetchGeneratorDetails]);


    if (!generatorDetail) return null;

    return (
        <div className="w-full flex flex-col items-center p-2 sm:px-12 sm:py-6 h-screen justify-self-center gap-2">
            <div className="py-6 pb-4 shrink-0 flex flex-row relative w-full justify-center items-center">
                <div className="absolute left-0 flex items-center gap-2 cursor-pointer" onClick={handleBack}>
                    <svg width={24} height={24}
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                            <path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
                        </g>
                    </svg>
                    <p className='hidden sm:block text-lg'>Home</p>
                </div>
                <h1 className="text-3xl">{generatorDetail.name}</h1>

            </div>

            <div className="flex flex-col gap-1 mb-4 w-full sm:w-4/5 md:w-3/4">
                <GeneratorDetailsItem label='Status' values={[generatorDetail.status]} unit=' '/>
                <GeneratorDetailsItem label='Total Installed Power' values={[generatorDetail.totalInstalledPower]} unit='kW'/>
            </div>

            <div className="flex space-x-4 w-full justify-center md:justify-end sm:w-4/5 md:w-3/4">
                <RadioButton
                    label="Off"
                    value="Off"
                    checked={!isRunning}
                    onChange={() => handleRadioChange(false)}
                />
                <RadioButton
                    label="On"
                    value="On"
                    checked={isRunning}
                    onChange={() => handleRadioChange(true)}
                />
            </div>

            <div className="flex flex-col gap-1 mb-4 w-full sm:w-4/5 md:w-3/4">
                <h3 className="text-lg font-semibold mb-2">Parameters Data</h3>
                <GeneratorDetailsItem label='Voltage' values={Object.values(generatorDetail.parameters.voltage)} unit='V' textColor={COLORS[0]} />
                <GeneratorDetailsItem label='Current' values={Object.values(generatorDetail.parameters.current)} unit='A' textColor={COLORS[1]} />
                <GeneratorDetailsItem label='Power' values={Object.values(generatorDetail.parameters.power)} unit='kW' textColor={COLORS[2]} />
                <GeneratorDetailsItem label='Apparent Power' values={Object.values(generatorDetail.parameters.apparentPower)} unit='kVA' textColor={COLORS[3]} />
                <GeneratorDetailsItem label='Frequency' values={[generatorDetail.parameters.frequency]} unit='Hz' textColor={COLORS[4]} />
            </div>

            <GeneratorHistoryChart data={generatorDetail.history} colors={COLORS} className='w-full sm:w-4/5 md:w-3/4' />
        </div>
    )
}

export default Generator