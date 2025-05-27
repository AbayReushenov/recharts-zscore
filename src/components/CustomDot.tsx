import React from 'react';
import { DataPoint } from './DataPoint';

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


export default CustomDot;
