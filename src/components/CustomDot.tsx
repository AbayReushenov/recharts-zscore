import React from 'react';
import { DataPoint } from './DataPoint';
import {CIRCLE_RADIUS, STROKE_WIDTH,  COLOR } from './constants'

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload: DataPoint;
  dataKey: 'uv' | 'pv';
}

const CustomDot: React.FC<CustomDotProps> = ({ cx, cy, payload, dataKey }) => {
  const isOutlier = payload[`${dataKey}_isOutlier`] ?? false;
  const color = isOutlier ? COLOR.OUTLIER : dataKey === 'pv' ? COLOR.PV : COLOR.UV;

  return  isOutlier ? (
    <circle
      cx={cx}
      cy={cy}
      r={CIRCLE_RADIUS.CURRENT_DOT}
      fill={color}
      stroke={color}
      strokeWidth={STROKE_WIDTH.OUTLIER}
    />
  ) :
  (
    <circle
      cx={cx}
      cy={cy}
      r={CIRCLE_RADIUS.CURRENT_DOT}
      fill={COLOR.STROKE}
      stroke={color}
      strokeWidth={STROKE_WIDTH.CURRENT_DOT}
    />
  );
};


export default CustomDot;
