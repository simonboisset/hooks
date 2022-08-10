# One hook : useTimeout

React hook for timeout trigger.

# Instalation

```bash
yarn add @onehook/timeout
```

# Usage

```ts
import useTimeout from '@onehook/timeout';

const trigger = useTimeout();

const handleClick = () => {
  trigger(() => {
    console.log('Timeout');
  }, 500);
};
```
