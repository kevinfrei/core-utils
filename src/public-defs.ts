export const FreikTypeTag = Symbol.for('freik.typetag');

export type FTONData =
  | undefined
  | string
  | number
  | boolean
  | null
  | FTONObject
  | FTONArray
  | FTONMap
  | FTONSet;
export type FTONSet = Set<FTONData>;
export type FTONMap = Map<string, FTONData>;
export type FTONObject = { [key: string]: FTONData };
export type FTONArray = FTONData[];

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
