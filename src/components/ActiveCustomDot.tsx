import React from 'react';
import { DataPoint } from './DataPoint'
import { CIRCLE_RADIUS, COLOR, STROKE_WIDTH } from './constants'

interface ActiveCustomDotProps {
  cx?: number;
  cy?: number;
  payload: DataPoint;
  dataKey: 'uv' | 'pv';
  r?: number;
}

const ActiveCustomDot: React.FC<ActiveCustomDotProps> = ({ cx, cy, payload, dataKey, r = CIRCLE_RADIUS.ACTIVE_DOT }) => {
  const isOutlier = payload[`${dataKey}_isOutlier`] ?? false;
  const color = isOutlier ? COLOR.OUTLIER : dataKey === 'pv' ? COLOR.PV : COLOR.UV;

  return  isOutlier ? (
    <circle
      cx={cx}
      cy={cy}
      r={CIRCLE_RADIUS.OUTLIER}
      fill={color}
      stroke={COLOR.STROKE}
      strokeWidth={STROKE_WIDTH.ACTIVE_DOT}
    />
  ) :
  (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      stroke={COLOR.STROKE}
      strokeWidth={STROKE_WIDTH.ACTIVE_DOT}
    />
  );
};


export default ActiveCustomDot;
