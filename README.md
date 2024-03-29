# @freik/core-utils

This is a small collection of random crap I've used over the past few years to
get various stuff going well on Node and/or React and/or TypeScript. I'm moving
them into a public repo, as I'm trying to build something in it's own repo,
instead of in my same private repo I've been using for years.
[Documentation](docs/README.md) is generated from source code, so it's only as
good as my comments, unfortunately.

## Type: A bunch of typechecking helpers

These mostly just do what they say. They're intended to be used off of the
`Type` import, so they don't pollute the global namespace too egregiously.

[Type module documentation](docs/modules/Type.md)

```typescript
import { Type, typecheck } from '@freik/core-utils';

// type typecheck<T> = (val: any) => val is T;
// Type.isObject is typecheck<object>
// Type.isArray is typecheck<unknown[]>, etc...

Type.isObject(obj) obj is {[key: string]: unknown} | null;
Type.isObjectNonNull(obj: unknown): obj is {[key: string]: unknown};
Type.isArray(obj: unknown): obj is unknown[];
Type.is2Tuple(obj: unknown): obj is [unknown, unknown];
Type.is3Tuple(obj: unknown): obj is [unknown, unknown, unknown];
Type.isString(obj: unknown): obj is string;
// Returns the notStr value if obj isn't a string
Type.asString(obj: unknown, notStr: string): string;
// NaN's fail, which is generally good, since they are clearly Not a Number!
Type.isNumber(obj: unknown): obj is number;
// Returns the notNum value is obj isn't a number
Type.asNumber(obj: unknown, notNum: number): number;
Type.isNumberOrString(obj: unknown): obj is number | string;
// Returns def if it's not a number or string
Type.asNumberOrString(obj: unknown, def: number | string): obj is number | string;
Type.isBoolean(obj: unknown): obj is boolean;
Type.isFunction(obj: unknown): obj is Function;
Type.isRegex(obj: unknown): obj is RegExp;
Type.isMap(obj: unknown): obj is Map<unknown, unknown>;
Type.isSet(obj: unknown): obj is Set<unknown>;
Type.isArrayOf<T>(obj: unknown, chk: typecheck<T>): obj is T[];
Type.is2TupleOf<T, U>(obj: unknown, t: typecheck<T>, u: typecheck<U>): obj is [T, U];
Type.is3TupleOf<T, U, V>(obj: unknown, t: typecheck<T>, u: typecheck<U>, v: typecheck<V>): obj is [T, U, V];
Type.isArrayOfString(obj: unknown): obj is string[];
// Returns defVal (or empty array) if obj isn't an array of strings
Type.asArrayOfString(obj: unknown, defVal?: string[] | string): string[];
Type.isMapOf<K, V>(obj: unknown, k: typecheck<K>, v: typecheck<V>): obj is Map<K, V>;
Type.isMapOfStrings(obj: unknown): obj is Map<string, string>;
Type.isSetOf<T>(obj: unknown, chk: typecheck<T>): obj is Set<T>;
Type.isSetOfString(obj: unknown): obj is Set<string>;
Type.isObjectOf<T>(obj: unknown,  chk: typecheck<T>): obj is { [key: string]: T };
Type.isObjectOfString(obj: unknown): obj is { [key: string]: string };
// This is NOT fully typesafe, as we can't check the return type of the promise
Type.isPromise<T>(obj: unknown): obj is Promise<T>;
// For my MultiMap type (uses isCustomType<MultiMap> below)
Type.isMultiMap(obj: unknown): obj is MultiMap<unknown, unknown>;
Type.isMultiMapOf<K, V>(obj: unknown, k: typecheck<K>, v: typecheck<V>): obj is MultiMap<K, V>;
Type.isSymbol(x: unknown): x is symbol;
// This isn't the syntax, but the idea is that x[keyName] is now a known prop
Type.has(x: unknown, keyName: string): x is { [ keyName: string ]: unknown };
Type.hasType<T>(x: unknown, keyName: string, chk: typecheck<T>): x is { [ keyName: string ]: T };
Type.hasStr(x: unknown, keyName: string): x is { [ keyName: string ]: string };
// This is useful for things like Type.isIterable :)
Type.hasSymbol(x: unknown, sym: S): x is { [ sym: symbol ]: unknown };
Type.hasSymbolType<T>(x: unknown, sym: S, chk: typecheck<T>): x is { [ sym: symbol ]: T };
// Returns true if x is an iterable object:
Type.isIterable<T>(x: unknown): x is { [Symbol.iterator]: () => IterableIterator<T> };
// This is the only weird thing here. It uses the existence of a custom global
// symbol on an object to know that it's a particular type.
Type.isCustomType<T>(obj: unknown, sym: symbol): obj is T;
// To use my pickling framework, you need to also use that tag, so it does
// double-duty to enable both serialization (and deserialization, which is messier)
// as well as core type validation. You can see the usage from Multimap:
const MyTypeTag = Symbol.for('freik.MyType');
type MyType = {
  thingy: number,
  [FreikTypeTag]: MyTypeTag
};
function MakeMyType(thingy: number): MyType {
  return { thingy, [FreikTypeTag]: MyTypeTag };
}
function isMyType(obj: unknown): obj is MyType {
  return isCustomType<MyType>(obj, MyTypeTag);
}
```

