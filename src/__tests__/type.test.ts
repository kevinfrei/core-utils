import { MakeMultiMap } from '../multimap';
import { TypeCheckPair } from '../public-defs';
import {
  asArrayOfString,
  asNumber,
  asNumberOrString,
  asSimpleObject,
  cleanseKeys,
  is2TupleOf,
  is3TupleOf,
  isArray,
  isDate,
  isFunction,
  isMapOfStrings,
  isMultiMapOf,
  isNull,
  isNumber,
  isObjectOf,
  isObjectOfString,
  isRegex,
  isSetOfString,
  isSimpleObject,
  isSpecificType,
  isString,
} from '../types';

test('Object.isString empty', () => {
  expect(isString('')).toBe(true);
});
test('Object.isString something', () => {
  expect(isString('s')).toBe(true);
});
test('Object.isString notStr', () => {
  expect(isString(0)).toBe(false);
});
test('isRegex', () => {
  expect(isRegex({ source: 'abc', flags: 'i' })).toBeFalsy();
  expect(isRegex(/abc/i)).toBeTruthy();
  expect(isRegex(new RegExp('abc', 'i'))).toBeTruthy();
});
test('isDate', () => {
  expect(isDate(Date())).toBeFalsy();
  expect(isDate(new Date())).toBeTruthy();
});
test('isSpecificType', () => {
  const theType = { a: 1, b: () => 0, c: new Set<string>(['a']) };
  const fieldTypes: TypeCheckPair[] = [
    ['a', isNumber],
    ['b', isFunction],
    ['c', isSetOfString],
  ];
  const required = ['a', 'b'];
  expect(isSpecificType(theType, fieldTypes, required)).toBeTruthy();
  expect(isSpecificType(theType, fieldTypes)).toBeTruthy();
  expect(isSpecificType(theType, new Map(fieldTypes), required)).toBeTruthy();
  expect(
    isSpecificType({ a: 2, b: () => '' }, fieldTypes, required),
  ).toBeTruthy();
  expect(isSpecificType({ a: 2, b: 1 }, fieldTypes, required)).toBeFalsy();
  expect(
    isSpecificType({ a: 2, c: new Set(['a', 'b']) }, fieldTypes, required),
  ).toBeFalsy();
  expect(isSetOfString(new Set<number>([1, 2]))).toBeFalsy();
  expect(isObjectOfString('asdf')).toBeFalsy();
  expect(isObjectOfString({ a: 'asdf', b: 1 })).toBeFalsy();
  expect(isSpecificType({ a: 2, c: 1 }, fieldTypes, required)).toBeFalsy();
  expect(isSpecificType(null, fieldTypes, required)).toBeFalsy();
  expect(
    isSpecificType({ a: 2, b: () => '', d: null }, fieldTypes, required),
  ).toBeTruthy();
  expect(
    isSpecificType(
      { a: 2, b: () => '', d: 'nope' },
      fieldTypes,
      new Set(required),
    ),
  ).toBeFalsy();
});
test('A few extra items', () => {
  expect(asNumber({}, 1)).toEqual(1);
  expect(asNumber(1 / 0, 1)).toEqual(Number.POSITIVE_INFINITY);
  expect(asNumberOrString('a', 0)).toEqual('a');
  expect(asNumberOrString({}, 'b')).toEqual('b');
  expect(asNumberOrString(null, 3)).toEqual(3);
  expect(isNull(null)).toBeTruthy();
  expect(isNull(undefined)).toBeFalsy();
  expect(isNull('')).toBeFalsy();
  expect(isNull({})).toBeFalsy();
  expect(isNull(0)).toBeFalsy();
  expect(isNull([])).toBeFalsy();
  const val = () => {};
  val.tester = 'foo';
  expect(isFunction(val)).toBeTruthy();
});
test('asArrayOfString tests', () => {
  const strs = asArrayOfString([0, 'a']);
  expect(strs).toEqual(['a']);
  expect(asArrayOfString({ a: 1 })).toEqual([]);
  expect(asArrayOfString(() => [], ['bcd'])).toEqual(['bcd']);
  expect(asArrayOfString([1, 'a'], 'b')).toEqual(['b', 'a']);
  expect(asArrayOfString(['1', 1], ['nope'])).toEqual(['nope']);
  expect(asArrayOfString(['1', '1'], ['nope'])).toEqual(['1', '1']);
});
test('Miscellaneous type checks', () => {
  expect(isObjectOfString({ a: 'b' })).toBeTruthy();
  expect(isObjectOfString({ b: 1 })).toBeFalsy();
  expect(isObjectOfString({ [Symbol.iterator]: 'a' })).toBeFalsy();
  expect(isObjectOf({ [Symbol.iterator]: 1 }, isString)).toBeFalsy();
  expect(isObjectOf({ [Symbol.iterator]: 'b' }, isString)).toBeTruthy();
  expect(
    isMapOfStrings(
      new Map([
        ['a', 'b'],
        ['c', 'd'],
      ]),
    ),
  ).toBeTruthy();
  expect(
    isMapOfStrings(
      new Map<string, string | number>([
        ['a', 'b'],
        ['c', 1],
      ]),
    ),
  ).toBeFalsy();
  expect(
    isMapOfStrings(
      new Map<string | number, string>([
        [1, 'b'],
        ['c', 'd'],
      ]),
    ),
  ).toBeFalsy();
  expect(is2TupleOf([1, 'a'], isNumber, isString)).toBeTruthy();
  expect(is2TupleOf([1, 2], isNumber, isString)).toBeFalsy();
  expect(is3TupleOf([1, 2, 'a'], isNumber, isNumber, isString)).toBeTruthy();
  expect(is3TupleOf([1, 2, 'a'], isNumber, isString, isString)).toBeFalsy();
});

test('is/asSimpleObject tests', () => {
  const arr = [null, undefined, 'a', 12, true];
  const arrr = [...arr, () => {}];
  const sarr = asSimpleObject(arr);
  if (!isArray(sarr)) throw 'oops';
  expect(arr).toEqual(sarr);
  const sarrr = asSimpleObject(arrr);
  if (!isArray(sarrr)) throw 'oops';
  // The function should be removed
  expect(arr.length).toEqual(sarrr.length);
  expect(isSimpleObject(arr)).toBeTruthy();
  expect(isSimpleObject(arrr)).toBeFalsy();
  expect(isSimpleObject(sarr)).toBeTruthy();
  const obj = { a: arr, b: 1, c: null, d: true, e: 'a' };
  const sobj = asSimpleObject(obj);
  expect(sobj).toStrictEqual(obj);
  expect(asSimpleObject(() => {})).toBeUndefined();
  expect(isSimpleObject(() => {})).toBeFalsy();
});

test('MultiMap type tests', () => {
  const mmns = MakeMultiMap([
    [1, 'a'],
    [2, 'b'],
  ]);
  expect(isMultiMapOf(mmns, isNumber, isString)).toBeTruthy();
  expect(isMultiMapOf(mmns, isNumber, isNumber)).toBeFalsy();
  expect(isMultiMapOf(mmns, isString, isNumber)).toBeFalsy();
  expect(isMultiMapOf({}, isNumber, isNumber)).toBeFalsy();
});
test('cleansing', () => {
  const foo = { a: 1, b: 0, c: undefined, d: null };
  const bar = { ...foo };
  cleanseKeys(bar);
  expect(Object.keys(bar).length).toEqual(2);
  cleanseKeys(foo, true);
  expect(Object.keys(foo).length).toEqual(3);
  cleanseKeys(null);
});
