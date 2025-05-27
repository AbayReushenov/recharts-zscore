import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
  uv_zscore?: number;
  pv_zscore?: number;
  uv_isOutlier?: boolean;
  pv_isOutlier?: boolean;
  [key: string]: number | boolean | string | undefined;
}

const calculateZScore = <K extends keyof DataPoint>(
  data: DataPoint[],
  key: K
): DataPoint[] => {
  const values = data.map(item => item[key])
    .filter((val): val is number => typeof val === 'number');

  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  return data.map(item => ({
    ...item,
    [`${key}_zscore`]: (item[key] as number - mean) / stdDev,
    [`${key}_isOutlier`]: Math.abs((item[key] as number - mean) / stdDev) > 1
  }));
};



const rawData: DataPoint[]  = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const ZScoreChart: React.FC = () => {
  const processedData = useMemo(() => {
    const withUV = calculateZScore(rawData, 'uv');
    return calculateZScore(withUV, 'pv');
  }, []);

  const createSegmentedData = <K extends 'uv' | 'pv'>(
    data: DataPoint[],
    key: K
  ) => {
    return {
      normal: data.map(item => ({
        ...item,
        [key]: item[`${key}_isOutlier`] ? null : item[key]
      })) as DataPoint[],
      outliers: data.map(item => ({
        ...item,
        [key]: item[`${key}_isOutlier`] ? item[key] : null
      })) as DataPoint[]
    };
  };

  const uvData = useMemo(() => createSegmentedData(processedData, 'uv'), [processedData]);
  const pvData = useMemo(() => createSegmentedData(processedData, 'pv'), [processedData]);

  const CustomDot: React.FC<{
    cx?: number;
    cy?: number;
    payload: DataPoint;
    dataKey: 'uv' | 'pv';
  }> = ({ cx, cy, payload, dataKey }) => {
    const isOutlier = payload[`${dataKey}_isOutlier`] ?? false;
    const color = isOutlier ? '#ff0000' : dataKey === 'uv' ? '#8884d8' : '#82ca9d';

    return (
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill={color}
        stroke={color}
        strokeWidth={2}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={processedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value: number, name: 'uv' | 'pv') => [
            value,
            `${name} (Z-score: ${processedData
              .find(d => d[name] === value)?.[`${name}_zscore`]?.toFixed(2)})`
          ]}
        />
        <Legend />

        <Line
          data={uvData.normal}
          dataKey="uv"
          stroke="#8884d8"
          dot={<CustomDot dataKey="uv" payload={{} as DataPoint} />}
        />
        <Line
          data={uvData.outliers}
          dataKey="uv"
          stroke="#ff0000"
          strokeWidth={2}
          dot={false}
        />

        <Line
          data={pvData.normal}
          dataKey="pv"
          stroke="#82ca9d"
          dot={<CustomDot dataKey="pv" payload={{} as DataPoint} />}
        />
        <Line
          data={pvData.outliers}
          dataKey="pv"
          stroke="#ff0000"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ZScoreChart;
