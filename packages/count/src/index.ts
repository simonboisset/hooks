import { useCallback, useState } from 'react';

type CountParams = {
  initialValue?: number;
  max?: number;
  min?: number;
  step?: number;
};

const useCount = (params?: CountParams) => {
  const [count, setCount] = useState(params?.initialValue || 0);

  const increment = useCallback(
    () =>
      setCount((prev) => {
        const nexValue = prev + (params?.step || 1);
        return params?.max && params?.max < nexValue ? params?.max : nexValue;
      }),
    [params?.step, params?.max]
  );

  const decrement = useCallback(
    () =>
      setCount((prev) => {
        const nexValue = prev - (params?.step || 1);
        return params?.min && params?.min > nexValue ? params?.min : nexValue;
      }),
    [params?.step, params?.min]
  );

  const reset = useCallback(() => setCount(params?.initialValue || 0), [params?.initialValue]);

  const canIncrement = !(params?.max && params?.max < count + (params?.step || 1));
  const canDecrement = !(params?.min && params?.min < count - (params?.step || 1));

  return { count, increment, decrement, reset, setCount, canIncrement, canDecrement };
};

export default useCount;
