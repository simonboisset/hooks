import { useEffect, useRef, useState } from 'react';

const useDebounce = <T>(initialValue: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const timer = useRef<NodeJS.Timeout>();

  const setValue = (value: T) => {
    timer.current = setTimeout(() => setDebouncedValue(value), delay || 500);
  };

  useEffect(() => clearTimeout(timer.current), []);

  return [debouncedValue, setValue] as const;
};

export default useDebounce;
