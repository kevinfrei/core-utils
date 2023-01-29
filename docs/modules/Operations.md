[@freik/core-utils](../README.md) / Operations

# Namespace: Operations

## Table of contents

### Functions

- [ArrayEqual](Operations.md#arrayequal)
- [ArrayIntersection](Operations.md#arrayintersection)
- [ArraySetEqual](Operations.md#arraysetequal)
- [MapEqual](Operations.md#mapequal)
- [ObjEqual](Operations.md#objequal)
- [ObjToMap](Operations.md#objtomap)
- [SetDifference](Operations.md#setdifference)
- [SetEqual](Operations.md#setequal)
- [SetIntersection](Operations.md#setintersection)
- [SetValEqual](Operations.md#setvalequal)
- [StringCaseInsensitiveEqual](Operations.md#stringcaseinsensitiveequal)
- [ValEqual](Operations.md#valequal)

## Functions

### ArrayEqual

▸ **ArrayEqual**(`x`, `y`): `boolean`

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `x`  | `unknown`[] |
| `y`  | `unknown`[] |

#### Returns

`boolean`

#### Defined in

[Operations.ts:76](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Operations.ts#L76)

---

### ArrayIntersection

▸ **ArrayIntersection**<`T`\>(`a`, `b`): `Set`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type  |
| :--- | :---- |
| `a`  | `T`[] |
| `b`  | `T`[] |

#### Returns

`Set`<`T`\>

#### Defined in

[Operations.ts:56](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Operations.ts#L56)

---

### ArraySetEqual

▸ **ArraySetEqual**<`T`\>(`a1`, `a2`): `boolean`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type  |
| :--- | :---- |
| `a1` | `T`[] |
| `a2` | `T`[] |

#### Returns

`boolean`

#### Defined in

[Operations.ts:29](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Operations.ts#L29)

---

### MapEqual

▸ **MapEqual**(`x`, `y`): `boolean`

#### Parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `x`  | `Map`<`unknown`, `unknown`\> |
| `y`  | `Map`<`unknown`, `unknown`\> |

#### Returns

`boolean`

#### Defined in

[Operations.ts:84](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Operations.ts#L84)

---

### ObjEqual

▸ **ObjEqual**(`a`, `b`): `boolean`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `a`  | `Object` |
| `b`  | `Object` |

#### Returns

`boolean`

#### Defined in

[Operations.ts:112](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Operations.ts#L112)

---

### ObjToMap

▸ **ObjToMap**(`o`): `Map`<`string`, `string`\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `o`  | `Object` |

#### Returns

`Map`<`string`, `string`\>

#### Defined in

[Operations.ts:3](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Operations.ts#L3)

---

### SetDifference

▸ **SetDifference**<`T`\>(`a`, `b`): `Set`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type             |
| :--- | :--------------- |
| `a`  | `Set`<`T`\>      |
| `b`  | `Iterable`<`T`\> |

#### Returns

`Set`<`T`\>

#### Defined in

[Operations.ts:67](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Operations.ts#L67)

---

### SetEqual

▸ **SetEqual**<`T`\>(`s1`, `s2`): `boolean`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `s1` | `Set`<`T`\> |
| `s2` | `Set`<`T`\> |

#### Returns

`boolean`

#### Defined in

[Operations.ts:17](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Operations.ts#L17)

---

### SetIntersection

▸ **SetIntersection**<`T`\>(`a`, `b`): `Set`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type             |
| :--- | :--------------- |
| `a`  | `Set`<`T`\>      |
| `b`  | `Iterable`<`T`\> |

#### Returns

`Set`<`T`\>

#### Defined in

[Operations.ts:46](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Operations.ts#L46)

---

### SetValEqual

▸ **SetValEqual**(`x`, `y`): `boolean`

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `x`  | `Set`<`unknown`\> |
| `y`  | `Set`<`unknown`\> |

#### Returns

`boolean`

#### Defined in

[Operations.ts:96](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Operations.ts#L96)

---

### StringCaseInsensitiveEqual

▸ **StringCaseInsensitiveEqual**(`s1?`, `s2?`): `boolean`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `s1?` | `string` |
| `s2?` | `string` |

#### Returns

`boolean`

#### Defined in

[Operations.ts:36](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Operations.ts#L36)

---

### ValEqual

▸ **ValEqual**(`x`, `y`): `boolean`

#### Parameters

| Name | Type      |
| :--- | :-------- |
| `x`  | `unknown` |
| `y`  | `unknown` |

#### Returns

`boolean`

#### Defined in

[Operations.ts:132](https://github.com/kevinfrei/core-utils/blob/e2846bd/src/Operations.ts#L132)
