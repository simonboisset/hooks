import { Reducer, useCallback, useReducer } from 'react';

type CountParams = {
  initialValue?: number;
  max?: number;
  min?: number;
  step?: number;
};

type CountAction = { type: 'set'; value: number } | { type: 'increment' | 'decrement' | 'reset' };

const useCount = (params?: CountParams) => {
  const reducer: Reducer<number, CountAction> = useCallback((prevState, action) => {
    switch (action.type) {
      case 'set': {
        return action.value;
      }

      case 'increment': {
        const nexValue = prevState + (params?.step || 1);
        return params?.max !== undefined && params?.max < nexValue ? params?.max : nexValue;
      }

      case 'decrement': {
        const nexValue = prevState - (params?.step || 1);
        return params?.min !== undefined && params?.min > nexValue ? params?.min : nexValue;
      }

      case 'reset': {
        return params?.initialValue || 0;
      }

      default:
        return prevState;
    }
  }, []);
  const [count, dispatch] = useReducer(reducer, params?.initialValue || 0);

  const increment = useCallback(() => dispatch({ type: 'increment' }), []);
  const decrement = useCallback(() => dispatch({ type: 'decrement' }), []);
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);
  const setCount = useCallback((value: number) => dispatch({ type: 'set', value }), []);
  const canIncrement = !(params?.max && params?.max < count + (params?.step || 1));
  const canDecrement = !(params?.min && params?.min < count - (params?.step || 1));

  return [count, { increment, decrement, reset, setCount, canIncrement, canDecrement }] as const;
};

export default useCount;
