[@freik/core-utils](../README.md) / [Exports](../modules.md) / MultiMap

# Interface: MultiMap<K, V\>

## Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

## Table of contents

### Properties

- [[FreikTypeTag]](MultiMap.md#[freiktypetag])

### Methods

- [[iterator]](MultiMap.md#[iterator])
- [add](MultiMap.md#add)
- [clear](MultiMap.md#clear)
- [delete](MultiMap.md#delete)
- [forEach](MultiMap.md#foreach)
- [forEachAwaitable](MultiMap.md#foreachawaitable)
- [get](MultiMap.md#get)
- [has](MultiMap.md#has)
- [keys](MultiMap.md#keys)
- [remove](MultiMap.md#remove)
- [set](MultiMap.md#set)
- [size](MultiMap.md#size)
- [toJSON](MultiMap.md#tojson)
- [valueEqual](MultiMap.md#valueequal)

## Properties

### [FreikTypeTag]

• **[FreikTypeTag]**: `symbol`

#### Defined in

[public-defs.ts:61](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L61)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<[`K`, `IterableIterator`<`V`\>]\>

#### Returns

`IterableIterator`<[`K`, `IterableIterator`<`V`\>]\>

#### Defined in

[public-defs.ts:60](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L60)

---

### add

▸ **add**(`key`, `vals`): [`MultiMap`](MultiMap.md)<`K`, `V`\>

#### Parameters

| Name   | Type             |
| :----- | :--------------- |
| `key`  | `K`              |
| `vals` | `Iterable`<`V`\> |

#### Returns

[`MultiMap`](MultiMap.md)<`K`, `V`\>

#### Defined in

[public-defs.ts:58](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L58)

---

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[public-defs.ts:42](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L42)

---

### delete

▸ **delete**(`key`): `boolean`

#### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |

#### Returns

`boolean`

#### Defined in

[public-defs.ts:44](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L44)

---

### forEach

▸ **forEach**(`fn`, `thisArg?`): `void`

#### Parameters

| Name       | Type                                                                                             |
| :--------- | :----------------------------------------------------------------------------------------------- |
| `fn`       | (`val`: `Set`<`V`\>, `keyList`: `K`, `multiMap`: [`MultiMap`](MultiMap.md)<`K`, `V`\>) => `void` |
| `thisArg?` | `any`                                                                                            |

#### Returns

`void`

#### Defined in

[public-defs.ts:47](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L47)

---

### forEachAwaitable

▸ **forEachAwaitable**(`fn`, `thisArg?`): `Promise`<`void`\>

#### Parameters

| Name       | Type                                                                                                         |
| :--------- | :----------------------------------------------------------------------------------------------------------- |
| `fn`       | (`val`: `Set`<`V`\>, `keyList`: `K`, `multiMap`: [`MultiMap`](MultiMap.md)<`K`, `V`\>) => `Promise`<`void`\> |
| `thisArg?` | `any`                                                                                                        |

#### Returns

`Promise`<`void`\>

#### Defined in

[public-defs.ts:51](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L51)

---

### get

▸ **get**(`key`): `undefined` \| `Set`<`V`\>

#### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |

#### Returns

`undefined` \| `Set`<`V`\>

#### Defined in

[public-defs.ts:55](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L55)

---

### has

▸ **has**(`key`): `boolean`

#### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |

#### Returns

`boolean`

#### Defined in

[public-defs.ts:56](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L56)

---

### keys

▸ **keys**(): `IterableIterator`<`K`\>

#### Returns

`IterableIterator`<`K`\>

#### Defined in

[public-defs.ts:46](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L46)

---

### remove

▸ **remove**(`key`, `value`): `boolean`

#### Parameters

| Name    | Type |
| :------ | :--- |
| `key`   | `K`  |
| `value` | `V`  |

#### Returns

`boolean`

#### Defined in

[public-defs.ts:45](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L45)

---

### set

▸ **set**(`key`, `val`): [`MultiMap`](MultiMap.md)<`K`, `V`\>

#### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |
| `val` | `V`  |

#### Returns

[`MultiMap`](MultiMap.md)<`K`, `V`\>

#### Defined in

[public-defs.ts:57](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L57)

---

### size

▸ **size**(): `number`

#### Returns

`number`

#### Defined in

[public-defs.ts:43](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L43)

---

### toJSON

▸ **toJSON**(): [`K`, `IterableIterator`<`V`\>][]

#### Returns

[`K`, `IterableIterator`<`V`\>][]

#### Defined in

[public-defs.ts:62](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L62)

---

### valueEqual

▸ **valueEqual**(`map`): `boolean`

#### Parameters

| Name  | Type                                 |
| :---- | :----------------------------------- |
| `map` | [`MultiMap`](MultiMap.md)<`K`, `V`\> |

#### Returns

`boolean`

#### Defined in

[public-defs.ts:59](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L59)
