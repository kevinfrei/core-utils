import type { FTONData, FTONObject, FTONArray } from './index';

export function typecheck(x: any): FTONData {
  if (
    x === null ||
    typeof x === 'string' ||
    typeof x === 'number' ||
    typeof x === 'boolean'
  ) {
    return x;
  }

  if (x === undefined) {
    return null;
  }

  if (Array.isArray(x)) {
    return x.map(typecheck);
  }

  if (typeof x === 'object') {
    if (x instanceof Map || x instanceof Set) {
      return x;
    }
    const o: FTONObject = {};
    for (const k in x) {
      if (x.hasOwnProperty(k)) {
        o[k] = typecheck(x[k]);
      }
    }
    return o;
  }

  throw new Error('Invalid FTON');
}

type flattenedCustom = { dataType: 'Map' | 'Set'; dataValue: unknown[] };

function replacer(key: unknown, value: unknown): unknown | flattenedCustom {
  // @ts-ignore
  const originalObject: any = this[key];
  if (originalObject instanceof Map) {
    return {
      dataType: 'Map',
      dataValue: [...originalObject],
    };
  } else if (originalObject instanceof Set) {
    return {
      dataType: 'Set',
      dataValue: [...originalObject],
    };
  } else {
    return value;
  }
}

function reviver(key: unknown, value: unknown): unknown {
  if (typeof value !== 'object' || value === null || value === undefined)
    return value;
  if ('dataValue' in value && 'dataType' in value) {
    const filt = value as flattenedCustom;
    const val: unknown = filt.dataValue;
    if (!Array.isArray(val)) return value;
    if (!('dataType' in value)) return value;
    const type: string = filt.dataType as string;
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
