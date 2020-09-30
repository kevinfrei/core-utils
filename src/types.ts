import type { typecheck } from './index';
import { has } from './object';

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

export function isString(obj: unknown): obj is string {
  return typeof obj === 'string';
}

export function isNumber(obj: unknown): obj is number {
  return typeof obj === 'number' && !isNaN(obj - 0);
}

export function isBoolean(obj: unknown): obj is boolean {
  return typeof obj === 'boolean';
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(obj: unknown): obj is Function {
  return (
    (obj !== null &&
      typeof obj === 'object' &&
      obj!.hasOwnProperty('constructor') &&
      obj!.hasOwnProperty('call') &&
      obj!.hasOwnProperty('apply')) ||
    typeof obj === 'function'
  );
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

export function isSetOf<T>(obj: unknown, chk: typecheck<T>): obj is Set<T> {
  if (!isSet(obj)) return false;
  for (const t of obj) {
    if (!chk(t)) return false;
  }
  return true;
}

export function isObjectOf<T>(
  obj: unknown,
  chk: typecheck<T>,
): obj is { [key: string]: T } {
  if (!isObjectNonNull(obj)) return false;
  for (const k in obj) {
    if (has(k, obj) && !chk(obj[k])) return false;
  }
  return true;
}
