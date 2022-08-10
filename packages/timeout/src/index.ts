import { useEffect, useRef } from 'react';

const useTimeout = () => {
  const timer = useRef<NodeJS.Timeout>();

  const triggerTimeout = (callback: () => void, delay?: number) => {
    timer.current = setTimeout(() => callback(), delay || 500);
  };

  useEffect(() => clearTimeout(timer.current), []);

  return triggerTimeout;
};

export default useTimeout;
