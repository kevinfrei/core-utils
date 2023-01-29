@freik/core-utils

# @freik/core-utils

## Table of contents

### Namespaces

- [Helpers](modules/Helpers.md)
- [Operations](modules/Operations.md)
- [Type](modules/Type.md)

### Interfaces

- [Container](interfaces/Container.md)
- [MultiMap](interfaces/MultiMap.md)

### Type Aliases

- [LogCreator](README.md#logcreator)
- [LogType](README.md#logtype)
- [ReaderWriter](README.md#readerwriter)
- [SeqNumGenerator](README.md#seqnumgenerator)
- [SimpleObject](README.md#simpleobject)
- [SyncFunc](README.md#syncfunc)
- [TypeCheckPair](README.md#typecheckpair)
- [Waiter](README.md#waiter)
- [typecheck](README.md#typecheck)

### Variables

- [FreikTypeTag](README.md#freiktypetag)

### Functions

- [DebouncedDelay](README.md#debounceddelay)
- [DebouncedEvery](README.md#debouncedevery)
- [FromB64](README.md#fromb64)
- [FromPathSafeName](README.md#frompathsafename)
- [FromU8](README.md#fromu8)
- [Logger](README.md#logger)
- [MakeError](README.md#makeerror)
- [MakeLogger](README.md#makelogger)
- [MakeMultiMap](README.md#makemultimap)
- [MakePriorityQueue](README.md#makepriorityqueue)
- [MakeQueue](README.md#makequeue)
- [MakeReaderWriter](README.md#makereaderwriter)
- [MakeSeqNum](README.md#makeseqnum)
- [MakeSingleWaiter](README.md#makesinglewaiter)
- [MakeStack](README.md#makestack)
- [MakeWaiter](README.md#makewaiter)
- [MakeWaitingQueue](README.md#makewaitingqueue)
- [MaybeWait](README.md#maybewait)
- [OnlyOneActive](README.md#onlyoneactive)
- [OnlyOneActiveQueue](README.md#onlyoneactivequeue)
- [OnlyOneWaiting](README.md#onlyonewaiting)
- [Pickle](README.md#pickle)
- [RegisterForPickling](README.md#registerforpickling)
- [SafelyUnpickle](README.md#safelyunpickle)
- [SeqNum](README.md#seqnum)
- [Sleep](README.md#sleep)
- [StringUnion](README.md#stringunion)
- [ToB64](README.md#tob64)
- [ToPathSafeName](README.md#topathsafename)
- [ToU8](README.md#tou8)
- [Unpickle](README.md#unpickle)
- [UnsafelyUnpickle](README.md#unsafelyunpickle)

## Type Aliases

### LogCreator

Ƭ **LogCreator**: `Object`

#### Call signature

▸ (`id?`, `enabledByDefault?`): (...`args`: `unknown`[]) => `void`

##### Parameters

| Name                | Type      |
| :------------------ | :-------- |
| `id?`               | `string`  |
| `enabledByDefault?` | `boolean` |

##### Returns

`fn`

▸ (...`args`): `void`

##### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `...args` | `unknown`[] |

##### Returns

`void`

| Name        | Type                       |
| :---------- | :------------------------- |
| `disable`   | () => `void`               |
| `enable`    | () => `void`               |
| `getId`     | () => `string` \| `symbol` |
| `isEnabled` | () => `boolean`            |

#### Type declaration

| Name      | Type                                   |
| :-------- | :------------------------------------- |
| `all`     | () => `void`                           |
| `disable` | (`id`: `string` \| `symbol`) => `void` |
| `enable`  | (`id`: `string` \| `symbol`) => `void` |
| `none`    | () => `void`                           |
| `restore` | () => `void`                           |

#### Defined in

[logger.ts:108](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/logger.ts#L108)

---

### LogType

Ƭ **LogType**: `Object`

#### Call signature

▸ (`id`, ...`args`): `void`

**`Deprecated`**

Use [`MakeLogger`](README.md#makelogger) instead

##### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `id`      | `unknown`   |
| `...args` | `unknown`[] |

##### Returns

`void`

#### Type declaration

| Name           | Type                                                                             |
| :------------- | :------------------------------------------------------------------------------- |
| `bind`         | (`id`: `unknown`, `isEnabled?`: `boolean`) => (...`args`: `unknown`[]) => `void` |
| `defaultToOff` | () => `void`                                                                     |
| `defaultToOn`  | () => `void`                                                                     |
| `disable`      | (`id`: `unknown`) => `void`                                                      |
| `enable`       | (`id`: `unknown`) => `void`                                                      |
| `isDisabled`   | (`id`: `unknown`) => `boolean`                                                   |
| `isEnabled`    | (`id`: `unknown`) => `boolean`                                                   |

#### Defined in

[logger.ts:9](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/logger.ts#L9)

---

### ReaderWriter

Ƭ **ReaderWriter**: `Object`

#### Type declaration

| Name         | Type                     |
| :----------- | :----------------------- |
| `leaveRead`  | () => `void`             |
| `leaveWrite` | () => `void`             |
| `read`       | () => `Promise`<`void`\> |
| `write`      | () => `Promise`<`void`\> |

#### Defined in

[public-defs.ts:24](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L24)

---

### SeqNumGenerator

Ƭ **SeqNumGenerator**: `Object`

#### Call signature

▸ (): `string`

##### Returns

`string`

#### Type declaration

| Name         | Type                                       |
| :----------- | :----------------------------------------- |
| `keyCompare` | (`a`: `string`, `b`: `string`) => `number` |

#### Defined in

[public-defs.ts:12](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L12)

---

### SimpleObject

Ƭ **SimpleObject**: `undefined` \| `string` \| `number` \| `boolean` \| `null` \| { `[key: string]`: [`SimpleObject`](README.md#simpleobject); } \| [`SimpleObject`](README.md#simpleobject)[]

#### Defined in

[public-defs.ts:3](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L3)

---

### SyncFunc

Ƭ **SyncFunc**<`T`\>: `Object`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Call signature

▸ (): `Promise`<`T`\>

##### Returns

`Promise`<`T`\>

#### Type declaration

| Name      | Type                     |
| :-------- | :----------------------- |
| `trigger` | () => `Promise`<`void`\> |

#### Defined in

[public-defs.ts:31](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L31)

---

### TypeCheckPair

Ƭ **TypeCheckPair**: [`string`, (`val`: `unknown`) => `boolean`]

#### Defined in

[public-defs.ts:39](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L39)

---

### Waiter

Ƭ **Waiter**: `Object`

#### Type declaration

| Name      | Type                        |
| :-------- | :-------------------------- |
| `block`   | () => `boolean`             |
| `blocked` | () => `boolean`             |
| `leave`   | () => `void`                |
| `wait`    | () => `Promise`<`boolean`\> |

#### Defined in

[public-defs.ts:17](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L17)

---

### typecheck

Ƭ **typecheck**<`T`\>: (`val`: `any`) => val is T

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Type declaration

▸ (`val`): val is T

##### Parameters

| Name  | Type  |
| :---- | :---- |
| `val` | `any` |

##### Returns

val is T

#### Defined in

[public-defs.ts:37](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L37)

## Variables

### FreikTypeTag

• `Const` **FreikTypeTag**: typeof [`FreikTypeTag`](README.md#freiktypetag)

#### Defined in

[public-defs.ts:1](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L1)

## Functions

### DebouncedDelay

▸ **DebouncedDelay**(`func`, `timeout`): () => `void`

This invokes func no _sooner_ than `timeout` milliseconds in the future, but
will restarts the timer every time the function is invoked, so if you call it
every timeout-1 milliseconds, it will never invoke the function

#### Parameters

| Name      | Type                      |
| :-------- | :------------------------ |
| `func`    | `MaybeAsyncFunc`<`void`\> |
| `timeout` | `number`                  |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[Sync.ts:288](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Sync.ts#L288)

---

### DebouncedEvery

▸ **DebouncedEvery**(`func`, `timeout`): () => `void`

This invokes func every `timeout` milliseconds in the future, so if you call
it before the timer has completed, it does nothing. Logically, it "buffers"
invocations, flushing the buffer every X ms.

WARNING: func must be re-entrant-safe!

#### Parameters

| Name      | Type                      |
| :-------- | :------------------------ |
| `func`    | `MaybeAsyncFunc`<`void`\> |
| `timeout` | `number`                  |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[Sync.ts:315](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Sync.ts#L315)

---

### FromB64

▸ **FromB64**(`val`): `number`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `val` | `string` |

#### Returns

`number`

#### Defined in

[translation.ts:131](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/translation.ts#L131)

---

### FromPathSafeName

▸ **FromPathSafeName**(`safe`): `string`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `safe` | `string` |

#### Returns

`string`

#### Defined in

[translation.ts:27](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/translation.ts#L27)

---

### FromU8

▸ **FromU8**(`val`): `number`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `val` | `string` |

#### Returns

`number`

#### Defined in

[translation.ts:90](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/translation.ts#L90)

---

### Logger

▸ **Logger**(`id`, ...`args`): `void`

**`Deprecated`**

Use [`MakeLogger`](README.md#makelogger) instead

#### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `id`      | `unknown`   |
| `...args` | `unknown`[] |

#### Returns

`void`

#### Defined in

[logger.ts:10](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/logger.ts#L10)

---

### MakeError

▸ **MakeError**(`id?`, `enabledByDefault?`): (...`args`: `unknown`[]) => `void`

**`Function`**

#### Parameters

| Name                | Type      |
| :------------------ | :-------- |
| `id?`               | `string`  |
| `enabledByDefault?` | `boolean` |

#### Returns

`fn`

▸ (...`args`): `void`

##### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `...args` | `unknown`[] |

##### Returns

`void`

| Name        | Type                       |
| :---------- | :------------------------- |
| `disable`   | () => `void`               |
| `enable`    | () => `void`               |
| `getId`     | () => `string` \| `symbol` |
| `isEnabled` | () => `boolean`            |

#### Defined in

[logger.ts:109](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/logger.ts#L109)

---

### MakeLogger

▸ **MakeLogger**(`id?`, `enabledByDefault?`): (...`args`: `unknown`[]) => `void`

**`Function`**

#### Parameters

| Name                | Type      |
| :------------------ | :-------- |
| `id?`               | `string`  |
| `enabledByDefault?` | `boolean` |

#### Returns

`fn`

▸ (...`args`): `void`

##### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `...args` | `unknown`[] |

##### Returns

`void`

| Name        | Type                       |
| :---------- | :------------------------- |
| `disable`   | () => `void`               |
| `enable`    | () => `void`               |
| `getId`     | () => `string` \| `symbol` |
| `isEnabled` | () => `boolean`            |

#### Defined in

[logger.ts:109](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/logger.ts#L109)

---

### MakeMultiMap

▸ **MakeMultiMap**<`K`, `V`\>(`entries?`): [`MultiMap`](interfaces/MultiMap.md)<`K`, `V`\>

#### Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

#### Parameters

| Name       | Type                                        |
| :--------- | :------------------------------------------ |
| `entries?` | readonly readonly [`K`, `Iterable`<`V`\>][] |

#### Returns

[`MultiMap`](interfaces/MultiMap.md)<`K`, `V`\>

#### Defined in

[multimap.ts:7](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/multimap.ts#L7)

---

### MakePriorityQueue

▸ **MakePriorityQueue**<`T`\>(`defaultPriority?`): [`Container`](interfaces/Container.md)<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name               | Type     |
| :----------------- | :------- |
| `defaultPriority?` | `number` |

#### Returns

[`Container`](interfaces/Container.md)<`T`\>

#### Defined in

[Containers.ts:76](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Containers.ts#L76)

---

### MakeQueue

▸ **MakeQueue**<`T`\>(...`items`): [`Container`](interfaces/Container.md)<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `...items` | `T`[] |

#### Returns

[`Container`](interfaces/Container.md)<`T`\>

#### Defined in

[Containers.ts:3](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Containers.ts#L3)

---

### MakeReaderWriter

▸ **MakeReaderWriter**(`delay?`): [`ReaderWriter`](README.md#readerwriter)

#### Parameters

| Name    | Type     | Default value |
| :------ | :------- | :------------ |
| `delay` | `number` | `1`           |

#### Returns

[`ReaderWriter`](README.md#readerwriter)

#### Defined in

[Sync.ts:113](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Sync.ts#L113)

---

### MakeSeqNum

▸ **MakeSeqNum**(`prefix?`, `resume?`): [`SeqNumGenerator`](README.md#seqnumgenerator)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `prefix?` | `string` |
| `resume?` | `string` |

#### Returns

[`SeqNumGenerator`](README.md#seqnumgenerator)

#### Defined in

[SeqNum.ts:8](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/SeqNum.ts#L8)

---

### MakeSingleWaiter

▸ **MakeSingleWaiter**(`delay?`): [`Waiter`](README.md#waiter)

#### Parameters

| Name    | Type     | Default value |
| :------ | :------- | :------------ |
| `delay` | `number` | `10`          |

#### Returns

[`Waiter`](README.md#waiter)

#### Defined in

[Sync.ts:78](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Sync.ts#L78)

---

### MakeStack

▸ **MakeStack**<`T`\>(...`items`): [`Container`](interfaces/Container.md)<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `...items` | `T`[] |

#### Returns

[`Container`](interfaces/Container.md)<`T`\>

#### Defined in

[Containers.ts:39](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Containers.ts#L39)

---

### MakeWaiter

▸ **MakeWaiter**(`delay?`): [`Waiter`](README.md#waiter)

#### Parameters

| Name    | Type     | Default value |
| :------ | :------- | :------------ |
| `delay` | `number` | `10`          |

#### Returns

[`Waiter`](README.md#waiter)

#### Defined in

[Sync.ts:19](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Sync.ts#L19)

---

### MakeWaitingQueue

▸ **MakeWaitingQueue**(`delay?`): [`Waiter`](README.md#waiter)

#### Parameters

| Name    | Type     | Default value |
| :------ | :------- | :------------ |
| `delay` | `number` | `10`          |

#### Returns

[`Waiter`](README.md#waiter)

#### Defined in

[Sync.ts:44](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Sync.ts#L44)

---

### MaybeWait

▸ **MaybeWait**<`T`\>(`func`): `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name   | Type                   |
| :----- | :--------------------- |
| `func` | `MaybeAsyncFunc`<`T`\> |

#### Returns

`Promise`<`T`\>

#### Defined in

[Sync.ts:272](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Sync.ts#L272)

---

### OnlyOneActive

▸ **OnlyOneActive**(`func`, `delay?`): [`SyncFunc`](README.md#syncfunc)<`void`\>

#### Parameters

| Name    | Type                      | Default value |
| :------ | :------------------------ | :------------ |
| `func`  | `MaybeAsyncFunc`<`void`\> | `undefined`   |
| `delay` | `number`                  | `10`          |

#### Returns

[`SyncFunc`](README.md#syncfunc)<`void`\>

#### Defined in

[Sync.ts:208](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Sync.ts#L208)

---

### OnlyOneActiveQueue

▸ **OnlyOneActiveQueue**(`func`, `delay?`): [`SyncFunc`](README.md#syncfunc)<`void`\>

#### Parameters

| Name    | Type                      | Default value |
| :------ | :------------------------ | :------------ |
| `func`  | `MaybeAsyncFunc`<`void`\> | `undefined`   |
| `delay` | `number`                  | `10`          |

#### Returns

[`SyncFunc`](README.md#syncfunc)<`void`\>

#### Defined in

[Sync.ts:228](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Sync.ts#L228)

---

### OnlyOneWaiting

▸ **OnlyOneWaiting**(`func`, `delay?`): [`SyncFunc`](README.md#syncfunc)<`boolean`\>

#### Parameters

| Name    | Type                      | Default value |
| :------ | :------------------------ | :------------ |
| `func`  | `MaybeAsyncFunc`<`void`\> | `undefined`   |
| `delay` | `number`                  | `10`          |

#### Returns

[`SyncFunc`](README.md#syncfunc)<`boolean`\>

#### Defined in

[Sync.ts:248](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Sync.ts#L248)

---

### Pickle

▸ **Pickle**(`input`): `string`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `input` | `unknown` |

#### Returns

`string`

#### Defined in

[Pickle.ts:187](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Pickle.ts#L187)

---

### RegisterForPickling

▸ **RegisterForPickling**<`T`\>(`pickleTag`, `fromString`, `toString?`): `void`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type             |
| :----------- | :--------------- |
| `pickleTag`  | `symbol`         |
| `fromString` | `FromFlat`<`T`\> |
| `toString?`  | `ToFlat`<`T`\>   |

#### Returns

`void`

#### Defined in

[Pickle.ts:208](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Pickle.ts#L208)

---

### SafelyUnpickle

▸ **SafelyUnpickle**<`T`\>(`input`, `check`): `T` \| `undefined`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                     |
| :------ | :--------------------------------------- |
| `input` | `string`                                 |
| `check` | [`typecheck`](README.md#typecheck)<`T`\> |

#### Returns

`T` \| `undefined`

#### Defined in

[Pickle.ts:199](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Pickle.ts#L199)

---

### SeqNum

▸ **SeqNum**(`prefix?`, `resume?`): [`SeqNumGenerator`](README.md#seqnumgenerator)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `prefix?` | `string` |
| `resume?` | `string` |

#### Returns

[`SeqNumGenerator`](README.md#seqnumgenerator)

#### Defined in

[SeqNum.ts:8](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/SeqNum.ts#L8)

---

### Sleep

▸ **Sleep**(`milliseconds`): `Promise`<`void`\>

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `milliseconds` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[Sync.ts:9](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Sync.ts#L9)

---

### StringUnion

▸ **StringUnion**<`UnionType`\>(...`values`): `Readonly`<{ `check`: (`value`: `string`) => `UnionType` ; `guard`: (`value`: `string`) => value is UnionType ; `values`: `UnionType`[] } & { `type`: `UnionType` }\>

#### Type parameters

| Name        | Type             |
| :---------- | :--------------- |
| `UnionType` | extends `string` |

#### Parameters

| Name        | Type          |
| :---------- | :------------ |
| `...values` | `UnionType`[] |

#### Returns

`Readonly`<{ `check`: (`value`: `string`) => `UnionType` ; `guard`: (`value`: `string`) => value is UnionType ; `values`: `UnionType`[] } & { `type`: `UnionType` }\>

#### Defined in

[public-defs.ts:83](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/public-defs.ts#L83)

---

### ToB64

▸ **ToB64**(`val`): `string`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `val` | `number` |

#### Returns

`string`

#### Defined in

[translation.ts:104](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/translation.ts#L104)

---

### ToPathSafeName

▸ **ToPathSafeName**(`name`): `string`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[translation.ts:1](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/translation.ts#L1)

---

### ToU8

▸ **ToU8**(`val`): `string`

#### Parameters

| Name  | Type     | Description         |
| :---- | :------- | :------------------ |
| `val` | `number` | An unsigned integer |

#### Returns

`string`

A string encoding of the value in 4 (or fewer) characters

#### Defined in

[translation.ts:73](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/translation.ts#L73)

---

### Unpickle

▸ **Unpickle**(`input`): `unknown`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `input` | `string` |

#### Returns

`unknown`

#### Defined in

[Pickle.ts:191](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Pickle.ts#L191)

---

### UnsafelyUnpickle

▸ **UnsafelyUnpickle**<`T`\>(`input`): `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `input` | `string` |

#### Returns

`T`

#### Defined in

[Pickle.ts:195](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Pickle.ts#L195)
