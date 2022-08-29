import { Reducer, useCallback, useReducer } from 'react';

type BooleanAction = 'false' | 'true' | 'toggle';

const booleanReducer: Reducer<boolean, BooleanAction> = (prevState, action) => {
  switch (action) {
    case 'toggle':
      return !prevState;
    case 'true':
      return true;
    default:
      return false;
  }
};

const useBoolean = (defaultValue = false) => {
  const [value, dispatch] = useReducer(booleanReducer, defaultValue);

  const setTrue = useCallback(() => dispatch('true'), []);
  const setFalse = useCallback(() => dispatch('false'), []);
  const toggle = useCallback(() => dispatch('toggle'), []);

  return [value, { setTrue, setFalse, toggle }] as const;
};

export default useBoolean;
