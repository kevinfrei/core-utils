//@format
const typecheck = x => {
  if (x === null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean') {
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

    let o = {};

    for (let k in x) {
      o[k] = typecheck(x[k]);
    }

    return o;
  }

  throw new Error('Invalid FTON');
};

function replacer(key, value) {
  const originalObject = this[key];

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

function reviver(key, value) {
  if (typeof value === 'object' && value !== null && value.hasOwnProperty('dataType') && value.hasOwnProperty('dataValue')) {
    const val = value.dataValue;

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

const parse = input => {
  return typecheck(JSON.parse(input, reviver));
};

const stringify = input => {
  return JSON.stringify(input, replacer);
};

const arrayOfStrings = input => {
  if (input && Array.isArray(input)) {
    return input.filter(elem => typeof elem === 'string');
  }
};

module.exports = {
  parse,
  stringify,
  typecheck,
  arrayOfStrings
};
//# sourceMappingURL=FTON.js.map