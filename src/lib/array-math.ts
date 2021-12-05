export const sum = (data: number[]): number => data.reduce((p, c) => p + c, 0);

export const mean = (data: number[]): number => sum(data) / data.length;

export const max = (data: number[]): number => {
  const value = data.reduce((p, c) => Math.max(p, c), -Infinity);
  return value === -Infinity ? NaN : value;
};

export const min = (data: number[]): number => {
  const value = data.reduce((p, c) => Math.min(p, c), Infinity);
  return value === Infinity ? NaN : value;
};

export const binaryOperator = (fn: Function) => (
  a: number[],
  b: number[]
): number[] => a.map((value, i) => fn(value, b[i]));

export const subtract = binaryOperator((a: number, b: number) => a - b);
export const add = binaryOperator((a: number, b: number) => a + b);

export const variance = (data: number[]): number => {
  const m = mean(data);

  const squareDiffs = data.map((value) => (value - m) ** 2);

  return mean(squareDiffs);
};

export const standardDeviation = (data: number[]): number => {
  return Math.sqrt(variance(data));
};
