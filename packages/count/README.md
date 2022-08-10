# One hook : useCount

React hook for count state. Increment and decrement methods.

# Instalation

```bash
yarn add @onehook/count
```

# Usage

```ts
import useCount from '@onehook/count';

const { count, increment, decrement, reset, setCount, canIncrement, canDecrement } = useCount({
  initialValue: 2,
  max: 10,
  min: 0,
  step: 2,
});
```
