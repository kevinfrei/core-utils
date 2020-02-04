//@flow
//@format

import type { FTONData, FTONObject, FTONArray } from './index';

const typecheck = (x: mixed): FTONData => {
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
    let o: FTONObject = {};
    for (let k in x) {
      o[k] = typecheck(x[k]);
    }
    return o;
  }

  throw new Error('Invalid FTON');
};

function replacer(key: mixed, value: mixed): mixed {
  const originalObject:mixed = this[key];
  if (originalObject instanceof Map) {
    return {
      dataType: 'Map',
      dataValue: [...originalObject]
    };
  } else if (originalObject instanceof Set) {
    return {
      dataType: 'Set',
      dataValue: [...originalObject]
    };
  } else {
    return value;
  }
}

function reviver(key: mixed, value: mixed): mixed {
  if (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('dataType') &&
    value.hasOwnProperty('dataValue')
  ) {
    const val: mixed = value.dataValue;
    if (Array.isArray(val)) {
      if (value.dataType === 'Map') {
        return new Map(val);
      } else if (value.dataType === 'Set') {
        return new Set(val);
      }
    }
  }
  return value;
}
const parse = (input: string): FTONData => {
  return typecheck(JSON.parse(input, reviver));
};

const stringify = (input: FTONData): string => {
  return JSON.stringify(input, replacer);
};

module.exports = {
  parse,
  stringify,
  typecheck
};
