import { RefObject, useEffect, useRef } from 'react';

const useEvent = (
  eventName: string,
  handler: (event: Event) => void,
  element?: RefObject<HTMLElement>,
  options?: boolean | AddEventListenerOptions
) => {
  const handleRef = useRef(handler);
  handleRef.current = handler;

  useEffect(() => {
    const targetElement = element?.current || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }
    const eventListener: typeof handler = (event) => handleRef.current(event);
    targetElement.addEventListener(eventName, eventListener, options);
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, options]);
};

export default useEvent;
