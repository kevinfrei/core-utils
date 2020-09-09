export * as FTON from './FTON';
export * as ObjUtil from './object';
export { SeqNum } from './SeqNum';
export * as Comparisons from './Comparisons';
export { Log as Logger } from './logger';

export type FTONData =
  | string
  | number
  | boolean
  | null
  | FTONObject
  | FTONArray
  | Map<string | number, FTONData>
  | Set<FTONData>;
export type FTONObject = { [key: string]: FTONData };
export type FTONArray = FTONData[];

export type SeqNumGenerator = {
  (): string;
  keyCompare: (a: string, b: string) => number;
};
