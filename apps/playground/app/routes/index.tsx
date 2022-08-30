import {
  useBoolean,
  useCount,
  useDebounce,
  useInterval,
  useStorage,
  useUpdatedRef,
  useTimeout,
  useEvent,
  useDragAndDrop,
} from '@onehook/kit';
import { MutableRefObject, useRef } from 'react';

export default function Index() {
  const [open, { toggle, setFalse, setTrue }] = useBoolean();
  const [n, { decrement, increment }] = useCount({ initialValue: 1, max: 10, min: 0, step: 2 });
  const [name, setName] = useDebounce('', 500);
  const [city, setCity] = useStorage('city', '');
  const dataRef = useUpdatedRef(name);
  useInterval(increment, open ? 1000 : null);
  useEvent('customEvent', () => toggle());
  const ref = useRef<MutableRefObject<Element>>(null);
  // useIntersectionObserver(ref,()=>{})
  const { onMouseMove, onMouseUp, onMouseDown } = useDragAndDrop();
  const timeout = useTimeout();
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <div>
        {open ? 'True' : 'false'}
        <button onClick={setFalse}>False</button>
        <button onClick={setTrue}>True</button>
        <button onClick={toggle}>Toggle</button>
        <button onClick={() => timeout(toggle, 1000)}>Toggle timeout</button>
      </div>
      <div>
        {n}
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
      </div>
      <div>
        <input onChange={(e) => setName(e.target.value)} />
        <div>{name}</div>
        <div>{dataRef.current}</div>
      </div>
      <div>
        <input value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <div>
        <button
          onClick={() => {
            const evt = new Event('customEvent', { bubbles: true });
            document.dispatchEvent(evt);
          }}>
          Event for toggle
        </button>
      </div>
      <div
        style={{ position: 'absolute', height: 200, width: 200, backgroundColor: 'red' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseDown}
        onMouseEnter={onMouseUp}
      />
    </div>
  );
}
