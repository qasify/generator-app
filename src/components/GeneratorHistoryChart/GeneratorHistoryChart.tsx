import React from 'react'
import { GeneratorHistoryChartProps } from './GeneratorHistoryChart.types'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const GeneratorHistoryChart: React.FC<React.HTMLAttributes<HTMLDivElement> & GeneratorHistoryChartProps> = ({ data, colors, className, ...props }) => {
    return (
        <div className={className} {...props}>
            <h3 className="text-lg font-semibold mb-2">Historical Data</h3>
            <Line
                data={{
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
                    datasets: [
                        {
                            label: 'Voltage (V)',
                            data: data.voltage,
                            fill: false,
                            borderColor: colors[0]??'#000',
                        },
                        {
                            label: 'Current (A)',
                            data: data.current,
                            fill: false,
                            borderColor: colors[1]??'#000',
                        },
                        {
                            label: 'Power (kW)',
                            data: data.power,
                            fill: false,
                            borderColor: colors[2]??'#000',
                        },
                        {
                            label: 'Apparent Power (kVA)',
                            data: data.apparentPower,
                            fill: false,
                            borderColor: colors[3]??'#000',
                        },
                        {
                            label: 'Frequency (Hz)',
                            data: data.frequency,
                            fill: false,
                            borderColor: colors[4]??'#000',
                        },
                    ],
                }}
            />
        </div>
    )
}

export default GeneratorHistoryChart