import React from 'react';
import { DataPoint } from './DataPoint';

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload: DataPoint;
  dataKey: 'uv' | 'pv';
}

const CustomDot: React.FC<CustomDotProps> = ({ cx, cy, payload, dataKey }) => {
  const isOutlier = payload[`${dataKey}_isOutlier`] ?? false;
  const color = isOutlier ? '#ff0000' : dataKey === 'pv' ? '#8884d8' : '#82ca9d';

  return  isOutlier ? (
    <circle
      cx={cx}
      cy={cy}
      r={3}
      fill={color}
      stroke={color}
      strokeWidth={2}
    />
  ) :
  (
    <circle
      cx={cx}
      cy={cy}
      r={3}
      fill={'#fff'}
      stroke={color}
      strokeWidth={1}
    />
  );
};


export default CustomDot;
