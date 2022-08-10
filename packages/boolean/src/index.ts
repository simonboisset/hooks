import { useCallback, useState } from 'react';

const useBoolean = (defaultValue?: boolean) => {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return [value, setTrue, setFalse, toggle, setValue] as const;
};

export default useBoolean;
