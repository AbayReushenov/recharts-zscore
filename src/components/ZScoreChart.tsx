import React, { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { calculateZScore, formatter } from './helpers'
import { data } from './data'
import CustomDot from './CustomDot'
import { DataPoint } from './DataPoint'
import ActiveCustomDot from './ActiveCustomDot';
import { CIRCLE_RADIUS, COLOR, DATA_KEY } from './constants'

const ZScoreChart: React.FC = () => {
    const processedData = useMemo(() => {
        const withUV = calculateZScore(data, DATA_KEY.UV)
        return calculateZScore(withUV, DATA_KEY.PV)
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
                <XAxis dataKey={DATA_KEY.NAME} />
                <YAxis />
                <Tooltip
                    formatter={formatter(processedData)}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey={DATA_KEY.PV}
                    stroke={COLOR.PV}
                    activeDot={<ActiveCustomDot r={CIRCLE_RADIUS.OUTLIER} dataKey="pv" payload={{} as DataPoint } />}
                    dot={<CustomDot dataKey="pv" payload={{} as DataPoint} /> }
                />
                <Line
                    type='monotone'
                    dataKey={DATA_KEY.UV}
                    stroke={COLOR.UV}
                    dot={<CustomDot dataKey="uv" payload={{} as DataPoint} />}
                    activeDot={<ActiveCustomDot dataKey="uv" payload={{} as DataPoint } />}

                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default ZScoreChart
