/**
 * A set of type checking helpers mostly for TypeScript, but
 * super helper for normal JavaScript if you don't hate yourself, too.
 *
 * @module Type
 *
 */
import { MultiMapTypeTag } from './private-defs.js';
import {
  FreikTypeTag,
  MultiMap,
  SimpleObject,
  SpecificCheckPair,
  boolcheck,
  typecheck,
} from './public-defs.js';

export function enumKeys<O extends object, K extends keyof O = keyof O>(
  obj: O,
): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

/**
 * Check if an object is one of two types
 * @param obj {unknown} The object to check
 * @param chk1 {typecheck<T>} One type to check
 * @param chk2 {typecheck<U>} Another type to check
 * @returns {obj_is<T|U>}
 */
export function isOneOf<T, U>(
  obj: unknown,
  chk1: typecheck<T>,
  chk2: typecheck<U>,
): obj is T | U {
  return chk1(obj) || chk2(obj);
}

/**
 * Generate a typecheck function to check if an object is one of two types
 * @param chk1 {typecheck<T>} One type to check
 * @param chk2 {typecheck<U>} Another type to check
 * @returns {typecheck<T|U>}
 */
export function isOneOfFn<T, U>(
  chk1: typecheck<T>,
  chk2: typecheck<U>,
): typecheck<T | U> {
  return (obj: unknown): obj is T | U => isOneOf(obj, chk1, chk2);
}

/** Type check for undefined */
export function isUndefined(obj: unknown): obj is undefined {
  return obj === undefined;
}

/** Type check for null */
export function isNull(obj: unknown): obj is null {
  return obj === null;
}

/** Type check for a non-null object */
export function isObjectNonNull(
  obj: unknown,
): obj is { [key: string]: unknown } {
  return typeof obj === 'object' && !!obj;
}

/**
 * Type check for object (or null)
 *
 * @param {unknown} obj
 * @returns {obj_is<Object|null>} True if obj is null, or an object (of any type)
 */
export function isObject(
  obj: unknown,
): obj is { [key: string]: unknown } | null {
  return typeof obj === 'object';
}

/**
 * Type check for array
 *
 * @param obj {unknown}
 * @returns {obj_is<unknown[]>} True if obj is an array (of any type)
 */
export function isArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj);
}

/**
 * Type check for 2 element tuples
 *
 * @param obj {unknown}
 * @returns {obj_is<Tuple<unknown, unknown>>} True of obj is a 2 element tuple (of any type)
 */
export function is2Tuple(obj: unknown): obj is [unknown, unknown] {
  return Array.isArray(obj) && obj.length === 2;
}

/**
 * Type check for 3 element tuples
 *
 * @param obj {unknown}
 * @returns {obj_is<Tuple<unknown, unknown, unknown>>} True of obj is a 2 element tuple (of any type)
 */
export function is3Tuple(obj: unknown): obj is [unknown, unknown, unknown] {
  return Array.isArray(obj) && obj.length === 3;
}

/**
 * Type check for a string
 *
 * @param obj {unknown}
 * @returns {obj_is<string>} True if obj is a string
 */
export function isString(obj: unknown): obj is string {
  return typeof obj === 'string';
}
/**
 * Type filtering for strings. Will NOT coerce the thing to a string..
 *
 * @param  {unknown} obj
 * @param  {string} [notStr = ''] - the value to return if obj is not a string
 * @returns {string} either obj or notStr (whichever is a string)
 */
export function asString(obj: unknown, notStr = ''): string {
  return isString(obj) ? obj : notStr;
}

/**
 * Type coercion to a string. Will try to *lightly* coerce the thing to a string if possible.
 *
 * @param  {unknown} obj
 * @param  {string} [notStr = ''] - the value to return if obj is not a string
 * @returns {string} either obj, obj.toString(), or notStr
 */
