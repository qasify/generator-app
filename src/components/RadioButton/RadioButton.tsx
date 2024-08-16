import React, { } from 'react'
import { GeneratorControlButtonProps as RadioButtonProps } from './RadioButton.types'

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, checked, onChange }) => {

    return (
        <label className="flex gap-4 items-center cursor-pointer w-32 h-8 justify-center shadow rounded bg-white">
            <input
                type="radio"
                name={value}
                value={value}
                checked={checked}
                onChange={onChange}
                className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 hidden"
            />
            <div className={`${checked ? 'bg-primary-light' : 'bg-gray-3-light'} w-2 h-2 rounded-full shadow shrink-0 blur-[1px]`} />
            <span className={`${checked ? 'text-primary-light' : 'text-gray-3-light'} text-gray-700 uppercase font-bolder`}>{label}</span>
        </label>

    )
}

export default RadioButton