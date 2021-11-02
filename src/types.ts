import { MultiMapTypeTag } from './private-defs.js';
import {
  FreikTypeTag,
  MultiMap,
  SimpleObject,
  typecheck,
  TypeCheckPair,
} from './public-defs.js';

export function isUndefined(obj: unknown): obj is undefined {
  return obj === undefined;
}

export function isNull(obj: unknown): obj is null {
  return obj === null;
}

export function isObjectNonNull(
  obj: unknown,
): obj is { [key: string]: unknown } {
  return typeof obj === 'object' && !!obj;
}

export function isObject(
  obj: unknown,
): obj is { [key: string]: unknown } | null {
  return typeof obj === 'object';
}

export function isArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj);
}

export function is2Tuple(obj: unknown): obj is [unknown, unknown] {
  return Array.isArray(obj) && obj.length === 2;
}

export function is3Tuple(obj: unknown): obj is [unknown, unknown, unknown] {
  return Array.isArray(obj) && obj.length === 3;
}

export function isString(obj: unknown): obj is string {
  return typeof obj === 'string';
}

export function asString(obj: unknown, notStr: string): string {
  return isString(obj) ? obj : notStr;
}

export function isNumber(obj: unknown): obj is number {
  return typeof obj === 'number' && !isNaN(obj - 0);
}

export function asNumber(obj: unknown, notNum: number): number {
  return isNumber(obj) ? obj : notNum;
}

export function isNumberOrString(obj: unknown): obj is number | string {
  return isString(obj) || isNumber(obj);
}

export function asNumberOrString(
  obj: unknown,
  notNumOrStr: number | string,
): number | string {
  return isNumberOrString(obj) ? obj : notNumOrStr;
}

export function isBoolean(obj: unknown): obj is boolean {
  return typeof obj === 'boolean';
}

export function isDate(obj: unknown): obj is Date {
  return isObjectNonNull(obj) && obj instanceof Date;
}

