[@freik/core-utils](../README.md) / Type

# Namespace: Type

A set of type checking helpers mostly for TypeScript, but
super helper for normal JavaScript if you don't hate yourself, too.

## Table of contents

### Functions

- [asArrayOfString](Type.md#asarrayofstring)
- [asNumber](Type.md#asnumber)
- [asNumberOrString](Type.md#asnumberorstring)
- [asSimpleObject](Type.md#assimpleobject)
- [asString](Type.md#asstring)
- [cleanseKeys](Type.md#cleansekeys)
- [enumKeys](Type.md#enumkeys)
- [has](Type.md#has)
- [hasStr](Type.md#hasstr)
- [hasSymbol](Type.md#hassymbol)
- [hasSymbolType](Type.md#hassymboltype)
- [hasSymbolTypeFn](Type.md#hassymboltypefn)
- [hasType](Type.md#hastype)
- [is2Tuple](Type.md#is2tuple)
- [is2TupleOf](Type.md#is2tupleof)
- [is2TypeOfFn](Type.md#is2typeoffn)
- [is3Tuple](Type.md#is3tuple)
- [is3TupleOf](Type.md#is3tupleof)
- [is3TupleOfFn](Type.md#is3tupleoffn)
- [isArray](Type.md#isarray)
- [isArrayOf](Type.md#isarrayof)
- [isArrayOfFn](Type.md#isarrayoffn)
- [isArrayOfString](Type.md#isarrayofstring)
- [isBigInt](Type.md#isbigint)
- [isBoolean](Type.md#isboolean)
- [isCustomType](Type.md#iscustomtype)
- [isDate](Type.md#isdate)
- [isFunction](Type.md#isfunction)
- [isIterable](Type.md#isiterable)
- [isMap](Type.md#ismap)
- [isMapOf](Type.md#ismapof)
- [isMapOfFn](Type.md#ismapoffn)
- [isMapOfStrings](Type.md#ismapofstrings)
- [isMultiMap](Type.md#ismultimap)
- [isMultiMapOf](Type.md#ismultimapof)
- [isMultiMapOfFn](Type.md#ismultimapoffn)
- [isNull](Type.md#isnull)
- [isNumber](Type.md#isnumber)
- [isNumberOrString](Type.md#isnumberorstring)
- [isObject](Type.md#isobject)
- [isObjectNonNull](Type.md#isobjectnonnull)
- [isObjectOf](Type.md#isobjectof)
- [isObjectOfFn](Type.md#isobjectoffn)
- [isObjectOfString](Type.md#isobjectofstring)
- [isOneOf](Type.md#isoneof)
- [isOneOfFn](Type.md#isoneoffn)
- [isPromise](Type.md#ispromise)
- [isRegex](Type.md#isregex)
- [isSet](Type.md#isset)
- [isSetOf](Type.md#issetof)
- [isSetOfFn](Type.md#issetoffn)
- [isSetOfString](Type.md#issetofstring)
- [isSimpleObject](Type.md#issimpleobject)
- [isSpecificType](Type.md#isspecifictype)
- [isSpecificTypeFn](Type.md#isspecifictypefn)
- [isString](Type.md#isstring)
- [isSymbol](Type.md#issymbol)
- [isUndefined](Type.md#isundefined)
- [toArrayOfString](Type.md#toarrayofstring)
- [toString](Type.md#tostring)

## Functions

### asArrayOfString

▸ **asArrayOfString**(`obj`, `defVal?`): `string`[]

Filter obj to an array of strings. If defVal is an array of strings, even if
a single element of obj is not a string, defVal will be used instead. If
defVal is a string, it will be used to replace any values in obj that are not
strings. If defVal isn't provided, only strings will be left in obj.

#### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `obj`     | `unknown`              |
| `defVal?` | `string` \| `string`[] |

#### Returns

`string`[]

#### Defined in

[types.ts:355](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L355)

---

### asNumber

▸ **asNumber**(`obj`, `notNum`): `number`

If obj is a number (and not a NaN!) return that value, otherwise, return notNum

#### Parameters

| Name     | Type      |
| :------- | :-------- |
| `obj`    | `unknown` |
| `notNum` | `number`  |

#### Returns

`number`

obj, if it's a number, otherwise returns nonNum

#### Defined in

[types.ts:176](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L176)

---

### asNumberOrString

▸ **asNumberOrString**(`obj`, `notNumOrStr`): `number` \| `string`

If obj is a number (and not NaN) or a string, return that values, otherwise return notNumOrStr

#### Parameters

| Name          | Type                 |
| :------------ | :------------------- |
| `obj`         | `unknown`            |
| `notNumOrStr` | `string` \| `number` |

#### Returns

`number` \| `string`

obj, if it's a number and NOT a NaN, or a string, otherwise notNumOrStr

#### Defined in

[types.ts:196](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L196)

---

### asSimpleObject

▸ **asSimpleObject**(`x`): [`SimpleObject`](../README.md#simpleobject)

#### Parameters

| Name | Type      |
| :--- | :-------- |
| `x`  | `unknown` |

#### Returns

[`SimpleObject`](../README.md#simpleobject)

#### Defined in

[types.ts:628](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L628)

---

### asString

▸ **asString**(`obj`, `notStr?`): `string`

Type filtering for strings. Will NOT coerce the thing to a string..

#### Parameters

| Name      | Type      | Default value |
| :-------- | :-------- | :------------ |
| `obj`     | `unknown` | `undefined`   |
| `notStr?` | `string`  | `''`          |

#### Returns

`string`

either obj or notStr (whichever is a string)

#### Defined in

[types.ts:126](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L126)

---

### cleanseKeys

▸ **cleanseKeys**(`obj`, `leaveNulls?`): `unknown`

Remove any fields/properties that are assigned to 'undefined' or null

#### Parameters

| Name          | Type      | Description                                           |
| :------------ | :-------- | :---------------------------------------------------- |
| `obj`         | `unknown` | <bold>Mutates</bold> the object you wish to 'cleanse' |
| `leaveNulls?` | `boolean` | should a null property be left alone                  |

#### Returns

`unknown`

The 'cleansed' object (useful for chaining)

#### Defined in

[types.ts:733](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L733)

---

### enumKeys

▸ **enumKeys**<`O`, `K`\>(`obj`): `K`[]

#### Type parameters

| Name | Type                                                 |
| :--- | :--------------------------------------------------- |
| `O`  | extends `object`                                     |
| `K`  | extends `string` \| `number` \| `symbol` = keyof `O` |

#### Parameters

| Name  | Type |
| :---- | :--- |
| `obj` | `O`  |

#### Returns

`K`[]

#### Defined in

[types.ts:17](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L17)

---

### has

▸ **has**<`K`\>(`obj`, `key`): obj is { [key in string]: unknown }

Type check for a particular key in obj.
After a conditional, you can use obj[key] or obj.key safely.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |
| `key` | `K`       |

#### Returns

obj is { [key in string]: unknown }

#### Defined in

[types.ts:542](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L542)

---

### hasStr

▸ **hasStr**<`K`\>(`obj`, `key`): obj is { [key in string]: string }

Type check for a string typed key in obj.
After a conditional, you can use obj[key] or obj.key as a string safely.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |
| `key` | `K`       |

#### Returns

obj is { [key in string]: string }

#### Defined in

[types.ts:573](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L573)

---

### hasSymbol

▸ **hasSymbol**<`S`\>(`obj`, `sym`): obj is { [sym in symbol]: unknown }

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `S`  | extends `symbol` |

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |
| `sym` | `S`       |

#### Returns

obj is { [sym in symbol]: unknown }

#### Defined in

[types.ts:581](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L581)

---

### hasSymbolType

▸ **hasSymbolType**<`T`, `S`\>(`obj`, `sym`, `checker`): obj is { [sym in symbol]: T }

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | `T`              |
| `S`  | extends `symbol` |

#### Parameters

| Name      | Type                                        |
| :-------- | :------------------------------------------ |
| `obj`     | `unknown`                                   |
| `sym`     | `S`                                         |
| `checker` | [`typecheck`](../README.md#typecheck)<`T`\> |

#### Returns

obj is { [sym in symbol]: T }

#### Defined in

[types.ts:589](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L589)

---

### hasSymbolTypeFn

▸ **hasSymbolTypeFn**<`T`, `S`\>(`sym`, `checker`): [`typecheck`](../README.md#typecheck)<{ [sym in S]: T }\>

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | `T`              |
| `S`  | extends `symbol` |

#### Parameters

| Name      | Type                                        |
| :-------- | :------------------------------------------ |
| `sym`     | `S`                                         |
| `checker` | [`typecheck`](../README.md#typecheck)<`T`\> |

#### Returns

[`typecheck`](../README.md#typecheck)<{ [sym in S]: T }\>

#### Defined in

[types.ts:598](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L598)

---

### hasType

▸ **hasType**<`T`, `K`\>(`obj`, `key`, `checker`): obj is { [key in string]: T }

Type check for a key of type T in obj.
After a conditional, you can use obj[key] or obj.key with the type T for
key safely.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | `T`              |
| `K`  | extends `string` |

#### Parameters

| Name      | Type                                        | Description                    |
| :-------- | :------------------------------------------ | :----------------------------- |
| `obj`     | `unknown`                                   |                                |
| `key`     | `K`                                         |                                |
| `checker` | [`typecheck`](../README.md#typecheck)<`T`\> | A Type checking function for T |

#### Returns

obj is { [key in string]: T }

#### Defined in

[types.ts:558](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L558)

---

### is2Tuple

▸ **is2Tuple**(`obj`): obj is [unknown, unknown]

Type check for 2 element tuples

#### Parameters

| Name  | Type      | Description |
| :---- | :-------- | :---------- |
| `obj` | `unknown` | {unknown}   |

#### Returns

obj is [unknown, unknown]

True of obj is a 2 element tuple (of any type)

#### Defined in

[types.ts:96](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L96)

---

### is2TupleOf

▸ **is2TupleOf**<`T`, `U`\>(`obj`, `t`, `u`): obj is [T, U]

Type check for Tuple of [T, U]

#### Type parameters

| Name |
| :--- |
| `T`  |
| `U`  |

#### Parameters

| Name  | Type                                        | Description                   |
| :---- | :------------------------------------------ | :---------------------------- |
| `obj` | `unknown`                                   |                               |
| `t`   | [`typecheck`](../README.md#typecheck)<`T`\> | TypeCheck function for Type T |
| `u`   | [`typecheck`](../README.md#typecheck)<`U`\> | TypeCheck function for Type U |

#### Returns

obj is [T, U]

#### Defined in

[types.ts:287](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L287)

---

### is2TypeOfFn

▸ **is2TypeOfFn**<`T`, `U`\>(`t`, `u`): [`typecheck`](../README.md#typecheck)<[`T`, `U`]\>

Generate a type check function for Tuple of [T, U]

#### Type parameters

| Name |
| :--- |
| `T`  |
| `U`  |

#### Parameters

| Name | Type                                        | Description                   |
| :--- | :------------------------------------------ | :---------------------------- |
| `t`  | [`typecheck`](../README.md#typecheck)<`T`\> | TypeCheck function for Type T |
| `u`  | [`typecheck`](../README.md#typecheck)<`U`\> | TypeCheck function for Type U |

#### Returns

[`typecheck`](../README.md#typecheck)<[`T`, `U`]\>

#### Defined in

[types.ts:301](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L301)

---

### is3Tuple

▸ **is3Tuple**(`obj`): obj is [unknown, unknown, unknown]

Type check for 3 element tuples

#### Parameters

| Name  | Type      | Description |
| :---- | :-------- | :---------- |
| `obj` | `unknown` | {unknown}   |

#### Returns

obj is [unknown, unknown, unknown]

True of obj is a 2 element tuple (of any type)

#### Defined in

[types.ts:106](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L106)

---

### is3TupleOf

▸ **is3TupleOf**<`T`, `U`, `V`\>(`obj`, `t`, `u`, `v`): obj is [T, U, V]

Type check for Tuple of [T, U, V]

#### Type parameters

| Name |
| :--- |
| `T`  |
| `U`  |
| `V`  |

#### Parameters

| Name  | Type                                        | Description                   |
| :---- | :------------------------------------------ | :---------------------------- |
| `obj` | `unknown`                                   |                               |
| `t`   | [`typecheck`](../README.md#typecheck)<`T`\> | TypeCheck function for Type T |
| `u`   | [`typecheck`](../README.md#typecheck)<`U`\> | TypeCheck function for Type U |
| `v`   | [`typecheck`](../README.md#typecheck)<`V`\> | TypeCheck function for Type V |

#### Returns

obj is [T, U, V]

#### Defined in

[types.ts:316](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L316)

---

### is3TupleOfFn

▸ **is3TupleOfFn**<`T`, `U`, `V`\>(`t`, `u`, `v`): [`typecheck`](../README.md#typecheck)<[`T`, `U`, `V`]\>

Generate a type check function for Tuple of [T, U, V]

#### Type parameters

| Name |
| :--- |
| `T`  |
| `U`  |
| `V`  |

#### Parameters

| Name | Type                                        | Description                   |
| :--- | :------------------------------------------ | :---------------------------- |
| `t`  | [`typecheck`](../README.md#typecheck)<`T`\> | TypeCheck function for Type T |
| `u`  | [`typecheck`](../README.md#typecheck)<`U`\> | TypeCheck function for Type U |
| `v`  | [`typecheck`](../README.md#typecheck)<`V`\> | TypeCheck function for Type V |

#### Returns

[`typecheck`](../README.md#typecheck)<[`T`, `U`, `V`]\>

#### Defined in

[types.ts:331](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L331)

---

### isArray

▸ **isArray**(`obj`): obj is unknown[]

Type check for array

#### Parameters

| Name  | Type      | Description |
| :---- | :-------- | :---------- |
| `obj` | `unknown` | {unknown}   |

#### Returns

obj is unknown[]

True if obj is an array (of any type)

#### Defined in

[types.ts:86](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L86)

---

### isArrayOf

▸ **isArrayOf**<`T`\>(`obj`, `chk`): obj is T[]

Type check for T[] (Array<T>)

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type                                        | Description                   |
| :---- | :------------------------------------------ | :---------------------------- |
| `obj` | `unknown`                                   |                               |
| `chk` | [`typecheck`](../README.md#typecheck)<`T`\> | TypeCheck function for Type T |

#### Returns

obj is T[]

#### Defined in

[types.ts:265](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L265)

---

### isArrayOfFn

▸ **isArrayOfFn**<`T`\>(`chk`): [`typecheck`](../README.md#typecheck)<`T`[]\>

Generate a type check function for T[] (Array<T>)

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type                                        | Description                   |
| :---- | :------------------------------------------ | :---------------------------- |
| `chk` | [`typecheck`](../README.md#typecheck)<`T`\> | TypeCheck function for Type T |

#### Returns

[`typecheck`](../README.md#typecheck)<`T`[]\>

#### Defined in

[types.ts:277](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L277)

---

### isArrayOfString

▸ **isArrayOfString**(`obj`): obj is string[]

Type check for string[]

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is string[]

#### Defined in

[types.ts:343](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L343)

---

### isBigInt

▸ **isBigInt**(`obj`): obj is bigint

Type check for BigInt

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is bigint

#### Defined in

[types.ts:223](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L223)

---

### isBoolean

▸ **isBoolean**(`obj`): obj is boolean

Type check for boolean

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is boolean

#### Defined in

[types.ts:207](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L207)

---

### isCustomType

▸ **isCustomType**<`T`\>(`obj`, `sym`): obj is T

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |
| `sym` | `symbol`  |

#### Returns

obj is T

#### Defined in

[types.ts:653](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L653)

---

### isDate

▸ **isDate**(`obj`): obj is Date

Type check for Date

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is Date

#### Defined in

[types.ts:215](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L215)

---

### isFunction

▸ **isFunction**(`obj`): obj is Function

Type check for Function

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is Function

#### Defined in

[types.ts:232](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L232)

---

### isIterable

▸ **isIterable**<`T`\>(`obj`): obj is Object

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is Object

#### Defined in

[types.ts:608](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L608)

---

### isMap

▸ **isMap**(`obj`): obj is Map<unknown, unknown\>

Type check for Map

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is Map<unknown, unknown\>

#### Defined in

[types.ts:248](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L248)

---

### isMapOf

▸ **isMapOf**<`K`, `V`\>(`obj`, `key`, `val`): obj is Map<K, V\>

Type check for Map<K, V>

#### Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

#### Parameters

| Name  | Type                                        | Description                                          |
| :---- | :------------------------------------------ | :--------------------------------------------------- |
| `obj` | `unknown`                                   |                                                      |
| `key` | [`typecheck`](../README.md#typecheck)<`K`\> | A K type checking function (obj:unknown) => obj is K |
| `val` | [`typecheck`](../README.md#typecheck)<`V`\> | A V type checking function (obj:unknown) => obj is V |

#### Returns

obj is Map<K, V\>

#### Defined in

[types.ts:408](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L408)

---

### isMapOfFn

▸ **isMapOfFn**<`K`, `V`\>(`key`, `val`): [`typecheck`](../README.md#typecheck)<`Map`<`K`, `V`\>\>

Generate a type check function for Map<K, V>

#### Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

#### Parameters

| Name  | Type                                        | Description                                          |
| :---- | :------------------------------------------ | :--------------------------------------------------- |
| `key` | [`typecheck`](../README.md#typecheck)<`K`\> | A K type checking function (obj:unknown) => obj is K |
| `val` | [`typecheck`](../README.md#typecheck)<`V`\> | A V type checking function (obj:unknown) => obj is V |

#### Returns

[`typecheck`](../README.md#typecheck)<`Map`<`K`, `V`\>\>

#### Defined in

[types.ts:427](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L427)

---

### isMapOfStrings

▸ **isMapOfStrings**(`obj`): obj is Map<string, string\>

Type check for Map<string, string>

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is Map<string, string\>

#### Defined in

[types.ts:438](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L438)

---

### isMultiMap

▸ **isMultiMap**(`obj`): obj is MultiMap<unknown, unknown\>

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is MultiMap<unknown, unknown\>

#### Defined in

[types.ts:657](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L657)

---

### isMultiMapOf

▸ **isMultiMapOf**<`K`, `V`\>(`obj`, `key`, `val`): obj is MultiMap<K, V\>

#### Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

#### Parameters

| Name  | Type                                        |
| :---- | :------------------------------------------ |
| `obj` | `unknown`                                   |
| `key` | [`typecheck`](../README.md#typecheck)<`K`\> |
| `val` | [`typecheck`](../README.md#typecheck)<`V`\> |

#### Returns

obj is MultiMap<K, V\>

#### Defined in

[types.ts:661](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L661)

---

### isMultiMapOfFn

▸ **isMultiMapOfFn**<`K`, `V`\>(`key`, `val`): [`typecheck`](../README.md#typecheck)<[`MultiMap`](../interfaces/MultiMap.md)<`K`, `V`\>\>

#### Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

#### Parameters

| Name  | Type                                        |
| :---- | :------------------------------------------ |
| `key` | [`typecheck`](../README.md#typecheck)<`K`\> |
| `val` | [`typecheck`](../README.md#typecheck)<`V`\> |

#### Returns

[`typecheck`](../README.md#typecheck)<[`MultiMap`](../interfaces/MultiMap.md)<`K`, `V`\>\>

#### Defined in

[types.ts:676](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L676)

---

### isNull

▸ **isNull**(`obj`): obj is null

Type check for null

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is null

#### Defined in

[types.ts:57](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L57)

---

### isNumber

▸ **isNumber**(`obj`): obj is number

Type check for number (and not NaN)

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is number

obj is a number and NOT a NaN

#### Defined in

[types.ts:167](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L167)

---

### isNumberOrString

▸ **isNumberOrString**(`val`): val is string \| number

Type check for number (and not NaN) or a string

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `val` | `any` |

#### Returns

val is string \| number

True if obj is a number and NOT a NaN, or a string

#### Defined in

[public-defs.ts:37](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L37)

---

### isObject

▸ **isObject**(`obj`): obj is null \| Object

Type check for object (or null)

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is null \| Object

True if obj is null, or an object (of any type)

#### Defined in

[types.ts:74](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L74)

---

### isObjectNonNull

▸ **isObjectNonNull**(`obj`): obj is Object

Type check for a non-null object

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is Object

#### Defined in

[types.ts:62](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L62)

---

### isObjectOf

▸ **isObjectOf**<`T`\>(`obj`, `chk`): obj is Object

Type check of { [key: string | symbol]: T} types

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type                                        | Description                                           |
| :---- | :------------------------------------------ | :---------------------------------------------------- |
| `obj` | `unknown`                                   |                                                       |
| `chk` | [`typecheck`](../README.md#typecheck)<`T`\> | a T type-checking function (obj: unknown) => obj is T |

#### Returns

obj is Object

#### Defined in

[types.ts:476](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L476)

---

### isObjectOfFn

▸ **isObjectOfFn**<`T`\>(`chk`): [`typecheck`](../README.md#typecheck)<{ `[key: string | symbol]`: `T`; }\>

Type check of { [key: string | symbol]: T} types

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type                                        | Description                                           |
| :---- | :------------------------------------------ | :---------------------------------------------------- |
| `chk` | [`typecheck`](../README.md#typecheck)<`T`\> | a T type-checking function (obj: unknown) => obj is T |

#### Returns

[`typecheck`](../README.md#typecheck)<{ `[key: string | symbol]`: `T`; }\>

#### Defined in

[types.ts:500](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L500)

---

### isObjectOfString

▸ **isObjectOfString**(`obj`): obj is Object

Type checking function for {[key: string | symbol]: string} types

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is Object

#### Defined in

[types.ts:511](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L511)

---

### isOneOf

▸ **isOneOf**<`T`, `U`\>(`obj`, `chk1`, `chk2`): obj is T \| U

Check if an object is one of two types

#### Type parameters

| Name |
| :--- |
| `T`  |
| `U`  |

#### Parameters

| Name   | Type                                        | Description                          |
| :----- | :------------------------------------------ | :----------------------------------- |
| `obj`  | `unknown`                                   | {unknown} The object to check        |
| `chk1` | [`typecheck`](../README.md#typecheck)<`T`\> | {typecheck<T>} One type to check     |
| `chk2` | [`typecheck`](../README.md#typecheck)<`U`\> | {typecheck<U>} Another type to check |

#### Returns

obj is T \| U

#### Defined in

[types.ts:30](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L30)

---

### isOneOfFn

▸ **isOneOfFn**<`T`, `U`\>(`chk1`, `chk2`): [`typecheck`](../README.md#typecheck)<`T` \| `U`\>

Generate a typecheck function to check if an object is one of two types

#### Type parameters

| Name |
| :--- |
| `T`  |
| `U`  |

#### Parameters

| Name   | Type                                        | Description                          |
| :----- | :------------------------------------------ | :----------------------------------- |
| `chk1` | [`typecheck`](../README.md#typecheck)<`T`\> | {typecheck<T>} One type to check     |
| `chk2` | [`typecheck`](../README.md#typecheck)<`U`\> | {typecheck<U>} Another type to check |

#### Returns

[`typecheck`](../README.md#typecheck)<`T` \| `U`\>

#### Defined in

[types.ts:44](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L44)

---

### isPromise

▸ **isPromise**<`T`\>(`obj`): obj is Promise<T\>

Type check function for a Promise<T>, though T is not (and can't be...) validated.
This is a simple check for a "then-able" object type.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is Promise<T\>

#### Defined in

[types.ts:524](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L524)

---

### isRegex

▸ **isRegex**(`obj`): obj is RegExp

Type check for RegExp

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is RegExp

#### Defined in

[types.ts:240](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L240)

---

### isSet

▸ **isSet**(`obj`): obj is Set<unknown\>

Type check for Set

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is Set<unknown\>

#### Defined in

[types.ts:256](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L256)

---

### isSetOf

▸ **isSetOf**<`T`\>(`obj`, `chk`): obj is Set<T\>

Type check for Set<T>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type                                        | Description                                         |
| :---- | :------------------------------------------ | :-------------------------------------------------- |
| `obj` | `unknown`                                   |                                                     |
| `chk` | [`typecheck`](../README.md#typecheck)<`T`\> | A T type checking function (obj:unknow) => obj is T |

#### Returns

obj is Set<T\>

#### Defined in

[types.ts:447](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L447)

---

### isSetOfFn

▸ **isSetOfFn**<`T`\>(`chk`): [`typecheck`](../README.md#typecheck)<`Set`<`T`\>\>

Generate a type check function for Set<T>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type                                        | Description                                         |
| :---- | :------------------------------------------ | :-------------------------------------------------- |
| `chk` | [`typecheck`](../README.md#typecheck)<`T`\> | A T type checking function (obj:unknow) => obj is T |

#### Returns

[`typecheck`](../README.md#typecheck)<`Set`<`T`\>\>

#### Defined in

[types.ts:459](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L459)

---

### isSetOfString

▸ **isSetOfString**(`obj`): obj is Set<string\>

Type check for Set<string>

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is Set<string\>

#### Defined in

[types.ts:467](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L467)

---

### isSimpleObject

▸ **isSimpleObject**(`x`): x is SimpleObject

#### Parameters

| Name | Type      |
| :--- | :-------- |
| `x`  | `unknown` |

#### Returns

x is SimpleObject

#### Defined in

[types.ts:614](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L614)

---

### isSpecificType

▸ **isSpecificType**<`T`\>(`obj`, `checkers`, `mandatory?`): obj is T

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                                       |
| :----------- | :--------------------------------------------------------- |
| `obj`        | `unknown`                                                  |
| `checkers`   | `Iterable`<[`TypeCheckPair`](../README.md#typecheckpair)\> |
| `mandatory?` | `Iterable`<`string`\>                                      |

#### Returns

obj is T

#### Defined in

[types.ts:683](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L683)

---

### isSpecificTypeFn

▸ **isSpecificTypeFn**<`T`\>(`checkers`, `mandatory?`): [`typecheck`](../README.md#typecheck)<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                                       |
| :----------- | :--------------------------------------------------------- |
| `checkers`   | `Iterable`<[`TypeCheckPair`](../README.md#typecheckpair)\> |
| `mandatory?` | `Iterable`<`string`\>                                      |

#### Returns

[`typecheck`](../README.md#typecheck)<`T`\>

#### Defined in

[types.ts:717](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L717)

---

### isString

▸ **isString**(`obj`): obj is string

Type check for a string

#### Parameters

| Name  | Type      | Description |
| :---- | :-------- | :---------- |
| `obj` | `unknown` | {unknown}   |

#### Returns

obj is string

True if obj is a string

#### Defined in

[types.ts:116](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L116)

---

### isSymbol

▸ **isSymbol**(`obj`): obj is symbol

Type check for a Javascript symbol type

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is symbol

#### Defined in

[types.ts:532](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L532)

---

### isUndefined

▸ **isUndefined**(`obj`): obj is undefined

Type check for undefined

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is undefined

#### Defined in

[types.ts:52](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L52)

---

### toArrayOfString

▸ **toArrayOfString**(`obj`, `defVal?`): `string`[]

Coerce obj to an array of strings. If defVal is an array of strings, even if
a single element of obj is not a string, defVal will be used instead. If
defVal is a string, it will be used to replace any values in obj that cannot
be coerced to strings. If defVal isn't provided, only strings, or items that
can be coerced to strings, will be left in obj.

#### Parameters

| Name      | Type                   | Description                           |
| :-------- | :--------------------- | :------------------------------------ |
| `obj`     | `unknown`              | The value being coerced to `string[]` |
| `defVal?` | `string` \| `string`[] | -                                     |

#### Returns

`string`[]

#### Defined in

[types.ts:379](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L379)

---

### toString

▸ **toString**(`obj`, `notStr?`): `string`

Type coercion to a string. Will try to _lightly_ coerce the thing to a string if possible.

#### Parameters

| Name      | Type      | Default value |
| :-------- | :-------- | :------------ |
| `obj`     | `unknown` | `undefined`   |
| `notStr?` | `string`  | `''`          |

#### Returns

`string`

either obj, obj.toString(), or notStr

#### Defined in

[types.ts:137](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/types.ts#L137)
