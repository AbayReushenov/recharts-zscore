import React, { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { calculateZScore, createSegmentedData } from './helpers'
import { data } from './data'
import CustomDot from './CustomDot'
import { DataPoint } from './DataPoint'

const ZScoreChart: React.FC = () => {
    const processedData = useMemo(() => {
        const withUV = calculateZScore(data, 'uv')
        return calculateZScore(withUV, 'pv')
    }, [])

    const uvData = useMemo(() => createSegmentedData(processedData, 'uv'), [processedData])
    const pvData = useMemo(() => createSegmentedData(processedData, 'pv'), [processedData])

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
                  type='monotone'
                  // data={uvData.normal}
                  dataKey="uv"
                  stroke="#8884d8"
                  dot={<CustomDot dataKey="uv" payload={{} as DataPoint} />}
                />
                <Line
                  type="monotone"
                  // data={uvData.outliers}
                  dataKey="uv"
                  // stroke="#ff0000"
                  strokeWidth={2}
                  dot={false}
                />

                <Line
                  type="monotone"
                  // data={pvData.normal}
                  dataKey="pv"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                  dot={<CustomDot dataKey="pv" payload={{} as DataPoint} />}
                />
                <Line
                  type="monotone"
                  // data={pvData.outliers}
                  dataKey="pv"
                  // stroke="#ff0000"
                  strokeWidth={2}
                  dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default ZScoreChart
