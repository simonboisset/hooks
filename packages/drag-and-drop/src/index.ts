import { MouseEvent, useCallback, useRef } from 'react';

const useDragAndDrop = () => {
  const options = useRef({
    active: false,
    initialX: 0,
    x: 0,
    offsetX: 0,
    offsetY: 0,
    initialY: 0,
    y: 0,
    transform: 'translate3d(0px, 0px, 0)',
  });

  const onMouseDown = useCallback((e: MouseEvent) => {
    options.current.active = true;
    options.current.initialX = e.clientX;
    options.current.initialY = e.clientY;
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (options.current.active) {
      options.current.x = e.clientX - options.current.initialX + options.current.offsetX;
      options.current.y = e.clientY - options.current.initialY + options.current.offsetY;
      options.current.transform = `translate3d(${options.current.x}px, ${options.current.y}px, 0)`;
    }
  }, []);

  const onMouseUp = useCallback((e: MouseEvent) => {
    options.current.active = false;
    options.current.offsetX = e.clientX;
    options.current.offsetY = e.clientY;
  }, []);
  return { options, onMouseMove, onMouseDown, onMouseUp };
};

export default useDragAndDrop;
