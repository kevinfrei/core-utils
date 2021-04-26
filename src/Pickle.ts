import { Type, typecheck } from './index';
import { isMap, isSet, isSymbol } from './types';

type FlattenedCustom = {
  '@dataType': string;
  '@dataValue': unknown;
};

function MakeFlat(name: string, data: unknown): FlattenedCustom {
  return { '@dataType': name, '@dataValue': data };
}

function GetFlat(val: FlattenedCustom): [string, unknown] {
  return [val['@dataType'], val['@dataValue']];
}

export const PickleTag = Symbol.for('freik.unpickler');
const SetTag = Symbol.for('freik.Set');
const MapTag = Symbol.for('freik.Map');
const SymbolTag = Symbol.for('freik.Symbol');

type ToFlat<T> = (data: T) => unknown;
type FromFlat<T> = (data: unknown) => T | undefined;

function MapPickle(val: Map<any, any>): [unknown, unknown][] {
  return [...val.entries()];
}

function MapUnpickle(val: unknown): Map<any, any> | undefined {
  return Type.isArrayOf(val, Type.is2Tuple) ? new Map(val) : undefined;
}

function SetPickle(val: Set<any>): unknown[] {
  return [...val];
}

function SetUnpickle(val: unknown): Set<any> | undefined {
  return Type.isArray(val) ? new Set(val) : undefined;
}

function SymbolPickle(val: symbol): string {
  const theKey = Symbol.keyFor(val);
  if (theKey === undefined)
    throw new Error('Unable to get a key for a symbol for pickling');
  return theKey;
}

function SymbolUnpickle(val: unknown): symbol | undefined {
  return Type.isString(val) ? Symbol.for(val) : undefined;
}

const builtInPickleTypes: [typecheck<any>, symbol][] = [
  [isMap, MapTag],
  [isSet, SetTag],
  [isSymbol, SymbolTag],
];

const picklers = new Map<symbol, ToFlat<any>>([
  [MapTag, MapPickle],
  [SetTag, SetPickle],
  [SymbolTag, SymbolPickle],
]);

const unpicklers = new Map<symbol, FromFlat<any>>([
  [MapTag, MapUnpickle],
  [SetTag, SetUnpickle],
  [SymbolTag, SymbolUnpickle],
]);

function getPickler(obj: unknown): [symbol, ToFlat<any>] | undefined {
  if (Type.hasSymbol(obj, PickleTag)) {
    const s = obj[PickleTag];
    if (Type.isSymbol(s)) {
      const p = picklers.get(s);
      if (p) {
        return [s, p];
      } else if (Type.has(obj, 'toJSON') && Type.isFunction(obj.toJSON)) {
        return [s, (val: { toJSON: () => unknown }) => val.toJSON()];
      }
    }
  }
  // If we don't have a PickleTag, then check to see if it's a built-in type
  // that we'll handle properly
  for (const [checker, symb] of builtInPickleTypes) {
    if (checker(obj)) {
      const p = picklers.get(symb);
      if (p) {
        return [symb, p];
      }
    }
  }
}

function getUnpickler(keyName: string): FromFlat<any> | undefined {
  return unpicklers.get(Symbol.for(keyName));
}

function replacer(
  this: any,
  key: string,
  value: unknown,
): unknown | FlattenedCustom {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const originalObject: unknown = this[key];
  const pickler = getPickler(originalObject);
  if (pickler) {
    const [sym, toFlat] = pickler;
    const keyFor = Symbol.keyFor(sym);
    if (!keyFor) {
      return value;
    }
    return MakeFlat(keyFor, toFlat(originalObject));
  } else if (Type.isIterable(originalObject)) {
    return [...originalObject];
  }
  return value;
}

function reviver(key: unknown, value: unknown): unknown {
  if (!Type.isObject(value)) {
    return value;
  }
  if (Type.hasStr(value, '@dataType') && Type.has(value, '@dataValue')) {
    const [name, forUnpickling] = GetFlat(value);
    const pickler = getUnpickler(name);
    if (pickler) {
      const res = pickler(forUnpickling) as unknown;
      if (res !== undefined) {
        return res;
      }
    }
  }
  return value;
}

export function Pickle(input: unknown): string {
  return JSON.stringify(input, replacer);
}

export function Unpickle(input: string): unknown {
  return JSON.parse(input, reviver);
}

export function UnsafelyUnpickle<T>(input: string): T {
  return Unpickle(input) as T;
}

export function SafelyUnpickle<T>(
  input: string,
  check: typecheck<T>,
): T | undefined {
  const res = UnsafelyUnpickle<unknown>(input);
  return check(res) ? res : undefined;
}

// You don't need a toString method, if you use toJSON on your object instead
export function RegisterForPickling<T>(
  pickleTag: symbol,
  fromString: FromFlat<T>,
  toString?: ToFlat<T>,
): void {
  if (toString) {
    picklers.set(pickleTag, toString);
  }
  unpicklers.set(pickleTag, fromString);
}
