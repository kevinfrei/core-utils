import * as Type from './types.js';

export function prefixObj(
  str: string,
  obj: { [key: string]: string },
): string[] {
  const res: string[] = [];
  for (const elem of Object.keys(obj)) {
    res.push(str + elem);
    if (obj[elem] !== null) {
      res.push(obj[elem]);
    }
  }
  return res;
}

export function has<K extends string>(
  key: K,
  x: unknown,
  // eslint-disable-next-line no-shadow
): x is { [key in K]: unknown } {
  return Type.isObjectNonNull(x) && key in x;
}

// eslint-disable-next-line no-shadow
export function hasStr<K extends string>(
  key: K,
  x: unknown,
  // eslint-disable-next-line no-shadow
): x is { [key in K]: string } {
  return Type.isObjectNonNull(x) && has(key, x) && Type.isString(x[key]);
}

export function objToMap(o: {
  [key: string]: string | number;
}): Map<string, string> {
  const res = new Map<string, string>();
  for (const i in o) {
    if (Type.isString(i) && i.length > 0 && i[0] !== '@' && i in o) {
      if (Type.isString(o[i]) || Type.isNumber(o[i])) {
        res.set(i, o[i].toString());
      }
    }
  }
  return res;
}

export function arrayEqual(x: unknown[], y: unknown[]): boolean {
  if (x.length !== y.length) return false;
  for (let i = 0; i < x.length; i++) {
    if (!valEqual(x[i], y[i])) return false;
  }
  return true;
}

export function mapEqual(
  x: Map<unknown, unknown>,
  y: Map<unknown, unknown>,
): boolean {
  if (x.size !== y.size) return false;
  for (const [k, xv] of x) {
    const yv = y.get(k);
    if (!yv || !valEqual(xv, yv)) return false;
  }
  return true;
}

export function setEqual(x: Set<unknown>, y: Set<unknown>): boolean {
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

export function objEqual(
  a: { [key: string]: unknown },
  b: { [key: string]: unknown },
): boolean {
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

export function valEqual(x: unknown, y: unknown): boolean {
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
