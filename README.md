# js-freik-utils

This is a small collection of random crap I've used over the past few years to
get various stuff going well on Node and/or React. I'm moving them into a
public repo, as I'm trying to build something in it's own repo, instead of in
my same private repo I've been using for years.

## ClientRPC
Deprecated. Honestly, I think I started it and never actually used it. Don't use it.

## FTON: Flow Type Object Notation

This is a set of functions to allow me to use Flow stuff, while also using JSON
for strong-ish typing of serialization and deserialization.

```typescript
// These typew are all exported from the main module, not the FTON module
export type FTONData = string
  | number
  | boolean
  | null
  | FTONObject
  | FTONArray;
export type FTONObject = { [key: string]: FTONData };
export type FTONArray = Array<FTONData>;

function typecheck(x: mixed) => FTONData; // Throws on error
function parse(input: string) => FTONData; // Throws on error
function stringify(input: FTONData) => string;
```

`FTON.parse` and `FTON.stringify` are meant to be drop-in replacements for
`JSON.parse` and `JSON.stringify`. In addition, `FTON.typecheck` can be used to
get your mixed types out quickly. They're annoying, and the inline code to do
full typechecking can be pretty overwhelming. The `FTONData` type makes it a
little cleaner & easier to deal with.

## ObjUtil: A bunch of helpers for goofing around, and for Flow interactions

```typescript
function deQuote(str: string) => string;
function reQuote(str: string) => {[key:string]: string};
```
Honestly, use at your own risk. They don't invert each other :/

```typescript
function prefixObj(str: string, obj: {[key:string]: string}): Array<string>;
```
This is easiest explained by providing results:

`ObjUtil.prefixObj("test", {a: "b", c: null, d: "e"})`

returns

`["testa", "b", "testc", "testd", "e"]`

The null is weird. Sorry...

Then there's a bunch of type checking helpers:

```typescript
function isArray(obj: mixed): boolean %checks;
function isString(obj: mixed): boolean %checks;
function isNumber(obj: mixed): boolean %checks;
function isFunction(obj: mixed): boolean %checks;
```
They do what they say...

## SeqNum: a unique ID generator
This is a pretty simple little unique ID generator, that takes an optional prefix, and returns the generator:
```typescript
function SeqNum(prefix: ?string) => (() => string);
```
in action:
```typescript
const { SeqNum } = require('js-freik-utils');

const getId = SeqNum('id');
const plainId = SeqNum();

getId(); // returns 'id0' or something like it
getId(); // returns 'id1'
plainId(); // returns '0'

// You get the idea, hopefully