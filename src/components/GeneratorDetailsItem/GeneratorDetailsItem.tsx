import React from 'react'
import { GeneratorDetailsItemProps } from './GeneratorDetailsItem.types'

const GeneratorDetailsItem: React.FC<React.HTMLAttributes<HTMLDivElement> & GeneratorDetailsItemProps> = ({ label, values, unit, textColor='#000' }) => {
    return (
        <div className='flex flex-row justify-between items-center'>
            <h4 className="text-lg " style={{color:textColor}}>{label}</h4>
            <div className='flex flex-row items-center gap-4'>
                {
                    values.map((value, index) => (
                        <p key={index} className='w-12 text-center font-light text-gray-2-dark' >{unit? value.split(unit)[0]:value}</p>
                    ))
                }
                <p className='w-10 text-center' style={{color:textColor}}>{unit}</p>
            </div>
        </div>
    )
}

export default GeneratorDetailsItem