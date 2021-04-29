import type { FTONData, FTONMap, FTONObject } from './public-defs';
import * as Type from './types';

export function isFTON(x: unknown): x is FTONData {
  if (
    x === null ||
    x === undefined ||
    Type.isString(x) ||
    Type.isNumber(x) ||
    Type.isBoolean(x)
  )
    return true;
  if (Type.isArrayOf(x, isFTON)) return true;
  if (Type.isSetOf(x, isFTON)) return true;
  if (Type.isMapOf(x, Type.isNumberOrString, isFTON)) return true;
  if (Type.isObjectNonNull(x) && x.constructor.name === 'Object') {
    for (const i in x) {
      if (Type.isString(i) && Type.has(x, i)) {
        if (!isFTON(x[i])) return false;
      }
    }
    return true;
  }
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

function arrayEqual(x: FTONData[], y: FTONData[]): boolean {
  if (x.length !== y.length) return false;
  for (let i = 0; i < x.length; i++) {
    if (!valEqual(x[i], y[i])) return false;
  }
  return true;
}

function mapEqual(x: FTONMap, y: FTONMap): boolean {
  if (x.size !== y.size) return false;
  for (const [k, xv] of x) {
    const yv = y.get(k);
    if (!yv || !valEqual(xv, yv)) return false;
  }
  return true;
}

function setEqual(x: Set<FTONData>, y: Set<FTONData>): boolean {
  if (x.size !== y.size) return false;
  for (const xv of x) {
    // Value equality is super slow :(
    let equal = false;
    for (const yv of y) {
      if (valEqual(xv, yv)) {
        equal = true;
        break;
      }
    }
    if (!equal) return false;
  }
  return true;
}

function objEqual(a: FTONObject, b: FTONObject): boolean {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (const propName of aProps) {
    if (!valEqual(a[propName], b[propName])) {
      return false;
    }
  }

  return true;
}

export function valEqual(x: FTONData, y: FTONData): boolean {
  if (x === y) {
    return true;
  }
  if (Type.isArray(x)) {
    return Type.isArray(y) ? arrayEqual(x, y) : false;
  }
  if (Type.isMap(x)) {
    return Type.isMap(y) ? mapEqual(x, y) : false;
  }
  if (Type.isSet(x)) {
    return Type.isSet(y) ? setEqual(x, y) : false;
  }
  if (Type.isObjectNonNull(x)) {
    return Type.isObjectNonNull(y) ? objEqual(x, y) : false;
  }
  return false;
}

export function filter(x: unknown): FTONData {
  if (
    x === null ||
    x === undefined ||
    Type.isString(x) ||
    Type.isNumber(x) ||
    Type.isBoolean(x)
  )
    return x;
  if (Type.isRegex(x)) return null;
  if (Type.isArrayOf(x, isFTON)) return x;
  if (Type.isSetOf(x, isFTON)) return x;
  if (Type.isMapOf(x, Type.isString, isFTON)) return x;
  if (Type.isObjectOf(x, isFTON)) return x;
  if (Type.isArray(x)) {
    return x.map(filter);
  }
  if (Type.isSet(x)) {
    return new Set([...x].map(filter));
  }
  if (Type.isMap(x)) {
    return new Map(
      [...x].map((kvp: [key: unknown, val: unknown]) => [
        Type.isString(kvp[0]) ? kvp[0] : '?',
        filter(kvp[1]),
      ]),
    );
  }
  if (Type.isObjectNonNull(x) && x.constructor.name === 'Object') {
    const newObj: FTONObject = {};
    for (const i in x) {
      if (Type.isString(i) && Type.has(x, i)) {
        newObj[i] = filter(x[i]);
      }
    }
    return newObj;
  }
  return null;
}

type FlattenedCustom = {
  '@dataType': 'Map' | 'Set';
  '@dataValue': unknown[];
};

function replacer(
  this: any,
  key: string,
  value: unknown,
): unknown | FlattenedCustom {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const originalObject: unknown = this[key];
  if (Type.isMap(originalObject)) {
    return {
      '@dataType': 'Map',
      '@dataValue': [...originalObject],
    };
  } else if (Type.isSet(originalObject)) {
    return {
      '@dataType': 'Set',
      '@dataValue': [...originalObject],
    };
  } else if (!Type.isArray(originalObject) && Type.isIterable(originalObject)) {
    return [...originalObject];
  } else {
    return value;
  }
}

function isMapTuple(v: unknown): v is [FTONData, FTONData] {
  return Type.isArray(v) && v.length === 2 && isFTON(v[0]) && isFTON(v[1]);
}

function reviver(key: unknown, value: unknown): unknown {
  if (!Type.isObject(value)) {
    return value;
  }
  if (Type.has(value, '@dataValue') && Type.has(value, '@dataType')) {
    const filt = value;
    const val: unknown = filt['@dataValue'];
    if (!('@dataType' in value)) return value;
    const type: string = filt['@dataType'] as string;
    switch (type) {
      case 'Map':
        if (Type.isArrayOf<[FTONData, FTONData]>(val, isMapTuple)) {
          return new Map(val);
        }
        break;
      case 'Set':
        if (Type.isArrayOf<FTONData>(val, isFTON)) {
          return new Set(val);
        }
        break;
    }
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
  if (input && Type.isArray(input)) {
    return input.filter((elem) => typeof elem === 'string') as string[];
  }
}
