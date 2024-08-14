import React from 'react'
import { GeneratorCardProps } from './GeneratorCard.types'

const GeneratorCard: React.FC<GeneratorCardProps> = ({ data }) => {

    const getColor = (status: string) => {
        switch (status) {
            case 'Running/Load':
                return 'bg-primary-light'
            case 'Running/No Load':
                return 'bg-orange-2'
            case 'Stopped/Manual':
                return 'bg-gray-3-light'
            case 'Stopped/Fault':
                return 'bg-error'
            case 'Stopped/Stand-by':
                return 'bg-orange-2'
        }
    }

    return (
        <div className='flex flex-row w-full md:w-96 h-20 shadow rounded-md py-3 px-6 items-center gap-6 cursor-pointer shrink-0 bg-white'>
            <div className={`${getColor(data.status)} w-4 h-4 rounded-full shadow shrink-0 blur-[1px]`} />
            <div className='flex flex-col w-full h-full'>
                <div className='flex flex-row justify-between'>
                    <h6 className='font-bold uppercase text-md'>{data.name}</h6>
                    <p className='font-light'>{data.totalInstalledPower}</p>
                </div>
                <p className='text-sm font-thin'>{data.status}</p>
            </div>
        </div>
    )
}

export default GeneratorCard