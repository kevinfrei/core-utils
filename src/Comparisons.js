// @flow

export function SetEqual<T>(s1: Set<T>, s2: Set<T>): boolean {
  if (s1.size !== s2.size) {
    return false;
  }
  for (let i of s1) {
    if (!s2.has(i)) {
      return false;
    }
  }
  return true;
}

export function ArraySetEqual<T>(a1: Array<T>, a2: Array<T>): boolean {
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
