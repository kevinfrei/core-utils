[@freik/core-utils](../README.md) / MultiMap

# Interface: MultiMap<K, V\>

## Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

## Table of contents

### Properties

- [[FreikTypeTag]](MultiMap.md#[freiktypetag])
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

### Methods

- [[iterator]](MultiMap.md#[iterator])

## Properties

### [FreikTypeTag]

• **[FreikTypeTag]**: `symbol`

#### Defined in

[public-defs.ts:61](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L61)

---

### add

• **add**: (`key`: `K`, `vals`: `Iterable`<`V`\>) => [`MultiMap`](MultiMap.md)<`K`, `V`\>

#### Type declaration

▸ (`key`, `vals`): [`MultiMap`](MultiMap.md)<`K`, `V`\>

##### Parameters

| Name   | Type             |
| :----- | :--------------- |
| `key`  | `K`              |
| `vals` | `Iterable`<`V`\> |

##### Returns

[`MultiMap`](MultiMap.md)<`K`, `V`\>

#### Defined in

[public-defs.ts:58](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L58)

---

### clear

• **clear**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[public-defs.ts:42](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L42)

---

### delete

• **delete**: (`key`: `K`) => `boolean`

#### Type declaration

▸ (`key`): `boolean`

##### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |

##### Returns

`boolean`

#### Defined in

[public-defs.ts:44](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L44)

---

### forEach

• **forEach**: (`fn`: (`val`: `Set`<`V`\>, `keyList`: `K`, `multiMap`: [`MultiMap`](MultiMap.md)<`K`, `V`\>) => `void`, `thisArg?`: `any`) => `void`

#### Type declaration

▸ (`fn`, `thisArg?`): `void`

##### Parameters

| Name       | Type                                                                                             |
| :--------- | :----------------------------------------------------------------------------------------------- |
| `fn`       | (`val`: `Set`<`V`\>, `keyList`: `K`, `multiMap`: [`MultiMap`](MultiMap.md)<`K`, `V`\>) => `void` |
| `thisArg?` | `any`                                                                                            |

##### Returns

`void`

#### Defined in

[public-defs.ts:47](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L47)

---

### forEachAwaitable

• **forEachAwaitable**: (`fn`: (`val`: `Set`<`V`\>, `keyList`: `K`, `multiMap`: [`MultiMap`](MultiMap.md)<`K`, `V`\>) => `Promise`<`void`\>, `thisArg?`: `any`) => `Promise`<`void`\>

#### Type declaration

▸ (`fn`, `thisArg?`): `Promise`<`void`\>

##### Parameters

| Name       | Type                                                                                                         |
| :--------- | :----------------------------------------------------------------------------------------------------------- |
| `fn`       | (`val`: `Set`<`V`\>, `keyList`: `K`, `multiMap`: [`MultiMap`](MultiMap.md)<`K`, `V`\>) => `Promise`<`void`\> |
| `thisArg?` | `any`                                                                                                        |

##### Returns

`Promise`<`void`\>

#### Defined in

[public-defs.ts:51](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L51)

---

### get

• **get**: (`key`: `K`) => `undefined` \| `Set`<`V`\>

#### Type declaration

▸ (`key`): `undefined` \| `Set`<`V`\>

##### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |

##### Returns

`undefined` \| `Set`<`V`\>

#### Defined in

[public-defs.ts:55](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L55)

---

### has

• **has**: (`key`: `K`) => `boolean`

#### Type declaration

▸ (`key`): `boolean`

##### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |

##### Returns

`boolean`

#### Defined in

[public-defs.ts:56](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L56)

---

### keys

• **keys**: () => `IterableIterator`<`K`\>

#### Type declaration

▸ (): `IterableIterator`<`K`\>

##### Returns

`IterableIterator`<`K`\>

#### Defined in

[public-defs.ts:46](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L46)

---

### remove

• **remove**: (`key`: `K`, `value`: `V`) => `boolean`

#### Type declaration

▸ (`key`, `value`): `boolean`

##### Parameters

| Name    | Type |
| :------ | :--- |
| `key`   | `K`  |
| `value` | `V`  |

##### Returns

`boolean`

#### Defined in

[public-defs.ts:45](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L45)

---

### set

• **set**: (`key`: `K`, `val`: `V`) => [`MultiMap`](MultiMap.md)<`K`, `V`\>

#### Type declaration

▸ (`key`, `val`): [`MultiMap`](MultiMap.md)<`K`, `V`\>

##### Parameters

| Name  | Type |
| :---- | :--- |
| `key` | `K`  |
| `val` | `V`  |

##### Returns

[`MultiMap`](MultiMap.md)<`K`, `V`\>

#### Defined in

[public-defs.ts:57](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L57)

---

### size

• **size**: () => `number`

#### Type declaration

▸ (): `number`

##### Returns

`number`

#### Defined in

[public-defs.ts:43](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L43)

---

### toJSON

• **toJSON**: () => [`K`, `IterableIterator`<`V`\>][]

#### Type declaration

▸ (): [`K`, `IterableIterator`<`V`\>][]

##### Returns

[`K`, `IterableIterator`<`V`\>][]

#### Defined in

[public-defs.ts:62](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L62)

---

### valueEqual

• **valueEqual**: (`map`: [`MultiMap`](MultiMap.md)<`K`, `V`\>) => `boolean`

#### Type declaration

▸ (`map`): `boolean`

##### Parameters

| Name  | Type                                 |
| :---- | :----------------------------------- |
| `map` | [`MultiMap`](MultiMap.md)<`K`, `V`\> |

##### Returns

`boolean`

#### Defined in

[public-defs.ts:59](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L59)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<[`K`, `IterableIterator`<`V`\>]\>

#### Returns

`IterableIterator`<[`K`, `IterableIterator`<`V`\>]\>

#### Defined in

[public-defs.ts:60](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L60)
