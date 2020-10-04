import type { typecheck } from './index';
import { ObjUtil } from './index';

function isObjectNonNull(obj: unknown): obj is { [key: string]: unknown } {
  return typeof obj === 'object' && !!obj;
}

function isObject(obj: unknown): obj is { [key: string]: unknown } | null {
  return typeof obj === 'object';
}

function isArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj);
}

function isString(obj: unknown): obj is string {
  return typeof obj === 'string';
}

function isNumber(obj: unknown): obj is number {
  return typeof obj === 'number' && !isNaN(obj - 0);
}

function isBoolean(obj: unknown): obj is boolean {
  return typeof obj === 'boolean';
}

// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(obj: unknown): obj is Function {
  return (
    (obj !== null &&
      typeof obj === 'object' &&
      obj!.hasOwnProperty('constructor') &&
      obj!.hasOwnProperty('call') &&
      obj!.hasOwnProperty('apply')) ||
    typeof obj === 'function'
  );
}

function isMap(obj: unknown): obj is Map<unknown, unknown> {
  return isObjectNonNull(obj) && obj instanceof Map;
}

function isSet(obj: unknown): obj is Set<unknown> {
  return isObjectNonNull(obj) && obj instanceof Set;
}

function isArrayOf<T>(obj: unknown, chk: typecheck<T>): obj is T[] {
  if (!isArray(obj)) return false;
  for (const t of obj) {
    if (!chk(t)) return false;
  }
  return true;
}

function isMapOf<K, V>(
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

function isSetOf<T>(obj: unknown, chk: typecheck<T>): obj is Set<T> {
  if (!isSet(obj)) return false;
  for (const t of obj) {
    if (!chk(t)) return false;
  }
  return true;
}

function isObjectOf<T>(
  obj: unknown,
  chk: typecheck<T>,
): obj is { [key: string]: T } {
  if (!isObjectNonNull(obj)) return false;
  for (const k in obj) {
    if (ObjUtil.has(k, obj) && !chk(obj[k])) return false;
  }
  return true;
}

export const Type = {
  isObject,
  isObjectOf,
  isObjectNonNull,
  isSet,
  isSetOf,
  isArray,
  isArrayOf,
  isMap,
  isMapOf,
  isFunction,
  isBoolean,
  isNumber,
  isString,
};
