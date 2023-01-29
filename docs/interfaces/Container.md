[@freik/core-utils](../README.md) / Container

# Interface: Container<T\>

## Type parameters

| Name |
| :--- |
| `T`  |

## Table of contents

### Properties

- [empty](Container.md#empty)
- [peek](Container.md#peek)
- [pop](Container.md#pop)
- [push](Container.md#push)
- [pushMany](Container.md#pushmany)
- [size](Container.md#size)

### Methods

- [[iterator]](Container.md#[iterator])

## Properties

### empty

• **empty**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Defined in

[public-defs.ts:71](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L71)

---

### peek

• **peek**: () => `undefined` \| `T`

#### Type declaration

▸ (): `undefined` \| `T`

##### Returns

`undefined` \| `T`

#### Defined in

[public-defs.ts:70](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L70)

---

### pop

• **pop**: () => `undefined` \| `T`

#### Type declaration

▸ (): `undefined` \| `T`

##### Returns

`undefined` \| `T`

#### Defined in

[public-defs.ts:68](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L68)

---

### push

• **push**: (`item`: `T`, `priority?`: `number`) => `void`

#### Type declaration

▸ (`item`, `priority?`): `void`

##### Parameters

| Name        | Type     |
| :---------- | :------- |
| `item`      | `T`      |
| `priority?` | `number` |

##### Returns

`void`

#### Defined in

[public-defs.ts:66](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L66)

---

### pushMany

• **pushMany**: (`items`: `Iterable`<`T`\>, `priority?`: `number`) => `void`

#### Type declaration

▸ (`items`, `priority?`): `void`

##### Parameters

| Name        | Type             |
| :---------- | :--------------- |
| `items`     | `Iterable`<`T`\> |
| `priority?` | `number`         |

##### Returns

`void`

#### Defined in

[public-defs.ts:67](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L67)

---

### size

• **size**: () => `number`

#### Type declaration

▸ (): `number`

##### Returns

`number`

#### Defined in

[public-defs.ts:69](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L69)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<`T`\>

#### Returns

`IterableIterator`<`T`\>

#### Defined in

[public-defs.ts:72](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L72)
