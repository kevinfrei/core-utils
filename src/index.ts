/* eslint-disable @typescript-eslint/no-empty-interface */
import { MultiMap } from './multimap';

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
  | FTONArray
  | FTONMap
  | FTONMultiMap
  | FTONSet;
export type FTONSet = Set<FTONData>;
export type FTONMap = Map<string, FTONData>;
export type FTONObject = { [key: string]: FTONData };
export type FTONArray = FTONData[];
// Well this is really fun (and it's not even close to complete)
interface FTONMultiMap1 extends MultiMap<string, string> {}
interface FTONMultiMap2 extends MultiMap<string, number> {}
interface FTONMultiMap3 extends MultiMap<string, boolean> {}
interface FTONMultiMap4 extends MultiMap<string, FTONObject> {}
interface FTONMultiMap5 extends MultiMap<string, FTONArray> {}
interface FTONMultiMap6 extends MultiMap<string, FTONMap> {}
interface FTONMultiMap7 extends MultiMap<string, FTONMultiMap> {}
interface FTONMultiMap8 extends MultiMap<string, FTONSet> {}
interface FTONMultiMap9 extends MultiMap<string, FTONData> {}
export type FTONMultiMap =
  | FTONMultiMap1
  | FTONMultiMap2
  | FTONMultiMap3
  | FTONMultiMap4
  | FTONMultiMap5
  | FTONMultiMap6
  | FTONMultiMap7
  | FTONMultiMap8
  | FTONMultiMap9;
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
