import { useMemo } from 'react';

function generateRange(start: number, end: number) {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i.toString());
  }
  return range;
}

export function useRange(start: number, end: number) {
  const range = useMemo(() => generateRange(start, end), [start, end]);
  return range;
}
