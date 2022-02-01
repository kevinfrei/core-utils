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
- [has](Type.md#has)
- [hasStr](Type.md#hasstr)
- [hasSymbol](Type.md#hassymbol)
- [hasSymbolType](Type.md#hassymboltype)
- [hasType](Type.md#hastype)
- [is2Tuple](Type.md#is2tuple)
- [is2TupleOf](Type.md#is2tupleof)
- [is3Tuple](Type.md#is3tuple)
- [is3TupleOf](Type.md#is3tupleof)
- [isArray](Type.md#isarray)
- [isArrayOf](Type.md#isarrayof)
- [isArrayOfString](Type.md#isarrayofstring)
- [isBigInt](Type.md#isbigint)
- [isBoolean](Type.md#isboolean)
- [isCustomType](Type.md#iscustomtype)
- [isDate](Type.md#isdate)
- [isFunction](Type.md#isfunction)
- [isIterable](Type.md#isiterable)
- [isMap](Type.md#ismap)
- [isMapOf](Type.md#ismapof)
- [isMapOfStrings](Type.md#ismapofstrings)
- [isMultiMap](Type.md#ismultimap)
- [isMultiMapOf](Type.md#ismultimapof)
- [isNull](Type.md#isnull)
- [isNumber](Type.md#isnumber)
- [isNumberOrString](Type.md#isnumberorstring)
- [isObject](Type.md#isobject)
- [isObjectNonNull](Type.md#isobjectnonnull)
- [isObjectOf](Type.md#isobjectof)
- [isObjectOfString](Type.md#isobjectofstring)
- [isPromise](Type.md#ispromise)
- [isRegex](Type.md#isregex)
- [isSet](Type.md#isset)
- [isSetOf](Type.md#issetof)
- [isSetOfString](Type.md#issetofstring)
- [isSimpleObject](Type.md#issimpleobject)
- [isSpecificType](Type.md#isspecifictype)
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

[types.ts:283](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L283)

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

[types.ts:142](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L142)

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

[types.ts:160](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L160)

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

[types.ts:514](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L514)

---

### asString

▸ **asString**(`obj`, `notStr?`): `string`

Type filtering for strings. Will NOT coerce the thing to a string..

#### Parameters

| Name     | Type      | Default value |
| :------- | :-------- | :------------ |
| `obj`    | `unknown` | `undefined`   |
| `notStr` | `string`  | `''`          |

#### Returns

`string`

either obj or notStr (whichever is a string)

#### Defined in

[types.ts:92](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L92)

---

### cleanseKeys

▸ **cleanseKeys**(`obj`, `leaveNulls?`): `unknown`

Remove any fields/properties that are assigned to 'undefined' or null

#### Parameters

| Name          | Type      | Description                                           |
| :------------ | :-------- | :---------------------------------------------------- |
| `obj`         | `unknown` | <bold>Mutates</bold> the object you wish to 'cleanse' |
| `leaveNulls?` | `boolean` | -                                                     |

#### Returns

`unknown`

The 'cleansed' object (useful for chaining)

#### Defined in

[types.ts:603](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L603)

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

> }

#### Defined in

[types.ts:438](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L438)

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

> }

#### Defined in

[types.ts:469](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L469)

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

[types.ts:477](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L477)

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

[types.ts:485](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L485)

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

> }

#### Defined in

[types.ts:454](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L454)

---

### is2Tuple

▸ **is2Tuple**(`obj`): obj is [unknown, unknown]

Type check for 2 element tuples

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is [unknown, unknown]

True of obj is a 2 element tuple (of any type)

#### Defined in

[types.ts:62](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L62)

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

[types.ts:243](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L243)

---

### is3Tuple

▸ **is3Tuple**(`obj`): obj is [unknown, unknown, unknown]

Type check for 3 element tuples

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is [unknown, unknown, unknown]

True of obj is a 2 element tuple (of any type)

#### Defined in

[types.ts:72](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L72)

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
| `v`   | [`typecheck`](../README.md#typecheck)<`V`\> | TypeCheck function for Type U |

#### Returns

obj is [T, U, V]

#### Defined in

[types.ts:258](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L258)

---

### isArray

▸ **isArray**(`obj`): obj is unknown[]

Type check for array

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is unknown[]

True if obj is an array (of any type)

#### Defined in

[types.ts:52](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L52)

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

[types.ts:229](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L229)

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

[types.ts:271](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L271)

---

### isBigInt

▸ **isBigInt**(`obj`): obj is BigInt

Type check for BigInt

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is BigInt

#### Defined in

[types.ts:187](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L187)

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

[types.ts:171](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L171)

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

[types.ts:539](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L539)

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

[types.ts:179](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L179)

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

[types.ts:196](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L196)

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

[types.ts:494](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L494)

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

[types.ts:212](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L212)

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

[types.ts:336](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L336)

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

[types.ts:354](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L354)

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

[types.ts:543](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L543)

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

[types.ts:547](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L547)

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

[types.ts:23](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L23)

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

[types.ts:133](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L133)

---

### isNumberOrString

▸ **isNumberOrString**(`obj`): obj is string \| number

Type check for number (and not NaN) or a string

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is string \| number

True if obj is a number and NOT a NaN, or a string

#### Defined in

[types.ts:151](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L151)

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

[types.ts:40](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L40)

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

[types.ts:28](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L28)

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

> }

#### Defined in

[types.ts:384](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L384)

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

> }

#### Defined in

[types.ts:407](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L407)

---

### isPromise

▸ **isPromise**<`T`\>(`obj`): obj is Promise<T\>

Type check function for a Promise<T>, though T is (and can't be...) validated.
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

[types.ts:420](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L420)

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

[types.ts:204](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L204)

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

[types.ts:220](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L220)

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

[types.ts:363](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L363)

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

[types.ts:375](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L375)

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

[types.ts:500](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L500)

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

[types.ts:562](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L562)

---

### isString

▸ **isString**(`obj`): obj is string

Type check for a string

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `obj` | `unknown` |

#### Returns

obj is string

True if obj is a string

#### Defined in

[types.ts:82](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L82)

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

[types.ts:428](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L428)

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

[types.ts:18](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L18)

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

[types.ts:307](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L307)

---

### toString

▸ **toString**(`obj`, `notStr?`): `string`

Type coercion to a string. Will try to _lightly_ coerce the thing to a string if possible.

#### Parameters

| Name     | Type      | Default value |
| :------- | :-------- | :------------ |
| `obj`    | `unknown` | `undefined`   |
| `notStr` | `string`  | `''`          |

#### Returns

`string`

either obj, obj.toString(), or notStr

#### Defined in

[types.ts:103](https://github.com/kevinfrei/core-utils/blob/650e237/src/types.ts#L103)