export function toString(obj: unknown, notStr = ''): string {
  if (isString(obj)) {
    return obj;
  }
  if (isNumber(obj) || isDate(obj) || isBoolean(obj) || isBigInt(obj)) {
    try {
      const val = '' + (obj as any as string);
      if (isString(val)) {
        return val;
      }
    } catch (e) {}
  }
  if (hasType(obj, 'toString', isFunction)) {
    try {
      const res: unknown = obj.toString();
      // A bit of a hack...
      if (isString(res) && res !== '[object Object]') {
        return res;
      }
    } catch (e) {}
  }
  return notStr;
}

/**
 * Type check for number (and not NaN)
 *
 * @param  {unknown} obj
 * @returns {obj_is<number>} obj is a number and NOT a NaN
 */
export function isNumber(obj: unknown): obj is number {
  return typeof obj === 'number' && !isNaN(obj - 0);
}
/**
 * If obj is a number (and not a NaN!) return that value, otherwise, return notNum
 * @param  {unknown} obj
 * @param  {number} notNum
 * @returns {number} obj, if it's a number, otherwise returns nonNum
 */
export function asNumber(obj: unknown, notNum: number): number {
  return isNumber(obj) ? obj : notNum;
}
/**
 * Type check for number (and not NaN) or a string
 *
 * @param  {unknown} obj
 * @returns {obj_is<number|string>} True if obj is a number and NOT a NaN, or a string
 */
export const isNumberOrString: typecheck<number | string> = isOneOfFn(
  isString,
  isNumber,
);

/**
 * If obj is a number (and not NaN) or a string, return that values, otherwise return notNumOrStr
 * @param  {unknown} obj
 * @param  {number|string} notNumOrStr
 * @returns {number|string} obj, if it's a number and NOT a NaN, or a string, otherwise notNumOrStr
 */
export function asNumberOrString(
  obj: unknown,
  notNumOrStr: number | string,
): number | string {
  return isNumberOrString(obj) ? obj : notNumOrStr;
}
/**
 * Type check for boolean
 * @param  {unknown} obj
 * @returns {obj_is<boolean>}
 */
export function isBoolean(obj: unknown): obj is boolean {
  return typeof obj === 'boolean';
}
/**
 * Type check for Date
 * @param  {unknown} obj
 * @returns {obj_is<Date>}
 */
export function isDate(obj: unknown): obj is Date {
  return obj instanceof Date;
}
/**
 * Type check for BigInt
 * @param  {unknown} obj
 * @returns {obj_is<BigInt>}
 */
export function isBigInt(obj: unknown): obj is bigint {
  return typeof obj === 'bigint';
}
/**
 * Type check for Function
 * @param  {unknown} obj
 * @returns {obj_is<Function>}
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(obj: unknown): obj is Function {
  return typeof obj === 'function';
}
/**
 * Type check for RegExp
 * @param  {unknown} obj
 * @returns {obj_is<RegExp>}
 */
export function isRegex(obj: unknown): obj is RegExp {
  return obj instanceof RegExp;
}
/**
 * Type check for Map
 * @param  {unknown} obj
 * @returns {obj_is<Map<unknown,unknown>>}
 */
export function isMap(obj: unknown): obj is Map<unknown, unknown> {
  return obj instanceof Map;
}
/**
 * Type check for Set
 * @param  {unknown} obj
 * @returns {obj_is<Set<unknown>>}
 */
export function isSet(obj: unknown): obj is Set<unknown> {
  return obj instanceof Set;
}
/**
 * Type check for T[] (Array<T>)
 * @param  {unknown} obj
 * @param  {typecheck<T>} chk - TypeCheck function for Type T
 * @returns {obj_is<T[]>}
 */
export function isArrayOf<T>(obj: unknown, chk: typecheck<T>): obj is T[] {
  if (!isArray(obj)) return false;
  for (const t of obj) {
    if (!chk(t)) return false;
  }
  return true;
}
/**
 * Generate a type check function for T[] (Array<T>)
 * @param {typecheck<T>} chk - TypeCheck function for Type T
 * @returns {typecheck<T[]>}
 */
