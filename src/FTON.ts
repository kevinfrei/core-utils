import { FTONData, ObjUtil, Type } from './index';
import { has } from './object';
import {
  isArrayOf,
  isBoolean,
  isMapOf,
  isNumber,
  isObjectOf,
  isSetOf,
  isString,
} from './types';

export function isFTON(x: unknown): x is FTONData {
  if (x === null || isString(x) || isNumber(x) || isBoolean(x)) return true;
  if (isArrayOf(x, isFTON)) return true;
  if (isSetOf(x, isFTON)) return true;
  if (isMapOf(x, isString, isFTON)) return true;
  if (isObjectOf(x, isFTON)) return true;
  return false;
}

export function typecheck(x: unknown): FTONData {
  if (isFTON(x)) {
    return x;
  } else {
    throw new Error('Invalid FTON');
  }
}

export function asFTON(x: unknown): FTONData | void {
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
  if (has('@dataValue', value) && has('@dataType', value)) {
    const filt = value;
    const val: unknown = filt['@dataValue'];
    if (!Array.isArray(val)) return value;
    if (!('@dataType' in value)) return value;
    const type: string = filt['@dataType'] as string;
    if (type === 'Map') return new Map(val);
    if (type === 'Set') return new Set(val);
  }
  return value;
}

export function parse(input: string): FTONData {
  return typecheck(JSON.parse(input, reviver));
}

export function stringify(input: FTONData): string {
  return JSON.stringify(input, replacer);
}

export function arrayOfStrings(input: FTONData): string[] | void {
  if (input && Array.isArray(input)) {
    return input.filter((elem) => typeof elem === 'string') as string[];
  }
}
