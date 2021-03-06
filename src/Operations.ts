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

export function ArraySetEqual<T>(a1?: T[], a2?: T[]): boolean {
  if ((a1 === undefined && a2 === undefined) || (a1 === null && a2 === null)) {
    return true;
  }
  if (!a1 || !a2) {
    return false;
  }
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
