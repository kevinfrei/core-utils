import { FreikTypeTag, MultiMap, MultiMapTypeTag } from './definitions';
import * as Operations from './Operations';
import { RegisterForPickling } from './Pickle';
import * as Type from './types';

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
  const keys = () => theMap.keys();
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
  function* iterator(): Generator<[K, IterableIterator<V>]> {
    for (const [k, v] of theMap) {
      yield [k, v.values()];
    }
  }
  const size = () => theMap.size;
  function valueEqual(map: MultiMap<K, V>): boolean {
    if (size() !== map.size()) return false;
    for (const [key, xvs] of theMap) {
      const yvs = map.get(key);
      if (!yvs) return false;
      if (!Operations.SetEqual(new Set<V>(xvs), new Set<V>(yvs))) return false;
    }
    return true;
  }
  const multiMap: MultiMap<K, V> = {
    clear,
    delete: del,
    remove,
    keys,
    forEach,
    forEachAwaitable,
    get,
    has,
    set,
    add,
    size,
    [Symbol.iterator]: iterator,
    [FreikTypeTag]: MultiMapTypeTag,
    toJSON,
    valueEqual,
  };
  function toJSON(): [K, IterableIterator<V>][] {
    return [...multiMap];
  }
  return multiMap;
}

function fromJSON(obj: unknown): MultiMap<unknown, unknown> | undefined {
  // Do the type checkin
  if (
    Type.isArrayOf<[unknown, unknown[]]>(
      obj,
      (v: unknown): v is [unknown, unknown[]] =>
        Type.is2Tuple(v) && Type.isArray(v[1]),
    )
  ) {
    return MakeMultiMap(obj);
  }
}

RegisterForPickling(MultiMapTypeTag, fromJSON);
