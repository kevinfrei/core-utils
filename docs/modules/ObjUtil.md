[@freik/core-utils](../README.md) / [Exports](../modules.md) / ObjUtil

# Namespace: ObjUtil

## Table of contents

### Functions

- [arrayEqual](ObjUtil.md#arrayequal)
- [has](ObjUtil.md#has)
- [hasStr](ObjUtil.md#hasstr)
- [mapEqual](ObjUtil.md#mapequal)
- [objEqual](ObjUtil.md#objequal)
- [objToMap](ObjUtil.md#objtomap)
- [prefixObj](ObjUtil.md#prefixobj)
- [setEqual](ObjUtil.md#setequal)
- [valEqual](ObjUtil.md#valequal)

## Functions

### arrayEqual

▸ **arrayEqual**(`x`, `y`): `boolean`

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `x`  | `unknown`[] |
| `y`  | `unknown`[] |

#### Returns

`boolean`

#### Defined in

[object.ts:48](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/object.ts#L48)

---

### has

▸ **has**<`K`\>(`key`, `x`): x is { [key in string]: unknown }

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `key` | `K`       |
| `x`   | `unknown` |

#### Returns

x is { [key in string]: unknown }

#### Defined in

[object.ts:17](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/object.ts#L17)

---

### hasStr

▸ **hasStr**<`K`\>(`key`, `x`): x is { [key in string]: string }

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `key` | `K`       |
| `x`   | `unknown` |

#### Returns

x is { [key in string]: string }

#### Defined in

[object.ts:26](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/object.ts#L26)

---

### mapEqual

▸ **mapEqual**(`x`, `y`): `boolean`

#### Parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `x`  | `Map`<`unknown`, `unknown`\> |
| `y`  | `Map`<`unknown`, `unknown`\> |

#### Returns

`boolean`

#### Defined in

[object.ts:56](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/object.ts#L56)

---

### objEqual

▸ **objEqual**(`a`, `b`): `boolean`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `a`  | `Object` |
| `b`  | `Object` |

#### Returns

`boolean`

#### Defined in

[object.ts:84](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/object.ts#L84)

---

### objToMap

▸ **objToMap**(`o`): `Map`<`string`, `string`\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `o`  | `Object` |

#### Returns

`Map`<`string`, `string`\>

#### Defined in

[object.ts:34](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/object.ts#L34)

---

### prefixObj

▸ **prefixObj**(`str`, `obj`): `string`[]

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |
| `obj` | `Object` |

#### Returns

`string`[]

#### Defined in

[object.ts:3](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/object.ts#L3)

---

### setEqual

▸ **setEqual**(`x`, `y`): `boolean`

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `x`  | `Set`<`unknown`\> |
| `y`  | `Set`<`unknown`\> |

#### Returns

`boolean`

#### Defined in

[object.ts:68](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/object.ts#L68)

---

### valEqual

▸ **valEqual**(`x`, `y`): `boolean`

#### Parameters

| Name | Type      |
| :--- | :-------- |
| `x`  | `unknown` |
| `y`  | `unknown` |

#### Returns

`boolean`

#### Defined in

[object.ts:104](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/object.ts#L104)