export function isArrayOfFn<T>(chk: typecheck<T>): typecheck<T[]> {
  return (obj: unknown): obj is T[] => isArrayOf(obj, chk);
}
/**
 * Type check for Tuple of [T, U]
 * @param  {unknown} obj
 * @param  {typecheck<T>} t - TypeCheck function for Type T
 * @param  {typecheck<U>} u - TypeCheck function for Type U
 * @returns {obj_is<Tuple<T, U>>}
 */
export function is2TupleOf<T, U>(
  obj: unknown,
  t: typecheck<T>,
  u: typecheck<U>,
): obj is [T, U] {
  return is2Tuple(obj) && t(obj[0]) && u(obj[1]);
}

/**
 * Generate a type check function for Tuple of [T, U]
 * @param  {typecheck<T>} t - TypeCheck function for Type T
 * @param  {typecheck<U>} u - TypeCheck function for Type U
 * @returns {typecheck<[T, U]>}
 */
export function is2TypeOfFn<T, U>(
  t: typecheck<T>,
  u: typecheck<U>,
): typecheck<[T, U]> {
  return (obj: unknown): obj is [T, U] => is2TupleOf(obj, t, u);
}

/**
 * Type check for Tuple of [T, U, V]
 * @param  {unknown} obj
 * @param  {typecheck<T>} t - TypeCheck function for Type T
 * @param  {typecheck<U>} u - TypeCheck function for Type U
 * @param  {typecheck<V>} v - TypeCheck function for Type V
 * @returns {obj_is<Tuple<T, U, V>>}
 */
export function is3TupleOf<T, U, V>(
  obj: unknown,
  t: typecheck<T>,
  u: typecheck<U>,
  v: typecheck<V>,
): obj is [T, U, V] {
  return is3Tuple(obj) && t(obj[0]) && u(obj[1]) && v(obj[2]);
}
/**
 * Generate a type check function for Tuple of [T, U, V]
 * @param  {typecheck<T>} t - TypeCheck function for Type T
 * @param  {typecheck<U>} u - TypeCheck function for Type U
 * @param  {typecheck<V>} v - TypeCheck function for Type V
 * @returns {typecheck<[T, U, V]>}
 */
export function is3TupleOfFn<T, U, V>(
  t: typecheck<T>,
  u: typecheck<U>,
  v: typecheck<V>,
): typecheck<[T, U, V]> {
  return (obj: unknown): obj is [T, U, V] => is3TupleOf(obj, t, u, v);
}
/**
 * Type check for string[]
 * @param  {unknown} obj
 * @returns {obj_is<string[]>}
 */
export function isArrayOfString(obj: unknown): obj is string[] {
  return isArrayOf(obj, isString);
}
/**
 * Filter obj to an array of strings. If defVal is an array of strings, even if
 * a single element of obj is not a string, defVal will be used instead. If
 * defVal is a string, it will be used to replace any values in obj that are not
 * strings. If defVal isn't provided, only strings will be left in obj.
 * @param  {unknown} obj
 * @param  {string[]|string} defVal?
 * @returns {string[]}
 */
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
/**
 * Coerce obj to an array of strings. If defVal is an array of strings, even if
 * a single element of obj is not a string, defVal will be used instead. If
 * defVal is a string, it will be used to replace any values in obj that cannot
 * be coerced to strings. If defVal isn't provided, only strings, or items that
 * can be coerced to strings, will be left in obj.
 * @param obj - The value being coerced to `string[]`
 * @param defVal? - The default value used for coercion
 */
export function toArrayOfString(
  obj: unknown,
  defVal?: string[] | string,
): string[] {
  if (!isArray(obj)) {
    // Return either defVal or an empty string
    return isArray(defVal) ? defVal : [];
  }
  const defStr = '$$HIGHLY@@UNLIKELY!!';
  const mapped = obj.map((val) => toString(val, defStr));
  if (isArray(defVal)) {
    // if we have *any* elements that can't be coerced to a string, use defVal
    if (mapped.indexOf(defStr) >= 0) {
      return defVal;
    } else {
      return mapped;
    }
  }
  return isNull(defVal) || isUndefined(defVal)
    ? mapped.filter((val) => val !== defStr)
    : mapped.map((val) => (val === defStr ? defVal : val));
}
/**
 * Type check for Map<K, V>
 * @param  {unknown} obj
 * @param  {typecheck<K>} key - A K type checking function (obj:unknown) => obj is K
 * @param  {typecheck<V>} val - A V type checking function (obj:unknown) => obj is V
 * @returns {obj_is<Map<K, V>>}
 */
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
/**
 * Generate a type check function for Map<K, V>
 * @param  {typecheck<K>} key - A K type checking function (obj:unknown) => obj is K
 * @param  {typecheck<V>} val - A V type checking function (obj:unknown) => obj is V
 * @returns {typecheck<Map<K, V>>}
 */
