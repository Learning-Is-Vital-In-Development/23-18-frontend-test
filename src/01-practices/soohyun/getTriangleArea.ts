export const getTriangleArea = (a: number, b: number, c: number) => {
  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error('삼각형이 아닙니다. 변의 길이는 양수여야 합니다.');
  }

  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('삼각형이 아닙니다. 삼각 부등식을 만족하지 않습니다.');
  }
  const s = (a + b + c) / 2;
  const result = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  return Number(result.toFixed(2));
};
