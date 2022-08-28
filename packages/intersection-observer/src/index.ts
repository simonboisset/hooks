import { MutableRefObject, useEffect, useRef } from 'react';

const useIntersectionObserver = (
  ref: MutableRefObject<Element>,
  callback: IntersectionObserverCallback,
  option?: IntersectionObserverInit
) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const optionRef = useRef(option);
  optionRef.current = option;

  useEffect(() => {
    const observer = new IntersectionObserver(callbackRef.current, optionRef.current);
    observer.observe(ref.current);
    return () => observer.unobserve(ref.current);
  }, []);
};

export default useIntersectionObserver;
