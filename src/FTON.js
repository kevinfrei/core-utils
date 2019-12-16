//@flow
//@format

import type { FTONData, FTONObject, FTONArray } from './index';

const typecheck = (x: mixed): FTONData => {
  if (x === null ||
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
    let o: FTONObject = {};
    for (let k of x) {
      o[k] = typecheck(x[k]);
    }
    return o;
  }

  throw new Error('Invalid FTON');
};

const parse = (input: string): FTONData => {
  return typecheck(JSON.parse(input));
};

const stringify = (input: FTONData): string => {
  return JSON.stringify(input);
};

module.exports = {
  parse,
  stringify,
  typecheck
};
