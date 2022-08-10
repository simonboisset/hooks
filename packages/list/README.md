# One hook : useList

React hook for list state.

# Instalation

```bash
yarn add @onehook/list
```

# Usage

```ts
import useList from '@onehook/list';

const [data, { entities, set, remove, setMany, initialize, update, get }] = useList<MyData>(initalValue);
```

## Methods

### get

Get entity value by id :

```ts
const item = get('my-id');
```

### set

Upsert entity value :

```ts
const user = {
  id: 'my-id',
  name: 'John',
  age: 26,
};
set(user);
```

### remove

Delete entity by id :

```ts
remove('my-id');
```

### setMany

Upsert multiple entities values :

```ts
const user1 = {
  id: 'my-id',
  name: 'John',
  age: 26,
};
const user2 = {
  id: 'id-2',
  name: 'Jane',
  age: 32,
};
setMany([user1, user2]);
```

### initialize

Set multiple entities values from an empty array :

```ts
const user1 = {
  id: 'my-id',
  name: 'John',
  age: 26,
};
const user2 = {
  id: 'id-2',
  name: 'Jane',
  age: 32,
};
initialize([user1, user2]);
```

### update

Update partial entity value. Only defined props will be updated

```ts
const user = {
  id: 'my-id',
  age: 29,
};
update(user);
```