## Pickle/Unpickle

### An extensible marshalling framework (that also integrates with Type.is\*)

`Pickle`/`Unpickle` are strictly drop-in replacements for `JSON.stringify` and
`JSON.parse`. Their key value-add is that they can support marshalling &
unmarshalling any type, if the type is registered properly. By default, it
supports marshalling core types, including `RegExp`, `Date`, `BigInt`, _global_
`Symbol`s, `Set`s, and `Map`s.

To add support for your own types, there are three things you must do:

1. Create a globally named symbol, and assign it to the objects of the type (this also enables `Type.isCustomType` to work properly)
2. Register the type with the Pickling system.
3. Optionally include a `toJSON` method on your type (this is an alternative to include the `toString` argument to `RegisterForPickling`)

```Typescript

import { FreikTypeTag, RegisterForPickling } from '@freik/core-utils';

type MyCustomType = {
  someData: WeirdType;
  // Gotta do this:
  [FreikTypeTag]: symbol;
  // This is optional, instead of registering a pickler
  // toJSON: (key?:unknown) => unknown
};

// Create a globally *named* symbol for the type:
const MyCustomTypeTag = Symbol.for('freik.MyCustomType');

// And here we are, creating it:
function MakeMyCustomType(name: string) : MyCustomType {
  return {
    someData: makeSomeData(),
    name,
    [FreikTypeTag]:
    MyCustomTypeTag
  };
}

function pickler(obj: MyCustomType):unknown {
  return { name: obj.name }; // This object is fully JSON-able
}

function unpickler(data: unknown):MyCustomeType | undefined {
  if (Type.hasStr(data, 'name')) {
    return MakeMyCustomType(data.name);
  }
}

// I could implement a toJSON method instead of registering pickler here
RegisterForPickling(MyCustomTypeTag, unpickler, pickler);
```

## SeqNum: a unique ID generator

This is a pretty simple little unique ID generator, that takes an optional
prefix, and potentially the last sequence number generated, and returns the
generator:

```typescript
function SeqNum(prefix: ?string, resumeId: ?string) => (() => string);
```

in action:

```typescript
const { SeqNum } = require('@freik/core-utils');

const getId = SeqNum('id');
const plainId = SeqNum();

const id1 = getId(); // returns 'id0' or something like it
const id2 = getId(); // returns 'id1'
const plainId1 = plainId(); // returns '0'

// You get the idea, hopefully
```

There's also the ability to compare keys to each other.
The sort result reflects key 'age'.

```typescript
getId.keyCompare(id1, id2); // returns -1 (negative)
getId.keyCompare(id2, id1); // returns 1 (positive)
getId.keyCompare(id1, plainId1); // returns NaN: They're not comparable!
```

## Operations: Package up some commonly used comparisons & other miscellany

```typescript
function SetEqual<T>(s1: Set<T>, s2: Set<T>): boolean;
function ArraySetEqual<T>(a1: Array<T>, a2: Array<T>): boolean;
function StringCaseInsensitiveEqual(a: string, b: string): boolean;
```

They seem mostly self-explanatory. They return true of the set of stuff in each
collect are identical. Note that `ArraySetEqual` doesn't care about order of the
arrays passed in (that's why it's called ArraySet and not just ArrayEqual!)