export function isMapOfFn<K, V>(
  key: typecheck<K>,
  val: typecheck<V>,
): typecheck<Map<K, V>> {
  return (obj: unknown): obj is Map<K, V> => isMapOf(obj, key, val);
}
/**
 * Type check for Map<string, string>
 * @param  {unknown} obj
 * @returns {obj_is<Map<string, string>>}
 */
export function isMapOfStrings(obj: unknown): obj is Map<string, string> {
  return isMapOf(obj, isString, isString);
}
/**
 * Type check for Set<T>
 * @param  {unknown} obj
 * @param  {typecheck<T>} chk - A T type checking function (obj:unknow) => obj is T
 * @returns {obj_is<Set<T>>}
 */
export function isSetOf<T>(obj: unknown, chk: typecheck<T>): obj is Set<T> {
  if (!isSet(obj)) return false;
  for (const t of obj) {
    if (!chk(t)) return false;
  }
  return true;
}
/**
 * Generate a type check function for Set<T>
 * @param  {typecheck<T>} chk - A T type checking function (obj:unknow) => obj is T
 * @returns {typecheck<Set<T>>}
 */
export function isSetOfFn<T>(chk: typecheck<T>): typecheck<Set<T>> {
  return (obj: unknown): obj is Set<T> => isSetOf(obj, chk);
}
/**
 * Type check for Set<string>
 * @param  {unknown} obj
 * @returns {obj_is<Set<string>>}
 */
export function isSetOfString(obj: unknown): obj is Set<string> {
  return isSetOf(obj, isString);
}
/**
 * Type check of { [key: string | symbol]: T} types
 * @param  {unknown} obj
 * @param  {typecheck<T>} chk - a T type-checking function (obj: unknown) => obj is T
 * @returns {obj_is<{any:T}>}
 */
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
      // Argh, TypeScript, why?!?
      return false;
    }
  }
  return true;
}
/**
 * Type check of { [key: string | symbol]: T} types
 * @param  {unknown} obj
 * @param  {typecheck<T>} chk - a T type-checking function (obj: unknown) => obj is T
 * @returns {obj_is<{any:T}>}
 */
export function isObjectOfFn<T>(
  chk: typecheck<T>,
): typecheck<{ [key: string | symbol]: T }> {
  return (obj: unknown): obj is { [key: string | symbol]: T } =>
    isObjectOf(obj, chk);
}
/**
 * Type checking function for {[key: string | symbol]: string} types
 * @param  {unknown} obj
 * @returns {obj_is<{any:string}>}
 */
export function isObjectOfString(
  obj: unknown,
): obj is { [key: string | symbol]: string } {
  return (
    isObjectOf(obj, isString) && Object.getOwnPropertySymbols(obj).length === 0
  );
}
/**
 * Type check function for a Promise<T>, though T is not (and can't be...) validated.
 * This is a simple check for a "then-able" object type.
 * @param  {unknown} obj
 * @returns {obj_is<Promise<T>>}
 */
export function isPromise<T>(obj: unknown): obj is Promise<T> {
  return has(obj, 'then') && isFunction(obj.then);
}
/**
 * Type check for a Javascript symbol type
 * @param  {unknown} obj
 * @returns {obj_is<symbol>}
 */
