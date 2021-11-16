[@freik/core-utils](README.md) / Exports

# @freik/core-utils

## Table of contents

### Namespaces

- [Helpers](modules/Helpers.md)
- [ObjUtil](modules/ObjUtil.md)
- [Operations](modules/Operations.md)
- [Type](modules/Type.md)

### Interfaces

- [Container](interfaces/Container.md)
- [MultiMap](interfaces/MultiMap.md)

### Type aliases

- [LogCreator](modules.md#logcreator)
- [LogType](modules.md#logtype)
- [ReaderWriter](modules.md#readerwriter)
- [SeqNumGenerator](modules.md#seqnumgenerator)
- [SimpleObject](modules.md#simpleobject)
- [SyncFunc](modules.md#syncfunc)
- [TypeCheckPair](modules.md#typecheckpair)
- [Waiter](modules.md#waiter)
- [typecheck](modules.md#typecheck)

### Variables

- [FreikTypeTag](modules.md#freiktypetag)
- [Logger](modules.md#logger)
- [MakeError](modules.md#makeerror)
- [MakeLogger](modules.md#makelogger)

### Functions

- [DebouncedDelay](modules.md#debounceddelay)
- [DebouncedEvery](modules.md#debouncedevery)
- [FromB64](modules.md#fromb64)
- [FromPathSafeName](modules.md#frompathsafename)
- [FromU8](modules.md#fromu8)
- [MakeMultiMap](modules.md#makemultimap)
- [MakePriorityQueue](modules.md#makepriorityqueue)
- [MakeQueue](modules.md#makequeue)
- [MakeReaderWriter](modules.md#makereaderwriter)
- [MakeSeqNum](modules.md#makeseqnum)
- [MakeSingleWaiter](modules.md#makesinglewaiter)
- [MakeStack](modules.md#makestack)
- [MakeWaiter](modules.md#makewaiter)
- [MakeWaitingQueue](modules.md#makewaitingqueue)
- [MaybeWait](modules.md#maybewait)
- [OnlyOneActive](modules.md#onlyoneactive)
- [OnlyOneActiveQueue](modules.md#onlyoneactivequeue)
- [OnlyOneWaiting](modules.md#onlyonewaiting)
- [Pickle](modules.md#pickle)
- [RegisterForPickling](modules.md#registerforpickling)
- [SafelyUnpickle](modules.md#safelyunpickle)
- [SeqNum](modules.md#seqnum)
- [Sleep](modules.md#sleep)
- [ToB64](modules.md#tob64)
- [ToPathSafeName](modules.md#topathsafename)
- [ToU8](modules.md#tou8)
- [Unpickle](modules.md#unpickle)
- [UnsafelyUnpickle](modules.md#unsafelyunpickle)

## Type aliases

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

[logger.ts:108](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/logger.ts#L108)

---

### LogType

Ƭ **LogType**: `Object`

#### Call signature

▸ (`id`, ...`args`): `void`

**`deprecated`** Use [`MakeLogger`](modules.md#makelogger) instead

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

[logger.ts:9](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/logger.ts#L9)

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

[public-defs.ts:24](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L24)

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

[public-defs.ts:12](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L12)

---

### SimpleObject

Ƭ **SimpleObject**: `undefined` \| `string` \| `number` \| `boolean` \| `null` \| { [key: string]: [`SimpleObject`](modules.md#simpleobject); } \| [`SimpleObject`](modules.md#simpleobject)[]

#### Defined in

[public-defs.ts:3](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L3)

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

[public-defs.ts:31](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L31)

---

### TypeCheckPair

Ƭ **TypeCheckPair**: [`string`, (`val`: `unknown`) => `boolean`]

#### Defined in

[public-defs.ts:39](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L39)

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

[public-defs.ts:17](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L17)

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

[public-defs.ts:37](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L37)

## Variables

### FreikTypeTag

• **FreikTypeTag**: typeof [`FreikTypeTag`](modules.md#freiktypetag)

#### Defined in

[public-defs.ts:1](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/public-defs.ts#L1)

---

### Logger

• **Logger**: [`LogType`](modules.md#logtype) = `Log`

**`deprecated`** Use [`MakeLogger`](modules.md#makelogger) instead

#### Defined in

[logger.ts:79](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/logger.ts#L79)

---

### MakeError

• **MakeError**: [`LogCreator`](modules.md#logcreator)

**`function`**

#### Defined in

[logger.ts:171](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/logger.ts#L171)

---

### MakeLogger

• **MakeLogger**: [`LogCreator`](modules.md#logcreator)

**`function`**

#### Defined in

[logger.ts:169](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/logger.ts#L169)

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

This invokes func no _sooner_ than `timeout` milliseconds in the future, but
will restarts the timer every time the function is invoked, so if you call it
every timeout-1 milliseconds, it will never invoke the function

##### Returns

`void`

#### Defined in

[Sync.ts:288](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Sync.ts#L288)

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

This invokes func every `timeout` milliseconds in the future, so if you call
it before the timer has completed, it does nothing. Logically, it "buffers"
invocations, flushing the buffer every X ms.

WARNING: func must be re-entrant-safe!

##### Returns

`void`

#### Defined in

[Sync.ts:315](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Sync.ts#L315)

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

[translation.ts:131](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/translation.ts#L131)

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

[translation.ts:27](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/translation.ts#L27)

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

[translation.ts:90](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/translation.ts#L90)

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

[multimap.ts:7](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/multimap.ts#L7)

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

[Containers.ts:76](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Containers.ts#L76)

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

[Containers.ts:3](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Containers.ts#L3)

---

### MakeReaderWriter

▸ **MakeReaderWriter**(`delay?`): [`ReaderWriter`](modules.md#readerwriter)

#### Parameters

| Name    | Type     | Default value |
| :------ | :------- | :------------ |
| `delay` | `number` | `1`           |

#### Returns

[`ReaderWriter`](modules.md#readerwriter)

#### Defined in

[Sync.ts:113](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Sync.ts#L113)

---

### MakeSeqNum

▸ `Const` **MakeSeqNum**(`prefix?`, `resume?`): [`SeqNumGenerator`](modules.md#seqnumgenerator)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `prefix?` | `string` |
| `resume?` | `string` |

#### Returns

[`SeqNumGenerator`](modules.md#seqnumgenerator)

#### Defined in

[SeqNum.ts:30](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/SeqNum.ts#L30)

---

### MakeSingleWaiter

▸ **MakeSingleWaiter**(`delay?`): [`Waiter`](modules.md#waiter)

#### Parameters

| Name    | Type     | Default value |
| :------ | :------- | :------------ |
| `delay` | `number` | `10`          |

#### Returns

[`Waiter`](modules.md#waiter)

#### Defined in

[Sync.ts:78](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Sync.ts#L78)

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

[Containers.ts:39](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Containers.ts#L39)

---

### MakeWaiter

▸ **MakeWaiter**(`delay?`): [`Waiter`](modules.md#waiter)

#### Parameters

| Name    | Type     | Default value |
| :------ | :------- | :------------ |
| `delay` | `number` | `10`          |

#### Returns

[`Waiter`](modules.md#waiter)

#### Defined in

[Sync.ts:19](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Sync.ts#L19)

---

### MakeWaitingQueue

▸ **MakeWaitingQueue**(`delay?`): [`Waiter`](modules.md#waiter)

#### Parameters

| Name    | Type     | Default value |
| :------ | :------- | :------------ |
| `delay` | `number` | `10`          |

#### Returns

[`Waiter`](modules.md#waiter)

#### Defined in

[Sync.ts:44](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Sync.ts#L44)

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

[Sync.ts:272](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Sync.ts#L272)

---

### OnlyOneActive

▸ **OnlyOneActive**(`func`, `delay?`): [`SyncFunc`](modules.md#syncfunc)<`void`\>

#### Parameters

| Name    | Type                      | Default value |
| :------ | :------------------------ | :------------ |
| `func`  | `MaybeAsyncFunc`<`void`\> | `undefined`   |
| `delay` | `number`                  | `10`          |

#### Returns

[`SyncFunc`](modules.md#syncfunc)<`void`\>

#### Defined in

[Sync.ts:208](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Sync.ts#L208)

---

### OnlyOneActiveQueue

▸ **OnlyOneActiveQueue**(`func`, `delay?`): [`SyncFunc`](modules.md#syncfunc)<`void`\>

#### Parameters

| Name    | Type                      | Default value |
| :------ | :------------------------ | :------------ |
| `func`  | `MaybeAsyncFunc`<`void`\> | `undefined`   |
| `delay` | `number`                  | `10`          |

#### Returns

[`SyncFunc`](modules.md#syncfunc)<`void`\>

#### Defined in

[Sync.ts:228](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Sync.ts#L228)

---

### OnlyOneWaiting

▸ **OnlyOneWaiting**(`func`, `delay?`): [`SyncFunc`](modules.md#syncfunc)<`boolean`\>

#### Parameters

| Name    | Type                      | Default value |
| :------ | :------------------------ | :------------ |
| `func`  | `MaybeAsyncFunc`<`void`\> | `undefined`   |
| `delay` | `number`                  | `10`          |

#### Returns

[`SyncFunc`](modules.md#syncfunc)<`boolean`\>

#### Defined in

[Sync.ts:248](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Sync.ts#L248)

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

[Pickle.ts:184](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Pickle.ts#L184)

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

[Pickle.ts:205](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Pickle.ts#L205)

---

### SafelyUnpickle

▸ **SafelyUnpickle**<`T`\>(`input`, `check`): `T` \| `undefined`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                      |
| :------ | :---------------------------------------- |
| `input` | `string`                                  |
| `check` | [`typecheck`](modules.md#typecheck)<`T`\> |

#### Returns

`T` \| `undefined`

#### Defined in

[Pickle.ts:196](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Pickle.ts#L196)

---

### SeqNum

▸ **SeqNum**(`prefix?`, `resume?`): [`SeqNumGenerator`](modules.md#seqnumgenerator)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `prefix?` | `string` |
| `resume?` | `string` |

#### Returns

[`SeqNumGenerator`](modules.md#seqnumgenerator)

#### Defined in

[SeqNum.ts:8](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/SeqNum.ts#L8)

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

[Sync.ts:9](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Sync.ts#L9)

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

[translation.ts:104](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/translation.ts#L104)

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

[translation.ts:1](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/translation.ts#L1)

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

[translation.ts:73](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/translation.ts#L73)

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

[Pickle.ts:188](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Pickle.ts#L188)

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

[Pickle.ts:192](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Pickle.ts#L192)
