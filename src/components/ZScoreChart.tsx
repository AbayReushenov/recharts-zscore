import React, { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { calculateZScore } from './helpers'
import { data } from './data'
import CustomDot from './CustomDot'
import { DataPoint } from './DataPoint'

const ZScoreChart: React.FC = () => {
    const processedData = useMemo(() => {
        const withUV = calculateZScore(data, 'uv')
        return calculateZScore(withUV, 'pv')
    }, [])

    return (
        <ResponsiveContainer width='100%' height={350}>
            <LineChart
                data={processedData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip
                    formatter={(value: number, name: 'uv' | 'pv') => [
                        value,
                        `${name} (Z-score: ${processedData
                            .find((d) => d[name] === value)
                            ?.[`${name}_zscore`]?.toFixed(2)})`,
                    ]}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    dot={<CustomDot dataKey="pv" payload={{} as DataPoint} /> }
                />
                <Line
                    type='monotone'
                    dataKey="uv"
                    stroke="#82ca9d"
                    dot={<CustomDot dataKey="uv" payload={{} as DataPoint} />}

                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default ZScoreChart
