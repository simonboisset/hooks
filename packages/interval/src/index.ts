import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number | null) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setInterval(() => callbackRef.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
