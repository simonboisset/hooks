import { useCallback, useMemo, useState } from 'react';

export type NormalizeData<T extends { id: string }> = Record<string, T>;
export type PartialEntity<T extends { id: string }> = Partial<T> & { id: string };

const removeEntity = <T extends { id: string }>(entities: NormalizeData<T>, id: string) => {
  const nextEntities = { ...entities };
  delete nextEntities[id];
  return nextEntities;
};

const normalizeData = <T extends { id: string }>(entities: T[]) => {
  let normalizeEntities: NormalizeData<T> = {};

  entities.forEach((entity) => {
    normalizeEntities[entity.id] = entity;
  });
  return normalizeEntities;
};

const useList = <T extends { id: string }>(initialValue?: T[]) => {
  const [entities, setEntities] = useState<NormalizeData<T>>(initialValue ? normalizeData(initialValue) : {});
  const values = useMemo(() => Object.values(entities), [entities]);

  const initialize = useCallback((entities: T[]) => {
    setEntities(normalizeData(entities));
  }, []);

  const setMany = useCallback((entitiesToUpsert: T[]) => {
    setEntities((prevEntities) => ({ ...prevEntities, ...normalizeData(entitiesToUpsert) }));
  }, []);

  const set = useCallback((entity: T) => {
    setEntities((prevEntities) => ({ ...prevEntities, [entity.id]: entity }));
  }, []);

  const update = useCallback((entity: PartialEntity<T>) => {
    setEntities((prevEntities) => ({ ...prevEntities, [entity.id]: { ...prevEntities[entity.id], ...entity } }));
  }, []);

  const remove = useCallback((id: string) => setEntities((prevEntities) => removeEntity(prevEntities, id)), []);
  const get = useCallback((id: string) => entities[id], [entities]);

  return [values, { entities, set, remove, setMany, initialize, update, get }] as [
    T[],
    ListMethods<T> & { entities: NormalizeData<T> }
  ];
};

export default useList;

export type Set<T> = (entity: T) => void;
export type Remove = (id: string) => void;
export type Get = (id: string) => void;
export type Initialize<T> = (entities: T[]) => void;
export type SetMany<T> = (entities: T[]) => void;
export type Update<T extends { id: string }> = (entity: PartialEntity<T>) => void;
export type ListMethods<T extends { id: string }> = {
  set: Set<T>;
  remove: Remove;
  setMany: SetMany<T>;
  initialize: Initialize<T>;
  update: Update<T>;
  get: Get;
};
