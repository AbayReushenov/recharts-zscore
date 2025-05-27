
export interface DataPoint {
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