export function isBigInt(obj: unknown): obj is BigInt {
  return typeof obj === 'bigint';
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(obj: unknown): obj is Function {
  return obj !== null && typeof obj === 'function';
}

export function isRegex(obj: unknown): obj is RegExp {
  return obj !== null && typeof obj === 'object' && obj instanceof RegExp;
}

export function isMap(obj: unknown): obj is Map<unknown, unknown> {
  return isObjectNonNull(obj) && obj instanceof Map;
}

export function isSet(obj: unknown): obj is Set<unknown> {
  return isObjectNonNull(obj) && obj instanceof Set;
}

export function isArrayOf<T>(obj: unknown, chk: typecheck<T>): obj is T[] {
  if (!isArray(obj)) return false;
  for (const t of obj) {
    if (!chk(t)) return false;
  }
  return true;
}

export function is2TupleOf<T, U>(
  obj: unknown,
  t: typecheck<T>,
  u: typecheck<U>,
): obj is [T, U] {
  return is2Tuple(obj) && t(obj[0]) && u(obj[1]);
}

export function is3TupleOf<T, U, V>(
  obj: unknown,
  t: typecheck<T>,
  u: typecheck<U>,
  v: typecheck<V>,
): obj is [T, U, V] {
  return is3Tuple(obj) && t(obj[0]) && u(obj[1]) && v(obj[2]);
}

export function isArrayOfString(obj: unknown): obj is string[] {
  return isArrayOf(obj, isString);
}

export function asArrayOfString(
  obj: unknown,
  defVal?: string[] | string,
): string[] {
  if (!isArray(obj)) {
    return isArray(defVal) ? defVal : [];
  }
  if (isArray(defVal)) {
    return isArrayOf(obj, isString) ? obj : defVal;
  } else {
    return defVal === null || defVal === undefined
      ? (obj.filter((val) => isString(val)) as string[])
      : obj.map((val) => asString(val, defVal));
  }
}

export function isMapOf<K, V>(
  obj: unknown,
  key: typecheck<K>,
  val: typecheck<V>,
): obj is Map<K, V> {
  if (!isMap(obj)) return false;

  for (const [k, v] of obj) {
    if (!key(k)) return false;
    if (!val(v)) return false;
  }
  return true;
}

export function isMapOfStrings(obj: unknown): obj is Map<string, string> {
  return isMapOf(obj, isString, isString);
}

export function isSetOf<T>(obj: unknown, chk: typecheck<T>): obj is Set<T> {
  if (!isSet(obj)) return false;
  for (const t of obj) {
    if (!chk(t)) return false;
  }
  return true;
}

export function isSetOfString(obj: unknown): obj is Set<string> {
  return isSetOf(obj, isString);
}

export function isObjectOf<T>(
  obj: unknown,
  chk: typecheck<T>,
): obj is { [key: string | symbol]: T } {
  if (!isObjectNonNull(obj)) return false;
  for (const k in obj) {
    if (has(obj, k)) {
      if (!chk(obj[k])) return false;
    }
  }
  for (const s of Object.getOwnPropertySymbols(obj)) {
    if (!chk(obj[s as unknown as string])) {
      return false;
    }
  }
  return true;
}

export function isObjectOfString(
  obj: unknown,
): obj is { [key: string]: string } {
  return (
    isObjectOf(obj, isString) && Object.getOwnPropertySymbols(obj).length === 0
  );
}

export function isPromise<T>(obj: unknown): obj is Promise<T> {
  return has(obj, 'then') && isFunction(obj.then);
}

export function isSymbol(x: unknown): x is symbol {
  return typeof x === 'symbol';
}

export function has<K extends string>(
  x: unknown,
  key: K,
  // eslint-disable-next-line no-shadow
): x is { [key in K]: unknown } {
  return isObjectNonNull(x) && key in x;
}

export function hasType<T, K extends string>(
  x: unknown,
  key: K,
  chcker: typecheck<T>,
  // eslint-disable-next-line no-shadow
): x is { [key in K]: T } {
  return has(x, key) && chcker(x[key]);
}

export function hasStr<K extends string>(
  x: unknown,
  key: K,
  // eslint-disable-next-line no-shadow
): x is { [key in K]: string } {
  return hasType(x, key, isString);
}

export function hasSymbol<S extends symbol>(
  x: unknown,
  sym: S,
  // eslint-disable-next-line no-shadow
): x is { [sym in S]: unknown } {
  return isObjectNonNull(x) && sym in x;
}

export function hasSymbolType<T, S extends symbol>(
  x: unknown,
  sym: S,
  checker: typecheck<T>,
  // eslint-disable-next-line no-shadow
): x is { [sym in S]: T } {
  return hasSymbol(x, sym) && checker(x[sym]);
}

export function isIterable<T>(
  x: unknown,
): x is { [Symbol.iterator]: () => IterableIterator<T> } {
  return hasSymbolType(x, Symbol.iterator, isFunction);
}

export function isSimpleObject(x: unknown): x is SimpleObject {
  return (
    x === null ||
    x === undefined ||
    isString(x) ||
    isNumber(x) ||
    isBoolean(x) ||
    isArrayOf(x, isSimpleObject) ||
    (isObjectNonNull(x) &&
      isArrayOfString(Object.keys(x)) &&
      isObjectOf(x, isSimpleObject))
  );
}

export function asSimpleObject(x: unknown): SimpleObject {
  if (
    x === null ||
    x === undefined ||
    isString(x) ||
    isNumber(x) ||
    isBoolean(x)
  ) {
    return x;
  }
  if (isArray(x)) {
    return x.filter((val) => isSimpleObject(val)) as SimpleObject;
  }
  if (isObjectNonNull(x)) {
    const res: SimpleObject = {};
    Object.keys(x).forEach((key) => {
      if (isString(key)) {
        res[key] = asSimpleObject(x[key]);
      }
    });
    return res;
  }
  return undefined;
}

export function isCustomType<T>(obj: unknown, sym: symbol): obj is T {
  return hasSymbol(obj, FreikTypeTag) && obj[FreikTypeTag] === sym;
}

export function isMultiMap(obj: unknown): obj is MultiMap<unknown, unknown> {
  return isCustomType<MultiMap<unknown, unknown>>(obj, MultiMapTypeTag);
}

export function isMultiMapOf<K, V>(
  obj: unknown,
  key: typecheck<K>,
  val: typecheck<V>,
): obj is MultiMap<K, V> {
  if (!isMultiMap(obj)) return false;
  for (const [k, vs] of obj) {
    if (!key(k)) return false;
    for (const v of vs) {
      if (!val(v)) return false;
    }
  }
  return true;
}

export function isSpecificType<T>(
  obj: unknown,
  checkers: Iterable<TypeCheckPair>,
  mandatory?: Iterable<string>,
): obj is T {
  if (!isObjectNonNull(obj)) {
    return false;
  }
  const req = isSet(mandatory)
    ? mandatory
    : new Set<string>(isUndefined(mandatory) ? [] : mandatory);
  let seen = req.size;
  const keyCheckers: Map<string, (val: unknown) => boolean> = isMap(checkers)
    ? (checkers as Map<string, (val: unknown) => boolean>)
    : new Map(checkers);
  for (const fieldName of Object.keys(obj)) {
    if (obj[fieldName] === undefined || obj[fieldName] === null) {
      delete obj[fieldName];
      continue;
    }
    const fieldTypeChecker = keyCheckers.get(fieldName);
    if (!fieldTypeChecker) {
      return false;
    }
    if (!fieldTypeChecker(obj[fieldName])) {
      return false;
    }
    if (seen > 0 && req.has(fieldName)) {
      seen--;
    }
  }
  return seen === 0;
}
/**
 * Remove any fields that are assigned to 'undefined' or null
 * @param {unknown} obj
 */
export function cleanseKeys(obj: unknown, leaveNulls?: boolean): void {
  if (!isObjectNonNull(obj)) {
    return;
  }
  for (const field of Object.keys(obj)) {
    if (
      has(obj, field) &&
      (obj[field] === undefined || (!leaveNulls && obj[field] === null))
    ) {
      delete obj[field];
    }
  }
}
