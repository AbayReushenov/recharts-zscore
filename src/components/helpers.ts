import { DataPoint } from './DataPoint';

export const calculateZScore = (data: DataPoint[], dataKey: string): DataPoint[]  => {
  const values: number[] = data
    .map((item: DataPoint) => item[dataKey])
    .filter((val): val is number =>
      val !== null &&
      val !== undefined &&
      typeof val === 'number'
    );

  const mean = values.reduce((sum: number, val: number) => sum + val, 0) / values.length;
  const variance = values.reduce((sum: number, val: number) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const standardDeviation = Math.sqrt(variance);

  return data.map((item: DataPoint) => ({
    ...item,
    [`${dataKey}_zscore`]: item[dataKey] !== null &&
                          item[dataKey] !== undefined &&
                          typeof item[dataKey] === 'number'
      ? ((item[dataKey] as number) - mean) / standardDeviation
      : 0,
    [`${dataKey}_isOutlier`]: item[dataKey] !== null &&
                              item[dataKey] !== undefined &&
                              typeof item[dataKey] === 'number'
      ? Math.abs(((item[dataKey] as number) - mean) / standardDeviation) > 1
      : false
  }));
};

export const formatter = (processedData: DataPoint[]) => {
  return (value: number, name: 'uv' | 'pv') => {
    // Найти соответствующую точку данных
    const dataPoint = processedData.find(d => d[name] === value);
    // Получить Z-score
    const zscore = dataPoint?.[`${name}_zscore`];

    // Форматируем строку в зависимости от значения Z-score
    const label = (typeof zscore === 'number' && Math.abs(zscore) > 1)
      ? `${name} (Z-score: ${zscore.toFixed(2)})`
      : `${name}`;

    return [value, label];
  };
};
