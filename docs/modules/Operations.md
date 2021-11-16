[@freik/core-utils](../README.md) / [Exports](../modules.md) / Operations

# Namespace: Operations

## Table of contents

### Functions

- [ArrayIntersection](Operations.md#arrayintersection)
- [ArraySetEqual](Operations.md#arraysetequal)
- [SetDifference](Operations.md#setdifference)
- [SetEqual](Operations.md#setequal)
- [SetIntersection](Operations.md#setintersection)
- [StringCaseInsensitiveEqual](Operations.md#stringcaseinsensitiveequal)

## Functions

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

[Operations.ts:40](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Operations.ts#L40)

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

[Operations.ts:13](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Operations.ts#L13)

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

[Operations.ts:51](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Operations.ts#L51)

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

[Operations.ts:1](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Operations.ts#L1)

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

[Operations.ts:30](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Operations.ts#L30)

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

[Operations.ts:20](https://github.com/kevinfrei/core-utils/blob/0188bb5/src/Operations.ts#L20)
