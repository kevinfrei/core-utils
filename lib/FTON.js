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
    let o = {};

    for (let k in x) {
      o[k] = typecheck(x[k]);
    }

    return o;
  }

  throw new Error('Invalid FTON');
};

const parse = input => {
  return typecheck(JSON.parse(input));
};

const stringify = input => {
  return JSON.stringify(input);
};

module.exports = {
  parse,
  stringify,
  typecheck
};
//# sourceMappingURL=FTON.js.map