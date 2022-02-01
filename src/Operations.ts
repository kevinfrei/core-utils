import * as Type from './types.js';

export function ObjToMap(o: {
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

export function SetEqual<T>(s1: Set<T>, s2: Set<T>): boolean {
  if (s1.size !== s2.size) {
    return false;
  }
  for (const i of s1) {
    if (!s2.has(i)) {
      return false;
    }
  }
  return true;
}

export function ArraySetEqual<T>(a1: T[], a2: T[]): boolean {
  if (a1.length !== a2.length) {
    return false;
  }
  return SetEqual(new Set(a1), new Set(a2));
}

export function StringCaseInsensitiveEqual(s1?: string, s2?: string): boolean {
  if ((s1 && !s2) || (!s1 && s2)) {
    return false;
  }
  if (!s1 && !s2) {
    return s1 === s2;
  }
  return s1!.toLocaleUpperCase() === s2!.toLocaleUpperCase();
}

export function SetIntersection<T>(a: Set<T>, b: Iterable<T>): Set<T> {
  const res: Set<T> = new Set();
  for (const i of b) {
    if (a.has(i)) {
      res.add(i);
    }
  }
  return res;
}

export function ArrayIntersection<T>(a: T[], b: T[]): Set<T> {
  // set.has = O(log n)
  // so O(a log b)
  // so you want a to be smaller than b
  if (a.length > b.length) {
    return SetIntersection(new Set<T>(a), b);
  } else {
    return SetIntersection(new Set<T>(b), a);
  }
}

export function SetDifference<T>(a: Set<T>, b: Iterable<T>): Set<T> {
  // a - b
  const res = new Set<T>(a);
  for (const i of b) {
    res.delete(i);
  }
  return res;
}

export function ArrayEqual(x: unknown[], y: unknown[]): boolean {
  if (x.length !== y.length) return false;
  for (let i = 0; i < x.length; i++) {
    if (!ValEqual(x[i], y[i])) return false;
  }
  return true;
}

export function MapEqual(
  x: Map<unknown, unknown>,
  y: Map<unknown, unknown>,
): boolean {
  if (x.size !== y.size) return false;
  for (const [k, xv] of x) {
    const yv = y.get(k);
    if (!yv || !ValEqual(xv, yv)) return false;
  }
  return true;
}

export function SetValEqual(x: Set<unknown>, y: Set<unknown>): boolean {
  if (x.size !== y.size) return false;
  for (const xv of x) {
    // Value equality is super slow :(
    let equal = false;
    for (const yv of y) {
      if (ValEqual(xv, yv)) {
        equal = true;
        break;
      }
    }
    if (!equal) return false;
  }
  return true;
}

export function ObjEqual(
  a: { [key: string]: unknown },
  b: { [key: string]: unknown },
): boolean {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (const propName of aProps) {
    if (!ValEqual(a[propName], b[propName])) {
      return false;
    }
  }

  return true;
}

export function ValEqual(x: unknown, y: unknown): boolean {
  if (x === y) {
    return true;
  }
  if (Type.isArray(x)) {
    return Type.isArray(y) ? ArrayEqual(x, y) : false;
  }
  if (Type.isMap(x)) {
    return Type.isMap(y) ? MapEqual(x, y) : false;
  }
  if (Type.isSet(x)) {
    return Type.isSet(y) ? SetEqual(x, y) : false;
  }
  if (Type.isObjectNonNull(x)) {
    return Type.isObjectNonNull(y) ? ObjEqual(x, y) : false;
  }
  return false;
}
