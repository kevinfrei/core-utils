export type MultiMap<K, V> = {
  clear: () => void;
  size: () => number;
  delete: (key: K) => boolean;
  remove: (key: K, value: V) => boolean;
  forEach: (
    fn: (val: Set<V>, keyList: K, multiMap: MultiMap<K, V>) => void,
    thisArg?: any,
  ) => void;
  forEachAwaitable: (
    fn: (val: Set<V>, keyList: K, multiMap: MultiMap<K, V>) => Promise<void>,
    thisArg?: any,
  ) => Promise<void>;
  get: (key: K) => Set<V> | undefined;
  has: (key: K) => boolean;
  set: (key: K, val: V) => MultiMap<K, V>;
  add: (key: K, vals: Iterable<V>) => MultiMap<K, V>;
};

export function MakeMultiMap<K, V>(
  entries?: readonly (readonly [K, Iterable<V>])[],
): MultiMap<K, V> {
  const theMap = entries
    ? new Map<K, Set<V>>(entries.map(([k, iv]) => [k, new Set(iv)]))
    : new Map<K, Set<V>>();
  const clear = () => theMap.clear();
  const del = (key: K) => theMap.delete(key);
  const remove = (key: K, value: V): boolean => {
    const vals = get(key);
    if (vals !== undefined) {
      vals.delete(value);
      return vals.size === 0 ? theMap.delete(key) : true;
    }
    return false;
  };
  const forEach = (
    fn: (val: Set<V>, keyList: K, multimap: MultiMap<K, V>) => void,
    thisArg?: any,
  ): void => theMap.forEach((v, k) => fn(v, k, multiMap), thisArg);
  const forEachAwaitable = async (
    fn: (val: Set<V>, keyList: K, multimap: MultiMap<K, V>) => Promise<void>,
    thisArg?: any,
  ): Promise<void> => {
    for (const [k, v] of theMap) {
      if (thisArg) {
        await fn.apply(thisArg, [v, k, multiMap]);
      } else {
        await fn(v, k, multiMap);
      }
    }
  };
  const get = (key: K) => theMap.get(key);
  const has = (key: K) => theMap.has(key);
  function set(key: K, value: V): MultiMap<K, V> {
    const valueSet = theMap.get(key);
    if (valueSet === undefined) {
      theMap.set(key, new Set([value]));
    } else {
      valueSet.add(value);
    }
    return multiMap;
  }
  function add(key: K, values: Iterable<V>): MultiMap<K, V> {
    const valueSet = theMap.get(key);
    if (valueSet === undefined) {
      theMap.set(key, new Set(values));
    } else {
      for (const v of values) {
        valueSet.add(v);
      }
    }
    return multiMap;
  }
  const size = () => theMap.size;
  const multiMap = {
    clear,
    delete: del,
    remove,
    forEach,
    forEachAwaitable,
    get,
    has,
    set,
    add,
    size,
  };
  return multiMap;
}
