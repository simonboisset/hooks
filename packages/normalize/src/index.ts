import { useCallback, useMemo, useState } from 'react';

export type NormalizeData<T extends { id: string }> = Record<string, T>;
export type PartialNormalizeEntity<T extends { id: string }> = Partial<T> & { id: string };

const removeEntity = <T extends { id: string }>(entities: NormalizeData<T>, id: string) => {
  const nextEntities = { ...entities };
  delete nextEntities[id];
  return nextEntities;
};

const useNormalize = <T extends { id: string }>() => {
  const [entities, setEntities] = useState<NormalizeData<T>>({});
  const values = useMemo(() => Object.values(entities), [entities]);

  const initialize = useCallback((entitiesToUpsert: T[]) => {
    let normalizeEntities: NormalizeData<T> = {};

    entitiesToUpsert.forEach((entity) => {
      normalizeEntities[entity.id] = entity;
    });
    setEntities(normalizeEntities);
  }, []);

  const setMany = useCallback((entitiesToUpsert: T[]) => {
    let normalizeEntities: NormalizeData<T> = {};

    entitiesToUpsert.forEach((entity) => {
      normalizeEntities[entity.id] = entity;
    });
    setEntities((prevEntities) => ({ ...prevEntities, ...normalizeEntities }));
  }, []);

  const set = useCallback((entity: T) => {
    setEntities((prevEntities) => ({ ...prevEntities, [entity.id]: entity }));
  }, []);

  const update = useCallback((entity: PartialNormalizeEntity<T>) => {
    setEntities((prevEntities) => ({ ...prevEntities, [entity.id]: { ...prevEntities[entity.id], ...entity } }));
  }, []);

  const remove = useCallback((id: string) => setEntities((prevEntities) => removeEntity(prevEntities, id)), []);
  const get = useCallback((id: string) => entities[id], [entities]);

  return [values, { entities, set, remove, setMany, initialize, update, get }] as [
    T[],
    NormallizeMethods<T> & { entities: NormalizeData<T> }
  ];
};

export default useNormalize;

export type NormalizeSet<T> = (entity: T) => void;
export type NormalizeRemove = (id: string) => void;
export type NormalizeGet = (id: string) => void;
export type NormalizeInitialize<T> = (entities: T[]) => void;
export type NormalizeSetMany<T> = (entities: T[]) => void;
export type NormallizeUpdate<T extends { id: string }> = (entity: PartialNormalizeEntity<T>) => void;
export type NormallizeMethods<T extends { id: string }> = {
  set: NormalizeSet<T>;
  remove: NormalizeRemove;
  setMany: NormalizeSetMany<T>;
  initialize: NormalizeInitialize<T>;
  update: NormallizeUpdate<T>;
  get: NormalizeGet;
};
