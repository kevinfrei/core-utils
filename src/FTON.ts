import type { FTONData } from './index';
import { Type, ObjUtil } from './index';

function isFTON(x: unknown): x is FTONData {
  if (x === null || Type.isString(x) || Type.isNumber(x) || Type.isBoolean(x))
    return true;
  if (Type.isArrayOf(x, isFTON)) return true;
  if (Type.isSetOf(x, isFTON)) return true;
  if (Type.isMapOf(x, Type.isString, isFTON)) return true;
  if (Type.isObjectOf(x, isFTON)) return true;
  return false;
}

function typecheck(x: unknown): FTONData {
  if (isFTON(x)) {
    return x;
  } else {
    throw new Error('Invalid FTON');
  }
}

function asFTON(x: unknown): FTONData | void {
  if (isFTON(x)) return x;
}

type FlattenedCustom = { '@dataType': 'Map' | 'Set'; '@dataValue': unknown[] };

function replacer(
  this: any,
  key: string,
  value: unknown,
): unknown | FlattenedCustom {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const originalObject: unknown = this[key];
  if (originalObject instanceof Map) {
    return {
      '@dataType': 'Map',
      '@dataValue': [...originalObject],
    };
  } else if (originalObject instanceof Set) {
    return {
      '@dataType': 'Set',
      '@dataValue': [...originalObject],
    };
  } else {
    return value;
  }
}

function reviver(key: unknown, value: unknown): unknown {
  if (!Type.isObject(value)) {
    return value;
  }
  if (ObjUtil.has('@dataValue', value) && ObjUtil.has('@dataType', value)) {
    const filt = value;
    const val: unknown = filt['@dataValue'];
    if (!('@dataType' in value)) return value;
    const isMapTuple = (v: unknown): v is [FTONData, FTONData] => {
      return Type.isArray(v) && v.length === 2 && isFTON(v[0]) && isFTON(v[1]);
    };
    if (!Type.isArrayOf<[FTONData, FTONData]>(val, isMapTuple)) return value;
    const type: string = filt['@dataType'] as string;
    if (type === 'Map') return new Map(val);
    if (type === 'Set') return new Set(val);
  }
  return value;
}

function parse(input: string): FTONData {
  return typecheck(JSON.parse(input, reviver));
}

function stringify(input: FTONData): string {
  return JSON.stringify(input, replacer);
}

function arrayOfStrings(input: FTONData): string[] | void {
  if (input && Type.isArray(input)) {
    return input.filter((elem) => typeof elem === 'string') as string[];
  }
}

export const FTON = {
  isFTON,
  typecheck,
  asFTON,
  parse,
  stringify,
  arrayOfStrings,
};
