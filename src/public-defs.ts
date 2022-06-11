export const FreikTypeTag = Symbol.for('freik.typetag');

export type SimpleObject =
  | undefined
  | string
  | number
  | boolean
  | null
  | { [key: string]: SimpleObject }
  | SimpleObject[];

export type SeqNumGenerator = {
  (): string;
  keyCompare: (a: string, b: string) => number;
};

export type Waiter = {
  wait: () => Promise<boolean>;
  leave: () => void;
  blocked: () => boolean;
  block: () => boolean;
};

export type ReaderWriter = {
  read: () => Promise<void>;
  write: () => Promise<void>;
  leaveRead: () => void;
  leaveWrite: () => void;
};

export type SyncFunc<T> = {
  (): Promise<T>;
  trigger: () => Promise<void>;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type typecheck<T> = (val: any) => val is T;

export type TypeCheckPair = [string, (val: unknown) => boolean];

export interface MultiMap<K, V> {
  clear: () => void;
  size: () => number;
  delete: (key: K) => boolean;
  remove: (key: K, value: V) => boolean;
  keys: () => IterableIterator<K>;
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
  valueEqual: (map: MultiMap<K, V>) => boolean;
  [Symbol.iterator](): IterableIterator<[K, IterableIterator<V>]>;
  [FreikTypeTag]: symbol;
  toJSON: () => [K, IterableIterator<V>][];
}

export interface Container<T> {
  push: (item: T, priority?: number) => void;
  pushMany: (items: Iterable<T>, priority?: number) => void;
  pop: () => T | undefined;
  size: () => number;
  peek: () => T | undefined;
  empty: () => boolean;
  [Symbol.iterator](): IterableIterator<T>;
}

// Shamelessly stolen from
// https://stackoverflow.com/questions/36836011/checking-validity-of-string-literal-union-type-at-runtime

// TypeScript will infer a string union type from the literal values passed to
// this function. Without `extends string`, it would instead generalize them
// to the common string type.

// TODO: make it work with my pickling framework, and other things...
export function StringUnion<UnionType extends string>(...values: UnionType[]) {
  Object.freeze(values);
  const valueSet = new Set<string>(values);

  function guard(value: string): value is UnionType {
    return valueSet.has(value);
  }

  function check(value: string): UnionType {
    if (!guard(value)) {
      const actual = JSON.stringify(value);
      const expected = values.map((s) => JSON.stringify(s)).join(' | ');
      throw new TypeError(
        `Value '${actual}' is not assignable to type '${expected}'.`,
      );
    }
    return value;
  }

  const unionNamespace = { guard, check, values };
  return Object.freeze(
    unionNamespace as typeof unionNamespace & { type: UnionType },
  );
}
