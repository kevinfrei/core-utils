export { FTON } from './FTON';
export { ObjUtil } from './object';
export { SeqNum } from './SeqNum';
export { Type } from './types';
export * as Operations from './Operations';
export * as Helpers from './Helpers';
export { Logger, MakeLogger, MakeError } from './logger';
export { ToPathSafeName, FromPathSafeName } from './translation';
export { Sleep, MakeSingleWaiter } from './Sync';

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
