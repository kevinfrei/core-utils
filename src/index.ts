export * as FTON from './FTON';
export * as ObjUtil from './object';
export { SeqNum } from './SeqNum';
export * as Type from './types';
export * as Comparisons from './Comparisons';
export { Logger } from './logger';

export type FTONData =
  | string
  | number
  | boolean
  | null
  | FTONObject
  | FTONData[]
  | Map<string | number, FTONData>
  | Set<FTONData>;
export type FTONObject = { [key: string]: FTONData };
// eslint-disable-next-line @typescript-eslint/naming-convention
export type typecheck<T> = (val: any) => val is T;

export type SeqNumGenerator = {
  (): string;
  keyCompare: (a: string, b: string) => number;
};
