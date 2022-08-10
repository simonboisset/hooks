import { useCallback, useState } from 'react';

const useStorage = <T>(key: string, initialValue: T) => {
  const getValue = useCallback((): T => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.warn(`[getValue] Error localStorage key ${key}:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [value, setStoredValue] = useState<T>(getValue);

  const setValue = useCallback(
    (newValue: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
      } catch (error) {
        console.warn(`[setValue] Error localStorage key ${key}:`, error);
      }
    },
    [key]
  );

  return [value, setValue] as const;
};

export default useStorage;
