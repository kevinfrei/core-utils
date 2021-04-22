export * as FTON from './FTON';
export * as Helpers from './Helpers';
export * from './logger';
export * from './multimap';
export * as ObjUtil from './object';
export * as Operations from './Operations';
export * from './SeqNum';
export * from './Sync';
export * from './translation';
export * as Type from './types';

export type FTONData =
  | undefined
  | string
  | number
  | boolean
  | null
  | FTONObject
  | FTONData[]
  | FTONMap
  | Set<FTONData>;
export type FTONMap = Map<string | number, FTONData>;
export type FTONObject = { [key: string]: FTONData };
// eslint-disable-next-line @typescript-eslint/naming-convention
export type typecheck<T> = (val: any) => val is T;

export type SeqNumGenerator = {
  (): string;
  keyCompare: (a: string, b: string) => number;
};

export type Waiter = {
  wait: () => Promise<boolean>;
  leave: () => void;
};