export function isSymbol(obj: unknown): obj is symbol {
  return typeof obj === 'symbol';
}
/**
 * Type check for a particular key in obj.
 * After a conditional, you can use obj[key] or obj.key safely.
 * @param  {unknown} obj
 * @param  {K} key
 * @returns {obj_is<{key: unknown}>}
 */
export function has<K extends string>(
  obj: unknown,
  key: K,
  // eslint-disable-next-line no-shadow
): obj is { [key in K]: unknown } {
  return isObjectNonNull(obj) && key in obj;
}
export function hasFn<K extends string>(
  key: K,
  // eslint-disable-next-line no-shadow
): typecheck<{ [key in K]: unknown }> {
  // eslint-disable-next-line no-shadow
  return (obj: unknown): obj is { [key in K]: unknown } => has(obj, key);
}
/**
 * Type check for a key of type T in obj.
 * After a conditional, you can use obj[key] or obj.key with the type T for
 * key safely.
 * @param  {unknown} obj
 * @param  {K} key
 * @param  {typecheck<T>} checker - A Type checking function for T
 * @returns {obj_is<{key: T}>}
 */
export function hasType<T, K extends string>(
  obj: unknown,
  key: K,
  checker: typecheck<T>,
  // eslint-disable-next-line no-shadow
): obj is { [key in K]: T } {
  return has(obj, key) && checker(obj[key]);
}
export function hasTypeFn<T, K extends string>(
  key: K,
  checker: typecheck<T>,
  // eslint-disable-next-line no-shadow
): typecheck<{ [key in K]: T }> {
  // eslint-disable-next-line no-shadow
  return (obj: unknown): obj is { [key in K]: T } => hasType(obj, key, checker);
}
/**
 * Type check for a string typed key in obj.
 * After a conditional, you can use obj[key] or obj.key as a string safely.
 * @param  {unknown} obj
 * @param  {K} key
 * @returns {obj_is<{key: string}>}
 */
export function hasStr<K extends string>(
  obj: unknown,
  key: K,
  // eslint-disable-next-line no-shadow
): obj is { [key in K]: string } {
  return hasType(obj, key, isString);
}
export function hasStrFn<K extends string>(
  key: K,
  // eslint-disable-next-line no-shadow
): typecheck<{ [key in K]: string }> {
  // eslint-disable-next-line no-shadow
  return (obj: object): obj is { [key in K]: string } => hasStr(obj, key);
}

export function hasSymbol<S extends symbol>(
  obj: unknown,
  sym: S,
  // eslint-disable-next-line no-shadow
): obj is { [sym in S]: unknown } {
  return isObjectNonNull(obj) && sym in obj;
}
export function hasSymbolFn<S extends symbol>(
  sym: S,
  // eslint-disable-next-line no-shadow
): typecheck<{ [sym in S]: unknown }> {
  // eslint-disable-next-line no-shadow
  return (obj: unknown): obj is { [sym in S]: unknown } => hasSymbol(obj, sym);
}

export function hasSymbolType<T, S extends symbol>(
  obj: unknown,
  sym: S,
  checker: typecheck<T>,
  // eslint-disable-next-line no-shadow
): obj is { [sym in S]: T } {
  return hasSymbol(obj, sym) && checker(obj[sym]);
}
export function hasSymbolTypeFn<T, S extends symbol>(
  sym: S,
  checker: typecheck<T>,
  // eslint-disable-next-line no-shadow
): typecheck<{ [sym in S]: T }> {
  // eslint-disable-next-line no-shadow
  return (obj: unknown): obj is { [sym in S]: T } =>
    hasSymbolType(obj, sym, checker);
}

