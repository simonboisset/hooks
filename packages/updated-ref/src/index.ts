import { useEffect, useRef } from 'react';

const useUpdatedRef = <T>(params: T) => {
  const value = useRef(params);

  useEffect(() => {
    value.current = params;
  }, [params]);

  return value;
};

export default useUpdatedRef;