export function isIterable<T>(
  obj: unknown,
): obj is { [Symbol.iterator]: () => IterableIterator<T> } {
  return hasSymbolType(obj, Symbol.iterator, isFunction);
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

export function isMultiMapOfFn<K, V>(
  key: typecheck<K>,
  val: typecheck<V>,
): typecheck<MultiMap<K, V>> {
  return (obj: unknown): obj is MultiMap<K, V> => isMultiMapOf(obj, key, val);
}

export function isSpecificType<T>(
  obj: unknown,
  checkers: Iterable<SpecificCheckPair<T>>,
  mandatory?: Iterable<string>,
): obj is T {
  if (!isObjectNonNull(obj)) {
    return false;
  }
  const req = isSet(mandatory)
    ? mandatory
    : new Set<string>(isUndefined(mandatory) ? [] : mandatory);
  let seen = req.size;
  const keyCheckers: Map<keyof T, boolcheck> = isMap(checkers)
    ? (checkers as Map<keyof T, boolcheck>)
    : new Map(checkers);
  for (const fieldName of Object.keys(obj)) {
    if (obj[fieldName] === undefined || obj[fieldName] === null) {
      delete obj[fieldName];
      continue;
    }
    const fieldTypeChecker = keyCheckers.get(fieldName as keyof T);
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

export function isSpecificTypeFn<T>(
  checkers: Iterable<SpecificCheckPair<T>>,
  mandatory?: Iterable<string>,
): typecheck<T> {
  return (obj: unknown): obj is T =>
    isSpecificType<T>(obj, checkers, mandatory);
}

// Type metaprogramming is very useful, if I can get this right.
// This should force you to validate every single field of the type you claim to be checking
// Property in keyof T is a "mapped type" that gives you all the keys from T
// R extending from Partial<{...}> means that it should be a distinct subset of T
// So you have to provide *all* keys for the type in the 'required' section, or else
export function isObjectOfType<
  T,
  R extends Partial<{ [Property in keyof T]: boolcheck }>,
>(
  obj: unknown,
  requiredFields: R,
  optionalFields: { [Property in keyof Exclude<keyof T, keyof R>]: boolcheck },
): obj is T {
  if (!isObjectNonNull(obj)) {
    return false;
  }
  let required = Object.keys(requiredFields).length;
  const keys = Object.keys(obj);
  let len = keys.length;
  for (const fieldName of keys) {
    const theVal = obj[fieldName];
    if (isUndefined(theVal) || obj[fieldName] === null) {
      delete obj[fieldName];
      len--;
      continue;
    }
    if (hasType(optionalFields, fieldName, isFunction)) {
      const checker: boolcheck =
        optionalFields[fieldName as keyof typeof optionalFields];
      if (!checker(theVal)) {
        return false;
      }
      len--;
    } else {
      const fieldTypeChecker = requiredFields[fieldName as keyof T];
      if (!fieldTypeChecker) {
        return false;
      }
      if (!fieldTypeChecker(theVal)) {
        return false;
      }
      required--;
      len--;
    }
  }
  return required === 0 && len === 0;
}

export function isObjectOfFullType<T>(
  obj: unknown,
  requiredFields: { [Property in keyof T]: boolcheck },
): obj is T {
  return isObjectOfType(obj, requiredFields, {});
}

export function isObjectOfTypeFn<
  T,
  R extends Partial<{ [Property in keyof T]: boolcheck }>,
>(
  requiredFields: R,
  optionalFields: { [Property in keyof Exclude<keyof T, keyof R>]: boolcheck },
): typecheck<T> {
  return (obj): obj is T => isObjectOfType(obj, requiredFields, optionalFields);
}

export function isObjectOfFullTypeFn<T>(requiredFields: {
  [Property in keyof T]: boolcheck;
}): typecheck<T> {
  return (obj): obj is T => isObjectOfType(obj, requiredFields, {});
}

/**
 * Remove any fields/properties that are assigned to 'undefined' or null
 *
 * @param {unknown} obj - <bold>Mutates</bold> the object you wish to 'cleanse'
 * @param {boolean} [leaveNulls=true] should a null property be left alone
 *
 * @return {unknown} The 'cleansed' object (useful for chaining)
 */
export function cleanseKeys(obj: unknown, leaveNulls?: boolean): unknown {
  if (!isObjectNonNull(obj)) {
    return obj;
  }
  for (const field of Object.keys(obj)) {
    if (
      has(obj, field) &&
      (obj[field] === undefined || (!leaveNulls && obj[field] === null))
    ) {
      delete obj[field];
    }
  }
  return obj;
}
